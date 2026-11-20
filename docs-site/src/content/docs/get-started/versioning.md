---
title: Versioning
description: What a version number of @morethanthings/horizon-ds promises.
---

`@morethanthings/horizon-ds` follows [Semantic Versioning 2.0.0](https://semver.org). The rules below are from [`VERSIONING.md`](https://github.com/ktdm-than/horizon-ds/blob/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2/VERSIONING.md), which is the source of truth.

## The public API

A version number makes promises about these, and nothing else:

| Surface | Where it is defined |
|---|---|
| Exported components and types | `src/index.ts`, the only public surface |
| Each component's props: names, types, allowed values, defaults | The component's `<Name>Props` type. Prop names match Figma property names. |
| Stylesheet entry points | `exports` in `package.json`: `styles.css`, `tokens.css`, `fonts.css` |
| Token names | The CSS custom properties `tokens.css` defines, in every mode it ships |
| Modes | The mode selectors `tokens.css` ships (light, dark, English, Burmese) |
| Peer dependencies | `peerDependencies` in `package.json` |

Not public, and free to change in any release: anything not exported from `src/index.ts`, class names inside the rendered markup (`hds-*`), primitive tokens (`--primitives-*`), file layout inside `dist/`, and anything the README or a component's intent file does not describe.

## Before 1.0.0 (now)

`package.json` reads `0.1.0`. While the package is `0.x`:

- **Minor** (`0.1.0` → `0.2.0`) for any addition, and for any change that would be major after 1.0.0. A breaking change in a minor bump is listed under Changed or Removed in the changelog, with what to change in consumer code.
- **Patch** (`0.2.0` → `0.2.1`) only for fixes.

Going to **1.0.0** is a human decision, not one a release run makes.

## From 1.0.0

| Bump | Forced by |
|---|---|
| **Major** | Removing or renaming an export, a prop, a prop value, a semantic token, a mode or a stylesheet entry point. Changing a prop's type or default. Narrowing what a prop accepts. Raising a peer dependency's lowest supported major. Removing something that was deprecated. |
| **Minor** | A new component, export, prop, prop value, semantic token or mode. Widening what a prop accepts. Deprecating something. A deliberate visual change from Figma that keeps every name and type working. |
| **Patch** | A fix that brings a component back to its Figma design or its documented behaviour, with no change to names, types or defaults. Docs, README, story and build fixes that change nothing a consumer imports. |

When a release mixes changes, the largest one decides the bump.

## Deprecation

Deprecate before removing. A deprecated export, prop or token is marked `@deprecated`, names its replacement, and is listed under Deprecated in the changelog. It stays for at least one minor release. Before 1.0.0, a removal can come in the next minor.

## How a version is chosen

1. The release agent proposes a version and names the change that forces it.
2. A human approves it. No agent decides a version.
3. The bump to `package.json` is its own pull request to `main`. `npm run release:publish -- <version>` refuses a version that is not already the one in `package.json` on `main`.
4. The publish tags the release commit `v<version>`.


---

<small>Guide, written from the repo at [`d1860fe`](https://github.com/ktdm-than/horizon-ds/commit/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2) and re-read against it on 2026-11-20.</small>
