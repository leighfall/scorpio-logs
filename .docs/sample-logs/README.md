# Sample logs

Real `Encounter.log` extracts to develop and test against, so the full log (9.8 GB) never goes into the repo. Each file is a **standalone, valid log**: it can be parsed on its own exactly like a full `Encounter.log`.

## Source

All five come from one veteran Dreadsail Reef session recorded by @SnS_Scorpio (Himalia Borealis):

- **Started:** 2026-07-20 22:40 EDT (`BEGIN_LOG` 1784601613335)
- **Client:** eso.live.12.0
- **Location in the original `Encounter.log`:** bytes 1176848452–1378897068

## Files

| File | Size | Fight | Result | Covers |
|---|---|---|---|---|
| `dsr-trash.log` | 2.4 MB | first trash pull | – | session header, first `PLAYER_INFO` (gear + bars) for all 12 players, a simple non-boss fight |
| `dsr-bow-breaker.log` | 11.8 MB | Bow Breaker | kill | a short boss fight with one boss |
| `dsr-twins.log` | 46.0 MB | Lylanar & Turlassil | kill | two bosses at once, player deaths |
| `dsr-reef-guardian-wipe.log` | 35.6 MB | Reef Guardian, pull 1 | wipe | a boss that splits into several boss units (`isBoss` units added mid-fight); the boss respawns afterwards |
| `dsr-taleria.log` | 40.5 MB | Tideborn Taleria | kill | final boss; `END_TRIAL` with success and score 299,949 |

## How they were cut

Each file contains:

1. **Every line from the session start up to the pull, except the high-volume events.** It keeps `BEGIN_LOG`, `ZONE_CHANGED`, `MAP_CHANGED`, `UNIT_*`, `ABILITY_INFO`, `EFFECT_INFO`, `PLAYER_INFO`, `TRIAL_INIT` and earlier `BEGIN_COMBAT`/`END_COMBAT` markers. It drops `COMBAT_EVENT`, `EFFECT_CHANGED`, `BEGIN_CAST`, `END_CAST` and `HEALTH_REGEN`.
2. **Every line from the 2 minutes before the pull**, so pre-pull buffs and debuffs are present.
3. **The whole fight**, from `BEGIN_COMBAT` to `END_COMBAT`, unmodified.
4. **Up to 10 seconds after**, stopping before the next `BEGIN_COMBAT`.

## Caveats

- **Empty earlier fights:** earlier fights in the session still appear as `BEGIN_COMBAT`/`END_COMBAT` pairs, but their combat and effect events were dropped. A parser will see them as empty fights.
- **Long-running buffs:** a buff gained more than 2 minutes before the pull and never refreshed (e.g. food) has no `GAINED` line in the file.
- **Accuracy checks:** use the full log (`ESO_LOG_PATH`) for checks against ESO Logs that rely on exact pre-fight state.
- **Repo size:** these files total ~136 MB, and git keeps every version forever. Avoid re-cutting or replacing them casually.
