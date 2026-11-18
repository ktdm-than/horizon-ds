# Intent gaps

Fields left empty in `src/components/**/<Name>.intent.json` because their one source is silent or
ambiguous. They are for a human to close **in Figma**, not in JSON. Written by doc-generator (Job A)
at `14a76fd` from the Figma file `l87TswOf2FHCxsYmK8XhHJ`, read live on 2026-11-18 (refresh after
the Usage frames were added to the Button and Card pages).

## Closed in this refresh

- Button `use_when`, `dont_use_when`: now transposed from the `Usage` frame 315:1428 on the Button
  page (3:3), sections "Use a button" and "Do not use a button".
- Card `use_when`, `dont_use_when`: now transposed from the `Usage` frame 315:470 on the Listing
  Card page (7:25), sections "Use a card" and "Do not use a card".

## Open

| Component | Empty field(s) | Missing source |
|---|---|---|
| Button | `variant_intent.*.purpose` (state, shape, showLeadingIcon, showTrailingIcon) | The Usage frame (315:1428) names the variants only collectively ("Buttons come in different variants (such as filled or outlined) and interactive states (default, hover, focus, disabled)…"; Best Practice: "Use distinct styles (such as fill vs. outline) to distinguish between primary and secondary actions."). It never says which value is for what, so no per-value purpose was transposed. A designer should state what `fill` and `outline` (and each state, and the icon toggles) are for. |
| Button | `placement`, `pairs_with` | Every Button story renders Button alone (or beside other Buttons, in Interactive). No story places it in another component. |
| Card | `variant_intent.showContentSlot.purpose` | The Usage frame (315:470) says "Can also contain other components in slot area." but does not name `showContentSlot` or say what `true`/`false` are for, so no purpose was transposed. |
| Card | `placement` | Card stories render Card alone in a 534px fixture frame. |
| CardContainer | `use_when`, `dont_use_when`, `variant_intent.state.purpose` | Its sub-component block on the Card page (306:601, `[ card container ]`) still shows the component only, with no usage text. |
| CardImage | `use_when`, `dont_use_when`, `variant_intent.*.purpose` (ratio, state, showIconBtn) | Its sub-component block (306:574, `[ card image ]`) still shows the component only, with no usage text. |
| CardLayout | `use_when`, `dont_use_when`, `variant_intent.*.purpose` (orientation, showContentSlot) | Its sub-component block (306:619, `[ card layout ]`) still shows the component only, with no usage text. |
| CardText | `use_when`, `dont_use_when`, `variant_intent.*.purpose` (Metadata, Review, Price) | Its sub-component block (306:551, `[ card text ]`) still shows the component only, with its textBox hidden. **Still unresolved:** the `_DocBody` 306:501 is still tagged `[ card ]` (re-read live) while its text describes the text container, "Text content container for listing cards (Title, Location, Rating, Pricing)", with a Do, a Don't and a Best Practice. It was transposed to neither Card nor CardText. Card now has its own usage (315:470), so a designer should either retag 306:501 `[ card text ]` or move its text into CardText's block. |

## Open questions (not intent fields)

- **Button and Card Usage frames carry no `[ tag ]`.** 315:1428 and 315:470 are attributed by their
  headings ("Use a button", "Use a card") and the page they sit on, not by a `_DocBody` tag.
- **Button `use_instead` is not a component.** Figma names "text links or navigational tabs" as the
  alternative to a navigation button. Neither exists in the registry or `src/components/`, so
  `dont_use_when[0].use_instead` holds Figma's words, not a component name.
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
