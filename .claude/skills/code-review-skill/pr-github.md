# GitHub PR Fetch Instructions

Use the `gh` CLI to fetch the PR data needed for review.

## Get PR metadata

If a PR number was supplied, use it:

```bash
gh pr view <number> --json number,title,body,baseRefName,headRefName,url,state
```

Otherwise, detect from the current branch:

```bash
gh pr view --json number,title,body,baseRefName,headRefName,url,state
```

Read the body for linked issues, acceptance criteria, or context the author provided.

## Get the diff

If a PR number was supplied:

```bash
gh pr diff <number>
```

Otherwise, `gh` will use the current branch's open PR:

```bash
gh pr diff
```

## Get linked issue (if referenced in the PR body)

If the PR body references a GitHub issue (e.g. `Closes #42`, `Fixes #42`), fetch it:

```bash
gh issue view <number> --json title,body
```

Use the issue description to understand the business requirement before reviewing.

## Notes

- Run these commands from within the repository directory
- If `gh pr diff` returns nothing, the PR may not be pushed or may already be merged — tell the user
- If authentication fails, tell the user to run `gh auth login`
