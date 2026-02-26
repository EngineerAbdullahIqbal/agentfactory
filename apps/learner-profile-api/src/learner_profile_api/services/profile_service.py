"""Profile service — CRUD, merge PATCH, audit logging.

All profile mutations go through _apply_update() for consistent
field_sources tracking and audit logging.
"""

import hashlib
import logging
from datetime import UTC, datetime
from typing import Any

from pydantic import BaseModel
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from ..config import settings
from ..core.exceptions import ConsentRequired, ProfileExists, ProfileNotFound
from ..models.profile import LearnerProfile, ProfileAuditLog
from ..schemas.profile import (
    ONBOARDING_PHASES,
    SECTION_MODELS,
    ExpertiseSection,
    ProfileCreate,
    ProfileUpdate,
)
from .defaults import apply_defaults_to_profile_data
from .inference import run_inference

logger = logging.getLogger(__name__)

# JSONB section column names on the model
JSONB_SECTIONS = [
    "expertise",
    "professional_context",
    "goals",
    "communication",
    "delivery",
    "accessibility",
]


def _ensure_domain_auto_primary(expertise: dict) -> dict:
    """Auto-mark the first domain entry as primary if none has is_primary=true.

    Spec: "first entry auto-marked primary if none has is_primary=true".
    """
    domains = expertise.get("domain", [])
    if domains and not any(d.get("is_primary") for d in domains):
        domains[0]["is_primary"] = True
        expertise["domain"] = domains
    return expertise


def _deduplicate_mastered_topics(expertise: dict) -> dict:
    """Case-normalized deduplication for topics_already_mastered.

    Spec: "topic deduplication: case-normalized for topics_already_mastered".
    """
    subject_specific = expertise.get("subject_specific", {})
    mastered = subject_specific.get("topics_already_mastered", [])
    if not mastered:
        return expertise

    seen: dict[str, int] = {}
    deduped: list[dict] = []
    for item in mastered:
        topic = item.get("topic", "")
        normalized = topic.lower()
        if normalized in seen:
            # If existing is "reference" and new is "skip", upgrade
            existing_idx = seen[normalized]
            if item.get("treatment") == "skip":
                deduped[existing_idx]["treatment"] = "skip"
        else:
            seen[normalized] = len(deduped)
            deduped.append(item)

    subject_specific["topics_already_mastered"] = deduped
    expertise["subject_specific"] = subject_specific
    return expertise


def merge_section(existing_json: dict, update_model: BaseModel) -> dict:
    """Merge only explicitly-provided fields into existing section data.

    Uses model_fields_set to track which fields the client actually sent.
    """
    merged = dict(existing_json)
    for field_name in update_model.model_fields_set:
        value = getattr(update_model, field_name)
        if isinstance(value, BaseModel):
            # Recurse for nested models
            merged[field_name] = merge_section(
                merged.get(field_name, {}), value
            )
        elif isinstance(value, list):
            # Lists: check if items are BaseModel
            serialized = []
            for item in value:
                if isinstance(item, BaseModel):
                    serialized.append(item.model_dump())
                else:
                    serialized.append(item)
            merged[field_name] = serialized
        else:
            merged[field_name] = value
    return merged


def collect_set_field_paths(
    update_model: BaseModel, prefix: str = ""
) -> list[str]:
    """Recursively collect dotted field paths for fields actually set by the client."""
    paths = []
    for field_name in update_model.model_fields_set:
        full_path = f"{prefix}.{field_name}" if prefix else field_name
        value = getattr(update_model, field_name)
        if isinstance(value, BaseModel):
            paths.extend(collect_set_field_paths(value, full_path))
        else:
            paths.append(full_path)
    return paths


