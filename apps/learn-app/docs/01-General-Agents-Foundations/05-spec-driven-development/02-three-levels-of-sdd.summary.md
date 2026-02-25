### Core Concept

SDD operates at three maturity levels—Spec-First, Spec-Anchored, and Spec-as-Source—forming a spectrum you choose per-project based on team size, maintenance horizon, and compliance needs.

### Key Mental Models

- **Maturity Spectrum**: Spec-First (write once, discard) → Spec-Anchored (living documentation maintained alongside code) → Spec-as-Source (code regenerated from specs, experimental)
- **Maintenance vs Value Trade-off**: Higher levels provide more value but demand more discipline—Spec-Anchored without enforcement produces the worst outcome: outdated specs that actively mislead
- **Determinism Problem**: Identical specs don't produce identical code, which breaks git diffs, debugging, and performance predictability—the same challenge that killed Model-Driven Development in the 2000s

### Critical Patterns

- Default to Spec-First for 80% of tasks—upgrade to Spec-Anchored when team size > 1, maintenance horizon > 6 months, or compliance documentation required
- Spec-Anchored requires enforced discipline: spec changes before code changes, always
- Spec-as-Source works only for highly repetitive code (CRUD, API clients) with strong test coverage

### Common Mistakes

- Assuming higher levels are always better—Spec-First is the right choice for most tasks
- Confusing Spec-Anchored with "writing documentation after coding"—the spec must change BEFORE the code
- Treating Spec-as-Source as the future goal—it's experimental with unsolved determinism problems

### Connections

- **Builds on**: Why specs beat vibe coding (Lesson 1)
- **Leads to**: Project constitutions (Lesson 3) and the four-phase workflow (Lesson 4)
