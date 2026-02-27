# Learner Profile API — Technical Architecture Research

**Author**: systems-architect
**Date**: 2026-02-26
**Status**: Phase 1 Research Complete

---

## 1. Content-API Patterns Summary (What to Replicate)

After reading every source file and test in `apps/content-api/`, here are the patterns we MUST replicate for consistency across the platform:

### App Structure

```
apps/learner-profile-api/
├── Dockerfile                    # Multi-stage, non-root, uv-based (replicate content-api)
├── pyproject.toml                # hatchling build, ruff + mypy, pytest-asyncio
├── project.json                  # Nx project config
├── src/
│   ├── api_infra/                # SYMLINK or copy — shared auth, rate limiting, Redis
│   │   ├── __init__.py           # configure(settings) pattern
│   │   ├── auth.py               # JWT/JWKS + CurrentUser + dev_mode bypass
│   │   └── core/
│   │       ├── rate_limit.py     # Lua-based atomic rate limiting
│   │       └── redis_cache.py    # Redis caching with retry + backoff
│   └── learner_profile_api/
│       ├── __init__.py
│       ├── main.py               # FastAPI app creation, CORS, lifespan, health check
│       ├── config.py             # pydantic-settings BaseSettings from env
│       ├── core/
│       │   ├── __init__.py
│       │   ├── lifespan.py       # Startup: Redis + DB engine; Shutdown: close all
│       │   └── database.py       # SQLModel async engine, session factory, get_session dep
│       ├── models/
│       │   ├── __init__.py
│       │   └── profile.py        # SQLModel table models
│       ├── schemas/
│       │   ├── __init__.py
│       │   └── profile.py        # Pydantic request/response models (NOT table models)
│       ├── routes/
│       │   ├── __init__.py
│       │   └── profile.py        # Profile CRUD + onboarding + personalization trigger
│       └── services/
│           ├── __init__.py
│           ├── profile_service.py     # Business logic, CRUD operations
│           ├── personalization.py     # LLM personalization engine integration
│           └── phm_client.py          # HTTP client for PHM sync (follows ProgressClient pattern)
└── tests/
    ├── __init__.py
    ├── conftest.py               # Shared fixtures: mock settings, mock DB session
    ├── test_profile_crud.py      # Unit tests for profile service
    ├── test_profile_routes.py    # Route-level tests with TestClient
    ├── test_schema_validation.py # Schema edge cases
    └── e2e/
        ├── __init__.py
        ├── conftest.py           # Real JWT, fakeredis, async DB session (SQLite in-memory)
        ├── test_profile_flow.py  # Full CRUD through HTTP
        └── test_personalization_flow.py  # Profile + lesson → personalized output
```

### Key Patterns to Replicate

| Pattern | Source | How to Replicate |
|---------|--------|------------------|
| **Settings from env** | `config.py` → `pydantic-settings` BaseSettings | Same pattern, add `database_url`, `llm_api_url` |
| **Shared api_infra** | `src/api_infra/` with `configure(settings)` | Symlink or copy; auth.py gives us `CurrentUser` and `get_current_user` |
| **Lifespan manager** | `core/lifespan.py` → `@asynccontextmanager` | Add DB engine init/close alongside Redis init/close |
| **Rate limiting** | `@rate_limit("key", max_requests=N, period_minutes=M)` decorator | Same decorator on all endpoints |
| **Health check** | `GET /health` with Redis ping | Add DB connectivity check too |
| **Module-level singleton clients** | `_client: T | None = None` + `get_client() -> T | None` | Same for PHM client |
| **Lazy httpx.AsyncClient** | Double-checked locking with `asyncio.Lock` | Replicate for PHM client |
| **Fail-closed vs fail-open** | Metering = fail-closed; Redis cache = fail-open | Profile reads = fail-open cache; LLM personalization = fail-open (serve unpersonalized) |
| **Dev mode bypass** | `settings.dev_mode` → synthetic CurrentUser | Same |
| **Test layering** | Unit tests (mock everything) + E2E tests (real JWT, fakeredis, respx) | Same, but add async DB session with SQLite for E2E |
| **E2E conftest** | RSA key generation, make_token factory, respx mocking | Replicate exactly |
| **Idempotency keys** | Redis `content-access:{user}:{path}` with TTL | Profile cache keys: `profile:{learner_id}` |
| **Admin endpoints** | `POST /admin/invalidate-cache` with secret | `POST /admin/reprocess-profiles` for batch re-personalization |

