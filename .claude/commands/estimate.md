# /estimate <task> [context]

Estimate a single task. Faster than `/decompose` — no full breakdown, just a time range.

## Parameters

- `<task>` _(required)_ — what to estimate, e.g. "set up WebApplicationFactory for integration tests"
- `[context]` _(optional)_ — relevant context: tech stack, codebase familiarity, constraints

## Steps

1. Load `skills/estimation-decomposition/SKILL.md`
2. Load `rules/communication.md` for skill level modifiers
3. Identify the technology involved and the task category
4. Estimate solo time using sizing defaults from `references/decomposition.md`
5. Apply skill level modifier for the technology
6. Apply AI multiplier for the task category

## Output Format

**Task:** [task name]
**Technology:** [tech involved] — [skill level]

| Scenario | Estimate | Confidence |
|----------|----------|------------|
| Solo | X–Yh | High / Medium / Low |
| With AI | X–Yh | High / Medium / Low |

**Assumptions:** [one line]
**Risks:** [one line, or omit if none]

Confidence is Low if no calibration data exists for this type of work.

## Rules

- Give a range, not a single number
- Keep output tight — this is a quick estimate, not a full report
