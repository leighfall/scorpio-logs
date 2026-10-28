# scorpio-logs: plan

## Context
ESO writes a raw combat log (`Logs/Encounter.log`; one real example is 9.8 GB with 88 sessions). ESO Logs shows everything but is too granular to read at a glance. Simpler sites are readable but not granular enough, and nothing on them can be edited. scorpio-logs is a **shared, good-looking site for a raid group**. For each fight it shows:
- what everyone wore and slotted
- who provided which buffs and debuffs, and the uptimes
- what was **missing** against the group's checklist
- DPS

It also has an **editable roster builder** that compares a planned roster with what actually happened and projects coverage live while you edit.

## Decisions

### Inputs and parsing
- **Local log:** parsed in the **browser**. A Web Worker streams the file with `File.slice`; the file can be multi-GB.
  1. Scan for the byte offsets of each `BEGIN_LOG` to list sessions.
  2. Parse the chosen session.
  3. Show its boss pulls; you tick which ones to publish. Kills and the last wipe are ticked by default.
  4. Only the compact fight data (KBs) is uploaded.
- **ESO Logs report URL:** a Nuxt server route calls the ESO Logs v2 GraphQL API with client credentials. The secret stays on the server. The fights, CombatantInfo and buff/debuff events it returns go through the same normalizer, so the result looks identical to a local parse.
- **Icons:** the icon name from `ABILITY_INFO` or the API maps to `https://assets.rpglogs.com/img/eso/abilities/<name>.png` (verified). Each icon is cached in Supabase storage on first use. No SDK is needed.
- **Set names and types:** generated from the LibSets addon data (`AddOns/LibSets/Data/LibSets_Data_SetNames.lua`, `LibSets_Data_Sets.lua`) by a script into `sets.json`.

### Stack
- **Language:** TypeScript end to end.
- **App:** Vue with Nuxt, deployed on Vercel or Netlify.
- **Data:** Supabase (Postgres, storage, and Discord OAuth later).
- **Repo layout:** a single Nuxt 4 app, following hallway-track (see `.claude/rules/project-structure.md`).
  - `shared/parser/`: pure TypeScript with no DOM, Node or Vue, so it runs in the Worker and on the server
  - `shared/types/`: `FightModel` and other domain types
  - `shared/utils/`: coverage math (interval union, uptime, merged effects)
- **Tooling:** pnpm, ESLint (`@nuxt/eslint`), Prettier, Vitest (unit and integration projects), Playwright, SCSS tokens. TypeScript is pinned to 6 until typescript-eslint supports 7.

### Access and ownership
- Everything belongs to a **Group** space (`/g/<slug>`): its rosters, checklist overrides, confirmed provides-map entries, and the feed of fights.
- **Link-based for now.** Viewing is public through the link; editing needs the group's edit key (stored hashed).
- **Ready for logins later.** Every row has `owner_id` (null for now) and a group-membership table exists from the start. Adding Discord OAuth later means switching on Supabase auth and its row-level security, with no schema rework.

### Fight page (main view: role-grouped roster)
Full spec: [specs/features/fight-page.md](../specs/features/fight-page.md).

0. **Sidebar:** group navigation (Fights, Rosters, Checklists, Provides map) and this session's pulls. It stacks above the content on phones.
1. **Header:** trial, boss, kill or wipe, duration, group DPS, deaths, and score where there is one. No per-player DPS strip.
2. **MISSING bar:** checklist items below their floor or never applied shown red, items under target shown amber. It is derived from the coverage data, so it follows the boss toggle.
3. **Checklist coverage:** separate **Buffs** and **Debuffs** panels. Each effect is a row with a timeline of when it was up, its merged uptime and its target.
   - Buffs are measured on the group members in the item's scope.
   - Debuffs are measured on **bosses only**; adds are excluded.
   - Multi-boss fights (e.g. Lylanar & Turlassil) get a **Both / each boss** toggle on the Debuffs panel. "Both" shows one timeline lane per boss.
   - Each row shows how many sources it had, and flags **doubling up** (two sources up at the same time on the same target).
4. **Role columns:** Tanks / Healers / DDs, plus an Unassigned lane. **Roles come only from the roster.**
   - The fight automatically picks the group's roster with the most @account overlap, and you can switch.
   - If none match, the page offers "Create roster from this fight", with suggested roles to confirm.
5. **Player card (stacked strip):** players are identified by **@account**; character name and class are secondary.
   1. @account, character · class, and the role's numbers: DDs show DPS; tanks show DPS and HPS; healers show HPS first, then DPS. A small bar compares the player with the top of their role.
   2. front and back bars (6 icons each), always visible, so you can check at a glance that someone is covering a skill
   3. set chips
   4. contribution pills: what that player provided, with uptime and a ⚠ under target
   5. planned-vs-actual differences highlighted
