"""Content API routes: tree, lesson, complete."""

import logging
import uuid

from api_infra.auth import CurrentUser, get_current_user
from api_infra.core.rate_limit import rate_limit
from api_infra.core.redis_cache import get_redis
from fastapi import APIRouter, Depends, HTTPException, Request, Response

from ..metering.client import get_metering_client
from ..schemas.content import (
    BookTreeResponse,
    CompleteRequest,
    CompleteResponse,
    LessonContentResponse,
    LessonFrontmatter,
    ProgressResponse,
)
from ..services.book_tree import build_book_tree
from ..services.content_loader import load_lesson_content
from ..services.progress_client import get_progress_client

logger = logging.getLogger(__name__)

content_router = APIRouter(prefix="/api/v1/content", tags=["content"])


async def _release_reservation(
    metering, reservation_id: str | None, user_id: str, request_id: str, request: Request
) -> None:
    """Release a metering reservation on failure. No-op if no reservation exists."""
    if not reservation_id or not metering:
        return
    try:
        auth_token = request.headers.get("Authorization")
        await metering.release(
            user_id=user_id,
            request_id=request_id,
            reservation_id=reservation_id,
            auth_token=auth_token,
        )
    except Exception as e:
        logger.error("[Lesson] Release failed: %s", e)


@content_router.get("/tree", response_model=BookTreeResponse)
@rate_limit("content_tree", max_requests=10, period_minutes=1)
async def get_tree(
    request: Request,
    response: Response,
    user: CurrentUser = Depends(get_current_user),
) -> BookTreeResponse:
    """Get the full book tree structure."""
    logger.info("[Tree] User %s requesting book tree", user.id)
    return await build_book_tree()


@content_router.get("/lesson", response_model=LessonContentResponse)
@rate_limit("content_lesson", max_requests=30, period_minutes=1)
async def get_lesson(
    request: Request,
    response: Response,
    part: str = "",
    chapter: str = "",
    lesson: str = "",
    path: str = "",
    user: CurrentUser = Depends(get_current_user),
) -> LessonContentResponse:
    """Get lesson content with frontmatter and optional metering.

    Accepts either:
      - path: Full path from tree (e.g., "01-Part/02-chapter/03-sub/04-lesson")
      - part + chapter + lesson: Individual slugs (flat chapters only)
    """
    # Resolve path: prefer explicit path, fall back to part/chapter/lesson
    if path:
        segments = path.strip("/").split("/")
        lesson_path = path.strip("/")
        # Extract chapter and lesson slugs for response/logging
        chapter = segments[-2] if len(segments) >= 2 else chapter
        lesson = segments[-1] if segments else lesson
    elif part and chapter and lesson:
        lesson_path = f"{part}/{chapter}/{lesson}"
    else:
        raise HTTPException(status_code=400, detail="Provide 'path' or 'part'+'chapter'+'lesson'")

    logger.info("[Lesson] User %s: %s", user.id, lesson_path)

    credit_charged = False
    reservation_id: str | None = None
    request_id = str(uuid.uuid4())

    # Idempotency check: content-access:{user_id}:{lesson_path} (1h TTL)
    redis = get_redis()
    idempotency_key = f"content-access:{user.id}:{lesson_path}"
    already_accessed = False

    if redis:
        try:
            existing = await redis.get(idempotency_key)
            if existing:
                already_accessed = True
                logger.info("[Lesson] Idempotent hit: %s", idempotency_key)
        except Exception as e:
            logger.warning("[Lesson] Redis idempotency check failed: %s", e)

    # Metering check (only if not already accessed and metering enabled)
    metering = get_metering_client()
    if metering and not already_accessed:
        try:
            auth_token = request.headers.get("Authorization")
            check_result = await metering.check(
                user_id=user.id,
                request_id=request_id,
                estimated_tokens=1,
                model="content-access",
                lesson_path=f"{chapter}/{lesson}",
                auth_token=auth_token,
            )

            if not check_result.get("allowed", False):
                error_code = check_result.get("error_code", "UNKNOWN")
                message = check_result.get("message", "Access denied")

                if error_code == "SERVICE_UNAVAILABLE":
                    raise HTTPException(
                        status_code=503,
                        detail="Credit verification service unavailable. Please try again later.",
                    )
                elif error_code == "INSUFFICIENT_BALANCE":
                    raise HTTPException(status_code=402, detail=message)
                elif error_code == "ACCOUNT_SUSPENDED":
                    raise HTTPException(status_code=403, detail=message)
                elif error_code == "REQUEST_ID_CONFLICT":
                    raise HTTPException(status_code=409, detail=message)
                else:
                    raise HTTPException(status_code=402, detail=message)

            reservation_id = check_result.get("reservation_id")
            credit_charged = True

        except HTTPException:
            raise
        except Exception as e:
            # Fail-closed: if metering is down, don't serve content
            logger.error("[Lesson] Metering check failed (fail-closed): %s", e)
            raise HTTPException(
                status_code=503,
                detail="Credit verification service unavailable. Please try again later.",
            )

    # Load content
    try:
        result = await load_lesson_content(lesson_path)
    except Exception as e:
        logger.error("[Lesson] Content load failed: %s", e)
        await _release_reservation(metering, reservation_id, user.id, request_id, request)
        raise HTTPException(status_code=500, detail="Failed to load content")

    if result is None:
        await _release_reservation(metering, reservation_id, user.id, request_id, request)
        raise HTTPException(status_code=404, detail=f"Lesson not found: {lesson_path}")

    # Finalize metering deduction
    if reservation_id and metering and credit_charged:
        try:
            auth_token = request.headers.get("Authorization")
            await metering.deduct(
                user_id=user.id,
                request_id=request_id,
                reservation_id=reservation_id,
                input_tokens=0,
                output_tokens=0,
                model="content-access",
                lesson_path=f"{chapter}/{lesson}",
                auth_token=auth_token,
            )
        except Exception as e:
            logger.error("[Lesson] Metering deduct failed for reservation=%s: %s", reservation_id, e)
            # Fail-closed: don't serve content if we can't confirm the charge
            raise HTTPException(
                status_code=503,
                detail="Credit deduction failed. Your reservation will be released automatically. Please try again.",
            )

    # Set idempotency key (1 hour TTL)
    if redis and not already_accessed:
        try:
            await redis.setex(idempotency_key, 3600, "1")
        except Exception as e:
            logger.warning("[Lesson] Redis idempotency set failed: %s", e)

    # Parse frontmatter (pass extra fields through via model_config)
    frontmatter_dict = result.get("frontmatter_dict", {})
    try:
        frontmatter = LessonFrontmatter(**frontmatter_dict)
    except Exception as e:
        fm_keys = list(frontmatter_dict.keys())
        logger.warning("[Lesson] Frontmatter parse failed: %s — keys: %s", e, fm_keys)
        frontmatter = LessonFrontmatter()

    return LessonContentResponse(
        chapter_slug=chapter,
        lesson_slug=lesson,
        content=result["content"],
        frontmatter=frontmatter,
        credit_charged=credit_charged,
    )


