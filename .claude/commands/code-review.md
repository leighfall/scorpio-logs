# /code-review <target>

Perform a code review using the checklist and severity labels in `skills/code-review-skill/review-checklist.md`.

## Parameters
- `<target>` _(required)_ — what to review:
  - `pr <platform> [number]` — review a PR using the platform-specific skill; omit number to use the current branch's open PR (e.g. `pr github`, `pr github 42`)
  - `last N` — review the last N commits (e.g. `last 2`)

If `<target>` is not provided, stop and tell the user: "Please specify a target — e.g. `/code-review pr github`, `/code-review pr github 42`, `/code-review pr azure`, or `/code-review last 2`"

## Before Reviewing
1. Load `skills/code-review-skill/review-checklist.md`
2. If target is `pr <platform> [number]`, load `skills/code-review-skill/pr-<platform>.md` for platform-specific instructions on fetching the PR diff. Pass the PR number to the platform skill if one was provided. If the file doesn't exist, tell the user: "No skill found for `<platform>` — available platforms: github"
3. Get the diff for the target (e.g. `git diff HEAD~N HEAD` for last N commits)
4. Read any linked issue or PR description if available

## How to Review

**Decide the verdict first.** Read the diff and form a judgment — approve, comment, or request changes — before cataloguing issues. Then list only the findings that drove that judgment plus any genuine improvements worth the author's time. Do not work backwards from a list of findings to a verdict.

**Do not fill sections to appear thorough.** The number of suggestions should reflect the actual state of the code, not the size of the diff. A large PR with clean code should produce a short review.

## Review Output Format

Structure the review as follows:

---

### Summary
Brief overview of what was reviewed — 1–2 sentences.

### Strengths
- What was done well
- Good patterns or approaches
- Improvements from previous code

### Required Changes
🔴 **[blocking]** Issue title
> Location and explanation
> Suggested fix

### Important Suggestions
🟡 **[important]** Issue title
> Why it matters and suggested approach

### Minor Suggestions
🟢 **[nit]** Minor improvement

💡 **[suggestion]** Alternative to consider

### Questions
❓ Clarification or design question

### Verdict
One of:
- ✅ **Approve** — ready to merge
- 💬 **Comment** — minor suggestions, can merge
- 🔄 **Request Changes** — blocking issues must be addressed first

---

## Rules
- Use severity labels from the skill file consistently, respecting the minimum bar for each
- Every finding must cite the checklist item or rule it violates — no citation, no finding
- Flag red flags from the skill file when spotted
- Praise genuinely good work — don't only flag problems
- Omit sections that have nothing worth raising — empty sections signal clean code, not an incomplete review
- Cap nits at 1–2 total; if you have more, apply the filter rule again before including them
- Do not invent issues to compensate for a short review