6. **Flyouts, not page changes:** detail opens in a drawer from the right, one at a time, closed by its close button or by clicking outside it.
   - **Gear flyout** (from a card): set piece counts, the full gear list (slot, set, trait, quality, enchant), slotted CP and mundus.
   - **Sources flyout** (from a coverage row): the merged timeline, then **every** source (ability, player, skill/set/enchant) with its own timeline. Uptime a source added is drawn in gold, and time it overlapped another source is greyed out. Sources that added nothing are still listed.
7. **Merged effects:** effects that share a name, such as Major Vulnerability, form one row.
   - The row's uptime is the **union** of all intervals.
   - Overlap is counted per target. It includes one player applying the same effect from two sources (e.g. a skill and a set).
   - Each source links through `castTrackId` back to its `BEGIN_CAST`.

### Checklist
- One default list per trial, overridable per boss.
- Each item has:
  - an effect name, with its ability IDs grouped
  - a **target** and a **floor**: green at or above target, amber in between, red below the floor or absent
  - a **scope** (boss / everyone / DDs / tanks / healers)
- **Whose uptime counts:** debuffs count on bosses only (adds excluded), per boss. Buffs count on the group members in the item's scope; exactly how several members' uptimes combine is still **OPEN**. The fight data stores raw intervals for each target, so this can change later without re-parsing.

### Roster builder
- **Trial template:** defaults to 2 tanks / 2 healers / 8 DDs (the counts can be edited), plus a bench and variants per boss.
- **A slot holds:** role, @account (character optional), assigned sets, planned bars, and assigned checklist responsibilities.
- **Ways to start one:** from scratch, or by forking a parsed fight.
- **Live projection:** the **provides map** (set or skill → effect names) recalculates the MISSING list as you edit.
  - The map is seeded by hand.
  - It is **learned automatically** from every parsed fight: `castTrackId` gives cast → effect, and the player's gear plus the set's proc effects explain set sources.
  - Learned entries are suggestions until the group confirms them.

### What-if planning (later; not designed yet)
- Take a real fight and play out roster changes: "what if the werewolf, who brings a group damage buff but parses lower, were swapped for a regular DD with higher DPS?"
- The question we care about is the **break-even**: how much DPS a replacement must do to beat the group total with the buff-bringer.
- Basic shape: remove the buff from everyone else's damage (scaled by its uptime), remove the buff-bringer's own damage, add the replacement's. The break-even is where the two totals match.
- ESO's damage maths isn't a simple multiply (buffs stack in shared buckets), so the real formulas come from a friend of the group who has already written break-even functions for many scenarios. Integrating them is the plan, not re-deriving them.