### What NOT to Replicate

- **GitHub content loading** — not relevant; we read from DB
- **Book tree builder** — domain-specific to content-api
- **Metering integration** — profile reads should be free; personalization calls may be metered later but not in v1

---

## 2. SQLModel Async Research Findings

### Current State (Feb 2026)

SQLModel (latest: 0.0.22+) provides async support through SQLAlchemy's async extension. Key findings:

**Does SQLModel support async natively?**
- Partially. SQLModel provides `from sqlmodel.ext.asyncio.session import AsyncSession` but does NOT wrap `create_async_engine`. You import the engine from SQLAlchemy directly.
- This is stable and well-documented. Not a workaround — it's the intended pattern.

**Recommended session management pattern:**

```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession

# Engine (created once at startup)
engine = create_async_engine(
    database_url,
    echo=False,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,     # Essential for managed DBs (Neon, Supabase)
    pool_recycle=300,        # Recycle connections every 5 min
)

# Session factory
async_session_factory = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,  # Prevent lazy-load issues after commit
)

# FastAPI dependency
async def get_session():
    async with async_session_factory() as session:
        yield session
```

**Can we avoid falling back to raw SQLAlchemy session management?**
- No, and we shouldn't try. The `create_async_engine` + `async_sessionmaker` from SQLAlchemy is the canonical pattern. SQLModel's `AsyncSession` wraps SQLAlchemy's and adds `.exec()` support for type-safe queries.
- This is not "falling back" — it's the designed integration point.

**Driver:**
- Use `asyncpg` for async PostgreSQL: `postgresql+asyncpg://...`
- Also need `psycopg2-binary` or `psycopg[binary]` for Alembic sync migrations

**Alembic Async Migrations:**
- Use `alembic` with async engine configuration
- Alembic's `env.py` needs `run_async` wrapper for async engine

### Recommendation

**Use SQLModel for models + Pydantic integration. Use SQLAlchemy's async engine/session directly. This is the standard, battle-tested pattern.**

