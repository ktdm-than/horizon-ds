---
title: Designing with Horizon
description: How the components and tokens come from the Figma library.
---

Horizon's components are built from its Figma library, [Horizon Stays · Web · Component · V1.0 · Draft](https://www.figma.com/design/l87TswOf2FHCxsYmK8XhHJ/Horizon-Stays-.-Web-.-Component-.-V1.0-.-Draft). The file is shared with the team only.

## What Figma decides

- **Tokens are the only source of visual values.** Every colour, space, radius and font value in a component references a token. Tokens are exported from Figma with the Design Tokens plugin into `tokens/` and built into CSS custom properties.
- **Components use semantic tokens only.** Semantic tokens (`--color-bg-primary-idle`) point at primitives (`--color-blue-500`); a component never references a primitive or a raw value.
- **Modes come from Figma.** Light and dark colour modes, and English and Burmese typography modes. A token that exists in one mode and not another is a design gap, reported rather than filled in.
- **Prop names match Figma property names.** If Figma says `shape`, the prop is `shape`. Variant values match too: `state=default, shape=fill` in Figma is `<Button state="default" shape="fill">`.
- **Usage guidance comes from the component's documentation page.** When to use a component, when not to, and best practice are transposed word for word from its Usage frame into `<Name>.intent.json`, and from there onto each component page.

## When Figma is silent

Nothing is invented to fill a gap. An unbound value, a missing state or a variant with no stated purpose is recorded, in the component's build report and in `docs/intent-gaps.md`, for a designer to close in Figma. Each component page lists them on its Design tab.

## Next

- [All components](/core/components/overview/)
- [Tokens](/core/tokens/)
- [Theming](/styling/theming/)


---

<small>Guide, written from the repo at [`d1860fe`](https://github.com/ktdm-than/horizon-ds/commit/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2) and re-read against it on 2026-11-20.</small>
