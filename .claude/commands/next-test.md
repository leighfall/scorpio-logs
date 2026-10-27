# /next-test [target] [framework] [type]

Write a single test. The target can be a specific test description or a class/controller name.

## Parameters
- `[target]` _(optional)_ — either:
  - A **test description**: what the test should verify (e.g. "returns 404 when user not found") → write that test directly
  - A **class or controller name** (e.g. `JobControllerTests`, `JobController`) → figure out what to test next (see below)
  - Omitted → ask the user what they want to test
- `[framework]` _(optional)_ — the test framework to use (e.g. `vitest`, `xunit`, `playwright`). If omitted, detect from the project (package.json, .csproj, existing test files).
- `[type]` _(optional, xunit only)_ — `integration` or `unit`. If omitted, infer from context (location of file being tested, existing test structure).

## If Parameters Are Missing
- If `[target]` is not provided, ask the user what they want to test before proceeding
- If `[framework]` cannot be detected, ask the user to choose from: `vitest`, `xunit`, `playwright`
- If `[type]` cannot be inferred, ask the user to choose from: `integration`, `unit`
- Ask about missing parameters one at a time, not all at once

## Determining What to Test Next (class/controller target)
When the target is a class or controller name rather than a specific description:
1. Check the test plan for TODO items scoped to that class — if found, use them as the candidate list
2. If no test plan exists, read the corresponding source file and list untested endpoints/methods
3. Present a short numbered list of candidates and ask the user which to write
4. Include a recommendation and reason (e.g. "I'd start with #2 — it's read-only and doesn't need seeding")

If the test class doesn't exist yet, create it with appropriate boilerplate and write the first test.

## Before Writing the Test
1. Identify the framework — from the parameter if provided, otherwise detect from the project
2. Load and follow the corresponding skill for that framework:
   - `vitest` → skills/vitest-skill
   - `xunit` + `integration` → skills/xunit-integration.md
   - `xunit` + `unit` → skills/xunit-unit.md
   - `xunit` (type inferred) → load the appropriate file based on context
   - `playwright` → skills/playwright-skill
   - If the project has its own conventions (best-practices.md, existing test patterns), they take precedence over the skill
3. Look for a test plan and best practices file:
   - First check in or near the directory relevant to the test type being written (e.g. tests/integration/, tests/e2e/)
   - Also check project root and any top-level test directories for a general test plan or best practices file
   - If found, use them to inform what the test should cover and how it should be written
4. Scan existing test files to determine placement conventions (co-located, tests/ folder, etc.)
5. If no test file exists yet, create it with appropriate boilerplate (imports, class wrapper, etc.)
6. Before creating any new helpers, scan all TODO items for this class (from the test plan or source file) — design helpers to serve the full set of upcoming tests, not just the current one. Reuse existing helpers and fixtures where possible.

## Rules
- Follow the patterns and structure of existing tests in the project — imports, setup, teardown, assertion style, etc.
- Tests must be able to fail
- Assert the meaningful outcome, not surface signals. For integration tests this means seeding data, making the request, and asserting what actually came back or changed in the system. A test that would pass even if the feature was broken is not acceptable.
- Do not write the test to pass the current implementation — write it against the expected behavior

## Test Naming
- Derive the test name from the description and the conventions found in existing test files
- If a test plan is present, prefer names from the plan, adapted to the framework's naming convention

## After Test is Written
- Always explain what you did and why. Be as verbose as needed to get the point across. Reference my proficiency levels with languages and tools to determine what should be explained further
- Always give a commit message summarizing the changes
- Ask to run the test to make sure it compiles and runs with no errors. Capture execution time
- Ask to run the full suite for the current test type (e.g. all integration tests) to make sure the new test didn't break anything. Do not run other test types. Capture execution time
- If a test plan exists, update only the entry for the test just written — note it as done, update any tracked fields (e.g. execution time, status, number of tests) following the exact pattern of existing entries. If no matching entry exists, add a new one following the existing pattern. Do not reorganize, reformat, or touch any other entries in the plan
