# D&D repository consolidation review — 2026-10-15

Status: proposal for Chris's review. This document records observed source evidence and recommendations; it does not supersede existing product contracts.

## Objective and Definition of Done

Reduce duplicated development while preserving working products, saved data, rules accuracy, and distinct table workflows.

Consolidation is complete when every in-scope repository has a documented destination and owner, retained features have demonstrated parity or an explicit retirement decision, migrations preserve user state, and navigation identifies the canonical implementation. Repository count alone is not the success measure.

The first deliverable is this evidence-based review. This PR changes documentation only.

## Review coverage and limits

- Discovered 196 repositories through two GitHub repository-search pages; the third page was empty.
- Checked repository metadata for 36 D&D/tabletop-related candidates.
- Inspected repository-root listings for the candidates where available; 18 primary project READMEs and additional available READMEs were read.
- Read DM Forge's existing consolidation ledger, the toolkit registry and parked list, DungeonCards/DNDWebTTRPG parked notices, and DND Blocks' current handoff.
- Runtime behavior, deployed URLs, CI results, imports, account records, and migration compatibility were not tested.
- README feature and test claims below describe repository documentation, not new independent certification.
- This is an initial product-family inventory, not a complete file-by-file or licensing audit. Guild/history repositories, Sin Eater's Feast, other RPG projects, and the accidental FantasyColorForge placeholder need an expanded pass.

## Findings that change the consolidation plan

1. **There are competing hub authorities.** DM Forge's ledger calls monstercardforge the single public DM website; dm-ultimate-toolkit calls itself the hub; FlorenceRPGWebsite also includes a central tool bench. Choose one public discovery owner and make the others purposeful entry points.
2. **Parked markers conflict with substantive product contracts.** DungeonCards/PARKED.md and DNDWebTTRPG/PARKED.md describe consolidation into Iron Pit, while their READMEs describe separate card-library and manual-tabletop products. Resolve these notices through a recorded decision, not an automatic deletion.
3. **Some integration claims lack demonstrated feature parity.** The toolkit registry labels DungeonCards, DNDWebTTRPG, DungeonMaps, DungeonGate, and others folded into hub rooms. This review found no parity evidence sufficient to retire the originals.
4. **CharacterForge is not safely dismissible as an empty old builder.** Its current README documents a substantial account/campaign/Netlify migration. dnd-character-forge has a different local-first pregen/print workflow. Compare them before choosing what to retire.
5. **Source catalogs and automated engines have different responsibilities.** DungeonCards documents source-traceable public rules exports; Iron Pit owns certified automated combat. A readable monster record is not proof its abilities are automated.
6. **Several apparent duplicates are distinct tools.** Scribe records/transcribes sessions; the hub scribe is described as local notes. Cleric in a Box tracks a multiplayer artifact; the hub's healing entry describes starter-fighter potions/rests. The language repo specifies spoken translated/gibberish audio; the hub describes ciphers.
7. **The hub inventory misses recent work.** HUB_APPS currently omits DNDblocksbattlemaps, DnD-Combat-Companion, DNDcellphonehelper, oneshot-forge, and blackinkbestiary.
8. **A misleading candidate should leave the D&D inventory.** nothingbuta currently describes One Clear Tool, a general calculator product.

## Proposed product map

These are proposed responsibilities, not approval to retire repositories.

