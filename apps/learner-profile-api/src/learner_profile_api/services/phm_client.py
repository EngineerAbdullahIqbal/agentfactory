"""HTTP client for PHM (Personalized History Model) sync from Study Mode API.

Maps 14 PHM fields per spec Appendix A.
Provenance-aware: never overwrites user-sourced values.
"""

import logging

import httpx

from ..config import settings
from .provenance import can_override, expertise_level_idx

logger = logging.getLogger(__name__)


class PHMSyncError(Exception):
    """Study Mode API returned a non-404 error during PHM sync."""

    def __init__(self, status_code: int, detail: str = ""):
        self.status_code = status_code
        super().__init__(f"PHM sync failed with status {status_code}: {detail}")

_client: httpx.AsyncClient | None = None


def _get_client() -> httpx.AsyncClient:
    global _client
    if _client is None:
        _client = httpx.AsyncClient(
            base_url=settings.study_mode_api_url,
            timeout=10.0,
        )
    return _client


async def close_client() -> None:
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None


async def fetch_phm_data(learner_id: str, token: str) -> dict | None:
    """Fetch PHM session data from Study Mode API.

    Returns the PHM data dict or None if unavailable.
    """
    if not settings.study_mode_api_url:
        logger.warning("[PHM] Study Mode API URL not configured")
        return None

    client = _get_client()
    try:
        response = await client.get(
            f"/api/v1/learner/{learner_id}/phm",
            headers={"Authorization": f"Bearer {token}"},
        )
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            logger.info("[PHM] No PHM data found for learner %s", learner_id)
            return None
        else:
            logger.warning(
                "[PHM] Unexpected status %d from Study Mode API", response.status_code
            )
            raise PHMSyncError(
                response.status_code, "Unexpected status from Study Mode API"
            )
    except httpx.HTTPError as e:
        logger.error("[PHM] Failed to fetch PHM data: %s", e)
        raise


def _can_override(current_source: str, new_source: str = "phm") -> bool:
    """Check if PHM can override a field based on provenance."""
    return can_override(current_source, new_source)


def _expertise_level_idx(level: str) -> int:
    return expertise_level_idx(level)


