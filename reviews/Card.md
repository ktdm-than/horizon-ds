# Release review: Card

| | |
|---|---|
| Component | Card, with subcomponents CardContainer, CardLayout, CardImage, CardText, and IconBtn (composed by CardImage) |
| Registry row | Components `recjoIyNg460a5FQr` (Card, ORGANISMS) |
| Woken by | The release agent, "prepare for release": a re-review started by the project owner ("Yes, do both"), review only, no package, no publish |
| Commit reviewed | `c836456078f2b54d5dcdb2228e9b306f9ad69ec6` docs(intent-gaps): follow the Card story and CardText prop changes from #25 (#27) |
| How it reached `main` | No Card or IconBtn source changed since the last review (`git diff 5940f78 c836456 -- src/components/Card src/components/IconBtn src/index.ts` is empty). PR #27 (`c836456`, merge commit) updated `docs/intent-gaps.md` for #25's story and CardText prop changes. The registry `Commit` (`6527aac`) is an ancestor of the reviewed commit. |
| `main` at review time | `c836456` (level with `origin/main` after `git fetch`, tree clean) |
| Supersedes | The review at `5940f78` (report commit `f5eb169`, Cleared with IconBtn waived) |
| Review date | 2026-11-20 |
| Verdict | **Cleared**, with the IconBtn items waived by the project owner for this release only |

