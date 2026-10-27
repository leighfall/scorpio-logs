# Nuxt 4 Conventions

**Experience Level**: Novice

- TypeScript throughout, including server routes
- Package manager: pnpm
- File-based routing (`app/pages/`), server routes (`server/api/`, built on Nitro/H3)
- Nuxt 4 layout: client code lives in `app/` (`~` points there); `server/`, `shared/`, `types/` and `supabase/` sit at the root (`~~` points there, e.g. `~~/types/database`)
- `shared/` holds code used by both app and server (auto-imports `shared/utils/` and `shared/types/`); it cannot import from `app/` or `server/`
- `shared/parser/` is not auto-imported — import it explicitly so the Worker bundle stays small
- `useFetch` / `useAsyncData` default to `undefined` (not `null`) when there is no data, and return shallow refs — use `deep: true` if you mutate nested data
- Local imports: follow Nuxt auto-imports for composables/components; use explicit imports elsewhere

## Rendering
- **SSR by default** for shared fight and group pages (they're linked in Discord, so link previews need server-rendered meta)
- The log upload/parse flow is client-only (it reads a local file in a Web Worker)
- Configure per-route with `routeRules` in `nuxt.config.ts`

## Web Workers
- Workers live in `app/workers/` and are created with `new Worker(new URL('./x.ts', import.meta.url), { type: 'module' })`
- Workers import only from `shared/` — no Vue, no Nuxt composables
- Send progress messages back to the UI; never block the main thread on parsing

## Server Routes
- Keep route handlers thin; put logic in `server/utils/`
- Validate all input at the route boundary
- Server-only secrets via `runtimeConfig` (private keys), never `public`
- Every write route checks the group's edit key (until logins exist)

## SEO / Sharing
- Fight and group pages set OG title/description so Discord link previews are useful
