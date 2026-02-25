### Core Concept

SDD is a power tool, not a universal solution—the decision heuristic (files_affected > 5, requirements_unclear, or learning_new_tech → use SDD; single_file bug fix → skip; everything else → lightweight spec) builds the judgment to match methodology to task complexity.

### Key Mental Models

- **Overhead Must Earn Its Keep**: SDD's ceremony pays dividends when complexity exceeds working memory (15+ file refactors, unclear requirements, new libraries) but wastes time when the solution is obvious or unknowable (bug fixes, exploratory prototyping)
- **Lightweight Spec as Probe**: Constraints + success criteria only—provides 80% of specification value with 20% of overhead. If writing reveals hidden complexity, upgrade to full SDD; if sufficient, proceed directly
- **Judgment Through Feedback Loops**: Track when specs helped vs when they were overhead—pattern recognition from these outcomes builds the intuition for instant classification

### Critical Patterns

- Decision heuristic: files > 5 OR unclear requirements OR new tech → SDD; single-file bug fix → skip; else → lightweight spec first
- Lightweight spec template: one-line description + constraints (what NOT to do) + success criteria (measurable outcomes)
- Exploration is a phase, not an end state—vibe code to discover requirements, then SDD to implement reliably

### Common Mistakes

- Using full SDD for everything after learning it—this lesson explicitly teaches when to skip the ceremony
- Confusing exploratory prototyping with production development—exploration discovers requirements, SDD turns them into reliable implementation
- Accepting the "just waterfall" critique uncritically—SDD tasks are atomic and reversible (git revert), unlike months-long waterfall commitments

### Connections

- **Builds on**: Complete SDD workflow (Lessons 1-8)
- **Leads to**: Hands-on exercises applying SDD judgment to real scenarios (Lesson 10)
