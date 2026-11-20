---
title: React
description: Using the components in a React 19 app.
---

The package ships React components, built for React 19 (`react` and `react-dom` `^19.3.0` are peer dependencies). It is published as ES modules and CommonJS, with type declarations.

## A first screen

```tsx
import { Button, Card } from '@morethanthings/horizon-ds';

export function Listing() {
  return (
    <Card image={{ src: '/casa.jpg', alt: 'Casa do Bairro' }} text={{ title: 'Casa do Bairro' }}>
      <Button shape="outline" showLeadingIcon={false} showTrailingIcon={false}>
        View
      </Button>
    </Card>
  );
}
```

Load the stylesheets once at your app root first; see [Developing](/developing/introduction/).

## Props

- Prop names and values match the Figma property names: `<Button shape="outline">` is the Figma variant `shape=outline`.
- `Button` and `IconBtn` render a native `<button>` and pass every other prop to it (`onClick`, `type`, `disabled`, `aria-*`, …). `type` defaults to `"button"`, so neither submits a form unless you pass `type="submit"`.
- `state` on `Button` pins a look for documentation and testing. Real hover, keyboard focus and the `disabled` attribute apply the same looks on their own, so leave it at `default` in product code.
- `Card` passes `image` and `text` objects to the `CardImage` and `CardText` it composes, and renders its children in the content slot.

Every prop, with its type, default and doc comment, is on the component's Code tab.

---

<small>Guide, written from the repo at [`d1860fe`](https://github.com/ktdm-than/horizon-ds/commit/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2) (README.md, package.json, Button.tsx, IconBtn.tsx, Card.tsx) and re-read against it on 2026-11-20.</small>
