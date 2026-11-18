# VERSIONING.md — what a version number promises

`@morethanthings/horizon-ds` follows [Semantic Versioning 2.0.0](https://semver.org). This file
says what counts as the public API, which change forces which number, and how a version is
chosen. The release-review skill's gate 7 reads it.

## The public API

A version number makes promises about these, and nothing else:

| Surface | Where it is defined |
|---|---|
| Exported components and types | `src/index.ts`, the only public surface (`tools.md`) |
| Each component's props: names, types, allowed values, defaults | The component's `<Name>Props` type. Prop names match Figma property names (`CLAUDE.md`). |
| Stylesheet entry points | `exports` in `package.json`: `styles.css`, `tokens.css`, `fonts.css` |
| Token names | The CSS custom properties `tokens.css` defines, in every mode it ships |
| Modes | The mode selectors `tokens.css` ships (light, dark, English, Burmese) |
| Peer dependencies | `peerDependencies` in `package.json` |

Not public, and free to change in any release: anything not exported from `src/index.ts`, class
names inside the rendered markup (`hds-*`), primitive tokens (`--primitives-*`), file layout inside
`dist/`, and anything the README or a component's intent file does not describe.

## What forces each number

### From 1.0.0

| Bump | Forced by |
|---|---|
| **Major** | Removing or renaming an export, a prop, a prop value, a semantic token, a mode or a stylesheet entry point. Changing a prop's type or default. Narrowing what a prop accepts. Raising a peer dependency's lowest supported major. Removing something that was deprecated. |
| **Minor** | A new component, export, prop, prop value, semantic token or mode. Widening what a prop accepts. Deprecating something. A deliberate visual change from Figma, such as a new token value or spacing, that keeps every name and type working. |
| **Patch** | A fix that brings a component back to its Figma design or its documented behaviour, with no change to names, types or defaults. Docs, README, story and build fixes that change nothing a consumer imports. |

When a release mixes changes, the largest one decides the bump.

### Before 1.0.0 (now)

The package is `0.x`. While it is:

- **Minor** (`0.1.0` → `0.2.0`) for any addition, and for any change that would be major after
  1.0.0. A breaking change in a minor bump is listed under Changed or Removed in the changelog,
  with what to change in consumer code.
- **Patch** (`0.2.0` → `0.2.1`) only for fixes, as defined above.

Going to **1.0.0** is a human decision, not one a release run makes.

## Deprecation

Deprecate before removing. A deprecated export, prop or token is marked `@deprecated` in its type
or a comment in the token source, names its replacement, and is listed under Deprecated in the
changelog. It stays for at least one minor release and is removed in the next major. Before
1.0.0, a removal can come in the next minor.

## How a version is chosen

1. The release agent proposes a version and names the specific change that forces it, against
   this file (`.claude/agents/release.md`, step 7).
2. A human approves it. No agent decides a version.
3. The bump to `package.json` `version` is its own pull request to `main`, reviewed and merged
   like any other change. `npm run release:publish -- <version>` refuses to publish a version
   that is not already the one in `package.json` on `main`.
4. The publish tags the release commit `v<version>`.

## Changelog

Each release's changelog uses five headings: Added, Changed, Fixed, Deprecated, Removed. Every
line traces to a commit since the last `v*` tag. A heading with nothing under it is left out.
