# Estimation & Decomposition Skill

Produce time estimates and task breakdowns for software work. Estimates are anchored to real calibration data when available, and adjusted for skill level and AI availability.

## Private Profile Repo

Personal context lives in a private GitHub repo with this structure:

```
claude-private/
├── calibration.md     # Past project velocity anchors
├── profile.md         # Personal context — used to frame risks and feasibility
├── metrics.md         # Actual vs estimated tracking over time
└── reports/           # Generated estimation reports
    └── YYYY-MM-DD-scope-slug.md
```

When a repo slug is provided, fetch both `calibration.md` and `profile.md`. Use `profile.md` as background context — it informs how risks and the feasibility verdict are framed (e.g. sustained high cognitive load, energy patterns, work style) but does not affect hour totals. No specific format is required. If `profile.md` does not exist, proceed without it.

## Loading Profile Data

When a GitHub repo slug is provided (e.g. `username/repo`):

```bash
# Fetch calibration data
gh api repos/{owner}/{repo}/contents/calibration.md --jq '.content' | base64 -d

# Fetch profile (non-fatal if missing)
gh api repos/{owner}/{repo}/contents/profile.md --jq '.content' | base64 -d
```

If auth fails, tell the user to run `gh auth login`.

**Resolution order for calibration data:**
1. GitHub repo slug → fetch `calibration.md`
2. File path → read directly
3. Pasted inline → use as-is
4. Nothing → proceed with warning: "No calibration data — estimates are unanchored and may be significantly off"

## Saving Reports

After generating a report, offer to save it to the private repo:

```bash
gh api repos/{owner}/{repo}/contents/reports/{filename} \
  --method PUT \
  --field message="Add estimation report: {scope}" \
  --field content="$(base64 -w 0 <<< '{content}')"
```

Filename format: `YYYY-MM-DD-{scope-slug}.md` (e.g. `2026-05-24-vue-testing-suite.md`)

If saving fails or no repo was provided, output the filename and full report content so the user can save it manually.

## Skill Level Modifiers

Pull from `rules/communication.md`. Apply per-task based on the technology involved.

## References

- [estimation-rules.md](references/estimation-rules.md) — multipliers, AI factors, anchoring logic
- [decomposition.md](references/decomposition.md) — how to break scope into epics, stories, tasks
- [calibration-template.md](references/calibration-template.md) — template for `calibration.md`
- [profile-template.md](references/profile-template.md) — template for `profile.md`
- [metrics-template.md](references/metrics-template.md) — template for `metrics.md`
