# scorpio-logs

Log Analyzer for ESO: raid fight review (buff/debuff coverage, gear, skill bars, DPS) and a roster builder.

**Stack:** Nuxt 4, Supabase (Postgres), SCSS, Vitest, Playwright. pnpm only.

- [Plan](.docs/plan.md): design decisions, data model, log format
- [Tasks](.docs/tasks.md): milestone and task breakdown

## Prerequisites

- Node 24+
- pnpm
- Docker Desktop, running (on Windows this needs WSL2: `wsl --install`, then restart). Only needed once Supabase is in use (M1).

## Setup

```bash
pnpm install
cp .env.example .env
pnpm exec playwright install
pnpm dev
```

If pnpm reports ignored build scripts, run `pnpm approve-builds`.

App: http://localhost:3000

### Supabase (from M1)

```bash
pnpm exec supabase start
pnpm exec supabase db reset
```

Supabase Studio: http://localhost:54323

## Environment

`supabase start` prints the local values. Reprint them any time with `pnpm exec supabase status`.

| `.env` variable                  | From                             |
| -------------------------------- | -------------------------------- |
| `NUXT_SUPABASE_URL`              | Project URL                      |
| `NUXT_SUPABASE_ANON_KEY`         | Publishable                      |
| `NUXT_SUPABASE_SERVICE_ROLE_KEY` | Secret                           |
| `NUXT_ESOLOGS_CLIENT_ID`         | esologs.com → API clients (M3)   |
| `NUXT_ESOLOGS_CLIENT_SECRET`     | esologs.com → API clients (M3)   |
| `ESO_LOG_PATH`                   | A real `Encounter.log`, for integration tests |

## Notes

- TypeScript is pinned to 6: typescript-eslint doesn't support TypeScript 7 yet.
- Test fixtures in `tests/fixtures/` are small slices of a real `Encounter.log`. Never commit a full log.
