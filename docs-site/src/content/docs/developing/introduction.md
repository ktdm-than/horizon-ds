---
title: Developing with Horizon
description: Install the package, load the styles, use the components.
---

## Install

```bash
npm install @morethanthings/horizon-ds react react-dom
```

React 19 and React DOM 19 are peer dependencies (`^19.3.0`).

## Load the styles once, at your app root

Order matters: tokens first, then fonts, then component styles.

```ts
import '@morethanthings/horizon-ds/tokens.css'; // design tokens: light, dark, English and Burmese modes
import '@morethanthings/horizon-ds/fonts.css';  // optional, see below
import '@morethanthings/horizon-ds/styles.css'; // every component's styles
```

### Fonts

The components use Inter, Noto Sans Myanmar and Material Symbols Rounded (for icons). `fonts.css` loads them from Google Fonts with CSS `@import`.

For faster first paint, skip `fonts.css` and put these tags in your HTML `<head>` instead:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Myanmar:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
```

Without one or the other, text falls back to system fonts and icons show as their names.

## Modes

- Dark mode: set `data-theme="dark"` on an ancestor, usually `<html>`.
- Burmese typography: set `lang="my"` on an ancestor. Elements inside with any other `lang` switch back to English type.

## What you can import

Everything public is exported from the package root: `Button`, `IconBtn`, `Card`, and the parts Card is built from, `CardContainer`, `CardLayout`, `CardImage`, `CardText`, with their `<Name>Props` types (and `ButtonShape`, `ButtonState`, `CardLayoutImageProps`). Anything else is internal. See [Versioning](/get-started/versioning/).

## Next

- [React](/developing/react/)
- [All components](/core/components/overview/)

---

<small>Guide, written from the repo at [`d1860fe`](https://github.com/ktdm-than/horizon-ds/commit/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2) (README.md, src/index.ts, package.json) and re-read against it on 2026-11-20.</small>