### Visual style
Approved 2026-10-27 from the "Codex" direction on the [design canvas](https://claude.ai/artifact/85QoD82AytwUuH9smMmU1T). Tokens live in `app/assets/styles/_tokens.scss` and `main.scss`.
- An ESO-inspired dark theme:
  - charcoal and navy backgrounds with muted gold accents
  - **Cinzel** for display: page titles and upper-case, letter-spaced section headings
  - **Inter** for everything else, with tabular figures for numbers
  - icons as the main source of colour
- Status: green at target, amber under target, red below floor. Fills use the base colours; text on dark surfaces uses their lighter tints for contrast.
- Roles: tanks blue, healers green, DDs gold.
- Cards: navy, 1px slate border, 8px radius, no shadows.
- Readable at a glance. This should not feel like a spreadsheet.

## Data model (Supabase)
- `groups(id, slug, name, edit_key_hash, owner_id)`
- `group_members(group_id, user_id, role)`: empty until logins exist
- `fights(id, group_id, source: local|esologs, source_ref, zone, difficulty, boss, started_at, duration_ms, kill, payload jsonb)`, where `payload` is the `FightModel` below
- `rosters(id, group_id, trial, name, slots jsonb, bench jsonb, boss_variants jsonb)`
- `checklists(id, group_id, trial, boss nullable, items jsonb)`
- `provides(id, group_id nullable = global, source_kind: set|skill, source_id, effect_name, status: seeded|learned|confirmed, evidence_count)`

**`FightModel`** (in `shared/types/`) contains:
- **meta:** zone, boss, kill, duration
- **players:** account, character, class, race, gear, front and back bars, CP, mundus, damage and healing totals, damage per ability, deaths
- **enemies**
- **effects:** name, buff or debuff, ability IDs, and **interval lists for each target**. Each interval records its source ability and source player.

## Log format reference
Each line is `msSinceSessionStart,EVENT,...`. `BEGIN_LOG` starts a session and carries its unix-ms start time. Unit IDs and ability IDs reset with every session.

| Event | Fields |
|---|---|
| `BEGIN_LOG` | unix ms, log version, server, language, client version |
| `ZONE_CHANGED` / `MAP_CHANGED` | id, name, difficulty / id, name, texture |
| `UNIT_ADDED` | unitId, PLAYER/MONSTER, isLocalPlayer, partyIdx, monsterId, isBoss, classId, raceId, name, @account, characterId, level, CP, ownerUnitId, reaction, isGrouped |
| `PLAYER_INFO` | unitId, [long-term effect ids], [their stack counts], [gear: slot,itemId,isCP,lvl,trait,quality,setId,enchant,enchCP,enchLvl,enchQuality], [front bar 6], [back bar 6] |
| `ABILITY_INFO` / `EFFECT_INFO` | id, name, icon path, … / id, BUFF or DEBUFF, status effect type, … |
| `COMBAT_EVENT` | result, damageType, powerType, hitValue, overflow, castTrackId, abilityId, source unit state, target unit state (`*` = same as source) |
| `EFFECT_CHANGED` | GAINED/UPDATED/FADED, stacks, castTrackId, abilityId, source unit state, target unit state |
| `BEGIN_CAST` / `END_CAST` | duration, channeled, castTrackId, abilityId, source, target / reason, castTrackId, abilityId |
| `BEGIN_COMBAT` / `END_COMBAT` | no fields |
| `TRIAL_INIT` / `END_TRIAL` | trialId, …, start, … / trialId, durationMs, success, score, vitality bonus |

**Unit state** (10 fields): `unitId, hp/max, mag/max, stam/max, ult/max, ww/max, shield, x, y, heading`.

Things observed in the real log:
- Boss units are flagged with `isBoss`.
- A boss unit can be added well before `BEGIN_COMBAT`, so a fight counts as a boss fight only if the boss takes part in it.
- Each Dreadsail boss has its own `MAP_CHANGED`.
- `END_TRIAL` follows the last boss.

## Parser (`shared/parser/`)
- **Line splitter:** splits on commas but respects quotes (names contain commas and apostrophes) and handles the bracketed arrays in `PLAYER_INFO`.
- **Unit state decoder:** see above, where `*` means the target is the same as the source.
- **Session state:**
  - units from `UNIT_ADDED` (`isBoss`, @account, class)
  - abilities and effects from `ABILITY_INFO`/`EFFECT_INFO`
  - each player's latest `PLAYER_INFO`: gear and both bars
- **Fight splitting:** splits on `BEGIN_COMBAT`/`END_COMBAT`, merges back-to-back combats that share a boss, and marks kills from a boss `DIED` event or `END_TRIAL`.
- **Aggregation:**
  - damage from all damage results, with pet damage credited to its owner
  - healing
  - effect intervals from GAINED/FADED, clipped to the fight
  - deaths with the last hits taken
  - mundus from the Boon effect

## Milestones
v1 scope is still to be decided; this is the recommended order.
1. **M0 – parser core:** the parser in `shared/parser/` and `sets.json` generation. Build parser tests from small slices of a real `Encounter.log`.
2. **M1 – local log → shareable fight page:** Worker indexing, session and pull picker, upload, the role page with an Unassigned lane, the minimal "create roster from fight" flow, the MISSING bar against a default checklist, and the icon cache.
3. **M2 – rosters and checklists:** the roster editor (template, bench, variants per boss), planned vs actual, and the checklist editor.
4. **M3 – ESO Logs URL import**, into the same `FightModel`.
5. **M4 – provides map** (seeded and learned, with a confirm UI) and live projection in the roster editor.
6. **M5 – Discord login**, group membership and row-level security.

Task-level breakdown: [tasks.md](tasks.md).

## Verification
- **Parser tests on the [sample logs](sample-logs/README.md)** (full-fight extracts from one Dreadsail session):
  - `dsr-trash.log`: every player's gear and bars decode, and their set IDs resolve to names
  - the boss samples are named correctly (Bow Breaker, Lylanar & Turlassil, Reef Guardian, Tideborn Taleria) and get the right kill or wipe result
  - `dsr-taleria.log`: `END_TRIAL` gives score 299,949
- **Accuracy against ESO Logs:** for one fight that was also uploaded to ESO Logs, each player's DPS and the Major Breach / Major Vulnerability uptime on the boss are within ~1–2%.
- **Merged effects:** two sources of Major Vulnerability that overlap give a merged uptime of at most 100%, and the per-source split adds up correctly.
- **Browser indexing:** a 9.8 GB log is indexed in the browser in about a minute or less, and the page stays responsive because the work runs in the Worker.
- **Same output from both inputs:** the same fight from a local log and from an ESO Logs URL renders equivalent cards.
- **Sharing:** the view link works signed out, and editing fails without the edit key.

## Open items
- How several group members' buff uptimes combine into one checklist number (debuffs are settled: per boss, adds excluded).
- The threshold for flagging "doubled up" (the mockup uses 10% of the fight).
- Whether `FightModel` needs damage over time (e.g. per-second buckets per player) for what-if planning. Decide before the M0.14 payload size check.
- What form the friend's break-even functions are in (language, inputs), and whether they can live in `shared/`.
- What v1 ships with: the milestone cut-off.
- How to tell slotted CP and mundus apart from passives in `PLAYER_INFO`'s long-term effect list.
