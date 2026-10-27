# Estimation Rules

## Skill Level Multipliers

Applied per-task based on the technology involved. Proficient is the baseline (1.0x).

| Skill Level | Multiplier |
|-------------|------------|
| Beginner | 2.5x |
| Novice | 1.75x |
| Intermediate | 1.25x |
| Proficient | 1.0x |
| Expert | 0.8x |

When calibration data is available for a technology, use derived per-task velocity instead of these multipliers — calibration always wins.

## AI Multipliers

Applied per task category when AI is available.

### Implementation

| Task Category | AI Multiplier |
|---------------|---------------|
| Boilerplate / scaffolding | 0.25x |
| Config / environment setup | 0.30x |
| Harness / infrastructure setup | 0.35x |
| Repetitive / patterned code | 0.35x |
| CRUD implementation | 0.40x |
| Writing tests (unit / component) | 0.45x |
| Writing tests (integration) | 0.40x |
| Writing tests (e2e) | 0.50x |
| UI component implementation | 0.45x |
| Complex feature implementation | 0.55x |
| Refactoring | 0.50x |
| Documentation | 0.40x |

### Investigation & Design

| Task Category | AI Multiplier |
|---------------|---------------|
| Test / feature planning | 0.55x |
| Architecture / design decisions | 0.60x |
| Debugging / root cause analysis | 0.60x |
| Debugging flaky tests | 0.65x |
| Codebase / endpoint discovery | 0.70x |
| Research (known domain) | 0.50x |
| Research (unknown domain) | 0.65x |
| DB schema / business rule discovery | 0.85x |

## Anchoring to Calibration Data

When calibration data is present:
1. Identify the closest matching past project (stack, familiarity level, work type)
2. Derive a per-unit velocity from the anchor (e.g. integration tests per hour, endpoints per day)
3. Adjust for differences in current skill level vs. skill level at time of anchor
4. Apply AI multipliers on top of the adjusted velocity
5. Note which anchor was used in the report assumptions

If the current scope has no close calibration match, fall back to multipliers and flag it as unanchored.

## Rounding Rules

Apply after all calculations. Round to the nearest sensible increment — false precision undermines confidence.

| Scope | Round to |
|-------|----------|
| Individual tasks | Nearest whole hour |
| Epic totals | Nearest 5h |
| Summary totals under 100h | Nearest 5h |
| Summary totals over 100h | Nearest 25h |

Always express as a range, not a single number.

## Discovery Tasks

Every epic includes a discovery story before any implementation. Discovery cost varies by:

- **Codebase familiarity**: Well-known = 0.3x, Partial = 0.6x, Unknown = 1.0x
- **Business rules in DB**: Apply 1.5x to discovery tasks in that epic
- **Documentation quality**: Well-documented = faster; undocumented = slower

Always estimate discovery separately — do not fold it into implementation time.
