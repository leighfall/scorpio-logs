# scorpio-logs: tasks

These tasks implement [plan.md](plan.md). Each one is meant to be built and reviewed on its own, and its **Done when** line is the acceptance check. Task IDs (e.g. `M1.4`) are for referring to tasks in commits and discussion.

Status: `[ ]` todo · `[~]` in progress · `[x]` done

---

## M0 – Scaffold and parser core

- [~] **M0.1 Project skeleton**
  A single Nuxt 4 app following hallway-track: the folder structure, `.claude`, `.vscode`, ESLint, Prettier, Vitest, Playwright and `supabase init`.
  *Done when:* `pnpm install`, `pnpm exec eslint .`, `pnpm format:check`, `pnpm test:run` and `pnpm build` all succeed. (All pass now; this stays open until it's reviewed and committed.)

- [ ] **M0.2 `FightModel` types**
  Shared types in `shared/types/`: meta, players, gear, bars, damage and healing, enemies, effects with per-target intervals, deaths.
  *Done when:* the types compile and the field list has been reviewed against the plan.

- [ ] **M0.3 Coverage helpers**
  In `shared/utils/`: `unionIntervals`, `uptime`, and `mergedEffectsOnTarget`, which groups effects by name and splits them out by source.
  *Done when:* unit tests pass. Two overlapping sources come to ≤ 100%, the per-source split is correct, and an empty input gives 0%.

- [x] **M0.4 Sample logs**
  Five full-fight extracts from one Dreadsail session in `.docs/sample-logs/`: a trash pull, Bow Breaker, Lylanar & Turlassil, a Reef Guardian wipe, and Taleria with `END_TRIAL`. Each one is a standalone, valid log under 50 MB; the README there records the source and how they were cut. Tiny hand-cut slices for unit tests go in `tests/fixtures/` as the tests need them.

- [ ] **M0.5 Tokenizer**
  `splitLine` (plain lines take a fast path; also handles quotes and brackets), `parseList` for `PLAYER_INFO` arrays, the unit-state decoder, and `iconName`.
  *Done when:* tests cover a name with apostrophes, a name with a comma, the `PLAYER_INFO` gear array, and `*` target states.

- [ ] **M0.6 Line streaming**
  Chunks to lines, handling `\r\n`, UTF-8 characters split across chunk boundaries, and a final line with no newline. Works the same from a `Blob` and from a Node stream.
  *Done when:* tests pass with tiny chunk sizes (e.g. 7 bytes) and give the same output as with large chunks.

- [ ] **M0.7 Session indexer**
  Scan raw bytes for `BEGIN_LOG` and `ZONE_CHANGED`. For each session, return its byte range, start time, client version, zones and local character.
  *Done when:* all 90 sessions in the real log are found, the offsets match a `grep -b` check, and the run takes under ~1 minute in Node.

- [ ] **M0.8 Session state**
  Units, abilities, effect info, each player's latest `PLAYER_INFO`, and the castTrackId → cast ability map.
  *Done when:* on `dsr-trash.log`, every player's gear and front and back bars decode, with ability names attached.

- [ ] **M0.9 Fight splitting**
  Split on `BEGIN_COMBAT`/`END_COMBAT`, merge restarts that come right after, detect the bosses that took part, name the fight, and decide kill or wipe.
  *Done when:* each boss sample is named correctly (Bow Breaker, Lylanar & Turlassil, Reef Guardian, Tideborn Taleria), Reef Guardian comes out as a wipe and the others as kills, and Taleria has `END_TRIAL` score 299,949. With `ESO_LOG_PATH` set, the full session also splits into the expected pulls (including Sail Ripper and both Reef Guardian pulls).

- [ ] **M0.10 Damage and healing**
  Per player, per ability and per target. Pet damage goes to its owner. Damage to bosses is counted separately.
  *Done when:* the totals for one Dreadsail boss fight are within ~1–2% of ESO Logs (needs that fight uploaded to ESO Logs for comparison).

- [ ] **M0.11 Effect intervals**
  GAINED/UPDATED/FADED become intervals per target, ability and source. Effects already running at fight start, or still running at fight end, are clipped to the fight. Each interval is linked to the cast ability through castTrackId.
  *Done when:* Major Breach and Major Vulnerability uptime on a Dreadsail boss are within ~1–2% of ESO Logs.

- [ ] **M0.12 Deaths**
  Player deaths with the killing ability, the killer, and the last 5 hits taken.
  *Done when:* the deaths in one Dreadsail wipe match the ESO Logs deaths list.

- [ ] **M0.13 `sets.json` from LibSets**
  A script in `scripts/` reads LibSets' Lua data and writes set id → `{ name, type }`.
  *Done when:* every set ID in `dsr-trash.log`'s gear resolves to a name.

- [ ] **M0.14 Payload size check**
  Measure the JSON size of a full boss fight. If it's too large, decide which effects to filter out (e.g. passives).
  *Done when:* there's an agreed size budget and a typical boss fight fits within it.

## M1 – Local log → shareable fight page

- [~] **M1.1 Nuxt app shell**
  Design tokens (dark theme, gold accent, Cinzel plus Inter) and the base layout. A placeholder version was created during M0.1; the fonts and palette still need sign-off.
  *Done when:* the app runs locally and shows a styled placeholder page, and the tokens are approved.

- [ ] **M1.2 Supabase project and schema**
  Tables `groups`, `group_members`, `fights`, `rosters`, `checklists` and `provides`, all with `owner_id`. Row-level security is off for now but the policies are drafted.
  *Done when:* the migrations apply cleanly to a fresh project.

- [ ] **M1.3 Groups and edit key**
  Create a group, set its slug, and hash its edit key. Server routes check the edit key before any write.
  *Done when:* a write without the key is rejected and a write with it succeeds.

- [ ] **M1.4 Parser in a Web Worker**
  Drop a log, index it in the Worker, and report progress. The UI never freezes.
  *Done when:* the 9.8 GB log is indexed in the browser and the page stays responsive.

- [ ] **M1.5 Session and pull picker**
  List sessions by date and zone, parse the one picked, and show its pulls with kills and the last wipe ticked by default.
  *Done when:* the Dreadsail session shows the expected pulls.

- [ ] **M1.6 Upload fights**
  POST the ticked `FightModel`s to the group.
  *Done when:* the fights appear in the group's feed, and each has a shareable link.

- [ ] **M1.7 Icon cache**
  Server route: on first request, fetch the icon from the rpglogs CDN, store it in Supabase storage, and serve it from there. Unknown icons get a fallback.
  *Done when:* each icon is only fetched from the CDN once.

- [ ] **M1.8 Fight page: header + DPS strip**
  *Done when:* it shows the boss, kill or wipe, duration, group DPS, deaths, score, and players ranked by DPS.

- [ ] **M1.9 Fight page: player card (stacked strip)**
  Name and DPS/HPS, both bars, set chips and contribution pills. The expanded view adds the gear paper-doll, CP and mundus.
  *Done when:* the cards render for all 12 players and the tooltips work.

- [ ] **M1.10 Merged effects UI**
  Rows grouped by name, an expandable source dropdown, and the global merged/split toggle.
  *Done when:* Major Vulnerability expands to show each source with its player.

- [ ] **M1.11 Default checklist + MISSING bar**
  A seeded default checklist (target, floor, scope) with red/amber/green grading.
  *Done when:* the Dreadsail fight shows a correct MISSING bar. Depends on the open question of whose uptime counts; a placeholder rule is used until it's decided.

- [ ] **M1.12 Roster matching + Unassigned lane**
  Roles come from the roster with the most @account overlap. Everyone else goes to the Unassigned lane.
  *Done when:* with no roster, everyone is Unassigned. With a roster, the columns fill.

- [ ] **M1.13 Create roster from fight (minimal)**
  Suggested roles to confirm, which saves a roster to the group.
  *Done when:* the fight re-renders in role columns after saving.

- [ ] **M1.14 Deploy**
  Vercel or Netlify, plus Supabase.
  *Done when:* a fight link opens signed out on another device.

## M2 – Rosters and checklists

- [ ] **M2.1 Roster editor:** trial template, editable role counts, bench.
- [ ] **M2.2 Slot editor:** @account, character, sets, planned bars, assigned responsibilities.
- [ ] **M2.3 Per-boss variants.**
- [ ] **M2.4 Fork a fight into a roster** (full version).
- [ ] **M2.5 Planned vs actual on player cards:** differences in sets, bars and responsibilities.
- [ ] **M2.6 Checklist editor:** per trial, with per-boss overrides, target, floor and scope.

## M3 – ESO Logs URL import

- [ ] **M3.1 ESO Logs API client** (server-side; token caching, pagination).
- [ ] **M3.2 Probe:** confirm the field names for CombatantInfo gear and bars and for buff/debuff events.
- [ ] **M3.3 Normalizer:** ESO Logs data → `FightModel`.
- [ ] **M3.4 URL input UI** (accepts a bare code or a full URL with `fight`/`source`).
- [ ] **M3.5 Parity check:** the same fight from a local log and from ESO Logs renders equivalent cards.

## M4 – Provides map + live projection

- [ ] **M4.1 Seed map:** hand-curated set/skill → effect entries for the common raid buffs and debuffs.
- [ ] **M4.2 Learn from fights:** cast → effect through castTrackId, and set procs from gear. Each entry gets an evidence count.
- [ ] **M4.3 Confirm UI:** the group approves or rejects learned entries.
- [ ] **M4.4 Live projection:** editing a roster recalculates the MISSING list instantly.

## M5 – Logins

- [ ] **M5.1 Discord OAuth** through Supabase auth.
- [ ] **M5.2 Group membership:** claim a group with its edit key, then invite members.
- [ ] **M5.3 Turn on row-level security**; edit keys still work as a fallback.
