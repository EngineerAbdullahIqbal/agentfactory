"""Profile CRUD + onboarding + completeness routes."""

import json as _json
import logging

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import ValidationError
from sqlmodel.ext.asyncio.session import AsyncSession

from api_infra.auth import get_current_user
from api_infra.core.rate_limit import rate_limit

from ..core.database import get_session
from ..core.exceptions import ProfileExists, ProfileNotFound
from ..schemas.profile import (
    ONBOARDING_PHASES,
    SECTION_MODELS,
    AccessibilitySection,
    CommunicationSection,
    CompletenessResponse,
    DeliverySection,
    ErrorResponse,
    ExpertiseSection,
    GoalsSection,
    ProfessionalContextSection,
    ProfileCreate,
    ProfileResponse,
    ProfileUpdate,
)
from ..services.cache import (
    gdpr_invalidate_profile_cache,
    get_cached_profile,
    invalidate_profile_cache,
    set_cached_profile,
)
from ..services.completeness import (
    compute_highest_impact_missing,
    compute_onboarding_progress,
    compute_profile_completeness,
)
from ..services.profile_service import (
    create_profile,
    gdpr_erase_profile,
    get_profile,
    soft_delete_profile,
    sync_from_phm,
    update_onboarding_section,
    update_profile,
    update_section,
)

logger = logging.getLogger(__name__)

profile_router = APIRouter(prefix="/api/v1/profiles", tags=["profiles"])


def _backfill_sections_completed(profile) -> dict:
    """Ensure communication_preferences key exists for backward compatibility."""
    sections = dict(profile.onboarding_sections_completed or {})
    if profile.onboarding_completed and "communication_preferences" not in sections:
        sections["communication_preferences"] = True
    return sections


def _profile_to_response(profile) -> ProfileResponse:
    """Convert a LearnerProfile model to a ProfileResponse."""
    field_sources = profile.field_sources or {}
    sections_completed = _backfill_sections_completed(profile)

    onboarding_progress = compute_onboarding_progress(sections_completed)
    completeness, _ = compute_profile_completeness(field_sources)

    try:
        expertise = ExpertiseSection.model_validate(profile.expertise or {})
        professional_context = ProfessionalContextSection.model_validate(
            profile.professional_context or {}
        )
        goals = GoalsSection.model_validate(profile.goals or {})
        communication = CommunicationSection.model_validate(profile.communication or {})
        delivery = DeliverySection.model_validate(profile.delivery or {})
        accessibility = AccessibilitySection.model_validate(profile.accessibility or {})
    except ValidationError as e:
        logger.error(
            "[Profile] Corrupted profile data for learner %s: %s",
            profile.learner_id,
            e,
        )
        # Return defaults for corrupted sections rather than crashing
        expertise = ExpertiseSection()
        professional_context = ProfessionalContextSection()
        goals = GoalsSection()
        communication = CommunicationSection()
        delivery = DeliverySection()
        accessibility = AccessibilitySection()

    # Build full sections_completed with all phases represented
    all_sections = {phase: sections_completed.get(phase, False) for phase in ONBOARDING_PHASES}

    return ProfileResponse(
        learner_id=profile.learner_id,
        name=profile.name,
        profile_version=profile.profile_version,
        consent_given=profile.consent_given,
        consent_date=profile.consent_date,
        expertise=expertise,
        professional_context=professional_context,
        goals=goals,
        communication=communication,
        delivery=delivery,
        accessibility=accessibility,
        field_sources=field_sources,
        onboarding_completed=profile.onboarding_completed,
        onboarding_sections_completed=all_sections,
        onboarding_progress=round(onboarding_progress, 2),
        profile_completeness=round(completeness, 2),
        created_at=profile.created_at,
        updated_at=profile.updated_at,
    )


