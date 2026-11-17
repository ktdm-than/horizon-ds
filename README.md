# @horizon-ds/react

React components for the Horizon design system, built from its Figma library.

## Install

```bash
npm install @horizon-ds/react react react-dom
```

React 19 and React DOM 19 are peer dependencies.

## Load the styles once, at your app root

Order matters: tokens first, then fonts, then component styles.

```ts
import '@horizon-ds/react/tokens.css'; // design tokens: light, dark, English and Burmese modes
import '@horizon-ds/react/fonts.css';  // optional, see below
import '@horizon-ds/react/styles.css'; // every component's styles
```

### Fonts

The components use Inter, Noto Sans Myanmar and Material Symbols Rounded (for icons).
`fonts.css` loads them from Google Fonts with CSS `@import`. That is the simplest option.

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

## Use

```tsx
import { Button, Card } from '@horizon-ds/react';

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

Components: `Button`, `IconBtn`, `Card`, and the parts Card is built from: `CardContainer`,
`CardLayout`, `CardImage`, `CardText`. Prop names match the Figma property names. The stories in
this repo's Storybook document every variant and state.

## Developing this package

Commands are in [`tools.md`](tools.md). How we work is in [`CLAUDE.md`](CLAUDE.md).