Every file below was read at `c836456` with `git show c836456:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, section 227:333) on 2026-11-20.

## Rulings in force

The project owner, 2026-11-20, for this release only: pass every gate and check that fails only
because of IconBtn. Every item marked **Waived** below fails only because of IconBtn, and is shown
with its evidence. Nothing not caused by IconBtn is waived. The waiver does not change what ships:
IconBtn is still exported from `src/index.ts:5` (`export { IconBtn, type IconBtnProps }`), so it is
public API from this release on, and VERSIONING.md treats any later rename or removal of it as a
breaking change.

Also binding: gate 3 is strict (raw px in story fixtures and unitless `line-height` fail), and
`use_instead` is optional (a null is neither a warning nor a block).

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | Pass (IconBtn **Waived**) | Present: `Card.intent.json`, `CardContainer.intent.json`, `CardLayout.intent.json`, `CardImage.intent.json`, `CardText.intent.json`. **Waived by project owner, 2026-11-20:** `src/components/IconBtn/IconBtn.intent.json` does not exist at `c836456` (`git ls-tree` lists only `IconBtn.css`, `.stories.tsx`, `.test.tsx`, `.tsx`). IconBtn is a subcomponent: `CardImage.tsx:2` imports it and `CardImage.tsx:23` renders it. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read, not written). `Design` = Done. |
| 3 | Tokens clean | Pass (IconBtn **Waived**) | No `style` with a number in any `.tsx` in `src/components/Card/`; no raw hex, `px`, font value, unitless `line-height` or `--primitives-*` in any `.tsx` or `.css` there. Unitless `aspect-ratio: 1 / 1`, `4 / 3`, `opacity` and `flex` values are ratios, not raw hex, px or font values. **Waived by project owner, 2026-11-20:** `IconBtn.css:35` `line-height: 1;` (unitless line-height, fails under the strict ruling) and `IconBtn.css:36` `font-variation-settings: 'FILL' 1;` (a raw font value with no token family). |
| 4 | Public surface decided | Pass | `src/index.ts:6-10` exports `Card`, `CardContainer`, `CardLayout`, `CardImage`, `CardText`, their `*Props` types and `CardLayoutImageProps`; `src/index.ts:5` exports `IconBtn`, `IconBtnProps`, which a consumer needs for `CardImage`'s `iconBtn` prop (`CardImage.tsx:15`). No internal-only code is exported. |
| 5 | Names final | Pass | Figma, read live: CardText 162:27 `showMetadata`, `showReview`, `showPrice` (boolean, default true) match `CardText.tsx:7-11` exactly. Section 227:333 still holds CardContainer `state=idle/hover`, CardImage `ratio=1:1/4:3` x `state=idle/hover`, IconBtn `state=idle/hover`, CardLayout `orientation=horizontal/vertical`, all matching the code. Card `showContentSlot`, CardLayout `showContentSlot`, CardImage `showIconBtn` match. N1 is closed in `docs/card-build-report.md` ("Resolved 2026-11-20"); slots map to `children`, recorded there. No open naming question. |
| 6 | States complete | Pass | Figma states: CardContainer idle/hover (163:44, 163:46); CardImage idle/hover x 1:1/4:3 (163:55, 163:58, 163:57, 163:60), hover variants the idle sizes (192x192, 256x192); IconBtn idle/hover (163:73, 163:75). Card, CardLayout and CardText define no states. Each is implemented (`data-state` in `CardContainer.css:12`, `CardImage.css:36`, `IconBtn.css:22`) and has a story (`ContainerIdle`, `ContainerHover`; `Image11Idle`, `Image11Hover`, `Image43Idle`, `Image43Hover`; IconBtn `Idle`, `Hover`). Figma models no focus, pressed or disabled state (`docs/card-build-report.md` D6). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `c836456`. `package.json` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns E404 and there is no `v*` tag, so nothing is published and 0.1.0 is the version this would ship in. VERSIONING.md "Before 1.0.0 (now)" says what a 0.x number promises. A human still approves the version. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | Pass (IconBtn **Waived**) | Card, CardContainer, CardLayout, CardImage, CardText each have all eight fields. Empty fields are listed in `docs/intent-gaps.md` (Open), now under CardText's current prop names: Card `variant_intent.showContentSlot.purpose`, `placement`; CardContainer, CardImage, CardLayout, CardText `use_when`, `dont_use_when`, `best_practice`, `variant_intent.*.purpose`. **Waived by project owner, 2026-11-20:** IconBtn has no intent file, so none of its eight fields exist. |
| 2 | `use_instead` well-formed where present | Pass | Card: 0 of 4 `dont_use_when` entries name an alternative (all `null`, correct under the 2026-11-20 ruling). The subcomponents have no entries. Information only. |
| 3 | a11y specific | Pass | 15 entries across the five files, each a behaviour with a line that says it at `c836456`: `Card.tsx:29` `<div className="hds-card">`, `:15` `export type CardProps = {` (no handler props), `:30` `<CardContainer state="hover">`; `CardContainer.tsx:14` nested div with `data-state`, `CardContainer.css:12` `.hds-card-container[data-state='hover'],`; `CardLayout.tsx:26` `<div className="hds-card-layout" …>`, `:27` `<CardImage {...image} ratio="1:1" />`; `CardImage.tsx:18` `alt = ''`, `:21` `{src && <img …`, `:22` `aria-hidden="true"`, `:23` `<IconBtn {...iconBtn} state={state} />`; `CardText.tsx:34` title `<p>`, `:35` subtitle `<p>`, `:37` `{showMetadata && (`, `:41` rating `<p>`. |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded and left the tree clean. Every name in the five files is defined in `build/css/tokens.css`. `color-*` names are also in `tokens-dark.css`, as their siblings are; `label-default`, `body-body4`, `list-item` are also in `tokens-english.css` and `tokens-burmese.css`, as theirs are; spacing, `elevation-level1` and `overlaygradient` are `:root`-only, as their siblings are. IconBtn's tokens from its CSS (`borderradius-md`, `color-bg-base`, `color-icon-accent-red`, `fontsize-md`, `spacing-2xl`, `spacing-none`, `elevation-level1`) also resolve in every mode that defines their siblings. No mode gap. |
| 5 | All variants covered | Pass (IconBtn **Waived**) | Covered in `variant_intent` and stories: Card `showContentSlot` (CardDefault, CardNoSlot); CardContainer `state`; CardLayout `orientation`, `showContentSlot` (four stories); CardImage `ratio`, `state`, `showIconBtn` (five stories); CardText `showMetadata`, `showReview`, `showPrice` (all eight Figma combinations, `CardText.stories.tsx:32-52`). **Waived by project owner, 2026-11-20:** IconBtn's `state` (idle, hover; `IconBtn.tsx:7`) has stories but no `variant_intent`, because it has no intent file. |
| 6 | No two components claim the same job | Pass | Card's `use_when` compared with Button's and with the subcomponents' (all empty). Card displays content on one topic; Button triggers actions. Closest pair: Card "entry points into deeper levels of detail or navigation" and Button "entry points into deeper workflows, dialogs, or page transitions". One is a content summary, the other an action control, so this is not judged the same situation. A human may want one to name the other. |

## Waived items, in one place

All waived by project owner, 2026-11-20, for this release only.

| Where | Item | Evidence |
|---|---|---|
| Gate 1 | `IconBtn.intent.json` missing | `git show c836456:src/components/IconBtn/IconBtn.intent.json` → does not exist |
| Gate 3 | Unitless `line-height` | `src/components/IconBtn/IconBtn.css:35` `line-height: 1;` |
| Gate 3 | Raw font value | `src/components/IconBtn/IconBtn.css:36` `font-variation-settings: 'FILL' 1;` |
| Check 1 | IconBtn has none of the eight fields | Same missing file |
| Check 5 | IconBtn `state` has no `variant_intent` | `IconBtn.tsx:7` `state?: 'idle' \| 'hover'`; no intent file |
| Registry | IconBtn has no Components row | The Components table holds two rows, Button and Card (read 2026-11-20) |
| Registry | Card's `Composes` is empty | Card row `recjoIyNg460a5FQr`, `Composes` blank; the code composes CardContainer, CardLayout, CardImage, CardText and IconBtn |

## Observations (did not change the verdict)

1. **IconBtn ships as public API without its own review.** It has no registry row, no `Development`,
   no intent and no `Release Verdict`. The waiver covers this release only; the next release review
   will block on the same items unless a human adds the row and the intent run writes its file.
2. **`docs/intent-gaps.md` is current again.** PR #27 replaced the old CardText names and the "534px
   fixture frame" wording. The gaps it records are still open.
3. **CardText's usage text sits under the wrong tag** in Figma: `_DocBody` 306:501 is tagged `[ card ]`
   but describes CardText (`docs/intent-gaps.md`).
4. **Card's `showContentSlot#227:1` and `ContentSlot#227:0` are unwired in Figma** (D9); the code wires
   them through to CardLayout.
5. **Figma's Card page header** shows "Documentation In Progress" and "Development On Hold" while the
   board reads Completed (`docs/intent-gaps.md`).
6. **Provisional tokens** stand in for unbound Figma sizes: `--spacing-3xl` for the slot height (D3),
   `--spacing-2xl` / `--fontsize-md` for IconBtn's size and glyph (D5).
7. **No focus, pressed or disabled design** for Card or IconBtn (D6); hover is pointer-only.
8. **Production Storybook not opened in a browser.** The board's value
   `https://horizon-hxmbwpzyg-tangible7.vercel.app/?path=/story/components-card-card--card-default`
   answers 302 (Vercel authentication) to an unauthenticated request. Over the Vercel API it is a
   READY production deployment built from `main` at `5940f78` (PR #25), which carries the same Card
   and IconBtn source as `c836456`.

## Verdict

**Cleared.** Every gate passes and no check fails, with the IconBtn items above waived by the project
owner on 2026-11-20 for this release only. No warnings.
