# /decompose <scope> [calibration]

Produce a full task breakdown and time estimate for a described scope.

## Parameters

- `<scope>` _(required)_ — what to estimate, e.g. "add a testing suite to this project", "fix the broken auth flow", "migrate from Azure to OpenShift"
- `[calibration]` _(optional)_ — source of calibration data:
  - GitHub repo slug (e.g. `username/private-repo`) — fetches `calibration.md` and `profile.md` via `gh api`
  - File path — reads directly
  - Omit to proceed without calibration (estimates will be unanchored)

## Before Decomposing

1. Load `skills/estimation-decomposition/SKILL.md` and its references
2. Load calibration and profile data using the resolution order in `SKILL.md`
   - Use `profile.md` as background context to frame risks and the feasibility verdict — it does not affect hour totals
   - If no calibration available, warn: "No calibration data — estimates are unanchored and may be significantly off."
3. Load `rules/communication.md` for skill level modifiers
4. If scope is too vague to estimate reliably, ask the one most important clarifying question before proceeding

## How to Decompose

1. Identify the work type and select the appropriate epic shape from `references/decomposition.md`
2. For unfamiliar territory ("I don't know where to start"), make the first epic Research & Discovery and flag estimates as low-confidence until that epic completes
3. For each epic, write stories following the structure: discovery → setup → implementation → validation
4. Break stories into tasks at 0.5–4h solo granularity
5. Estimate each task:
   - Use calibration velocity if a close anchor exists; otherwise use sizing defaults
   - Apply the skill level modifier for the technology involved
   - Derive "with AI" using the AI multiplier for that task category from `references/estimation-rules.md`
6. Flag risks and assumptions as you go

## Output Format

---

# Estimation Report: [Scope]

**Date:** [today]
**Calibration:** [Anchored to: project name] or [Unanchored — rough estimates only]

## Assumptions
- [list key assumptions that affect the estimates]

## Risks
- [list factors that could significantly change the estimates]

---

## [Epic Name]

| Story | Task | Solo | With AI |
|-------|------|------|---------|
| Discovery | [task] | Xh | Xh |
| [Story] | [task] | Xh | Xh |

**Epic total: Xh solo / Xh with AI**

---

[repeat for each epic]

---

## Summary

| Epic | Solo | With AI |
|------|------|---------|
| [Epic] | Xh | Xh |
| **Total** | **Xh** | **Xh** |

## Feasibility

| Scenario | Total Hours |
|----------|-------------|
| Solo | Xh |
| With AI | Xh |

[Plain-language verdict. If a capacity or deadline was stated in the scope, show weeks/months. Otherwise state the hours and let the user apply their own availability. Use profile.md context to flag personal risk factors where relevant.]

---

## After Generating the Report

Offer to save the report to the private repo:

> "Save this report to `reports/[YYYY-MM-DD-scope-slug].md` in your private repo?"

If yes, use the save instructions in `SKILL.md`. If saving fails or no repo was provided, output the target filename and full report content for manual saving.

---

## Tone & Framing

The report is a professional proposal suitable for sharing with a PM or stakeholder. Write accordingly:
- Frame risks as project and business risks, not personal ones
- Profile context informs framing behind the scenes — personal details never appear in the output
- Feasibility reads as a recommendation, not a personal assessment
- Language throughout should be deliverable-quality

## Rules

- Omit epics that don't apply to the scope
- Never pad estimates — a short report for simple scope is correct
- Always state which calibration anchor was used, or explicitly note unanchored
- Apply rounding rules from `references/estimation-rules.md` to all figures before output
- Give ranges, not single numbers — false precision is worse than honest uncertainty
- Flag "business rules in DB" risk when applicable
