# Vue 3 Conventions

**Experience Level**: Proficient

- Use Vue 3 with Composition API and Script Setup syntax
- File structure order: script → template → CSS
- Use TypeScript for type safety
- Use SCSS for CSS preprocessing (`<style scoped lang="scss">`). Raw palette lives as SCSS variables in `app/assets/styles/_tokens.scss` (auto-injected into every component); semantic `--color-*` CSS variables live in `main.scss` `:root` and map to them. Components use the semantic variables.
- camelCase for Vue refs and reactive variables
- Shared state: prefer Nuxt composables (`useState`, `useFetch`) — see nuxt.md.

## Design System

- Base components live in `app/components/base/` and are built before feature components
- Colors, spacing and type are defined as tokens (CSS variables); dark theme only for now. Direction is in `.docs/plan.md` → "Visual style"
- Cards: slight tint from page background, 1px low-contrast border, subtle radius — no heavy shadows
- Use semantic HTML (`<article>`, `<section>`, `<time datetime>`) — it matters for SEO
