# Button build report — Figma 280:276

Engineer self-check only. This is not QA and not approval.

- **Figma:** https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft?node-id=280-276
- **Code:** `src/components/Button/`
- **Replaces:** the earlier build from "Btn" 268:245 (size x state). The registry now points at 280:276,
  whose component set has no `size` property and uses `shape` for fill/outline and `state` for
  interaction states. The 268:245 API (`size`, `state = fill | outline`) is removed. Nothing in the
  repo imported it.

## Figma properties → props

| Figma property | Type | Prop | Values |
|---|---|---|---|
| `state` | variant | `state` | `default`, `hover`, `focus`, `disabled` (default `default`) |
| `shape` | variant | `shape` | `fill`, `outline` (default `fill`) |
| `showLeadingIcon#280:2` | boolean | `showLeadingIcon` | default `true` |
| `showTrailingIcon#280:3` | boolean | `showTrailingIcon` | default `true` |
| text layer "Button" | (not a property) | `children` | default `Button` |
| LeadingIcon / TrailingIcon glyph | (not a property) | `leadingIcon`, `trailingIcon` | code only, Material Symbols name, default `add` |

Plus every native `<button>` attribute (`onClick`, `type`, `disabled`, `aria-*`, …).
`state` pins a look for documentation and testing; real `:hover`, `:focus-visible` and the native
`disabled` attribute produce the same looks on their own. `state="disabled"` also disables natively.

## Variant matrix (8 variants → 8 stories, plus 3 icon-boolean stories and 1 interactive story)

| state | shape | Node | Figma W×H | Rendered W×H |
|---|---|---|---|---|
| default (`defaul` in Figma) | fill | 280:256 | 156×42 | 156.9×42 |
| hover | fill | 280:277 | 156×42 | 156.9×42 |
| focus | fill | 280:285 | 156×42 | 156.9×42 |
| disabled | fill | 280:292 | 156×42 | 156.9×42 |
| default | outline | 280:333 | 158×42 | 156.9×42 |
| hover | outline | 280:339 | 158×42 | 156.9×42 |
| focus | outline | 280:347 | 158×42 | 156.9×42 |
| disabled | outline | 280:353 | 158×42 | 156.9×42 |

Widths hug the label in both Figma and code; the sub-pixel to 1px differences come from label
text rendering. Background, stroke, text colour, icon colour, padding, gap, radius and type were
read from the rendered stories and match the bound tokens in every row.

## Design gaps (unbound in Figma, reported, not invented)

| # | What | Figma | What the code does |
|---|---|---|---|
| G1 | Height | fixed 42, no token | derived from bound tokens: line-height 24 + 2 × `spacing/sm` + 2 × `borderWidth/sm` = 42. Fill carries a transparent stroke so both shapes match |
| G2 | Icon size | 20×20 instance, no token (inner padding `spacing/base`, 12×12 vector) | PROVISIONAL: glyph sized with the equal-valued `--fontsize-xl` (20px), as IconBtn does with `--fontsize-md` |
| G3 | Icon colour tokens | icon strokes bound to `color/border/brand/light`, `color/border/inverse`, `color/border/primary` | used exactly as bound. Design may want the `color/icon/*` family instead |
| G4 | Icon stroke weight | 2px stroke on a 12px "+" vector, no token | Material Symbols `add` at its default weight, which reads slightly lighter than the Figma vector. No weight invented |
| G5 | Pressed and loading states | not in the component set | not styled. No `loading` prop |
| G6 | Icon glyph swap | no instance-swap property; always "+" | `leadingIcon` / `trailingIcon` props (code only, default `add`) so consumers can pick a Material Symbol |

## Accessibility notes

| # | Note |
|---|---|
| A1 | Figma draws focus as a colour change only (fill: `color/bg/primary/focused`, the same value as hovered; outline: `color/border/brand/light`). The code follows it and removes the user-agent ring on `:focus-visible`. On fill, focus and hover are visually identical, which may be too weak a focus indicator — design should consider a focus ring token |
| A2 | Icons are decorative (`aria-hidden`); the accessible name is the label |

## Naming suggestions

| Figma | Code | Why |
|---|---|---|
| `state=defaul` (fill variants) | `default` | Typo in Figma; outline variants already say `default`. Figma should rename `defaul` → `default` |
| `state` | `state` | Kept. Note the 268:245 set used `state` for fill/outline; 280:276 moved that to `shape` |
| (none) | `leadingIcon`, `trailingIcon` | Code-only props. Suggest Figma add instance-swap properties with these names |
