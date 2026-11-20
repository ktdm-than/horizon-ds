---
title: Contributing
description: How work gets into Horizon.
---

How we work is in [`CLAUDE.md`](https://github.com/ktdm-than/horizon-ds/blob/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2/CLAUDE.md); commands and stack facts are in [`tools.md`](https://github.com/ktdm-than/horizon-ds/blob/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2/tools.md). In short:

## Branches and pull requests

Trunk-based: `main` is production. All work is a short-lived branch cut from `main` and merged back by pull request.

| Branch | For |
|---|---|
| `component/<name>` | Building one component |
| `fix/<name>` | Repairing one component |
| `stories/<name>` | Stories only |
| `docs/<name>` | Docs only |
| `chore/<name>` | Tooling, config |
| `tokens/sync-<name>` | One token re-export |

Commit messages and PR titles follow Conventional Commits (`feat(button): …`, `fix(button): …`, `docs: …`). Every pull request gets a Vercel preview deployment; that preview is staging. CI runs `npm run lint`, `npm test` and `npm run build-storybook` on every pull request.

Only DevOps merges into `main`, and only after the checks pass and a human has approved the pull request. No one approves their own work.

## Building a component

- One folder per component in `src/components/`, PascalCase. Prop names match the Figma property names exactly.
- Every visual value references a semantic token. No raw hex, px or font values in a component file, and no invented tokens: report the gap instead.
- Every variant and every interaction state the product uses has a story.
- Compose components, never copy their styles.
- Never edit `build/css/`: it is generated from `tokens/` by `npm run build:tokens`.

## Commands

| Job | Command |
|---|---|
| Install | `npm install` |
| Build tokens | `npm run build:tokens` |
| Run Storybook | `npm run storybook` |
| Test | `npm test` |
| Type check | `npm run lint` |
| Build the npm package | `npm run build:package` |


---

<small>Guide, written from the repo at [`d1860fe`](https://github.com/ktdm-than/horizon-ds/commit/d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2) and re-read against it on 2026-11-20.</small>