async def _apply_update(
    session: AsyncSession,
    profile: LearnerProfile,
    changed_sections: list[str],
    source: str = "api",
    field_source_updates: dict[str, str] | None = None,
    previous_values: dict[str, Any] | None = None,
    action: str = "updated",
) -> LearnerProfile:
    """Centralized update: updates timestamps, field_sources, and creates audit log."""
    profile.updated_at = datetime.now(UTC)

    # Update field sources
    if field_source_updates:
        fs = dict(profile.field_sources) if profile.field_sources else {}
        fs.update(field_source_updates)
        profile.field_sources = fs

    # Create audit log entry
    audit = ProfileAuditLog(
        learner_id=profile.learner_id,
        action=action,
        changed_sections=changed_sections,
        previous_values=previous_values or {},
        source=source,
    )
    session.add(audit)
    session.add(profile)

    return profile


async def create_profile(
    session: AsyncSession,
    learner_id: str,
    data: ProfileCreate,
) -> tuple[LearnerProfile, bool]:
    """Create a new profile or restore a soft-deleted one.

    Returns (profile, is_restored).
    """
    if not data.consent_given:
        raise ConsentRequired("consent_given must be true to create a profile")

    # Check for existing profile (including soft-deleted)
    stmt = select(LearnerProfile).where(LearnerProfile.learner_id == learner_id)
    result = await session.execute(stmt)
    existing = result.scalar_one_or_none()

    if existing:
        if existing.deleted_at is not None:
            # Restore soft-deleted profile — preserve data and onboarding
            existing.deleted_at = None
            existing.updated_at = datetime.now(UTC)

            audit = ProfileAuditLog(
                learner_id=learner_id,
                action="restored",
                changed_sections=[],
                previous_values={},
                source="api",
            )
            session.add(audit)
            session.add(existing)
            await session.commit()
            await session.refresh(existing)
            return existing, True
        else:
            raise ProfileExists(f"Profile already exists for learner {learner_id}")

    # Create new profile
    now = datetime.now(UTC)

    # Build section dicts from validated data
    expertise_dict = data.expertise.model_dump()
    communication_dict = data.communication.model_dump()
    delivery_dict = data.delivery.model_dump()

    # Apply domain auto-primary and topic dedup
    expertise_dict = _ensure_domain_auto_primary(expertise_dict)
    expertise_dict = _deduplicate_mastered_topics(expertise_dict)

    # Apply Appendix B defaults for communication/delivery
    # (fills None fields with spec defaults without polluting model_fields_set)
    accessibility_dict = data.accessibility.model_dump()
    communication_dict, delivery_dict = apply_defaults_to_profile_data(
        communication_dict, delivery_dict, expertise_dict, accessibility_dict,
    )

    profile = LearnerProfile(
        learner_id=learner_id,
        name=data.name,
        consent_given=True,
        consent_date=now,
        expertise=expertise_dict,
        professional_context=data.professional_context.model_dump(),
        goals=data.goals.model_dump(),
        communication=communication_dict,
        delivery=delivery_dict,
        accessibility=accessibility_dict,
        onboarding_completed=False,
        onboarding_sections_completed={},
        field_sources={},
        created_at=now,
        updated_at=now,
    )

    # Mark explicitly-provided fields as user-sourced
    field_source_updates: dict[str, str] = {}
    for section_name in JSONB_SECTIONS:
        section_data = getattr(data, section_name, None)
        if section_data and section_data.model_fields_set:
            paths = collect_set_field_paths(section_data, section_name)
            for path in paths:
                field_source_updates[path] = "user"

    if data.name is not None:
        field_source_updates["name"] = "user"

    profile.field_sources = field_source_updates

    audit = ProfileAuditLog(
        learner_id=learner_id,
        action="created",
        changed_sections=[],
        previous_values={},
        source="api",
    )
    session.add(profile)
    session.add(audit)
    await session.commit()
    await session.refresh(profile)
    return profile, False


