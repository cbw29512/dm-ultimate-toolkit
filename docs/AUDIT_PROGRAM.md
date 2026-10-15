# Toolkit audit and duplicate removal

## Objective

Make each retained tool complete its advertised core workflow, with one
canonical implementation for equivalent behavior. Iron Pit is excluded.

## Definition of Done for one tool

1. Its public entry point and required assets load.
2. Its core user workflow is exercised with recorded results.
3. Save/reopen, independent instances, and export/recovery work where applicable.
4. Edition/source boundaries and supported behavior are accurate.
5. Relevant mobile, keyboard, and print paths pass their checks.
6. Duplicate launch paths point to the selected implementation; prior user
   data remains readable/exportable before an old implementation is retired.

A successful HTTP request completes only the first part of this process.
Source tests and browser tests must be labeled separately.

## Audit state

Each project record carries a stable project ID, checked timestamp, entry
status, required-asset results, core-workflow status, evidence, and next step.
Workflow statuses are pending, source-tested, browser-tested, or blocked.
The Iron Pit placeholder never enters probes or audit totals.

Duplicate decisions record old route, selected project, reason, save handling,
and whether the duplicate remains executable. These decisions do not imply
unrelated features or data have already migrated.

## First batch

- Probe the 14 linked project entry points and their same-origin script/style assets.
- Replace three hub duplicates: character generation, abbreviated bestiary,
  and unversioned spell/condition cards. Link to the selected specialist tools.
- Keep old storage untouched and provide explicit local-data export.
- Validate Combat Companion's current regression suite and repair its first
  verified failure without introducing new combat mechanics.
- Publish the measured status in the hub so future work starts from evidence.

## Next batches

1. Combat Companion: monster instances, spell/concentration controls, persistence.
2. Rules/card family: sources, exact edition identity, printing, import/export.
3. Character family: legal choices, independent saves, sheets and printing.
4. Maps and display: build/move/reveal, persistence, player-safe output.
5. Adventures and journals: full run/resume, content imports and backups.
6. Community and art tools: their own product-specific workflows and boundaries.

Shared input data may be reused through versioned adapters. Similar names do
not establish equivalent mechanics or justify feature removal.

## First batch results — 15 October 2026

- 14/14 linked entry pages returned HTTP 200.
- 127/127 initial same-origin scripts/styles returned nonempty non-HTML assets.
- These checks exclude dynamically requested chunks, catalogs, API behavior,
  authenticated workflows, and browser interaction. Full audits remain open.
- Three executable duplicate hub routes now hand off to selected specialist
  tools. Their unused handwritten character and rules catalogs were removed.
  Legacy saved-data shapes and the original storage key remain intact.
- Old data exports preserve the exact original value, including unknown formats.
- Combat Companion's concentration fixture was repaired, and the current input/
  pass/fail handlers were exercised. All 19 source tests and GitHub verify checks
  passed; the fix was merged through PR #1. No production mechanics changed.
- Seven hub registry/backup/audit tests pass. Browser workflow review is pending.

Companion evidence: https://github.com/cbw29512/DnD-Combat-Companion/pull/1
