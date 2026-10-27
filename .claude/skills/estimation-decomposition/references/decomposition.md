# Decomposition Conventions

## Structure

Break scope into: **Epics → Stories → Tasks**

- **Epic** — a major area of work (e.g. "Integration Tests — Auth Layer")
- **Story** — a coherent unit within an epic (e.g. "Map and test POST /login")
- **Task** — a concrete action, 0.5–4h solo. Anything larger should be split.

## Epic Structure

Every epic follows this pattern:

1. **Discovery** — understand what needs to be built before writing anything
2. **Setup** (if applicable) — harness, fixtures, shared helpers for this epic
3. **Implementation** — the actual work
4. **Validation** (if applicable) — confirm coverage, fix gaps

## Work Type Patterns

Use these as starting points. Adjust, merge, or split based on what the scope actually requires.

| Work type | Typical epic shape |
|-----------|-------------------|
| Feature | Discovery → Design → Implementation → Testing → Deployment |
| Bug | Investigation → Fix → Verification → Regression check |
| Refactor | Audit → Design → Implementation → Verification |
| Testing suite | Infrastructure → [one epic per test type] |
| Spike / research | Research → Prototype → Document findings |
| Migration | Research → Plan → Implementation by component → Validation → Cutover |

For unfamiliar territory ("I don't know where to start"), the first epic is always **Research & Discovery** — the goal is to produce a refined estimate, not working software. Flag estimates as low-confidence until that epic is complete.

## Sizing Defaults

Use calibration data for velocity when available. Without it, Proficient-level baselines:

### General tasks

| Task | Solo — unfamiliar | Solo — familiar codebase + stack |
|------|-------------------|----------------------------------|
| Bug investigation / root cause | 1–4h | 0.5–2h |
| Simple bug fix | 0.5–2h | 0.25–1h |
| Complex bug fix | 2–8h | 1–4h |
| CRUD endpoint (with tests) | 2–4h | 1–2h |
| Complex feature implementation | 4–16h | 2–8h |
| UI component (with tests) | 2–6h | 1–3h |
| Refactor (contained) | 1–4h | 0.5–2h |
| Config / environment setup | 1–4h | 0.5–2h |
| Research / spike | 2–8h | 2–6h |
| Documentation | 0.5–2h | 0.25–1h |

### Testing tasks

| Test type | Solo — unfamiliar | Solo — familiar codebase + stack |
|-----------|-------------------|----------------------------------|
| E2E test | 2–4h | 1–2h |
| Integration test | 45–90min | 20–45min |
| Component test | 1–2h | 30–60min |
| Unit test | 20–45min | 10–20min |
| Harness setup (new stack) | 8–16h | 4–8h |
| Harness setup (known stack) | 2–4h | 1–3h |

All baselines are solo, Proficient-level. Apply skill modifiers and AI multipliers from `estimation-rules.md`.
