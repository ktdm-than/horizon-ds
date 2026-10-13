# Card build report — Figma 218:143

Engineer self-check only. This is not QA and not approval.

- **Figma:** https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=218-143
- **Code:** `src/components/Card/` (Card, CardContainer, CardLayout, CardImage, CardText) and `src/components/IconBtn/`
- **Branch:** `component/card-react` · local Storybook only, not deployed, registry not written

## Variant matrix (from Figma, 18 rows → 18 stories)

| Set | Properties | Stories |
|---|---|---|
| Card 218:143 | none | 1 |
| CardContainer 163:45 | state = idle, hover · slot containerSlot | 2 |
| CardLayout 166:221 | orientation = horizontal, vertical · showContentSlot · slot ContentSlot | 4 |
| CardImage 163:56 | ratio = 1:1, 4:3 × state = idle, hover · showIconBtn | 5 |
| IconBtn 163:74 | state = idle, hover | 2 |
| CardText 162:27 | metadata, review, price | 4 |

## Self-check measurements (local Storybook, light theme)

| Story | Figma | Rendered | Cause of any difference |
|---|---|---|---|
| Card / Default | 534×273 | 534×273, image 249, IconBtn 32×32 | CardText 116 vs 100 tall (T1) |
| CardContainer idle / hover | 424×128 | 424×128, shadow on hover | — |
| CardLayout horizontal (±slot) | 453×192 | 453×221 | D4 (equal split) · T1 |
| CardLayout vertical | 302×474 | 302×490 | T1 (with English line heights: 474) |
| CardLayout vertical, no slot | 302×414 | 302×430 | T1 (English: 414) |
| CardImage 1:1 / 4:3 × idle / hover, no IconBtn | 192×192 / 256×192 | match | IconBtn hover offset 12 vs 14 (D1) |
| IconBtn idle / hover | 32×32, radius 16 | 32×32, radius 16, shadow on hover | glyph is Material `favorite` |
| CardText all / no metadata / no review / no price | 100 / 40 / 68 / 68 | 116 / 48 / 80 / 80 | T1 (English: 100 / 40 / 68 / 68) |

Behaviour I drove: real hover on CardContainer, CardImage (overlay + IconBtn lift) and IconBtn. Tab reaches the IconBtn, and `:focus-visible` shows the browser's default ring unclipped. The console is clean, `npm run lint` passes, and all 18 token stories still render after the framework switch.

## Token pipeline (not the Card's to fix)

**T1 · The typography build emits the Burmese mode into `:root`.** `--lineheight-sm` is 24 (English 20) and `--lineheight-xs` is 20 (English 16), and the families are `'Noto Sans Myanmar'` while Figma uses Inter. This one issue accounts for every height delta above. Re-test once the build scopes the modes, for example with `[lang="my"]`.

## Design gaps (unbound in Figma, reported, not invented)

| # | What | Figma | What the code does |
|---|---|---|---|
| D1 | IconBtn offset in the CardImage hover variants | **Resolved in Figma:** IconBtn is now in auto layout at `spacing/md`, as in idle | in flow at CardImage padding `spacing/md` (12) |
| D3 | ContentSlot height | raw 48 | **provisional** `min-block-size: var(--spacing-3xl)` (same value) |
| D4 | CardData width | **Resolved in Figma:** CardImage and CardData both Fill container | `flex: 1 0 0` on both, matching Figma's Fill (the padded image comes out wider: 261/237 in the Card, 232.5/208.5 at 453) |
| D5 | IconBtn size and glyph size | raw 32×32 and 16×16 | **provisional** `--spacing-2xl` and `--fontsize-md` (same values) |
| D6 | Focus, pressed and disabled states; focus-ring token | none modelled | the UA focus ring. `:disabled` sets only the cursor. No colour is invented |
| D7 | CardContainer description mentions borders and radius | the component has neither | follows the component (none) |
| D8 | Icon | custom `at-icons:heart` | Material Symbols Rounded `favorite`, filled, as CLAUDE.md requires. The glyph shape differs slightly |

"Provisional" means the token carries the exact Figma value but is not the token design bound. Design should bind a size token so the code can switch to it.

## Naming suggestions

| Figma | Code | Why |
|---|---|---|
| slot `containerSlot` (CardContainer) | `children` | React's slot convention |
| slot `ContentSlot` (CardLayout) | `children` | React's slot convention |
| — | `image`, `text` on Card / CardLayout | passes props to the nested instances. Not a Figma property. `image.ratio` is fixed at `1:1`, as in Figma: `'4:3'` is a type error and is overridden at runtime |
| — | `src`, `alt`, `iconBtn` on CardImage | real content and IconBtn handlers. Not in Figma |
| — | `title`, `subtitle`, `rating`, `reviews`, `amount`, `unit` on CardText | text content. Figma has text layers only |
| — | `icon`, `aria-label` on IconBtn | glyph choice and accessible name for an icon-only button |

**Typing `image` outside JSX.** If you build the `image` object in a variable, type it as `CardLayoutProps['image']` or add `as const`. Otherwise TypeScript widens `ratio: '1:1'` to `string` and rejects it:

```tsx
import { Card, type CardLayoutProps } from './Card';

const image: CardLayoutProps['image'] = { ratio: '1:1', state: 'hover' }; // ✅
const also = { ratio: '1:1' } as const;                                     // ✅
const widened = { ratio: '1:1' };                                            // ❌ ratio: string
<Card image={image} />;
```

## Stack change in this branch

`package.json` disagreed with `tools.md`: it had `@storybook/html-vite`, no React, no TypeScript and no lint script. As agreed, this branch:

- adds `react` and `react-dom` 19, plus `typescript`, `@types/react`, `@types/react-dom` and `@storybook/react-vite` 10.6.1
- removes `@storybook/html-vite`
- adds `tsconfig.json` and `"lint": "tsc --noEmit"`
- moves `.storybook/main` and `.storybook/preview` to TypeScript, adds Material Symbols to `preview-head.html`, and adds a small `mount()` bridge in `stories/tokens.js` so the DOM-based token stories render under React

Remaining `tools.md` drift: it lists `build/tokens/` as the generated output and `tokens/tokens.json` as the source. The build actually writes `build/css/tokens.css`. Vitest is listed but not installed, and `npm test` is still the placeholder.
