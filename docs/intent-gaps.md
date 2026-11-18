# Intent gaps

Fields left empty in `src/components/**/<Name>.intent.json` because their one source is silent or
ambiguous. They are for a human to close **in Figma**, not in JSON. Written by doc-generator (Job A)
at `b61eb78` from the Figma file `l87TswOf2FHCxsYmK8XhHJ`, read live on 2026-11-18.

| Component | Empty field(s) | Missing source |
|---|---|---|
| Button | `use_when`, `dont_use_when` | No usage region on the Figma documentation page. The Button page (3:3) carries only an Anatomy frame (82:139: core structure and a state list); no when-to-use, when-not-to-use or best practice. |
| Button | `variant_intent.*.purpose` (state, shape, showLeadingIcon, showTrailingIcon) | No usage region, so no variant purposes. |
| Button | `placement`, `pairs_with` | Every Button story renders Button alone (or beside other Buttons, in Interactive). No story places it in another component. |
| Card | `use_when`, `dont_use_when` | **Ambiguous usage region.** The Card documentation page (Listing Card, 7:25) has one usage region (`_DocBody` 306:501) tagged `[ card ]`, but its text describes the text container, "Text content container for listing cards (Title, Location, Rating, Pricing)". Its text layer's tag is named `[ card text]` underneath the override, and the same text sits in the older Anatomy frame (227:331) under `[ card text]`. It is unclear whether its Do and Don't belong to Card or to CardText, so it was transposed to neither. A designer should either retag it `[ card text ]` or write Card's own usage. |
| Card | `variant_intent.showContentSlot.purpose` | No variant purposes in Figma. |
| Card | `placement` | Card stories render Card alone in a 534px fixture frame. |
| CardContainer | `use_when`, `dont_use_when`, `variant_intent.state.purpose` | Its sub-component block on the Card page (306:601, `[ card container ]`) shows the component only, with no usage text. |
| CardImage | `use_when`, `dont_use_when`, `variant_intent.*.purpose` (ratio, state, showIconBtn) | Its sub-component block (306:574, `[ card image ]`) shows the component only, with no usage text. |
| CardLayout | `use_when`, `dont_use_when`, `variant_intent.*.purpose` (orientation, showContentSlot) | Its sub-component block (306:619, `[ card layout ]`) shows the component only, with no usage text. |
| CardText | `use_when`, `dont_use_when`, `variant_intent.*.purpose` (Metadata, Review, Price) | Its sub-component block (306:551, `[ card text ]`) shows the component only, with no usage text. The usage text that describes it is tagged `[ card ]` (see Card above). |

## Open questions (not intent fields)

- **Button: the anatomy lists more than the component set has.** Anatomy 82:139 lists a `ghost`
  container and Pressed/Active, Loading and Error states. The component set `Btn` (280:276) and the
  code have only `fill`/`outline` and default/hover/focus/disabled (already recorded as G4 in
  `docs/button-build-report.md`). CLAUDE.md asks for loading and error where the product uses them.
- **Button: focus is a colour change only.** `Button.css:93` removes the outline. Whether the
  focus colour change meets WCAG 2.4.11/1.4.11 contrast is for the release review, not this file.
- **IconBtn has no registry row.** CardImage composes it (`src/components/IconBtn/`), and it is
  listed in Card's and CardImage's `pairs_with`, but the board has no Components row for it, so it
  has no `Development` status and got no intent file of its own.
- **Card `Composes` is empty on the board.** The code composes CardContainer, CardLayout, CardImage,
  CardText and IconBtn; the subcomponents have no registry rows. `Composes` is the Engineer's column.
- **Card documentation header** shows "Documentation In Progress" and "Development On Hold"
  status pills, while the board reads Development = Completed.
