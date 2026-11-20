# Release review: Card

| | |
|---|---|
| Component | Card, with subcomponents CardContainer, CardLayout, CardImage, CardText, and IconBtn (composed by CardImage) |
| Registry row | Components `recjoIyNg460a5FQr` (Card, ORGANISMS) |
| Woken by | The release agent, "prepare for release" (review run, no version named, no publish) |
| Commit reviewed | `c15aa7276dbb3ed6dce06bc1b170dfb00530c86a` docs(button,card): add best practice to intent (#21) |
| How it reached `main` | PR #21, merged by squash. Code last changed by PR #14 (`0d9e91f`, the registry `Commit`); since then only intent files, tests and one removed line per `.tsx` |
| `main` at review time | `c15aa72` (level with `origin/main` after `git fetch`) |
| Review date | 2026-11-20 |
| Verdict | **Blocked** (gates 1, 3, 5; checks 1 and 5 for IconBtn) |

Every file below was read at `c15aa72` with `git show c15aa72:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, section 227:333).

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | **Fail** | Present: `Card.intent.json`, `CardContainer.intent.json`, `CardLayout.intent.json`, `CardImage.intent.json`, `CardText.intent.json` in `src/components/Card/`. **Missing:** `src/components/IconBtn/IconBtn.intent.json` (`git show c15aa72:src/components/IconBtn/IconBtn.intent.json` → "does not exist"). IconBtn is a subcomponent: `CardImage.tsx:2` imports it and `CardImage.tsx:23` renders it. `docs/intent-gaps.md` records why: IconBtn has no registry row, so it got no intent file. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read, not written). `Design` = Done. |
| 3 | Tokens clean | **Fail** | Raw `px` in `.tsx` files in the component folders (React numeric style values are px): `Card.stories.tsx:16` `width: 534`; `CardContainer.stories.tsx:11` `width: 424`, `:17` `height: 104`; `CardImage.stories.tsx:19` `width: … 256 : 192`; `CardLayout.stories.tsx:13` `width: … 302 : 453`; `CardText.stories.tsx:11` `width: 278`. Raw font value in IconBtn: `IconBtn.css:35` `line-height: 1;` (and `:36` `font-variation-settings: 'FILL' 1`, which has no token family; for a human to rule on). The component `.css` and `.tsx` files in `src/components/Card/` have no raw hex, px or font value, and nothing references `--primitives-*`. |
| 4 | Public surface decided | Pass | `src/index.ts:6-10` exports `Card`, `CardContainer`, `CardLayout`, `CardImage`, `CardText` and their `*Props` types plus `CardLayoutImageProps`; `src/index.ts:5` exports `IconBtn`, `IconBtnProps` (needed for `CardImage`'s `iconBtn` prop). No internal-only code is exported. See Observation 1 on IconBtn being public without a registry row. |
| 5 | Names final | **Fail** | Figma `componentPropertyDefinitions` match the code's prop names exactly: Card `showContentSlot#227:1`, `ContentSlot#227:0`; CardContainer `state`, `containerSlot#163:8`; CardLayout `orientation`, `showContentSlot#166:14`, `ContentSlot#166:13`; CardImage `ratio`, `state`, `showIconBtn#163:3`; CardText `Metadata#162:0`, `Review#162:1`, `Price#162:2`; IconBtn `state`. **But** `docs/card-build-report.md:77` (N1) leaves an open naming question on CardText: "Suggest renaming in Figma to `metadata`, `review`, `price` (or `showMetadata`, `showReview`, `showPrice`), then the code follows". Figma still reads `Metadata`, `Review`, `Price` today. Until a designer decides, these public prop names are not final. If renamed after publishing, a rename is a breaking change (VERSIONING.md). |
| 6 | States complete | Pass | Figma states: CardContainer `state` idle/hover (163:44, 163:46); CardImage `state` idle/hover × `ratio` 1:1/4:3 (163:55, 163:58, 163:57, 163:60); IconBtn `state` idle/hover (163:73, 163:75). Card, CardLayout and CardText define no states. Each is implemented (`data-state` in `CardContainer.css:12`, `CardImage.css:36`, `IconBtn.css:22`) and has a story (`ContainerIdle`, `ContainerHover`; `Image11Idle`, `Image11Hover`, `Image43Idle`, `Image43Hover`; IconBtn `Idle`, `Hover`). Figma models no focus, pressed or disabled state (`docs/card-build-report.md` D6). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `c15aa72`. `package.json` on `main` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns 404 and there is no `v*` tag, so nothing is published, and `release:publish` accepts only the version already in `package.json` on `main`. 0.1.0 is the version this would ship in; VERSIONING.md "Before 1.0.0" says what a 0.x number promises. A human still approves the version. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | **Fail (IconBtn)** | Card, CardContainer, CardLayout, CardImage, CardText each have all eight fields. Empty fields are all listed in `docs/intent-gaps.md` (Open): Card `variant_intent.showContentSlot.purpose`, `placement`; CardContainer, CardImage, CardLayout, CardText `use_when`, `dont_use_when`, `best_practice`, `variant_intent.*.purpose`. IconBtn has no intent file, so none of its eight fields exist (same root cause as gate 1). |
| 2 | `dont_use_when` names an alternative | **Warn** | Card: 4 of 4 entries have `use_instead: null`. Subcomponents have no entries. Never blocks. |
| 3 | a11y specific | Pass | 15 entries across the five files, each a behaviour with a line that says it at `c15aa72`: `Card.tsx:29` `<div className="hds-card">`, `:15` `CardProps` (no handler props), `:30` `state="hover"`; `CardContainer.tsx:14` nested divs, `CardContainer.css:12` hover-only selector; `CardLayout.tsx:26`, `:27` `ratio="1:1"`; `CardImage.tsx:18` `alt = ''`, `:21` `{src && <img`, `:22` `aria-hidden="true"`, `:23` `<IconBtn {...iconBtn} state={state} />`; `CardText.tsx:34` `<p` title, `:35`, `:37` `{Metadata &&`, `:41` rating `<p>`. IconBtn has no a11y entries because it has no file (counted under check 1). |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded. All names in the five files are defined in `build/css/tokens.css`. `color-*` names are also in `tokens-dark.css`, as their siblings are; `label-default`, `body-body4`, `list-item` are also in `tokens-english.css` and `tokens-burmese.css`, as theirs are; spacing, `elevation-level1` and `overlaygradient` are `:root`-only, as their siblings are. IconBtn's tokens from its CSS (`borderradius-md`, `color-bg-base`, `color-icon-accent-red`, `fontsize-md`, `spacing-2xl`, `spacing-none`, `elevation-level1`) also resolve in every mode that defines their siblings. No mode gap. |
| 5 | All variants covered | **Fail (IconBtn)** | Covered in `variant_intent` and stories: Card `showContentSlot`; CardContainer `state`; CardLayout `orientation`, `showContentSlot`; CardImage `ratio`, `state`, `showIconBtn`; CardText `Metadata`, `Review`, `Price`. IconBtn's `state` (idle, hover; `IconBtn.tsx:7`) has stories but no `variant_intent`, because it has no intent file. |
| 6 | No two components claim the same job | Pass | Card's `use_when` compared with Button's and with the subcomponents' (all empty). Card displays content on one topic; Button triggers actions. Closest pair: Card "entry points into deeper levels of detail or navigation" and Button "entry points into deeper workflows, dialogs, or page transitions". One is a content summary, the other an action control, so this is not judged the same situation. A human may want one to name the other. |

## Observations (did not change the verdict)

1. **IconBtn is public with no registry row.** `src/index.ts:5` exports it, so publishing Card ships
   IconBtn as public API. The board has no IconBtn row, so it has no `Development`, no review of its
   own and no `Release Verdict`. A human should add the row; the Engineer then links it in Card's
   `Composes` (still empty).
2. **CardText's usage text sits under the wrong tag** in Figma: `_DocBody` 306:501 is tagged `[ card ]`
   but describes CardText (`docs/intent-gaps.md`).
3. **Card's `showContentSlot#227:1` and `ContentSlot#227:0` are unwired in Figma** (D9); the code wires
   them through to CardLayout. Figma's generated code for 218:143 exposes no props, which agrees.
4. **Figma's Card page header** shows "Documentation In Progress" and "Development On Hold" while the
   board reads Completed (`docs/intent-gaps.md`).
5. **Provisional tokens** stand in for unbound Figma sizes: `--spacing-3xl` for the slot height (D3),
   `--spacing-2xl` / `--fontsize-md` for IconBtn's size and glyph (D5).
6. **No focus, pressed or disabled design** for Card or IconBtn (D6); IconBtn's hover is pointer-only.
7. **Production Storybook not opened.** `https://horizon-i9al47mdd-tangible7.vercel.app` answers 302
   (Vercel authentication) to an unauthenticated request.

## Verdict

**Blocked.**

| Failing | What | Owner |
|---|---|---|
| Gate 1 | `src/components/IconBtn/IconBtn.intent.json` missing | A human adds IconBtn's registry row; then the component-intent run (doc-generator) writes it |
| Gate 3 | Raw px in six story fixtures (`Card`, `CardContainer` ×2, `CardImage`, `CardLayout`, `CardText` `.stories.tsx`); raw `line-height: 1` in `IconBtn.css:35` | Engineer |
| Gate 5 | Open naming question N1 on CardText `Metadata` / `Review` / `Price` (`docs/card-build-report.md:77`) | A human in Figma decides; the Engineer follows if renamed |
| Check 1 | IconBtn has none of the eight intent fields | component-intent run |
| Check 5 | IconBtn `state` has no `variant_intent` | component-intent run |

Warning carried, not blocking: check 2 (Card, null `use_instead` ×4).
