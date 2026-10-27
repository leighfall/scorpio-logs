# Testing Philosophy

**Experience Level**: Beginner (TDD)

Prioritize Test Driven Development for all new features and bug fixes. Red-Green-Refactor cycle:
1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve while keeping tests green

Tests are written before or alongside implementation, never after. Acceptance criteria in `specs/features/*.md` (and the "Done when" lines in `.docs/tasks.md`) map directly to test cases — read the spec first, then write the test.

## Frameworks by Layer
- Unit + integration: Vitest (with Nuxt test utils for components/composables/server routes)
- End-to-End: Playwright

## Layout
```
tests/
├── unit/          # parser/, utils/, components/, composables/
├── integration/   # api/ — server routes and DB operations; real-log parser checks
├── e2e/           # *.spec.ts — critical paths: upload a log, view a fight, edit a roster
└── fixtures/      # tiny hand-cut Encounter.log slices for unit tests
```

Full-fight sample logs live in `.docs/sample-logs/` (see its README for what each one covers). Use them for parser tests that need a whole fight.

## What Goes Where
- Unit: parser pieces against fixtures, coverage math, utilities, composables
- Integration: API routes, database operations, parser runs against the sample logs, and runs against a full real log (skipped when `ESO_LOG_PATH` isn't set)
- E2E: critical user paths only
