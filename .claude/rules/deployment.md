# Deployment & Workflow

> Partly placeholder — filled in as M1 deployment happens.

## Hosting
- Vercel or Netlify (not decided); Supabase for Postgres + storage
- Domain: TBD

## GitHub
- `main` is protected — PRs required, even solo
- Reference the task ID from `.docs/tasks.md` (e.g. `M0.5`) in every branch, commit body or PR
- Actions: PR opened → Vitest + Playwright

## Environment
- Secrets live in `.env` (gitignored); `.env.example` lists every key with no values
- Keys: `NUXT_SUPABASE_URL`, `NUXT_SUPABASE_ANON_KEY`, `NUXT_SUPABASE_SERVICE_ROLE_KEY`, `NUXT_ESOLOGS_CLIENT_ID`, `NUXT_ESOLOGS_CLIENT_SECRET`

## Lint and Format
- Prettier formats on save; do not run `prettier`, `eslint` or `pnpm format` after edits unless asked
- Never run Prettier repo-wide; target specific files