@profile_router.post(
    "/",
    response_model=ProfileResponse,
    status_code=201,
    responses={400: {"model": ErrorResponse}, 409: {"model": ErrorResponse}},
)
@rate_limit("profile_create", max_requests=5, period_minutes=60)
async def create_profile_route(
    request: Request,
    response: Response,
    body: ProfileCreate,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Create a new profile. Requires consent_given: true.

    If a soft-deleted profile exists, restores it (200).
    """
    if not body.consent_given:
        raise HTTPException(
            status_code=400,
            detail={"error": "consent_required", "message": "consent_given must be true"},
        )

    # Auto-populate name from JWT if client didn't send the field at all
    if "name" not in body.model_fields_set and user.name:
        body.name = user.name

    try:
        profile, is_restored = await create_profile(session, user["sub"], body)
        await invalidate_profile_cache(user["sub"])
        resp = _profile_to_response(profile)
        if is_restored:
            response.status_code = 200
        return resp
    except ProfileExists:
        raise HTTPException(
            status_code=409,
            detail={"error": "profile_exists", "message": "Profile already exists for this user"},
        )


@profile_router.get(
    "/me",
    response_model=ProfileResponse,
    responses={404: {"model": ErrorResponse}},
)
@rate_limit("profile_get", max_requests=120, period_minutes=1)
async def get_my_profile(
    request: Request,
    response: Response,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Get the current user's profile."""
    learner_id = user["sub"]

    # Check cache first
    cached = await get_cached_profile(learner_id)
    if cached:
        return ProfileResponse.model_validate(cached)

    try:
        profile = await get_profile(session, learner_id)
        resp = _profile_to_response(profile)
        # Cache the response
        await set_cached_profile(learner_id, resp.model_dump(mode="json"))
        return resp
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found"},
        )


@profile_router.get(
    "/admin/by-learner/{learner_id:path}",
    response_model=ProfileResponse,
    responses={403: {"model": ErrorResponse}, 404: {"model": ErrorResponse}},
)
@rate_limit("admin_get", max_requests=60, period_minutes=1)
async def get_profile_by_learner(
    request: Request,
    response: Response,
    learner_id: str,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Get profile by learner ID (admin/service only)."""
    from ..config import settings

    # NOTE: Admin access requires the JWT to contain a "role": "admin" claim.
    # If the SSO does not emit role claims, admin access is only available in dev_mode.
    # TODO: Consider config-based admin_user_ids allowlist as fallback for production.
    is_admin = settings.dev_mode or user.role == "admin"
    if not is_admin:
        raise HTTPException(
            status_code=403,
            detail={"error": "forbidden", "message": "Admin access required"},
        )

    try:
        profile = await get_profile(session, learner_id)
        return _profile_to_response(profile)
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found for this learner"},
        )


@profile_router.patch(
    "/me",
    response_model=ProfileResponse,
    responses={404: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
)
@rate_limit("profile_update", max_requests=30, period_minutes=60)
async def update_my_profile(
    request: Request,
    response: Response,
    body: ProfileUpdate,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Update profile with merge semantics. Only provided fields are updated."""
    try:
        profile = await update_profile(session, user["sub"], body)
        resp = _profile_to_response(profile)
        await set_cached_profile(user["sub"], resp.model_dump(mode="json"))
        return resp
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found"},
        )


