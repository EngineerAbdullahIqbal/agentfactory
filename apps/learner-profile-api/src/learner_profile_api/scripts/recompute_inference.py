"""Recompute inferred communication/delivery fields using the v1.2 two-axis model.

Connects to the database, finds all profiles with inferred field_sources,
re-runs inference, and updates communication, delivery, and field_sources.

Idempotent — safe to re-run.

Usage:
    python -m learner_profile_api.scripts.recompute_inference
    python -m learner_profile_api.scripts.recompute_inference --dry-run
"""

import argparse
import asyncio
import logging
import sys

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from ..core.database import async_session, engine
from ..models.profile import LearnerProfile
from ..schemas.profile import ExpertiseSection
from ..services.inference import run_inference

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


async def recompute_all(dry_run: bool = False) -> int:
    """Recompute inference for all profiles with inferred field_sources.

    Returns the number of profiles updated.
    """
    updated_count = 0

    async with async_session() as session:
        stmt = select(LearnerProfile).where(LearnerProfile.deleted_at.is_(None))
        result = await session.execute(stmt)
        profiles = result.scalars().all()

        for profile in profiles:
            field_sources = dict(profile.field_sources) if profile.field_sources else {}

            # Only process profiles that have any inferred values
            has_inferred = any(v == "inferred" for v in field_sources.values())
            if not has_inferred:
                continue

            expertise_data = profile.expertise or {}
            expertise = ExpertiseSection.model_validate(expertise_data)

            inferred_values, inferred_sources = run_inference(expertise, field_sources)

            if not inferred_values:
                continue

            # Apply inferred values
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

            if dry_run:
                logger.info(
                    "[DRY RUN] Would update learner=%s: %d fields",
                    profile.learner_id,
                    len(inferred_values),
                )
            else:
                profile.communication = comm
                profile.delivery = delivery

                # Update field sources
                fs = dict(profile.field_sources) if profile.field_sources else {}
                fs.update(inferred_sources)
                profile.field_sources = fs

                session.add(profile)
                logger.info(
                    "Updated learner=%s: %d fields",
                    profile.learner_id,
                    len(inferred_values),
                )

            updated_count += 1

        if not dry_run:
            await session.commit()

    return updated_count


async def main() -> None:
    parser = argparse.ArgumentParser(
        description="Recompute inferred fields using v1.2 two-axis model"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be updated without making changes",
    )
    args = parser.parse_args()

    try:
        count = await recompute_all(dry_run=args.dry_run)
        prefix = "[DRY RUN] Would update" if args.dry_run else "Updated"
        logger.info("%s %d profiles", prefix, count)
    finally:
        await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