async def get_profile(
    session: AsyncSession,
    learner_id: str,
) -> LearnerProfile:
    """Get active profile by learner_id."""
    stmt = select(LearnerProfile).where(
        LearnerProfile.learner_id == learner_id,
        LearnerProfile.deleted_at.is_(None),
    )
    result = await session.execute(stmt)
    profile = result.scalar_one_or_none()
    if not profile:
        raise ProfileNotFound(f"No active profile found for learner {learner_id}")
    return profile


async def get_profile_by_learner_id(
    session: AsyncSession,
    learner_id: str,
) -> LearnerProfile:
    """Get active profile by explicit learner_id (admin use)."""
    return await get_profile(session, learner_id)


async def update_profile(
    session: AsyncSession,
    learner_id: str,
    data: ProfileUpdate,
) -> LearnerProfile:
    """Update profile with merge semantics — only explicitly-sent fields updated."""
    # Lock the row to prevent concurrent update conflicts
    stmt = (
        select(LearnerProfile)
        .where(
            LearnerProfile.learner_id == learner_id,
            LearnerProfile.deleted_at.is_(None),
        )
        .with_for_update()
    )
    result = await session.execute(stmt)
    profile = result.scalar_one_or_none()
    if not profile:
        raise ProfileNotFound(f"No active profile found for learner {learner_id}")

    changed_sections = []
    field_source_updates: dict[str, str] = {}
    previous_values: dict[str, Any] = {}

    # Update name if provided
    if "name" in data.model_fields_set:
        previous_values["name"] = profile.name
        profile.name = data.name
        field_source_updates["name"] = "user"

    # Update JSONB sections
    for section_name in JSONB_SECTIONS:
        if section_name not in data.model_fields_set:
            continue

        section_update = getattr(data, section_name)
        if section_update is None:
            continue

        existing_json = getattr(profile, section_name) or {}
        previous_values[section_name] = dict(existing_json)

        merged = merge_section(existing_json, section_update)

        # Apply domain auto-primary and topic dedup for expertise
        if section_name == "expertise":
            merged = _ensure_domain_auto_primary(merged)
            merged = _deduplicate_mastered_topics(merged)

        setattr(profile, section_name, merged)

        # Track field sources for explicitly set fields
        paths = collect_set_field_paths(section_update, section_name)
        for path in paths:
            field_source_updates[path] = "user"

        changed_sections.append(section_name)

    await _apply_update(
        session,
        profile,
        changed_sections=changed_sections,
        source="api",
        field_source_updates=field_source_updates,
        previous_values=previous_values,
    )

    # Run inference if expertise was updated
    if "expertise" in changed_sections:
        await _run_inference_on_profile(session, profile)

    await session.commit()
    await session.refresh(profile)
    return profile


async def update_section(
    session: AsyncSession,
    learner_id: str,
    section_name: str,
    section_data: BaseModel,
) -> LearnerProfile:
    """Update a single JSONB section with merge semantics."""
    if section_name not in SECTION_MODELS:
        raise ProfileNotFound(f"Unknown section: {section_name}")

    # Lock the row
    stmt = (
        select(LearnerProfile)
        .where(
            LearnerProfile.learner_id == learner_id,
            LearnerProfile.deleted_at.is_(None),
        )
        .with_for_update()
    )
    result = await session.execute(stmt)
    profile = result.scalar_one_or_none()
    if not profile:
        raise ProfileNotFound(f"No active profile found for learner {learner_id}")

    existing_json = getattr(profile, section_name) or {}
    previous_values = {section_name: dict(existing_json)}

    merged = merge_section(existing_json, section_data)

    # Apply domain auto-primary and topic dedup for expertise
    if section_name == "expertise":
        merged = _ensure_domain_auto_primary(merged)
        merged = _deduplicate_mastered_topics(merged)

    setattr(profile, section_name, merged)

    # Track field sources
    paths = collect_set_field_paths(section_data, section_name)
    field_source_updates = {path: "user" for path in paths}

    await _apply_update(
        session,
        profile,
        changed_sections=[section_name],
        source="api",
        field_source_updates=field_source_updates,
        previous_values=previous_values,
        action="section_updated",
    )

    # Run inference if expertise was updated
    if section_name == "expertise":
        await _run_inference_on_profile(session, profile)

    await session.commit()
    await session.refresh(profile)
    return profile


