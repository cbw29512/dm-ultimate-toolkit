# Consolidated hub — visual integration pass

## Definition of Done

Chris authorized one organized home for the D&D projects on 15 October 2026.
The homepage groups the tools by table task, provides search and category
filters, and distinguishes linked projects from built-in workbench tools.
Iron Pit appears only as a reserved placeholder. Its repository, deployment,
engine, rules, and saved state are outside this change.

This pass consolidates discovery and navigation. It does not claim linked
applications share accounts, storage, catalogs, or runtime state.

## Schema and state

`ToolkitProject` contains a stable ID, title, category, purpose, destination,
source repository, icon, and availability. `destination` is a discriminated
union: external tool, internal workbench, source-only project, or placeholder.
The explicit destination prevents a source repository from being presented
as a completed playable tool.

The home screen has two temporary state values: search query and selected
category. The existing batch-review store and all workbench saves retain their
existing keys. No migration or account/database change is required.

## Logic flow

Read immutable project records → filter by category and search → display
task groups → open the selected destination. A placeholder has no launch
action. A failed filter reports an error and returns an empty list.

## Product boundaries

- The hub is the common discovery page for this consolidation pass.
- Iron Pit has one placeholder; the hub's previous starter fight route now
  displays that placeholder instead of launching a duplicate simulator.
- Specialist tools keep their existing runtimes, source data, and saves.
- Workbench tools remain available and are labeled as local workbench tools.
- Older experiments remain discoverable in a source-review section.
- No repository is archived or deleted in this pass.

## Verification

Run typecheck, the repository regression suite, and the production build.
Validate registry uniqueness, safe destinations, category filtering, and the
Iron Pit placeholder boundary. Browser checks depend on available tooling;
record verification limits in the delivery report.

## Results from this pass

- TypeScript check and Netlify production build pass.
- Four focused registry tests pass, including the non-actionable Iron Pit boundary.
- The separate application/auth tests pass: 55/55.
- The full template suite has the same 16 failures on the unchanged baseline
  and this change (179/195 baseline; 183/199 after adding the four registry tests).
  These cover missing ignored template files and existing branding expectations.
- The actual production server renderer returns HTTP 200 and the new hub content.
- Browser layout/interaction QA is unavailable in this session. This is a
  private review version, not a production-readiness certification.
- `node scripts/export-review.mjs` exports the actual production-rendered routes
  and assets for the private review. The existing Netlify deployment is unchanged.
