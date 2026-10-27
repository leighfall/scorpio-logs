# Supabase / PostgreSQL

**Experience Level**: Beginner (PostgreSQL, SQL) — explain schema, RLS and SQL decisions in depth

## No ORM
Supabase JS client for normal queries, raw SQL for complex ones. Types are generated from the schema — never hand-write DB types:
```
supabase gen types typescript --local > types/database.ts
```

## Migrations
- SQL files in `supabase/migrations/`, named `YYYYMMDDHHMMSS_description.sql`
- New change = new migration; never edit an applied one
- Enable RLS on every table in the same migration that creates it
- Dev seed data in `supabase/seed.sql`
- Local dev runs in Docker via the Supabase CLI

## Row Level Security
- RLS is the authorization layer — policies are part of the design, not an afterthought
- Until logins exist: public read on group, fight, roster and checklist data; writes go through server routes that check the group's edit key and use the service role
- Every table has a nullable `owner_id` so login-based policies can be added later without schema rework
- The service role key bypasses RLS: server-side only, used sparingly, never in client code

## Auth
- None yet (link + edit key). Discord OAuth through Supabase Auth is planned for M5
- Anon key may be public; service role key never

## Data Model
Core tables: `groups`, `group_members`, `fights`, `rosters`, `checklists`, `provides`. Definitions live in `.docs/plan.md` → "Data model" and, once written, `specs/data-model.md` (which then becomes the source of truth).
