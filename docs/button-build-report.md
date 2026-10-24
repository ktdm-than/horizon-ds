# Button build report — Figma 268:245

Engineer self-check only. This is not QA and not approval.

- **Figma:** https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=268-245
- **Code:** `src/components/Button/`

## Variant matrix (component set "Btn", 6 variants → 6 stories, plus 2 behaviour stories)

| size | state | Node | Figma W×H | Rendered W×H |
|---|---|---|---|---|
| small | fill | 268:244 | 120×42 | 98×42 (D1) |
| medium | fill | 268:246 | 180×42 | 119×42 (D1) |
| large | fill | 268:248 | 376×42 | 100×42 (D1) |
| small | outline | 268:257 | 120×42 | 98×42 (D1) |
| medium | outline | 268:262 | 180×42 | 119×42 (D1) |
| large | outline | 268:264 | 376×42 | 100×42 (D1) |

Colour, padding, gap, radius, stroke and type match their bound tokens in every story.

## Design gaps (unbound in Figma, reported, not invented)

| # | What | Figma | What the code does |
|---|---|---|---|
| D1 | Per-size width | raw 120 / 180 / 376, no token | hugs the label; `size` is exposed as `data-size` for a future binding |
| D2 | Height | raw 42, no token | derived from bound tokens: line-height 24 + 2 × `spacing/sm` + 2 × `borderWidth/sm` = 42 |
| D3 | Hover, pressed, focus, disabled, loading | not modelled in the set | native `disabled` behaviour with a `not-allowed` cursor; user-agent focus ring; no colour invented. Tokens such as `color/bg/primary/hovered` and `color/bg/disabled` exist but are not bound to this component |

## Naming suggestions

| Figma | Code | Why |
|---|---|---|
| text layer (not a property) | `children` | the label, React's slot convention |
| `state` (fill / outline) | `state` | kept to match Figma. It names a visual treatment, not an interaction state; design may want `variant` to avoid confusion with hover/disabled states |