| Responsibility | Proposed source/owner | Consolidation action |
| --- | --- | --- |
| Public tool discovery | Decide among toolkit, DM Forge, and Guild Tools | Use dm-ultimate-toolkit as this review's existing inventory surface; choose the final public front door separately. |
| Certified automated fights | D20-ironpit | Preserve engine, certification, immutable definitions, independent fight state, logs, and replay. |
| Manual live combat | DnD-Combat-Companion; compare DNDCards/DNDWebTTRPG/DM Forge | Select the intended table workflow before integrating runtime state. |
| Public rules references | DungeonCards candidate; reconcile each consumer | Preserve exact edition, source, licensing, and generated export ownership. Do not hand-copy catalogs. |
| Character generation and sheets | dnd-character-forge; compare CharacterForge | Preserve the working pregen/print path; review account/campaign features independently. |
| Interactive block battlefield | DNDblocksbattlemaps | Keep separate from automated Iron Pit; assess reuse from older map experiments. |
| Adventures and teaching | oneshot-forge plus reviewed source packs | Prefer content/package imports to repeated adventure-specific engines. |
| Portable DM/player display | DNDcellphonehelper plus companion display requirements | Compare local second-screen and remote-player transport needs. |
| Journals and recording | tomeforge-journal; tabletop-scribe | Link related tools; recording/transcription and locked journal pages are distinct capabilities. |
| Art production | blackinkbestiary; compare MonsterColoringBook | Compare manifests, art provenance, approval gates, storefront, and outputs before moving anything. |
| Community/table formation | FlorenceRPGWebsite; dinnerdiceanddragons | Align navigation and responsibilities; keep community intake outside combat engines. |
| Specialized table tools | nothingbutadiceroller; healingbox | Preserve their mature specialist workflows and link them from the chosen hub. |

## Repository-by-repository disposition

Review levels: source = root/README or relevant source inspected; metadata = repository metadata only; incomplete = expected content was unavailable. Every disposition remains proposed.

| Repository | Evidence | Proposed disposition |
| --- | --- | --- |
| D20-ironpit | source | Keep canonical automated combat engine; read locked rules/contracts before any mechanics work. |
| D20-iron-pit | source: PARKED.md-only root | Retire placeholder after canonical links are checked. |
| DNDCards | source | Compare standalone card/adventure library with DungeonCards and manual runtimes; preserve production main, not dormant experiments. |
| DungeonCards | source + parked conflict | Retain source-traceable catalog/platform candidate; reconcile contradictory parked notice. |
| monstercardforge | source + consolidation ledger | Preserve real DM toolkit modules; reconcile public-hub ownership. |
| DnD-Combat-Companion | source | Keep active manual combat workflow; prioritize shared references over duplicate catalog expansion. |
| DNDcellphonehelper | source | Keep local laptop/iPhone/ESP32 workflow; review display adapter reuse. |
| DNDblocksbattlemaps | source + handoff | Keep block battlefield; verify pending release/runtime work separately. |
| DungeonMaps | source | Reuse only proven local campaign/network seams if needed; map canvas/tokens remain documented next work. |
| DNDWebTTRPG | source + parked conflict | Preserve seven-slot scene/save-resume contracts until manual-runtime destination is decided. |
| CharacterForge | source | Review account/campaign migration before retirement; not interchangeable with a static pregen generator. |
| dnd-character-forge | source | Keep pregen/print release-candidate path; verify deployed acceptance before claiming release readiness. |
| dm-ultimate-toolkit | source | Existing inventory/review surface; correct omitted projects and unsupported folded/superseded claims. |
| dnd-campaign-portal | source | Inspect actual campaign components; README is Create React App boilerplate, so workflow value remains unverified. |
| DungeonGate | source | Park future voice/auth/transcription work; compare with Scribe before any rebuild. |
| oneshot-forge | source | Adventure-package candidate owner; audit package/runner compatibility before importing source packs. |
| blackinkbestiary | source | Preserve human approval/locked art production; compare older coloring pipeline selectively. |
| MonsterColoringBook | source root, no README found | Review pipeline/storefront/output ownership against blackinkbestiary; do not assume complete replacement. |
| tomeforge-journal | source | Keep local-first locked-page journal and explicit backup behavior; explore imports rather than replacement. |
| healingbox | source | Keep shared homebrew artifact tracker; avoid substituting generic healing controls. |
| nothingbutadiceroller | source | Keep specialist 3D roller, shortcuts, and cosmetic dice workflows. |
| nothingbuta | source | Exclude from D&D consolidation: current product is general calculators. |
| tabletop-scribe | source | Compare actual microphone/upload/transcription pipeline with future voice work; plain notes are not parity. |
| DNDLanguageTranslator | source | Specification-stage spoken fantasy dialogue; distinguish from hub text ciphers. |
| DNDTeachingAdventureDemonsWrath | source root | Content-import candidate after adventure/source/license review. |
| DND_DM_Player_Instruction | source | Combine reviewed teaching material with the chosen learning path. |
| L2PTTRPG | source | Learning/community module candidate; preserve its multi-system and edition boundaries. |
| FlorenceRPGWebsite | source | Community/learning entry point; reconcile Tool Bench ownership with toolkit/DM Forge. |
| dinnerdiceanddragons | source | Separate table-formation product; preserve auth/persistence and release boundaries. |
| WendyBdayOneShot | source | Adventure-content import candidate; preserve personal content and 2014 identity. |
| black-anvil-tavern | source | Reuse seeded generator/content selectively; quest-board/admin workflow needs separate comparison. |
| dungeoncourtroom | source root | Inspect content/API purpose before classifying as an adventure; no README found. |
| dungeoncourtroom-pipeline | source root | Production/media pipeline review; do not treat output as a playable adventure without inspection. |
| lootforge | incomplete; size 0 metadata | Placeholder retirement candidate; root fetch did not produce an inspectable listing. |
| dnd_ai_dungeon_master | source: title-only README | Placeholder retirement candidate; no implemented AI DM was found in the inspected root. |
| Myth-Etcher | incomplete; size 0 metadata | Placeholder candidate; implementation/purpose unverified. |