Dependencies to add (beyond content-api's deps):
```
sqlmodel>=0.0.22
sqlalchemy[asyncio]>=2.0.36
asyncpg>=0.30.0
psycopg2-binary>=2.9.10   # For Alembic sync migrations
alembic>=1.14.0
```

Sources:
- [SQLModel Official Docs — Session with Dependency](https://sqlmodel.tiangolo.com/tutorial/fastapi/session-with-dependency/)
- [TestDriven.io — FastAPI + Async SQLAlchemy + SQLModel + Alembic](https://testdriven.io/blog/fastapi-sqlmodel/)
- [SQLAlchemy 2.0 — Async I/O](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)
- [fastapi-alembic-sqlmodel-async template](https://github.com/jonra1993/fastapi-alembic-sqlmodel-async)
- [Daniel Feldroy — SQLModel Async with FastAPI and PostgreSQL](https://daniel.feldroy.com/posts/til-2025-08-using-sqlmodel-asynchronously-with-fastapi-and-air-with-postgresql)

---

## 3. DB Schema Design

### Decision: Hybrid Approach (Core Columns + JSONB)

**Options considered:**

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **A. Single JSONB column** | Zero migrations for schema changes, schema matches JSON profile 1:1 | Can't index individual fields, can't enforce constraints at DB level, loses relational advantages entirely | Reject |
| **B. Fully normalized** | Max query flexibility, strong constraints, easy partial updates | 30+ columns across 5+ tables, migrations for every schema field change, impedance mismatch with the JSON profile, over-engineered for read-heavy workload | Reject |
| **C. Hybrid: core columns + JSONB sections** | Indexed lookups on core fields, flexible schema sections, clean mapping to profile JSON, reasonable migration surface | Slightly more complex than pure JSONB, need to keep JSONB and columns in sync | **SELECTED** |

### Rationale

The learner profile is:
1. **Read-heavy** — profiles are read on every personalization request, rarely written
2. **Schema-versioned** — `profile_version: "1.0"` implies evolution over time
3. **Section-structured** — 6 logical sections that map cleanly to JSONB columns
4. **Queried by ID** — almost all access is `WHERE learner_id = ?`; no complex cross-field queries needed

The hybrid approach gives us:
- Fast lookup by `learner_id` (B-tree index on UUID)
- Core fields (`learner_id`, `name`, `profile_version`, timestamps) as proper columns for indexing and constraints
- Each profile section (`expertise`, `professional_context`, `goals`, `communication`, `delivery`) as a JSONB column — flexible, versionable, and directly mappable to the schema JSON
- Ability to add GIN indexes on JSONB columns if we later need to query by specific nested fields (e.g., find all learners with `expertise.programming.level = 'advanced'`)

### SQLModel Table Models

```python
import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import Column, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Field, SQLModel


class LearnerProfile(SQLModel, table=True):
    """Core learner profile table — hybrid relational + JSONB design."""

    __tablename__ = "learner_profiles"

    # === Identity (relational columns, indexed) ===
    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        description="Internal DB primary key",
    )
    learner_id: str = Field(
        index=True,
        unique=True,
        max_length=255,
        description="External learner ID (maps to SSO user.sub)",
    )
    name: str | None = Field(default=None, max_length=255)
    profile_version: str = Field(default="1.0", max_length=10)

    # === Profile Sections (JSONB columns) ===
    expertise: dict[str, Any] = Field(
        default_factory=dict,
        sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")),
    )
    professional_context: dict[str, Any] = Field(
        default_factory=dict,
        sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")),
    )
    goals: dict[str, Any] = Field(
        default_factory=dict,
        sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")),
    )
    communication: dict[str, Any] = Field(
        default_factory=dict,
        sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")),
    )
    delivery: dict[str, Any] = Field(
        default_factory=dict,
        sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")),
    )

    # === Onboarding State ===
    onboarding_completed: bool = Field(default=False)
    onboarding_sections_completed: dict[str, Any] = Field(
        default_factory=dict,
        sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")),
        description="Track which sections are done: {'expertise': true, 'goals': false, ...}",
    )

    # === Timestamps ===
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        description="Profile creation timestamp",
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        description="Last modification timestamp",
    )

    # === Soft Delete ===
    deleted_at: datetime | None = Field(default=None)


class ProfileAuditLog(SQLModel, table=True):
    """Append-only audit trail for profile changes."""

    __tablename__ = "profile_audit_log"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    learner_id: str = Field(index=True, max_length=255)
    action: str = Field(max_length=50)  # "created", "updated", "section_updated", "deleted"
    changed_sections: list[str] = Field(
        default_factory=list,
        sa_column=Column(JSONB, nullable=False, server_default=text("'[]'")),
    )
    previous_values: dict[str, Any] = Field(
        default_factory=dict,
        sa_column=Column(JSONB, nullable=False, server_default=text("'{}'")),
    )
    source: str = Field(max_length=50, default="api")  # "api", "onboarding", "phm_sync", "admin"
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### Indexes

```sql
-- Primary access pattern: lookup by learner_id
CREATE UNIQUE INDEX idx_profiles_learner_id ON learner_profiles (learner_id);

-- Soft-delete filter (most queries exclude deleted)
CREATE INDEX idx_profiles_not_deleted ON learner_profiles (learner_id) WHERE deleted_at IS NULL;

-- Audit log: per-learner history
CREATE INDEX idx_audit_learner_id ON profile_audit_log (learner_id, created_at DESC);

-- Optional: GIN index for JSONB queries (add only if we need to query by nested fields)
-- CREATE INDEX idx_profiles_expertise_gin ON learner_profiles USING GIN (expertise);
```

### Schema Versioning Strategy

- `profile_version` is stored as a string column (`"1.0"`, `"1.1"`, `"2.0"`)
- JSONB sections are inherently forward-compatible — new fields are ignored by old code, missing fields get defaults
- Breaking changes (section restructuring) bump the major version and require a data migration
- Alembic handles DDL migrations; data migrations for JSONB content changes run as one-off scripts
- The personalization engine reads `profile_version` to apply the correct transformation rules

### Profile History

**Decision: Audit log, NOT full versioned snapshots.**

Full snapshot versioning (storing complete profile on every change) is expensive and unnecessary. The audit log tracks:
- What changed (sections, previous values)
- When and who changed it
- Source of change (API, onboarding, PHM sync)

This is sufficient for debugging and compliance. If we later need full point-in-time reconstruction, the audit log supports it.

---

## 4. API Endpoints

All endpoints prefixed with `/api/v1/profiles`.

| Method | Path | Purpose | Auth | Request Body | Response |
|--------|------|---------|------|-------------|----------|
| `POST` | `/` | Create profile | Required | `ProfileCreate` | `ProfileResponse` (201) |
| `GET` | `/me` | Get current user's profile | Required | — | `ProfileResponse` (200) |
| `GET` | `/{learner_id}` | Get profile by ID | Required (admin or self) | — | `ProfileResponse` (200) |
| `PATCH` | `/me` | Update current user's profile | Required | `ProfileUpdate` | `ProfileResponse` (200) |
| `PATCH` | `/me/sections/{section}` | Update single section | Required | Section JSON | `ProfileResponse` (200) |
| `DELETE` | `/me` | Soft-delete profile | Required | — | 204 |
| `GET` | `/me/onboarding-status` | Get onboarding completion state | Required | — | `OnboardingStatus` (200) |
| `PATCH` | `/me/onboarding/{section}` | Mark onboarding section complete | Required | Section data | `OnboardingStatus` (200) |
| `POST` | `/me/personalize` | Personalize lesson for this user | Required | `PersonalizeRequest` | `PersonalizedContent` (200) |
| `GET` | `/me/personalized/{lesson_id}` | Get cached personalized output | Required | — | `PersonalizedContent` (200) or 404 |
| `DELETE` | `/me/personalized-cache` | Invalidate all cached personalization | Required | — | 204 |
| `POST` | `/me/sync-from-phm` | Pull PHM data into profile | Required | — | `ProfileResponse` (200) |

### Schema Shapes

```python
# Request: Create
class ProfileCreate(BaseModel):
    name: str | None = None
    expertise: dict[str, Any] = {}
    professional_context: dict[str, Any] = {}
    goals: dict[str, Any] = {}
    communication: dict[str, Any] = {}
    delivery: dict[str, Any] = {}

# Request: Update (all optional)
class ProfileUpdate(BaseModel):
    name: str | None = None
    expertise: dict[str, Any] | None = None
    professional_context: dict[str, Any] | None = None
    goals: dict[str, Any] | None = None
    communication: dict[str, Any] | None = None
    delivery: dict[str, Any] | None = None

# Request: Personalize
class PersonalizeRequest(BaseModel):
    lesson_path: str          # e.g. "01-Foundations/02-chapter/03-lesson"
    lesson_content: str       # Raw lesson markdown (from content-api)
    lesson_frontmatter: dict[str, Any] = {}  # Frontmatter metadata

# Response: Profile
class ProfileResponse(BaseModel):
    learner_id: str
    name: str | None
    profile_version: str
    expertise: dict[str, Any]
    professional_context: dict[str, Any]
    goals: dict[str, Any]
    communication: dict[str, Any]
    delivery: dict[str, Any]
    onboarding_completed: bool
    created_at: datetime
    updated_at: datetime

# Response: Onboarding status
class OnboardingStatus(BaseModel):
    learner_id: str
    sections_completed: dict[str, bool]
    overall_completed: bool
    next_section: str | None     # Which section to fill next

# Response: Personalized content
class PersonalizedContent(BaseModel):
    learner_id: str
    lesson_path: str
    content: str                 # Personalized markdown
    profile_version: str         # Which profile version was used
    personalization_dimensions: dict[str, str]  # What was customized and how
    cached: bool = False
    generated_at: datetime
```

### Design Decisions

1. **`/me` pattern over `/{learner_id}`** — Users access their own profile via `/me` (learner_id extracted from JWT `sub`). The `/{learner_id}` variant exists for admin/service-to-service access.

2. **Section-level updates** — `PATCH /me/sections/{section}` allows updating a single JSONB section without sending the entire profile. This is critical for onboarding flows where users fill one section at a time.

3. **Personalization is a POST, not GET** — It accepts lesson content as input (potentially large) and may trigger LLM processing. The response is cached for subsequent GETs.

4. **Onboarding is separate from profile CRUD** — Onboarding state tracks which sections the user has completed in the onboarding flow. A profile can be partially filled and still be "usable" (with defaults for missing fields).

---

## 5. TDD Test Plan

### Priority 1: Core Differentiation Test (THE test that proves the system works)

| Test | What It Verifies | Priority |
|------|-------------------|----------|
| `test_fatima_vs_raj_same_lesson_different_output` | Same lesson content through Fatima's profile (non-technical, examples-first, logistics analogies, no code) vs Raj's profile (technical, problem-first, concise, code samples) produces meaningfully different personalized content | P0 |
| `test_fatima_output_has_no_code_samples` | Fatima's `include_code_samples: false` → output contains zero code blocks | P0 |
| `test_raj_output_has_code_samples` | Raj's `include_code_samples: true, code_verbosity: minimal` → output contains code but not over-explained | P0 |
| `test_fatima_output_uses_logistics_analogies` | Fatima's `analogy_domain: "logistics and contract management"` → analogies drawn from her domain | P0 |
| `test_profile_defaults_applied_for_missing_fields` | Profile with only `learner_id` + `name` → defaults from Appendix B applied (intermediate level, professional tone, examples-first, etc.) | P0 |

### Priority 2: Profile CRUD

| Test | What It Verifies | Priority |
|------|-------------------|----------|
| `test_create_profile_returns_201` | POST / with valid data → 201 with full ProfileResponse | P1 |
| `test_create_profile_duplicate_learner_id_returns_409` | Second POST for same learner_id → 409 Conflict | P1 |
| `test_get_profile_returns_own_profile` | GET /me returns profile matching JWT sub | P1 |
| `test_get_profile_404_when_none_exists` | GET /me before profile creation → 404 | P1 |
| `test_patch_profile_updates_only_provided_fields` | PATCH /me with only `goals` → only goals updated, everything else unchanged | P1 |
| `test_patch_section_updates_single_section` | PATCH /me/sections/expertise → only expertise updated | P1 |
| `test_delete_profile_soft_deletes` | DELETE /me → `deleted_at` set, profile no longer returned by GET | P1 |
| `test_create_profile_after_soft_delete` | Can create new profile after soft-deleting old one | P1 |

### Priority 3: Schema Validation

| Test | What It Verifies | Priority |
|------|-------------------|----------|
| `test_invalid_expertise_level_rejected` | `expertise.domain.level: "superexpert"` → 422 with clear error | P2 |
| `test_invalid_communication_preference_rejected` | `communication.preferred_structure: "random"` → 422 | P2 |
| `test_partial_profile_accepted` | Profile with only `expertise` section → accepted, other sections default to `{}` | P2 |
| `test_extra_fields_in_jsonb_preserved` | Unknown fields in JSONB sections are preserved (forward-compatibility) | P2 |
| `test_profile_version_is_set_automatically` | Created profile gets `profile_version: "1.0"` without client specifying it | P2 |

### Priority 4: Onboarding State

| Test | What It Verifies | Priority |
|------|-------------------|----------|
| `test_onboarding_status_initially_all_incomplete` | New profile → all sections marked incomplete | P2 |
| `test_completing_section_updates_onboarding` | PATCH /me/onboarding/expertise → expertise marked complete | P2 |
| `test_all_sections_complete_marks_onboarding_done` | After completing all sections → `onboarding_completed: true` | P2 |
| `test_onboarding_next_section_suggests_first_incomplete` | `next_section` returns the first uncompleted section | P2 |

### Priority 5: Cache & Invalidation

| Test | What It Verifies | Priority |
|------|-------------------|----------|
| `test_profile_update_invalidates_personalization_cache` | PATCH /me → all cached personalized content for this user is invalidated | P2 |
| `test_cached_personalization_served_on_second_request` | GET /me/personalized/{lesson} after POST /me/personalize → returns cached content | P2 |
| `test_cache_miss_returns_404` | GET /me/personalized/{lesson} with no cached content → 404 | P2 |

### Priority 6: Auth & Isolation

| Test | What It Verifies | Priority |
|------|-------------------|----------|
| `test_no_token_returns_401` | All endpoints → 401 without JWT | P1 |
| `test_user_cannot_access_other_users_profile` | GET /profiles/{other_id} → 403 for non-admin | P1 |
| `test_dev_mode_bypasses_auth` | With `DEV_MODE=true` → requests succeed without token | P1 |

---

## 6. Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (learn-app)                     │
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────────┐   │
│  │ Onboarding   │  │ Personalized    │  │ TutorClaw /       │   │
│  │ Wizard       │  │ Content Tab     │  │ Teach Me Mode     │   │
│  └──────┬───────┘  └───────┬─────────┘  └──────┬────────────┘   │
└─────────┼──────────────────┼───────────────────┼────────────────┘
          │                  │                   │
          │ JWT Bearer       │ JWT Bearer        │ JWT Bearer
          ▼                  ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LEARNER PROFILE API                            │
│                    (this service — port 8004)                     │
│                                                                   │
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────────┐   │
│  │ Profile CRUD │  │ Personalization  │  │ PHM Sync          │   │
│  │ /api/v1/     │  │ /me/personalize  │  │ /me/sync-from-phm │   │
│  │ profiles/    │  │                  │  │                    │   │
│  └──────┬───────┘  └───────┬─────────┘  └──────┬────────────┘   │
│         │                  │                    │                 │
│         ▼                  ▼                    ▼                 │
│  ┌──────────────┐  ┌─────────────────┐  ┌───────────────────┐   │
│  │ PostgreSQL   │  │ Redis Cache     │  │ httpx Client      │   │
│  │ (profiles)   │  │ (personalized)  │  │ (PHM API)         │   │
│  └──────────────┘  └─────────────────┘  └───────────────────┘   │
│                           │                                       │
│                           ▼                                       │
│                    ┌─────────────────┐                            │
│                    │ LLM API (Claude)│                            │
│                    │ for content     │                            │
│                    │ personalization │                            │
│                    └─────────────────┘                            │
└──────────────────────────────────────────────────────────────────┘

EXTERNAL DEPENDENCIES:
┌──────────────┐    ┌────────────────┐    ┌────────────────┐
│ SSO          │    │ Content API    │    │ Study Mode API │
│ (JWKS auth)  │    │ (lesson source)│    │ (PHM sessions) │
│ port 3001    │    │ port 8003      │    │ port 8000      │
└──────────────┘    └────────────────┘    └────────────────┘
```

### Integration Point Details

**1. TutorClaw / Teach Me Mode reads the profile:**
- **Method**: HTTP API call from study-mode-api to learner-profile-api
- **Pattern**: `GET /api/v1/profiles/{learner_id}` with service-to-service auth token
- **Why not shared DB**: Services should own their data. Shared DB creates coupling, makes independent deployment impossible, and violates the microservice boundary.
- **Why not events**: Profile data is read synchronously at the start of a tutoring session. An event-driven approach adds complexity without benefit here.
- **Latency concern**: Profile reads are cached in Redis (30-min TTL). First read ~5ms (DB), subsequent reads ~1ms (cache).

**2. Personalized Content Tab triggers batch generation:**
- **Method**: Frontend calls `POST /api/v1/profiles/me/personalize` with lesson content
- **Flow**: Frontend gets lesson from content-api, then sends `{lesson_content, lesson_path}` to profile-api for personalization
- **Why frontend orchestrates**: Content-api doesn't know about profiles. Profile-api doesn't know about content storage. Frontend is the natural orchestrator.
- **Alternative considered**: Profile-api calls content-api directly → creates circular dependency risk and tight coupling between services.

**3. SSO user_id mapping:**
- **`learner_id` = `user.sub` from JWT** (the SSO user ID)
- The `CurrentUser.id` from `api_infra/auth.py` is the same `sub` claim
- No separate mapping table needed — it's a 1:1 identity mapping
- On first access (profile not found), the frontend redirects to the onboarding flow

**4. PHM Sync:**
- **Method**: `POST /api/v1/profiles/me/sync-from-phm`
- **Pattern**: Follows the same `httpx.AsyncClient` + double-checked locking pattern as `ProgressClient` / `MeteringClient`
- Reads PHM session data from study-mode-api, maps fields per Appendix A of the schema, and updates the profile

---

## 7. Cache Strategy

### What Gets Cached

| Data | Cache Key Pattern | TTL | Storage | Invalidation |
|------|------------------|-----|---------|-------------|
| **Learner profile** | `profile:{learner_id}` | 30 min | Redis | On any profile update (PATCH, section update, PHM sync) |
| **Personalized lesson output** | `personalized:{learner_id}:{lesson_path}:{profile_version}` | 24 hours | Redis | On profile update, on lesson content change, on explicit cache clear |
| **Onboarding status** | `onboarding:{learner_id}` | 10 min | Redis | On onboarding section completion |

### Invalidation Triggers

| Event | What Gets Invalidated |
|-------|----------------------|
| Profile updated (any field) | `profile:{learner_id}` + ALL `personalized:{learner_id}:*` keys |
| Lesson content updated (via content-api webhook) | All `personalized:*:{lesson_path}:*` keys |
| Explicit cache clear (`DELETE /me/personalized-cache`) | All `personalized:{learner_id}:*` keys |
| Profile deleted | All keys for that learner_id |

### Why `profile_version` in cache key

The personalization cache key includes `profile_version` so that if the profile schema changes and the user's profile is migrated, old cached personalization (generated with the old schema) is automatically invalidated.

### Cache Warming

**Not implemented in v1.** Personalization happens on-demand. Cache warming (pre-generating personalized content for all lessons) can be added later as a background job if latency becomes an issue.

### Redis Key Namespace

All keys prefixed with `lp:` (learner-profile) to avoid collisions with content-api's Redis keys:
- `lp:profile:{learner_id}`
- `lp:personalized:{learner_id}:{lesson_path}:{profile_version}`
- `lp:onboarding:{learner_id}`

---

## 8. Cold-Start UX Behavior

### What the learner sees before profile is complete

**Decision: Serve unpersonalized source content with a gentle nudge to complete their profile.**

| Profile State | User Experience |
|---------------|-----------------|
| **No profile exists** | Content-api serves raw source content. UI shows banner: "Complete your learner profile to get personalized content." Link to onboarding wizard. |
| **Profile exists, onboarding incomplete** | Same as above, but the banner shows progress: "Profile 60% complete — finish to unlock personalization." |
| **Profile exists, onboarding complete** | Personalized content served. If personalization fails (LLM down), fall back to source content with notice: "Showing standard content. Personalized version temporarily unavailable." |
| **Profile exists, personalization cached** | Cached personalized content served immediately. |

### Why NOT generic defaults

Using "generic defaults" to produce a "lightly personalized" output for incomplete profiles is tempting but dangerous:
1. A profile with all defaults produces content that looks personalized but isn't — it's just the "intermediate professional" version for everyone
2. Users may not realize they need to complete their profile because "it already looks customized"
3. Better to clearly distinguish "source content" from "personalized content" so the value proposition is obvious

### API Behavior

The `POST /me/personalize` endpoint returns a clear `requires_profile: true` error (HTTP 428 Precondition Required) if no profile exists. The frontend handles this by redirecting to onboarding.

If a profile exists but is incomplete, personalization proceeds using Appendix B defaults for missing fields. The response includes a `profile_completeness: 0.6` field so the frontend can show the "complete your profile for better personalization" prompt.

---

## 9. Pushback on Engine Specifier

Based on the schema analysis, I want to flag potential computational concerns for the personalization engine specification:

### Concern 1: Per-Misconception Insertions Are Expensive

The schema supports `known_misconceptions[]` which the engine is supposed to insert as "pre-emptive corrections at the right point in the lesson." This requires the engine to:
1. Parse the lesson structure
2. For each misconception, determine WHERE in the lesson it's relevant
3. Insert a correction at that precise point

This is an **N x M problem** (N misconceptions x M lesson sections) that requires deep semantic understanding. For v1, I recommend:
- **Cap at 5 misconceptions per profile** (hard limit in schema validation)
- **Misconception corrections as a post-processing step**, not inline insertion

### Concern 2: `topics_to_skip` Compression Is Non-Trivial

"Topics that should be condensed to a single reference sentence because learner already knows them" requires the engine to identify which lesson paragraphs cover those topics, then compress them. This is essentially **summarization conditioned on topic detection**.

Recommendation: In v1, handle this as a prompt instruction to the LLM rather than a programmatic transformation.

### Concern 3: Real-Time Personalization Latency Budget

An LLM call to personalize a full lesson (2000-5000 words) will take 10-30 seconds. This is acceptable for the "Personalized Content Tab" (async/batch) but NOT for TutorClaw (real-time).

**Recommendation**: The personalization engine should have two modes:
- **Batch mode** (for content tab): Full lesson personalization, cached after generation
- **Snippet mode** (for TutorClaw): Only personalize vocabulary/tone/examples on small chunks, not full lessons

---

## 10. Recommended Stack Summary

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Framework** | FastAPI 0.115+ | Matches content-api; async-native; Pydantic integration |
| **ORM** | SQLModel 0.0.22+ + SQLAlchemy 2.0 async | Type-safe models, Pydantic integration, async support |
| **Database** | PostgreSQL 16+ | JSONB support, GIN indexes, reliable, team knows it |
| **Async Driver** | asyncpg | Fastest Python PostgreSQL async driver |
| **Migrations** | Alembic 1.14+ | Standard, supports async, auto-generation from SQLModel |
| **Cache** | Redis (shared instance with content-api) | Already deployed, proven patterns in api_infra |
| **HTTP Client** | httpx (async) | Already used in content-api; connection pooling |
| **Auth** | api_infra/auth.py (shared) | JWT/JWKS, dev_mode bypass, CurrentUser dependency |
| **Testing** | pytest + pytest-asyncio + fakeredis + respx | Matches content-api test infrastructure exactly |
| **Containerization** | Docker (multi-stage, uv, non-root) | Replicate content-api Dockerfile pattern |
| **Port** | 8004 | Next available after content-api (8003) |

### Dependencies (pyproject.toml additions beyond content-api)

```toml
dependencies = [
    # From content-api (shared baseline)
    "fastapi>=0.115.0",
    "pydantic>=2.10.0",
    "pydantic-settings>=2.6.0",
    "httpx>=0.28.0",
    "uvicorn[standard]>=0.32.0",
    "python-dotenv>=1.0.0",
    "python-jose[cryptography]>=3.3.0",
    "redis>=5.0.0",
    # New for learner-profile-api
    "sqlmodel>=0.0.22",
    "sqlalchemy[asyncio]>=2.0.36",
    "asyncpg>=0.30.0",
    "alembic>=1.14.0",
]

[dependency-groups]
dev = [
    "pytest>=8.3.0",
    "pytest-asyncio>=0.24.0",
    "pytest-mock>=3.14.0",
    "fakeredis>=2.26.0",
    "respx>=0.22.0",
    "cryptography>=44.0.0",
    "ruff>=0.8.0",
    "mypy>=1.13.0",
    # New for learner-profile-api
    "psycopg2-binary>=2.9.10",   # For Alembic sync migrations
    "aiosqlite>=0.20.0",          # SQLite async for test DB
]
```

---

## 11. Open Questions for Team

1. **Shared api_infra**: Should we extract `api_infra/` into a shared Nx library, or continue copying it per service? Copying creates drift; sharing creates coupling. My recommendation: **extract to shared Nx lib** in a follow-up task.

2. **LLM for personalization**: Which model/provider? Claude API directly? OpenAI? This affects the `PersonalizationService` implementation significantly. My recommendation: **Abstract behind an interface** and start with Claude API.

3. **Database hosting**: Neon (serverless) vs self-hosted PostgreSQL? Neon has cold-start latency but zero ops. My recommendation: **Neon for v1** (we already use managed services), with `pool_pre_ping=True` and `pool_recycle=300` to handle connection drops.

4. **Rate limits for personalization**: LLM calls are expensive. Should we limit personalization requests per user per day? My recommendation: **Yes, 50 personalizations/day in v1** to prevent abuse while being generous enough for normal use.