@content_router.post("/complete", response_model=CompleteResponse)
@rate_limit("content_complete", max_requests=30, period_minutes=1)
async def complete_lesson(
    request: Request,
    response: Response,
    body: CompleteRequest,
    user: CurrentUser = Depends(get_current_user),
) -> CompleteResponse:
    """Record lesson completion."""
    logger.info("[Complete] User %s: %s/%s", user.id, body.chapter_slug, body.lesson_slug)

    progress = get_progress_client()
    if not progress:
        raise HTTPException(
            status_code=503,
            detail="Progress tracking service not configured",
        )

    auth_token = request.headers.get("Authorization")
    result = await progress.complete_lesson(
        chapter_slug=body.chapter_slug,
        lesson_slug=body.lesson_slug,
        active_duration_secs=body.active_duration_secs,
        source=body.source,
        auth_token=auth_token,
    )

    return CompleteResponse(
        completed=result.get("completed", False),
        xp_earned=result.get("xp_earned", 0),
    )


@content_router.get("/progress", response_model=ProgressResponse)
@rate_limit("content_progress", max_requests=10, period_minutes=1)
async def get_progress(
    request: Request,
    response: Response,
    user: CurrentUser = Depends(get_current_user),
) -> ProgressResponse:
    """Get user's learning progress."""
    logger.info("[Progress] User %s requesting progress", user.id)

    progress = get_progress_client()
    if not progress:
        raise HTTPException(
            status_code=503,
            detail="Progress tracking service not configured",
        )

    auth_token = request.headers.get("Authorization")
    result = await progress.get_progress(auth_token=auth_token)

    # Enrich with total_lessons from book tree (Redis-cached)
    tree = await build_book_tree()

    return ProgressResponse(
        progress=result,
        total_lessons=tree.total_lessons,
    )