async def _run_inference_on_profile(
    session: AsyncSession,
    profile: LearnerProfile,
) -> None:
    """Run inference engine on profile and apply results."""
    expertise_data = profile.expertise or {}
    expertise = ExpertiseSection.model_validate(expertise_data)
    field_sources = dict(profile.field_sources) if profile.field_sources else {}

    inferred_values, inferred_sources = run_inference(expertise, field_sources)

    if not inferred_values:
        return

    # Apply inferred values to communication and delivery sections
    comm = dict(profile.communication) if profile.communication else {}
    delivery = dict(profile.delivery) if profile.delivery else {}

    for field_path, value in inferred_values.items():
        parts = field_path.split(".", 1)
        if len(parts) == 2:
            section, field = parts
            if section == "communication":
                comm[field] = value
            elif section == "delivery":
                delivery[field] = value

    profile.communication = comm
    profile.delivery = delivery

    # Update field sources
    fs = dict(profile.field_sources) if profile.field_sources else {}
    fs.update(inferred_sources)
    profile.field_sources = fs


async def soft_delete_profile(
    session: AsyncSession,
    learner_id: str,
) -> None:
    """Soft delete a profile."""
    stmt = (
        select(LearnerProfile)
        .where(
            LearnerProfile.learner_id == learner_id,
            LearnerProfile.deleted_at.is_(None),
        )
    )
    result = await session.execute(stmt)
    profile = result.scalar_one_or_none()
    if not profile:
        raise ProfileNotFound(f"No active profile found for learner {learner_id}")

    profile.deleted_at = datetime.now(UTC)
    profile.updated_at = datetime.now(UTC)

    audit = ProfileAuditLog(
        learner_id=learner_id,
        action="deleted",
        changed_sections=[],
        previous_values={},
        source="api",
    )
    session.add(profile)
    session.add(audit)
    await session.commit()


async def gdpr_erase_profile(
    session: AsyncSession,
    learner_id: str,
) -> None:
    """GDPR hard delete — removes profile row, anonymizes audit trail."""
    # Find profile (including soft-deleted)
    stmt = select(LearnerProfile).where(LearnerProfile.learner_id == learner_id)
    result = await session.execute(stmt)
    profile = result.scalar_one_or_none()
    if not profile:
        raise ProfileNotFound(f"No profile found for learner {learner_id}")

    # Delete the profile row
    await session.delete(profile)

    # Anonymize audit trail
    hashed_id = hashlib.sha256(
        f"{learner_id}{settings.gdpr_hash_salt}".encode()
    ).hexdigest()

    audit_stmt = select(ProfileAuditLog).where(
        ProfileAuditLog.learner_id == learner_id
    )
    audit_result = await session.execute(audit_stmt)
    audit_logs = audit_result.scalars().all()

    for log in audit_logs:
        log.learner_id = hashed_id
        log.action = "gdpr_erased"
        log.changed_sections = []
        log.previous_values = {}
        log.source = "gdpr_erase"
        session.add(log)

    await session.commit()


