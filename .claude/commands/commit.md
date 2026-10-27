# /commit

Draft a conventional commit message for the current staged changes. Does not run `git commit` — output only.

## Steps

1. Run `git diff --staged` to see what is staged
2. Run `git status` to understand scope (new files, deletions, renames)
3. Run `git log --oneline -5` to match the repo's existing commit style
4. Draft the message (see format below)
5. Output the message as a code block — nothing else

## If Nothing Is Staged

Check `git status` for unstaged changes. If there are any, tell the user:
"Nothing is staged. Did you mean to run `git add` first?"

If the working tree is clean, tell the user: "Nothing to commit — working tree is clean."

## Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

<optional body — only if the why isn't obvious from the title>
```

**Types:**
- `feat` — new feature or behaviour
- `fix` — bug fix
- `docs` — documentation only
- `refactor` — restructuring without behaviour change
- `test` — adding or fixing tests
- `chore` — maintenance (deps, config, tooling)
- `style` — formatting, no logic change

**Rules:**
- Title: imperative mood, lowercase after the colon, no period, ≤72 chars
- Body: only include it when the title alone doesn't convey the why — keep it to 1–2 sentences
- Match the casing and style of recent commits in this repo

## Output

Print only the commit message inside a code block. No preamble, no explanation.