@profile_router.patch(
    "/me/sections/{section}",
    response_model=ProfileResponse,
    responses={404: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
)
@rate_limit("section_update", max_requests=60, period_minutes=60)
async def update_profile_section(
    request: Request,
    response: Response,
    section: str,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Update a single profile section with merge semantics."""
    if section not in SECTION_MODELS:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": f"Unknown section: {section}"},
        )

    # Limit body size to prevent memory exhaustion (dynamic model, can't use Body())
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > 65_536:  # 64 KB
        raise HTTPException(status_code=413, detail="Request body too large")
    raw = await request.body()
    if len(raw) > 65_536:
        raise HTTPException(status_code=413, detail="Request body too large")

    body = _json.loads(raw)
    model_class = SECTION_MODELS[section]
    section_data = model_class.model_validate(body)

    try:
        profile = await update_section(session, user["sub"], section, section_data)
        resp = _profile_to_response(profile)
        await set_cached_profile(user["sub"], resp.model_dump(mode="json"))
        return resp
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found"},
        )


@profile_router.delete(
    "/me",
    status_code=204,
    responses={404: {"model": ErrorResponse}},
)
@rate_limit("profile_delete", max_requests=5, period_minutes=60)
async def delete_my_profile(
    request: Request,
    response: Response,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Soft-delete the current user's profile."""
    try:
        await soft_delete_profile(session, user["sub"])
        await invalidate_profile_cache(user["sub"])
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found"},
        )


@profile_router.delete(
    "/me/gdpr-erase",
    status_code=204,
    responses={404: {"model": ErrorResponse}},
)
@rate_limit("gdpr_erase", max_requests=3, period_minutes=60)
async def gdpr_erase_my_profile(
    request: Request,
    response: Response,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """GDPR hard delete — true erasure. Irreversible."""
    learner_id = user["sub"]

    # Pre-erase: ensure cache will be cleared (fail-fast if Redis unavailable)
    try:
        await gdpr_invalidate_profile_cache(learner_id)
    except Exception as e:
        logger.error("[GDPR] Cache invalidation failed pre-erase: %s", e)
        raise HTTPException(
            status_code=503,
            detail="GDPR erase temporarily unavailable — cache service unreachable. Please retry.",
        )

    try:
        await gdpr_erase_profile(session, learner_id)
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found"},
        )

    # Post-erase: second invalidation (belt and suspenders)
    try:
        await gdpr_invalidate_profile_cache(learner_id)
    except Exception:
        logger.warning("[GDPR] Post-erase cache invalidation failed — pre-erase already cleared")


@profile_router.patch(
    "/me/onboarding/{section}",
    response_model=ProfileResponse,
    responses={404: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
)
@rate_limit("onboarding_update", max_requests=60, period_minutes=60)
async def update_onboarding(
    request: Request,
    response: Response,
    section: str,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Mark an onboarding phase complete and optionally store data."""
    if section not in ONBOARDING_PHASES:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": f"Unknown onboarding phase: {section}"},
        )

    # Parse optional body with size limit
    body = None
    raw = await request.body()
    if raw:
        if len(raw) > 65_536:  # 64 KB
            raise HTTPException(status_code=413, detail="Request body too large")
        try:
            body = _json.loads(raw)
        except (ValueError, _json.JSONDecodeError):
            raise HTTPException(
                status_code=422,
                detail="Request body contains invalid JSON",
            )

    try:
        profile = await update_onboarding_section(session, user["sub"], section, body)
        resp = _profile_to_response(profile)
        await set_cached_profile(user["sub"], resp.model_dump(mode="json"))
        return resp
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found"},
        )


@profile_router.post(
    "/me/sync-from-phm",
    response_model=ProfileResponse,
    responses={404: {"model": ErrorResponse}, 502: {"model": ErrorResponse}},
)
@rate_limit("phm_sync", max_requests=5, period_minutes=60)
async def sync_from_phm_route(
    request: Request,
    response: Response,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Pull PHM data from Study Mode API into profile."""
    # Extract token from request
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.replace("Bearer ", "") if auth_header.startswith("Bearer ") else ""

    try:
        profile = await sync_from_phm(session, user["sub"], token)
        resp = _profile_to_response(profile)
        await set_cached_profile(user["sub"], resp.model_dump(mode="json"))
        return resp
    except ProfileNotFound:
        raise HTTPException(
            status_code=404,
            detail={"error": "not_found", "message": "No profile found"},
        )
    except Exception as e:
        logger.error("[PHM] Sync failed: %s", e)
        raise HTTPException(
            status_code=502,
            detail={
                "error": "upstream_unavailable",
                "message": "Failed to sync from Study Mode API",
            },
        )


@profile_router.get(
    "/me/completeness",
    response_model=CompletenessResponse,
    responses={404: {"model": ErrorResponse}},
)
@rate_limit("completeness", max_requests=60, period_minutes=1)
async def get_completeness(
    request: Request,
    response: Response,
    user=Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """Get profile completeness score and recommendations."""
    learner_id = user["sub"]

    # Try to derive completeness from cached profile to avoid DB hit
    cached = await get_cached_profile(learner_id)
    if cached:
        cached_resp = ProfileResponse.model_validate(cached)
        field_sources = cached_resp.field_sources or {}
        sections_completed = cached_resp.onboarding_sections_completed or {}
    else:
        try:
            profile = await get_profile(session, learner_id)
        except ProfileNotFound:
            raise HTTPException(
                status_code=404,
                detail={"error": "not_found", "message": "No profile found"},
            )
        field_sources = profile.field_sources or {}
        sections_completed = profile.onboarding_sections_completed or {}

    completeness, per_section = compute_profile_completeness(field_sources)
    onboarding_progress = compute_onboarding_progress(sections_completed)
    highest_impact = compute_highest_impact_missing(field_sources)

    return CompletenessResponse(
        learner_id=learner_id,
        profile_completeness=round(completeness, 2),
        onboarding_progress=round(onboarding_progress, 2),
        per_section={k: round(v, 2) for k, v in per_section.items()},
        highest_impact_missing=highest_impact,
    )