async def update_onboarding_section(
    session: AsyncSession,
    learner_id: str,
    section_name: str,
    section_data: dict | None = None,
) -> LearnerProfile:
    """Mark an onboarding phase complete and optionally store data."""
    if section_name not in ONBOARDING_PHASES:
        raise ProfileNotFound(f"Unknown onboarding phase: {section_name}")

    # Lock the row
    stmt = (
        select(LearnerProfile)
        .where(
            LearnerProfile.learner_id == learner_id,
            LearnerProfile.deleted_at.is_(None),
        )
        .with_for_update()
    )
    result = await session.execute(stmt)
    profile = result.scalar_one_or_none()
    if not profile:
        raise ProfileNotFound(f"No active profile found for learner {learner_id}")

    # Mark section as completed
    osc = profile.onboarding_sections_completed
    sections = dict(osc) if osc else {}
    sections[section_name] = True
    profile.onboarding_sections_completed = sections

    changed_sections = []
    field_source_updates: dict[str, str] = {}
    previous_values: dict[str, Any] = {}

    # Store section data if provided
    if section_data and section_name in SECTION_MODELS:
        model_class = SECTION_MODELS[section_name]
        validated = model_class.model_validate(section_data)

        existing_json = getattr(profile, section_name) or {}
        previous_values[section_name] = dict(existing_json)

        merged = merge_section(existing_json, validated)

        # Apply domain auto-primary and topic dedup for expertise
        if section_name == "expertise":
            merged = _ensure_domain_auto_primary(merged)
            merged = _deduplicate_mastered_topics(merged)

        setattr(profile, section_name, merged)

        paths = collect_set_field_paths(validated, section_name)
        for path in paths:
            field_source_updates[path] = "user"

        changed_sections.append(section_name)

    # AI enrichment can update multiple sections
    if section_name == "ai_enrichment" and section_data:
        for key in ("goals", "professional_context", "expertise"):
            if key in section_data and key in SECTION_MODELS:
                model_class = SECTION_MODELS[key]
                validated = model_class.model_validate(section_data[key])

                existing_json = getattr(profile, key) or {}
                previous_values[key] = dict(existing_json)

                merged = merge_section(existing_json, validated)

                if key == "expertise":
                    merged = _ensure_domain_auto_primary(merged)
                    merged = _deduplicate_mastered_topics(merged)

                setattr(profile, key, merged)

                paths = collect_set_field_paths(validated, key)
                for path in paths:
                    field_source_updates[path] = "user"

                changed_sections.append(key)

    # Check if all onboarding phases are completed
    all_completed = all(
        sections.get(phase, False) for phase in ONBOARDING_PHASES
    )
    profile.onboarding_completed = all_completed

    await _apply_update(
        session,
        profile,
        changed_sections=changed_sections,
        source="onboarding",
        field_source_updates=field_source_updates,
        previous_values=previous_values,
        action="section_updated",
    )

    # Run inference if expertise was updated
    if "expertise" in changed_sections:
        await _run_inference_on_profile(session, profile)

    await session.commit()
    await session.refresh(profile)
    return profile


async def sync_from_phm(
    session: AsyncSession,
    learner_id: str,
    token: str,
) -> LearnerProfile:
    """Pull PHM data and apply to profile."""
    from .phm_client import apply_phm_data, fetch_phm_data

    profile = await get_profile(session, learner_id)

    phm_data = await fetch_phm_data(learner_id, token)
    if phm_data is None:
        return profile

    # Apply PHM data
    expertise, prof_ctx, goals, communication, updated_sources = apply_phm_data(
        phm_data,
        profile.expertise or {},
        profile.professional_context or {},
        profile.goals or {},
        profile.communication or {},
        profile.field_sources or {},
    )

    previous_values = {
        "expertise": dict(profile.expertise) if profile.expertise else {},
        "professional_context": (
            dict(profile.professional_context) if profile.professional_context else {}
        ),
        "goals": dict(profile.goals) if profile.goals else {},
        "communication": dict(profile.communication) if profile.communication else {},
    }

    profile.expertise = expertise
    profile.professional_context = prof_ctx
    profile.goals = goals
    profile.communication = communication
    profile.field_sources = updated_sources

    changed_sections = ["expertise", "professional_context", "goals", "communication"]

    await _apply_update(
        session,
        profile,
        changed_sections=changed_sections,
        source="phm_sync",
        previous_values=previous_values,
        action="updated",
    )

    # Run inference after PHM sync
    await _run_inference_on_profile(session, profile)

    await session.commit()
    await session.refresh(profile)
    return profile
