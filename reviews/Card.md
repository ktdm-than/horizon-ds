# Release review: Card

| | |
|---|---|
| Component | Card, with subcomponents CardContainer, CardLayout, CardImage, CardText, and IconBtn (composed by CardImage) |
| Registry row | Components `recjoIyNg460a5FQr` (Card, ORGANISMS) |
| Woken by | The release agent, "release and publish 0.1.0" (project owner's instruction, 2026-11-20), the review step of the release run |
| Commit reviewed | `d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2` docs(review): Card — Cleared (#23) |
| How it reached `main` | No Card or IconBtn source changed since the previous review at `c836456`: `main` gained only PR #22 (merge `36a6646`) and PR #23 (merge `d1860fe`), which add `reviews/Button.md` and `reviews/Card.md`; `git diff c836456 d1860fe -- src VERSIONING.md package.json tokens docs` is empty. The registry `Commit` (`6527aac`) is an ancestor of the reviewed commit. |
| `main` at review time | `d1860fe` (level with `origin/main` after `git fetch`, tree clean) |
| Supersedes | The review at `c836456` (report commit `e5af5b1`, Cleared with IconBtn waived) |
| Review date | 2026-11-20 |
| Verdict | **Cleared**, with the IconBtn items waived by the project owner for this release only |

Every file below was read at `d1860fe` with `git show d1860fe:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, section 227:333) on 2026-11-20.

## Rulings in force

The project owner, 2026-11-20, for this release only: the IconBtn waiver covers the missing
`IconBtn.intent.json`, IconBtn's raw `line-height` and `font-variation-settings`, IconBtn's missing
registry row, and Card's empty `Composes`. Each is marked **Waived by project owner, 2026-11-20**
below, with its evidence. Nothing else is waived. IconBtn ships as public API under this waiver: it is
exported from `src/index.ts:5` (`export { IconBtn, type IconBtnProps }`), and VERSIONING.md treats
any later rename or removal of it as a breaking change.

Also binding: gate 3 is strict (raw px in story fixtures and unitless `line-height` fail), and
`use_instead` is optional (a null is neither a warning nor a block).

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | Pass (IconBtn **Waived**) | Present at `d1860fe`: `Card.intent.json`, `CardContainer.intent.json`, `CardLayout.intent.json`, `CardImage.intent.json`, `CardText.intent.json`. **Waived by project owner, 2026-11-20:** `src/components/IconBtn/IconBtn.intent.json` does not exist (`git ls-tree` lists only `IconBtn.css`, `.stories.tsx`, `.test.tsx`, `.tsx`). IconBtn is a subcomponent: `CardImage.tsx:2` imports it and `CardImage.tsx:23` renders it. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read 2026-11-20, not written). `Design` = Done. |
| 3 | Tokens clean | Pass (IconBtn **Waived**) | A scan of every `.tsx` and `.css` in `src/components/Card/` for hex, `px`, `--primitives-*`, unitless `line-height`, `font-variation-settings`, `font-family`, numeric `font-weight` / `font-size`, and inline `style` finds nothing. **Waived by project owner, 2026-11-20:** `IconBtn.css:35` `line-height: 1;` (unitless) and `IconBtn.css:36` `font-variation-settings: 'FILL' 1;` (raw font value). |
| 4 | Public surface decided | Pass | `src/index.ts:6-10` exports `Card`, `CardContainer`, `CardLayout`, `CardImage`, `CardText`, their `*Props` types and `CardLayoutImageProps`; `src/index.ts:5` exports `IconBtn`, `IconBtnProps`, which a consumer needs for `CardImage`'s `iconBtn` prop. No internal-only code is exported. |
| 5 | Names final | Pass | Figma section 227:333, read live: CardContainer `state=idle/hover` (163:44, 163:46); CardImage `ratio=1:1/4:3` x `state=idle/hover` (163:55, 163:58, 163:57, 163:60); IconBtn `state=idle/hover` (163:73, 163:75); CardLayout `orientation=horizontal/vertical` (166:219, 166:222); CardText 162:27; Card 218:143. All match the code. The boolean names (`showMetadata`, `showReview`, `showPrice`, `showContentSlot`, `showIconBtn`) match as recorded at `c836456`; no source changed since. N1 is closed in `docs/card-build-report.md`. No open naming question. |
| 6 | States complete | Pass | Figma states, as above: CardContainer idle/hover, CardImage idle/hover x 1:1/4:3, IconBtn idle/hover. Card, CardLayout and CardText define no states. Each is implemented (`data-state` in `CardContainer.css:12`, `CardImage.css`, `IconBtn.css`) and has a story (`ContainerIdle`, `ContainerHover`; `Image11Idle`, `Image11Hover`, `Image43Idle`, `Image43Hover` at `CardImage.stories.tsx:29-32`; IconBtn `Idle`, `Hover`). Figma models no focus, pressed or disabled state (`docs/card-build-report.md` D6). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `d1860fe`. `package.json` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns 404 and there is no `v*` tag, so 0.1.0 is the version this ships in. The project owner named 0.1.0. VERSIONING.md "Before 1.0.0 (now)" says what a 0.x number promises. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | Pass (IconBtn **Waived**) | Card, CardContainer, CardLayout, CardImage, CardText each have all eight fields. Empty fields are listed in `docs/intent-gaps.md` (Open). **Waived by project owner, 2026-11-20:** IconBtn has no intent file, so none of its eight fields exist. |
| 2 | `use_instead` well-formed where present | Pass | Card: 0 of 4 `dont_use_when` entries name an alternative (all `null`, correct under the 2026-11-20 ruling). The subcomponents have no entries. Information only. |
| 3 | a11y specific | Pass | 15 entries across the five files, each a behaviour with a line that says it at `d1860fe`: `Card.tsx:29` `<div className="hds-card">`, `:15` `export type CardProps = {`, `:30` `<CardContainer state="hover">`; `CardContainer.tsx:14` div with `data-state={state}`, `CardContainer.css:12` `.hds-card-container[data-state='hover'],`; `CardLayout.tsx:26` `<div className="hds-card-layout" data-orientation={orientation}>`, `:27` `<CardImage {...image} ratio="1:1" />`; `CardImage.tsx:18` `alt = ''`, `:21` `{src && <img … alt={alt} />}`, `:22` overlay `aria-hidden="true"`, `:23` `<IconBtn {...iconBtn} state={state} />`; `CardText.tsx:34` title `<p>`, `:35` subtitle `<p>`, `:37` `{showMetadata && (`, `:41` rating `<p>`. |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded and left the tree clean. Every name in the five files is defined in `build/css/tokens.css`. `color-*` names are also in `tokens-dark.css`; `label-default`, `body-body4`, `list-item` are also in `tokens-english.css` and `tokens-burmese.css`; spacing, `elevation-level1`, `overlaygradient` are `:root`-only, as their siblings are. IconBtn's tokens (`borderradius-md`, `color-bg-base`, `color-icon-accent-red`, `elevation-level1`, `fontsize-md`, `spacing-2xl`, `spacing-none`) also resolve. No mode gap. |
| 5 | All variants covered | Pass (IconBtn **Waived**) | Covered in `variant_intent` and stories: Card `showContentSlot`; CardContainer `state`; CardLayout `orientation`, `showContentSlot`; CardImage `ratio`, `state`, `showIconBtn`; CardText `showMetadata`, `showReview`, `showPrice`. **Waived by project owner, 2026-11-20:** IconBtn's `state` (idle, hover) has stories but no `variant_intent`, because it has no intent file. |
| 6 | No two components claim the same job | Pass | Card's `use_when` compared with Button's and with the subcomponents' (all empty). Card displays content on one topic; Button triggers actions. Closest pair as in the Button review; not judged the same situation. |

## Waived items, in one place

All waived by project owner, 2026-11-20, for this release only.

| Where | Item | Evidence |
|---|---|---|
| Gate 1 | `IconBtn.intent.json` missing | `git ls-tree d1860fe src/components/IconBtn` lists no intent file |
| Gate 3 | Unitless `line-height` | `src/components/IconBtn/IconBtn.css:35` `line-height: 1;` |
| Gate 3 | Raw font value | `src/components/IconBtn/IconBtn.css:36` `font-variation-settings: 'FILL' 1;` |
| Check 1 | IconBtn has none of the eight fields | Same missing file |
| Check 5 | IconBtn `state` has no `variant_intent` | No intent file |
| Registry | IconBtn has no Components row | The Components table holds two rows, Button and Card (read 2026-11-20) |
| Registry | Card's `Composes` is empty | Card row `recjoIyNg460a5FQr`, `Composes` blank; the code composes CardContainer, CardLayout, CardImage, CardText and IconBtn |

## Observations (did not change the verdict)

1. **IconBtn ships as public API without its own review.** The waiver covers this release only; the
   next release review will block on the same items unless a human adds the row and the intent run
   writes its file.
2. **Open intent gaps** in `docs/intent-gaps.md` are unchanged, including CardText's usage text sitting
   under a `[ card ]` tag in Figma (`_DocBody` 306:501).
3. **Card's `showContentSlot#227:1` and `ContentSlot#227:0` are unwired in Figma** (D9); the code wires
   them through to CardLayout.
4. **Provisional tokens** stand in for unbound Figma sizes: `--spacing-3xl` (D3), `--spacing-2xl` /
   `--fontsize-md` for IconBtn (D5).
5. **No focus, pressed or disabled design** for Card or IconBtn (D6); hover is pointer-only.
6. **Production Storybook opened** in the signed-in built-in browser:
   `https://horizon-hxmbwpzyg-tangible7.vercel.app/?path=/story/components-card-card--card-default`
   renders `.hds-card` with `hds-card-container`, `hds-card-layout`, `hds-card-image`,
   `hds-card-text` and `hds-iconbtn`.

## Verdict

**Cleared.** Every gate passes and no check fails, with the IconBtn items above waived by the project
owner on 2026-11-20 for this release only. No warnings.
