# Project
ESO raid log analyzer and roster builder. Plan: [.docs/plan.md](.docs/plan.md); tasks: [.docs/tasks.md](.docs/tasks.md).

# Rules
- [Vue 3](.claude/rules/vue.md) — Vue 3 Composition API conventions, design system notes
- [Nuxt 4](.claude/rules/nuxt.md) — rendering, server routes, Web Workers, sharing
- [Supabase](.claude/rules/supabase.md) — Postgres, migrations, RLS, edit keys, generated types, no ORM
- [Deployment](.claude/rules/deployment.md) — hosting, GitHub workflow, environment variables
- [Project Structure](.claude/rules/project-structure.md) — folder layout and structural rules
- [Naming Conventions](.claude/rules/naming-conventions.md) — variables, files, database, types, imports
- [Testing](.claude/rules/testing.md) — TDD philosophy, Vitest + Playwright, test layout, fixtures
- [Communication](.claude/rules/communication.md) — be direct, explain why, flag opinions, experience levels
- [No Overengineering](.claude/rules/no-overengineering.md) — simple solution first, justify complexity

# Commands
- [/next-test](.claude/commands/next-test.md) — create the next test in the plan
- [/heal-tests](.claude/commands/heal-tests.md) — fix failing, broken, or flaky tests
- [/code-review](.claude/commands/code-review.md) — trigger code-review-skill on current diff
- [/commit](.claude/commands/commit.md) — draft a conventional commit message for staged changes
- [/decompose](.claude/commands/decompose.md) — scope → epics → stories → tasks + estimates
- [/estimate](.claude/commands/estimate.md) — estimate a single described task

# Skills
- [estimation-decomposition](.claude/skills/estimation-decomposition/SKILL.md) — breakdown and estimation conventions
- [code-review-skill](.claude/skills/code-review-skill/review-checklist.md) — review checklist, severity labels, decision matrix
  - [pr-github.md](.claude/skills/code-review-skill/pr-github.md) — GitHub PR fetch instructions
- [playwright-skill](.claude/skills/playwright-skill/) — testdino-hq/playwright-skill
- [vitest-skill](.claude/skills/vitest-skill/) — fastmcp vitest skill