def apply_phm_data(
    phm_data: dict,
    current_expertise: dict,
    current_professional_context: dict,
    current_goals: dict,
    current_communication: dict,
    field_sources: dict[str, str],
) -> tuple[dict, dict, dict, dict, dict[str, str]]:
    """Apply PHM data to profile sections respecting provenance.

    Returns (updated_expertise, updated_prof_ctx, updated_goals,
             updated_communication, updated_field_sources).
    """
    expertise = dict(current_expertise)
    prof_ctx = dict(current_professional_context)
    goals = dict(current_goals)
    communication = dict(current_communication)
    updated_sources = dict(field_sources)

    expertise_level = phm_data.get("expertise_level", {})
    knowledge_map = phm_data.get("knowledge_map", {})
    prof_context = phm_data.get("professional_context", {})
    motivation = phm_data.get("motivation_and_goals", {})
    comm_prefs = phm_data.get("communication_preferences", {})
    learning_style = phm_data.get("learning_style_signals", {})

    # --- Expertise Level Mapping ---

    # Domain expertise
    if "domain_expertise" in expertise_level:
        field_path = "expertise.domain"
        if _can_override(updated_sources.get(field_path, "default")):
            phm_level = expertise_level["domain_expertise"]
            domains = expertise.get("domain", [])
            if not domains:
                # Auto-create primary domain entry
                domains = [{"level": phm_level, "domain_name": None, "is_primary": True}]
            else:
                # Update primary domain entry (only upgrade in v1)
                for d in domains:
                    if d.get("is_primary"):
                        current_idx = _expertise_level_idx(d.get("level", "beginner"))
                        new_idx = _expertise_level_idx(phm_level)
                        if new_idx > current_idx or settings.phm_allow_downrank:
                            d["level"] = phm_level
                        break
            expertise["domain"] = domains
            updated_sources[field_path] = "phm"

    # Programming level
    if "programming_experience" in expertise_level:
        field_path = "expertise.programming.level"
        if _can_override(updated_sources.get(field_path, "default")):
            phm_level = expertise_level["programming_experience"]
            prog = expertise.get("programming", {})
            current_idx = _expertise_level_idx(prog.get("level", "beginner"))
            new_idx = _expertise_level_idx(phm_level)
            if new_idx > current_idx or settings.phm_allow_downrank:
                prog["level"] = phm_level
                expertise["programming"] = prog
                updated_sources[field_path] = "phm"

    # AI/ML level
    if "ai_fluency_familiarity" in expertise_level:
        field_path = "expertise.ai_fluency.level"
        if _can_override(updated_sources.get(field_path, "default")):
            phm_level = expertise_level["ai_fluency_familiarity"]
            ai_fluency = expertise.get("ai_fluency", {})
            current_idx = _expertise_level_idx(ai_fluency.get("level", "beginner"))
            new_idx = _expertise_level_idx(phm_level)
            if new_idx > current_idx or settings.phm_allow_downrank:
                ai_fluency["level"] = phm_level
                expertise["ai_fluency"] = ai_fluency
                updated_sources[field_path] = "phm"

    # Business level
    if "business_experience" in expertise_level:
        field_path = "expertise.business.level"
        if _can_override(updated_sources.get(field_path, "default")):
            phm_level = expertise_level["business_experience"]
            biz = expertise.get("business", {})
            current_idx = _expertise_level_idx(biz.get("level", "beginner"))
            new_idx = _expertise_level_idx(phm_level)
            if new_idx > current_idx or settings.phm_allow_downrank:
                biz["level"] = phm_level
                expertise["business"] = biz
                updated_sources[field_path] = "phm"

    # --- Knowledge Map ---
    subject_specific = expertise.get("subject_specific", {})
    mastered = subject_specific.get("topics_already_mastered", [])
    misconceptions = subject_specific.get("known_misconceptions", [])
    mastered_path = "expertise.subject_specific.topics_already_mastered"
    misconceptions_path = "expertise.subject_specific.known_misconceptions"
    mastered_changed = False
    misconceptions_changed = False

    # Mastered topics
    if "mastered" in knowledge_map:
        if _can_override(updated_sources.get(mastered_path, "default")):
            existing_topics = {t.get("topic", "").lower(): i for i, t in enumerate(mastered)}
            for item in knowledge_map["mastered"]:
                topic = item if isinstance(item, str) else item.get("topic", "")
                normalized = topic.lower()
                if normalized not in existing_topics:
                    mastered.append({"topic": topic, "treatment": "reference"})
                    mastered_changed = True

    # Topics to skip
    if "topics_to_skip" in knowledge_map:
        if _can_override(updated_sources.get(mastered_path, "default")):
            existing_topics = {t.get("topic", "").lower(): i for i, t in enumerate(mastered)}
            for topic in knowledge_map["topics_to_skip"]:
                normalized = topic.lower() if isinstance(topic, str) else ""
                if normalized in existing_topics:
                    # Upgrade from reference to skip
                    prev = mastered[existing_topics[normalized]].get("treatment")
                    mastered[existing_topics[normalized]]["treatment"] = "skip"
                    if prev != "skip":
                        mastered_changed = True
                else:
                    mastered.append({"topic": topic, "treatment": "skip"})
                    mastered_changed = True

    # Known misconceptions (string → object transform, capped at 5)
    if "known_misconceptions" in knowledge_map:
        if _can_override(updated_sources.get(misconceptions_path, "default")):
            existing_misc_topics = {m.get("topic", "").lower() for m in misconceptions}
            for item in knowledge_map["known_misconceptions"]:
                topic = item if isinstance(item, str) else item.get("topic", "")
                if topic.lower() not in existing_misc_topics and len(misconceptions) < 5:
                    misconceptions.append({
                        "topic": topic,
                        "misconception": "Detected via tutoring session — details pending review",
                    })
                    existing_misc_topics.add(topic.lower())
                    misconceptions_changed = True

    subject_specific["topics_already_mastered"] = mastered
    subject_specific["known_misconceptions"] = misconceptions
    expertise["subject_specific"] = subject_specific
    if mastered_changed:
        updated_sources[mastered_path] = "phm"
    if misconceptions_changed:
        updated_sources[misconceptions_path] = "phm"

    # --- Professional Context ---
    if "current_role" in prof_context:
        field_path = "professional_context.current_role"
        if _can_override(updated_sources.get(field_path, "default")):
            prof_ctx["current_role"] = prof_context["current_role"]
            updated_sources[field_path] = "phm"

    if "industry" in prof_context:
        field_path = "professional_context.industry"
        if _can_override(updated_sources.get(field_path, "default")):
            prof_ctx["industry"] = prof_context["industry"]
            updated_sources[field_path] = "phm"

    if "real_projects" in prof_context:
        field_path = "professional_context.real_projects"
        if _can_override(updated_sources.get(field_path, "default")):
            prof_ctx["real_projects"] = prof_context["real_projects"]
            updated_sources[field_path] = "phm"

    # --- Goals ---
    if "primary_goal" in motivation:
        field_path = "goals.primary_learning_goal"
        if _can_override(updated_sources.get(field_path, "default")):
            goals["primary_learning_goal"] = motivation["primary_goal"]
            updated_sources[field_path] = "phm"

    if "urgency" in motivation:
        field_path = "goals.urgency"
        if _can_override(updated_sources.get(field_path, "default")):
            goals["urgency"] = motivation["urgency"]
            updated_sources[field_path] = "phm"

    # --- Communication ---
    if "language_complexity" in comm_prefs:
        field_path = "communication.language_complexity"
        if _can_override(updated_sources.get(field_path, "default")):
            communication["language_complexity"] = comm_prefs["language_complexity"]
            updated_sources[field_path] = "phm"

    if "preferred_analogy_domain" in comm_prefs:
        field_path = "communication.analogy_domain"
        if _can_override(updated_sources.get(field_path, "default")):
            communication["analogy_domain"] = comm_prefs["preferred_analogy_domain"]
            updated_sources[field_path] = "phm"

    if "verbosity_preference" in comm_prefs:
        field_path = "communication.verbosity"
        if _can_override(updated_sources.get(field_path, "default")):
            communication["verbosity"] = comm_prefs["verbosity_preference"]
            updated_sources[field_path] = "phm"

    # Learning style signals
    if "prefers_examples_before_theory" in learning_style:
        field_path = "communication.preferred_structure"
        if _can_override(updated_sources.get(field_path, "default")):
            pref = learning_style["prefers_examples_before_theory"]
            communication["preferred_structure"] = "examples-first" if pref else "theory-first"
            updated_sources[field_path] = "phm"

    return expertise, prof_ctx, goals, communication, updated_sources
