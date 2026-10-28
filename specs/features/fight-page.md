# Fight page

The shared view of one boss fight: who brought what, what was missing, and whether buffs and debuffs were covered. Linked in Discord, so it is server-rendered with OG meta.

- Plan: [.docs/plan.md → Fight page](../../.docs/plan.md)
- Tasks: M1.8–M1.12 in [.docs/tasks.md](../../.docs/tasks.md)
- Design reference: the "A · Codex" artboards on the [design canvas](https://claude.ai/artifact/85QoD82AytwUuH9smMmU1T)

## Decisions

### Identity
- Players are shown by **@account**. Character name and class are secondary text under it. Groups have many alts, so a character name alone doesn't say who someone is.
- Rosters match fights on @account. No manual character mapping is needed for local logs, because `UNIT_ADDED` carries the @account.

### Layout
- Left sidebar: group navigation (Fights, Rosters, Checklists, Provides map) and the pulls from this session. It stacks above the content on phones.
- Order of the main column: header → MISSING bar → checklist coverage → role columns.
- There is no per-player DPS ranking strip; DPS lives on the cards.

### Checklist coverage
- Two panels: **Buffs** and **Debuffs**.
- Each effect row shows: its icon, its name, its source count (plus "N% doubled" in amber when doubling passes the threshold), a timeline across the fight, and merged uptime / target.
- Buffs are measured on group members within the item's scope (Group, DDs, Tanks, Healers).
- Debuffs are measured on **bosses only**; adds are ignored.
- Multi-boss fights get a toggle on the Debuffs panel: **Both** plus one option per boss. "Both" draws one lane per boss and shows both percentages. A single boss draws one full-height lane.
- Grading: at or above target is green, between floor and target is amber, below floor or never applied is red.
- The MISSING bar is derived from the same data and follows the boss toggle. When "Both" is selected, an item takes its worst boss.

### Player cards
- Header: @account, character · class, and the role's numbers.
  - DDs: DPS.
  - Tanks: DPS and HPS.
  - Healers: HPS (in green) first, then DPS.
- A thin bar compares the player with the top player in the same role, coloured by role.
- Front and back bars are always visible, so a lead can check at a glance that one of the healers is covering a skill.
- Set chips, then contribution pills (effect + uptime, amber with ⚠ when under target).
- A "Gear, CP & mundus" button at the foot of the card opens the gear flyout.

### Flyouts
- Detail opens in a drawer from the right over a dimmed page. The page never navigates away.
- Only one flyout is open at a time. The close button and a click on the dimmed page both close it.
- **Gear flyout:** set piece counts, then Armor / Jewelry / Front bar / Back bar rows (slot, set, quality, trait, enchant), slotted CP (Warfare, Fitness) and mundus.
- **Sources flyout** (opened by clicking a coverage row):
  - the merged timeline, following the boss toggle
  - **every** source, even ones that added nothing: ability, player, kind (Skill / Set / Enchant), uptime and its own timeline
  - the uptime a source added is drawn in gold; time it overlapped another source is drawn grey
  - each source states "adds X%, Y% overlapped"
  - when doubling passes the threshold, an amber note names the players who were doubling up
  - an effect with no sources says it was never applied and, if the roster assigns it, who it was assigned to

### Overlap rules
- Overlap is measured **per target**. Two tanks each buffing themselves is not doubling; two players keeping the same debuff on the same boss is.
- One player applying the same effect from two sources (e.g. a skill and a set) counts as overlap.
- "Doubled" for a row is the union of all overlap time on that target, as a percentage of the fight.

## Acceptance criteria
1. The header shows trial, difficulty, pull number, boss name(s), kill/wipe, duration, group DPS and deaths, plus score when the fight has one.
2. Every player appears under their @account, with character name and class as secondary text.
3. DD cards show DPS; tank cards show DPS and HPS; healer cards show HPS then DPS.
4. Buffs and debuffs appear in separate panels.
5. On Lylanar & Turlassil, the Debuffs toggle offers Both / Lylanar / Turlassil, and switching it changes the debuff timelines, the debuff uptimes and the MISSING bar.
6. Adds never contribute to debuff uptime.
7. Clicking a coverage row opens the sources flyout. It lists every source of that effect, including ones that added 0%.
8. In the flyout, each source's added + overlapped time equals its own uptime.
9. Clicking "Gear, CP & mundus" opens the gear flyout for that player; only one flyout is open at a time.
10. The page works at phone width: the sidebar stacks, role columns stack, and the coverage timelines scroll or shrink without horizontal page scroll.

## Test plan
- **Unit (`tests/unit/utils/`):** the overlap maths in `mergedEffectsOnTarget`. Cover two overlapping sources, one player with two sources, a source fully inside another (adds 0%), and no sources.
- **Unit (`tests/unit/components/`):** the card picks the right numbers per role; a coverage row's doubled flag appears only above the threshold.
- **Integration:** on `dsr-twins.log` (Lylanar & Turlassil) from `.docs/sample-logs/`, debuff uptime per boss excludes adds, and the toggle data has one entry per boss.
- **E2E:** open a fight, switch the boss toggle, open and close each flyout.

## Open
- How several group members' buff uptimes combine into one checklist number.
- The "doubled" threshold (the mockup uses 10% of the fight).