## State and data contract before integrations

Define and version these boundaries before changing application code:

- Repository record: owner/name, product purpose, responsibility, source commit, review date, proposed disposition, destination, evidence, open decisions.
- Rules definition: exact system/edition, stable source ID, source version, license/attribution, reference data, supported capabilities.
- Runtime instance: independent ID, source-definition reference, current HP/resources/conditions, ownership/visibility, encounter/session reference.
- Saved user data: schema version, source tool, system identity, export/import validation, migration and rollback rules.
- Integration/readiness record: supported workflow, tested surface, source commit, CI/browser/print evidence, known missing behavior.
- Definition data, runtime state, user saves, art approvals, and presentation remain separate. Do not share browser storage keys without a reviewed migration.

## Work order

1. Resolve public hub ownership and record the intended manual-table workflow.
2. Correct inventory omissions and inaccurate integration/retirement labels using that decision.
3. Compare public rules exports and consumer schemas; assign source authority per rules domain, with versioned adapters.
4. Prove one narrow integration end to end: exact edition/source record to independent combat card, save/reopen, player-safe display, and print as applicable.
5. Compare character, map, adventure, journal/voice, and art families one at a time; record retained features before importing.
6. Archive reviewed placeholders and superseded repositories only after destinations, state exports, and canonical links are recorded.
7. Resume feature work from each retained project's own Definition of Done and current contracts.

## Evidence links

- [Toolkit registry](https://github.com/cbw29512/dm-ultimate-toolkit/blob/main/src/lib/hub.ts), [parked list](https://github.com/cbw29512/dm-ultimate-toolkit/blob/main/src/lib/parked.ts), and [starter combat](https://github.com/cbw29512/dm-ultimate-toolkit/blob/main/src/lib/combat.ts).
- [Existing DM Forge consolidation ledger](https://github.com/cbw29512/monstercardforge/blob/main/docs/DND_REPOSITORY_CONSOLIDATION.md).
- [DungeonCards README](https://github.com/cbw29512/DungeonCards/blob/main/README.md) and [parked notice](https://github.com/cbw29512/DungeonCards/blob/main/PARKED.md).
- [DNDWebTTRPG README](https://github.com/cbw29512/DNDWebTTRPG/blob/main/README.md) and [parked notice](https://github.com/cbw29512/DNDWebTTRPG/blob/main/PARKED.md).
- [CharacterForge](https://github.com/cbw29512/CharacterForge/blob/main/README.md) and [dnd-character-forge](https://github.com/cbw29512/dnd-character-forge/blob/main/README.md).
- [Iron Pit contract entry point](https://github.com/cbw29512/D20-ironpit/blob/main/README.md) and [DND Blocks live handoff](https://github.com/cbw29512/DNDblocksbattlemaps/blob/main/PROJECT_STATE.md).

## Validation of this change

Checked inventory counts, repository identities, proposed destinations, and evidence links against the retrieved GitHub responses. Documentation only; no tests, deployment checks, or feature-parity certification were run. No repositories, applications, user saves, or production settings were changed by this review.
