---
title: Theming
description: Modes, tokens and how the components pick them up.
---

Every visual value in a component is a CSS custom property from `tokens.css`. Load it once at your app root (see [Developing](/developing/introduction/)).

## Modes

| Mode | How to switch it on | Shipped as |
|---|---|---|
| Light | default | `:root` |
| Dark | `data-theme="dark"` on an ancestor, usually `<html>` | `[data-theme="dark"]` |
| English type | default, and any element with a `lang` other than `my` | `[lang]:not(:lang(my))` |
| Burmese type | `lang="my"` on an ancestor | `:lang(my)` |

:::caution[Dark mode ships the light colours]
At `d1860fe`, the dark block redeclares every semantic colour with the same value it has in light, so switching to dark changes nothing yet. That is what the Figma export contains; it is a design gap to close in Figma. The [Tokens](/core/tokens/) page shows both columns.
:::

## Which tokens to use

Use semantic tokens (`--color-bg-primary-idle`, `--spacing-md`, `--borderradius-sm`). Their names are public API: renaming or removing one is a breaking change ([Versioning](/get-started/versioning/)). Primitive tokens (`--color-blue-500`) are not public and may change in any release.

Token names follow category, then property, then role: the Figma token `color/bg/primary/idle` becomes `--color-bg-primary-idle`.

## This site

This site is themed with the same tokens: one stylesheet maps Starlight's variables onto semantic tokens, with no colour of its own. Because dark ships the light values, the site's dark theme is drawn from the semantic inverse family (`--color-bg-inverse`, `--color-text-inverse`).


---

<small>Guide, written from the repo at [`d1860fe`](https://github.com/ktdm-than/horizon-ds/commit/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2) and re-read against it on 2026-11-20.</small>
