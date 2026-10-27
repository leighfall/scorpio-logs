# Naming Conventions

## Variables and Constants
- **Variables**: camelCase, including Vue refs
- **True static constants**: UPPER_CASE
- **Mock data files/constants**: prefix with `mock` (e.g., `mockFight.ts`, `mockFight`)

## Files and Folders
- **Vue components**: lowercase filenames in a folder prefix (`base/button.vue`, `fight/player-card.vue`)
- **Composables**: `useThing.ts`
- **Pages**: kebab-case, `[slug].vue` / `[id].vue` for dynamic routes
- **Server routes**: Nuxt file-based (`server/api/...`), method suffix when needed (`index.post.ts`)
- **Vue files**: script → template → CSS order
- **Tests**: `*.test.ts` (Vitest), `*.spec.ts` (Playwright)
- **Fixtures**: `tests/fixtures/<trial-or-zone>-<what>.log` (e.g. `dreadsail-trash.log`)

## Database
- Tables and columns: snake_case, plural table names (`group_members`)
- Migrations: `YYYYMMDDHHMMSS_description.sql`
- Group slugs: kebab-case
- Date-times: `timestamptz`, inserted with an explicit offset; the UI converts to the viewer's time zone

## Types
- Generated: `types/database.ts` (do not edit)
- Hand-written domain types: PascalCase, no `I` prefix (`FightModel`, `PlayerModel`)
- ESO log event names stay as they appear in the log (`COMBAT_EVENT`, `EFFECT_CHANGED`)

## Import Organization
1. External library imports
2. Empty line
3. Project imports
