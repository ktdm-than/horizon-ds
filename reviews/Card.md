# Release review: Card

| | |
|---|---|
| Component | Card, with subcomponents CardContainer, CardLayout, CardImage, CardText, and IconBtn (composed by CardImage) |
| Registry row | Components `recjoIyNg460a5FQr` (Card, ORGANISMS) |
| Woken by | The release agent, "prepare for release": a re-review started by the project owner ("Yes, run release"), review only, no package, no publish |
| Commit reviewed | `5940f787e8892d8ccc08306819202655d444b2d0` fix(card): drop raw story sizes and rename CardText booleans (#25) |
| How it reached `main` | PR #25 (`fix/card`), merged with a merge commit. The registry `Commit` (`6527aac`) is an ancestor of the reviewed commit. |
| `main` at review time | `5940f78` (level with `origin/main` after `git fetch`, tree clean) |
| Supersedes | The review at `c15aa72` (report commit `c6c19ac`, Blocked on gates 1, 3, 5 and checks 1, 5) |
| Review date | 2026-11-20 |
| Verdict | **Cleared**, with the IconBtn items waived by the project owner for this release only |

Every file below was read at `5940f78` with `git show 5940f78:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, section 227:333) on 2026-11-20.

## Waiver in force

The project owner, 2026-11-20, for this release only: "ignore and pass all the blocks related with
IconBtn this time". Every item marked **Waived** below fails only because of IconBtn, and is shown
with its evidence. Nothing not caused by IconBtn is waived. The waiver does not change what ships:
IconBtn is still exported from `src/index.ts:5` (`export { IconBtn, type IconBtnProps }`), so it is
public API from this release on, and VERSIONING.md treats any later rename or removal of it as a
breaking change.

Gate 3 is strict (ruled 2026-11-20): raw px in story fixtures and unitless `line-height` fail.

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | Pass (IconBtn **Waived**) | Present: `Card.intent.json`, `CardContainer.intent.json`, `CardLayout.intent.json`, `CardImage.intent.json`, `CardText.intent.json`. **Waived by project owner, 2026-11-20:** `src/components/IconBtn/IconBtn.intent.json` does not exist at `5940f78` (`git ls-tree` lists only `IconBtn.css`, `.stories.tsx`, `.test.tsx`, `.tsx`). IconBtn is a subcomponent: `CardImage.tsx:2` imports it and `CardImage.tsx:23` renders it. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read, not written). `Design` = Done. |
| 3 | Tokens clean | Pass (IconBtn **Waived**) | Last review's story fixtures are gone: PR #25 removed every fixed px decorator and `height: 104` slot from `Card`, `CardContainer`, `CardImage`, `CardLayout` and `CardText` `.stories.tsx`; no `style` with a number remains in any `.tsx` in `src/components/Card/`. No raw hex, `px`, font value, unitless `line-height` or `--primitives-*` in any `.tsx` or `.css` there. Unitless `aspect-ratio: 1 / 1`, `4 / 3`, `opacity` and `flex` values are ratios, not raw hex, px or font values. **Waived by project owner, 2026-11-20:** `IconBtn.css:35` `line-height: 1;` (unitless line-height, fails under the strict ruling) and `IconBtn.css:36` `font-variation-settings: 'FILL' 1;` (a raw font value with no token family). |
| 4 | Public surface decided | Pass | `src/index.ts:6-10` exports `Card`, `CardContainer`, `CardLayout`, `CardImage`, `CardText`, their `*Props` types and `CardLayoutImageProps`; `src/index.ts:5` exports `IconBtn`, `IconBtnProps`, which a consumer needs for `CardImage`'s `iconBtn` prop (`CardImage.tsx:15`). No internal-only code is exported. |
| 5 | Names final | Pass | Figma `componentPropertyDefinitions`, read live: Card `showContentSlot#227:1`, `ContentSlot#227:0`; CardContainer `state` (idle, hover), `containerSlot#163:8`; CardLayout `orientation` (horizontal, vertical), `showContentSlot#166:14`, `ContentSlot#166:13`; CardImage `ratio` (1:1, 4:3), `state` (idle, hover), `showIconBtn#163:3`; CardText `showMetadata#162:0`, `showReview#162:1`, `showPrice#162:2`; IconBtn `state` (idle, hover). Code props match exactly (`CardText.tsx:7-11` `showMetadata`, `showReview`, `showPrice`). N1 is closed in `docs/card-build-report.md:77` ("Resolved 2026-11-20"); slots map to `children`, recorded there. No open naming question. |
| 6 | States complete | Pass | Figma states: CardContainer idle/hover (163:44, 163:46); CardImage idle/hover × 1:1/4:3 (163:55, 163:58, 163:57, 163:60), hover variants now the idle sizes (192×192, 256×192); IconBtn idle/hover (163:73, 163:75). Card, CardLayout and CardText define no states. Each is implemented (`data-state` in `CardContainer.css:12`, `CardImage.css:36`, `IconBtn.css:22`) and has a story (`ContainerIdle`, `ContainerHover`; `Image11Idle`, `Image11Hover`, `Image43Idle`, `Image43Hover`; IconBtn `Idle`, `Hover`). Figma models no focus, pressed or disabled state (`docs/card-build-report.md` D6). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `5940f78`. `package.json` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns 404 and there is no `v*` tag, so nothing is published and 0.1.0 is the version this would ship in. VERSIONING.md "Before 1.0.0" says what a 0.x number promises. A human still approves the version. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | Pass (IconBtn **Waived**) | Card, CardContainer, CardLayout, CardImage, CardText each have all eight fields. Empty fields are listed in `docs/intent-gaps.md` (Open): Card `variant_intent.showContentSlot.purpose`, `placement`; CardContainer, CardImage, CardLayout, CardText `use_when`, `dont_use_when`, `best_practice`, `variant_intent.*.purpose`. **Waived by project owner, 2026-11-20:** IconBtn has no intent file, so none of its eight fields exist. |
| 2 | `dont_use_when` names an alternative | **Warn** | Card: 4 of 4 entries have `use_instead: null`. Subcomponents have no entries. Never blocks. |
| 3 | a11y specific | Pass | 15 entries across the five files, each a behaviour with a line that says it at `5940f78`: `Card.tsx:29` `<div className="hds-card">`, `:15` `CardProps` (no handler props), `:30` `state="hover"`; `CardContainer.tsx:14` nested divs, `CardContainer.css:12` hover-only selector; `CardLayout.tsx:26`, `:27` `ratio="1:1"`; `CardImage.tsx:18` `alt = ''`, `:21` `{src && <img`, `:22` `aria-hidden="true"`, `:23` `<IconBtn {...iconBtn} state={state} />`; `CardText.tsx:34` `<p` title, `:35`, `:37` `{showMetadata &&`, `:41` rating `<p>`. PR #25 renamed CardText's props without moving any line. |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded. Every name in the five files is defined in `build/css/tokens.css`. `color-*` names are also in `tokens-dark.css`, as their siblings are; `label-default`, `body-body4`, `list-item` are also in `tokens-english.css` and `tokens-burmese.css`, as theirs are; spacing, `elevation-level1` and `overlaygradient` are `:root`-only, as their siblings are. IconBtn's tokens from its CSS (`borderradius-md`, `color-bg-base`, `color-icon-accent-red`, `fontsize-md`, `spacing-2xl`, `spacing-none`, `elevation-level1`) also resolve in every mode that defines their siblings. No mode gap. |
| 5 | All variants covered | Pass (IconBtn **Waived**) | Covered in `variant_intent` and stories: Card `showContentSlot` (CardDefault, CardNoSlot); CardContainer `state`; CardLayout `orientation`, `showContentSlot` (four stories); CardImage `ratio`, `state`, `showIconBtn` (five stories); CardText `showMetadata`, `showReview`, `showPrice` (all eight Figma combinations, `CardText.stories.tsx:32-52`). **Waived by project owner, 2026-11-20:** IconBtn's `state` (idle, hover; `IconBtn.tsx:7`) has stories but no `variant_intent`, because it has no intent file. |
| 6 | No two components claim the same job | Pass | Card's `use_when` compared with Button's and with the subcomponents' (all empty). Card displays content on one topic; Button triggers actions. Closest pair: Card "entry points into deeper levels of detail or navigation" and Button "entry points into deeper workflows, dialogs, or page transitions". One is a content summary, the other an action control, so this is not judged the same situation. A human may want one to name the other. |

## Waived items, in one place

All waived by project owner, 2026-11-20, for this release only.

| Where | Item | Evidence |
|---|---|---|
| Gate 1 | `IconBtn.intent.json` missing | `git show 5940f78:src/components/IconBtn/IconBtn.intent.json` → does not exist |
| Gate 3 | Unitless `line-height` | `src/components/IconBtn/IconBtn.css:35` `line-height: 1;` |
| Gate 3 | Raw font value | `src/components/IconBtn/IconBtn.css:36` `font-variation-settings: 'FILL' 1;` |
| Check 1 | IconBtn has none of the eight fields | Same missing file |
| Check 5 | IconBtn `state` has no `variant_intent` | `IconBtn.tsx:7` `state?: 'idle' \| 'hover'`; no intent file |
| Registry | IconBtn has no Components row | The Components table holds two rows, Button and Card |
| Registry | Card's `Composes` is empty | Card row `recjoIyNg460a5FQr`, `Composes` blank; the code composes CardContainer, CardLayout, CardImage, CardText and IconBtn |

## Observations (did not change the verdict)

1. **IconBtn ships as public API without its own review.** It has no registry row, no `Development`,
   no intent and no `Release Verdict`. The waiver covers this release only; the next release review
   will block on the same items unless a human adds the row and the intent run writes its file.
2. **`docs/intent-gaps.md` is stale after PR #25.** It still lists CardText's empty purposes under
   the old names (`Metadata, Review, Price`) and says Card stories render "in a 534px fixture frame",
   which PR #25 removed. The gaps it records are still real.
3. **CardText's usage text sits under the wrong tag** in Figma: `_DocBody` 306:501 is tagged `[ card ]`
   but describes CardText (`docs/intent-gaps.md`).
4. **Card's `showContentSlot#227:1` and `ContentSlot#227:0` are unwired in Figma** (D9); the code wires
   them through to CardLayout.
5. **Figma's Card page header** shows "Documentation In Progress" and "Development On Hold" while the
   board reads Completed (`docs/intent-gaps.md`).
6. **Provisional tokens** stand in for unbound Figma sizes: `--spacing-3xl` for the slot height (D3),
   `--spacing-2xl` / `--fontsize-md` for IconBtn's size and glyph (D5).
7. **No focus, pressed or disabled design** for Card or IconBtn (D6); hover is pointer-only.
8. **The CardText rename is breaking against nothing yet.** `Metadata`/`Review`/`Price` became
   `showMetadata`/`showReview`/`showPrice`, but no version is published, so no consumer breaks.
9. **Production Storybook not opened.** `https://horizon-hxmbwpzyg-tangible7.vercel.app` answers 302
   (Vercel authentication) to an unauthenticated request.

## Verdict

**Cleared.** Every gate passes and no check fails, with the IconBtn items above waived by the project
owner on 2026-11-20 for this release only.

Warning carried, not blocking: check 2 (Card, null `use_instead` ×4).
