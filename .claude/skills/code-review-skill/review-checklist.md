<!-- Built from https://github.com/awesome-skills/code-review-skill/blob/main/assets/review-checklist.md -->

# Code Review Skill

## The Filter Rule

Before raising any item, ask: **"Would a reasonable senior dev actually want to know this in a real review?"**

If the answer is uncertain, leave it out. Surfacing a weak suggestion wastes the author's time and dilutes the real issues. A review with 2 genuine findings is more useful than one with 12 marginal ones.

**Empty sections are correct output for clean code.** Do not populate sections to appear thorough.

---

## Severity Labels

| Label | Meaning | Minimum bar to use it |
|-------|---------|--------|
| 🔴 `[blocking]` | Must fix — block merge | Would cause a real bug, security issue, test failure, or production breakage. "Could be cleaner" never qualifies. |
| 🟡 `[important]` | Should fix — discuss if you disagree | A real risk or gap a senior dev would flag unprompted. Not just a preference. |
| 🟢 `[nit]` | Nice to have — non-blocking | Genuinely minor. Raise at most 1–2 per review; if you have more than that, re-evaluate whether they clear the filter rule. |
| 💡 `[suggestion]` | Alternative to consider | Only when the alternative is meaningfully better, not just different. |
| ❓ `[question]` | Need clarity | Genuine ambiguity that affects correctness or intent. Not curiosity. |
| 🎉 `[praise]` | Good work | Celebrate! |

**Citation required:** Every finding must name the checklist item or rule it violates. If you can't name it, don't raise it.

---

## Review Checklist

### Pre-Review
**If reviewing a PR:**
- [ ] Read PR description and linked issue
- [ ] Verify CI/CD status (tests passing?)
- [ ] Understand the business requirement

**If reviewing local commits:**
- [ ] Read the commits being reviewed and understand their intent
- [ ] Understand the business requirement

### Architecture & Design
- [ ] Solution fits the problem
- [ ] Consistent with existing patterns
- [ ] No simpler approach exists
- [ ] Will it scale?
- [ ] Changes are in the right location

### Logic & Correctness
- [ ] Edge cases handled
- [ ] Null/undefined checks present
- [ ] Off-by-one errors checked
- [ ] Race conditions considered
- [ ] Error handling complete
- [ ] Correct data types used

### Security
- [ ] No hardcoded secrets
- [ ] Input validated/sanitized
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] Authorization checks present
- [ ] Sensitive data protected

### Performance
- [ ] No N+1 queries
- [ ] Expensive operations optimized
- [ ] Large lists paginated
- [ ] No memory leaks
- [ ] Caching considered where appropriate

### Testing
- [ ] Tests exist for new code
- [ ] Edge cases tested
- [ ] Error cases tested
- [ ] Tests are readable
- [ ] Tests are deterministic

### Code Quality
- [ ] Clear variable/function names
- [ ] No code duplication
- [ ] Functions do one thing
- [ ] Complex code has a brief comment; no comments explaining decisions, changes, or what the code obviously does
- [ ] No magic numbers

### Documentation
- [ ] Public APIs documented
- [ ] README updated if needed
- [ ] Breaking changes noted
- [ ] Complex logic explained

---

## Checklist Use

The checklist items are **correctness verifications**, not prompts to find issues. For each item, the question is: *"Is this a problem in this specific code?"* — not *"What could I say about this?"*

If a category has nothing genuinely worth raising, skip it entirely.

---

## Decision Matrix

| Situation | Decision |
|-----------|----------|
| Critical security issue | 🔴 Block, fix immediately |
| Breaking change without migration | 🔴 Block |
| Missing error handling | 🟡 Should fix |
| No tests for new code | 🟡 Should fix |
| Style preference | 🟢 Non-blocking |
| Minor naming improvement | 🟢 Non-blocking |
| Clever but working code | 💡 Suggest simpler |

---

## Red Flags

Watch for these patterns:

- `// TODO` in production code
- `console.log` left in code
- Commented-out code
- `any` type in TypeScript
- Empty catch blocks
- Magic numbers/strings
- Copy-pasted code blocks
- Missing null checks
- Hardcoded URLs or credentials
