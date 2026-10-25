# Card build report — Figma section 227:333

Engineer self-check only. This is not QA and not approval.

- **Figma:** https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=227-333
  (section `Components`: Card 218:143 and every part it composes)
- **Code:** `src/components/Card/` (Card, CardContainer, CardLayout, CardImage, CardText) and `src/components/IconBtn/`
- **Branch:** `component/card-227` from `main`. Card composes IconBtn, not Button, so it does not depend on PR #13.
- **History:** first built from 218:143 (PRs #6, #7, #8, #11). This pass re-reads every node in 227:333.

## What changed against 227:333

| # | Figma now says | Code before | Code now |
|---|---|---|---|
| C1 | Card 218:143 has its own properties `showContentSlot` (boolean, default true) and `ContentSlot` (slot) | Card had no properties | `showContentSlot` and `children` on Card, passed to the nested CardLayout |
| C2 | CardText's booleans are named `Metadata`, `Review`, `Price` | `metadata`, `review`, `price` | `Metadata`, `Review`, `Price` (exact Figma names; see N1) |
| C3 | CardContainer `containerSlot` is a vertical auto layout, gap `spacing/lg`, padding `spacing/none` | plain block | flex column, `gap: var(--spacing-lg)`, `padding: var(--spacing-none)` |
| C4 | — | Storybook docgen threw on Card's indexed-access prop type | named type `CardLayoutImageProps`; console clean |

**Breaking for consumers:** `<CardText metadata review price>` and `text={{ metadata, review, price }}` are now
`Metadata`, `Review`, `Price`. No consumer exists in this repo outside the stories.

## Variant matrix (from Figma, 19 rows → 19 stories)

| Set | Properties | Stories |
|---|---|---|
| Card 218:143 | showContentSlot · slot ContentSlot | 2 |
| CardContainer 163:45 | state = idle, hover · slot containerSlot | 2 |
| CardLayout 166:221 | orientation = horizontal, vertical × showContentSlot · slot ContentSlot | 4 |
| CardImage 163:56 | ratio = 1:1, 4:3 × state = idle, hover · showIconBtn | 5 |
| IconBtn 163:74 | state = idle, hover | 2 |
| CardText 162:27 | Metadata, Review, Price | 4 |

## Self-check measurements (local Storybook, light theme, English)

| Story | Figma | Rendered |
|---|---|---|
| Card / showContentSlot=true, false | 534×285, image 261, CardData 237 | 534×285, image 261, text 237×100, slot 237×48 |
| CardContainer idle / hover | 424×128 | 424×128, shadow `elevation-level1` on hover only |
| CardLayout horizontal (±slot) | 453×232.5 | 453×232.5, image 232.5, CardData 208.5 |
| CardLayout vertical / no slot | 302×474 / 302×414 | 302×474 / 302×414 |
| CardImage 1:1 / 4:3 × idle / hover, no IconBtn | 192×192 / 256×192 | match |
| IconBtn idle / hover | 32×32, radius 16 | 32×32, radius 16, shadow on hover |
| CardText all / no Metadata / no Review / no Price | 100 / 40 / 68 / 68 | 100 / 40 / 68 / 68 |

The earlier typography-mode issue (T1) is fixed on `main`: `:root` now carries English, so every height matches.

Behaviour driven: real hover on the Card image shows the overlay and lifts the IconBtn, and both clear on leave;
Tab reaches the IconBtn (`aria-label` "Save to favourites") with a visible focus ring. `npm run lint` passes and
the console is clean on all 19 stories.

## Design gaps (reported, not invented)

| # | What | Figma | What the code does |
|---|---|---|---|
| D3 | ContentSlot height | raw 48 | **provisional** `min-block-size: var(--spacing-3xl)` (same value) |
| D5 | IconBtn size and glyph size | raw 32×32 and 16×16 | **provisional** `--spacing-2xl` and `--fontsize-md` (same values) |
| D6 | Focus, pressed and disabled states; focus-ring token | none modelled | the UA focus ring. `:disabled` sets only the cursor. No colour is invented |
| D7 | CardContainer description mentions borders and radius | the component has neither | follows the component (none) |
| D8 | Icon | custom `at-icons:heart` | Material Symbols Rounded `favorite`, filled, as CLAUDE.md requires. The glyph shape differs slightly |
| D9 | Card's `showContentSlot#227:1` and `ContentSlot#227:0` are defined on Card 218:143 but **not wired** to any layer: the nested CardLayout's ContentSlot still reads CardLayout's own `showContentSlot#166:14`, so toggling Card's property in Figma does nothing | unwired | the code wires them through to CardLayout, which is what the property names promise. Design should connect them |
| D10 | `containerSlot` direction | vertical in CardContainer 163:45, horizontal in the Card instance | follows the component (column). With one full-width child it renders the same |
| D11 | IconBtn hover shadow | `elevation/level1` as a layer drop-shadow | `box-shadow: var(--elevation-level1)`; identical on the opaque rounded button |

D1 and D4 from the 218:143 pass are resolved in Figma and stay as built.
"Provisional" means the token carries the exact Figma value but is not the token design bound.

## Registry gap

IconBtn has no row in the Components table, so Card's `Composes` cannot link it. Card imports IconBtn
(through CardImage). A human should add an IconBtn row; the Engineer then links it.

## Naming suggestions

| # | Figma | Code | Why |
|---|---|---|---|
| N1 | `Metadata`, `Review`, `Price` (CardText) | same, capitalised | Kept exact per CLAUDE.md. Every other boolean in this file is camelCase (`showIconBtn`, `showContentSlot`), and React props are conventionally camelCase. **Suggest renaming in Figma to `metadata`, `review`, `price`** (or `showMetadata`, `showReview`, `showPrice`), then the code follows |
| — | slot `containerSlot` (CardContainer) | `children` | React's slot convention |
| — | slot `ContentSlot` (Card, CardLayout) | `children` | React's slot convention |
| — | — | `image`, `text` on Card / CardLayout | passes props to the nested instances. Not a Figma property. `image.ratio` is fixed at `1:1`, as in Figma |
| — | — | `src`, `alt`, `iconBtn` on CardImage | real content and IconBtn handlers. Not in Figma |
| — | — | `title`, `subtitle`, `rating`, `reviews`, `amount`, `unit` on CardText | text content. Figma has text layers only |
| — | — | `icon`, `aria-label` on IconBtn | glyph choice and accessible name for an icon-only button |

**Typing `image` outside JSX.** If you build the `image` object in a variable, type it as `CardLayoutImageProps` or add `as const`. Otherwise TypeScript widens `ratio: '1:1'` to `string` and rejects it:

```tsx
// Card and CardLayoutImageProps are exported from src/components/Card/Card.tsx.
// This path is relative to docs/; adjust it to your file's location.
import { Card, type CardLayoutImageProps } from '../src/components/Card/Card';

const image: CardLayoutImageProps = { ratio: '1:1', state: 'hover' };
const also = { ratio: '1:1' } as const;
const widened = { ratio: '1:1' };

<Card image={image} />;   // ✅
<Card image={also} />;    // ✅
<Card image={widened} />; // ❌ error: ratio is widened to string
```
