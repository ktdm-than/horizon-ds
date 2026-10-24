# tools.md — what this project is built with

Stack facts and commands only. Rules about how we work live in `CLAUDE.md`.

## Stack

- Framework: React 19 with Vite
- Language: TypeScript, strict
- Package manager: npm
- Styling: CSS custom properties, generated from tokens
- Tokens: Style Dictionary v5, reading the Figma "Design Tokens" plugin export
- Component workshop: Storybook 10 (react-vite)
- Tests: Vitest
- Accessibility: Storybook a11y addon

## Commands

| Job | Command |
|---|---|
| Install | `npm install` |
| Build tokens | `npm run build:tokens` |
| Run Storybook | `npm run storybook` |
| Build Storybook | `npm run build-storybook` |
| Test | `npm test` |
| Type check | `npm run lint` |

## Paths

- Token source: `tokens/tokens.json` (exported from Figma, committed)
- Token config: `style-dictionary.config.js`
- Generated output: `build/tokens/` (never edit by hand, gitignored)
- Components: `src/components/<Name>/`
- Agents: `.claude/agents/`
- Skills: `.claude/skills/`

## Branches and deploys

Trunk-based: `main` is production. All work is a short-lived branch merged into `main` by PR.

| Branch | For | Commit Type in GitHub Commits |
|---|---|---|
| `component/<name>` | Building one component | Feature |
| `fix/<name>` | Repairing one component | Bugfix |
| `stories/<name>` | Stories only | Documentation |
| `docs/<name>` | Docs only | Documentation |
| `chore/<name>` | Tooling, config | Chore |
| `tokens/sync-<name>` | One token re-export (`token-runner`) | Chore |

| Job | Command |
|---|---|
| Start work | `git switch -c component/<name> origin/main` |
| Open the PR | `gh pr create --base main --draft`, then `gh pr ready` once checks pass |
| Check PR status | `gh pr checks` |
| Merge (DevOps only) | `gh pr merge --merge --delete-branch` |

- Commit messages and PR titles follow Conventional Commits: `feat(button): …`, `fix(button): …`,
  `docs: …`, `chore: …`, `refactor: …`. The merge commit on `main` takes the PR title.
- Every PR gets a Vercel preview deployment; that preview is staging. `Staging Storybook` is the
  preview URL of the exact commit (`<project>-<hash>-<team>.vercel.app`), never the branch alias,
  which changes as the branch moves and disappears when it is deleted.
- Merges use merge commits, never squash or rebase, so the commit in `Commit` stays reachable
  from `main`.
- `main` deploys production Storybook.
- CI (`.github/workflows/ci.yml`) runs `npm run lint` and `npm run build-storybook` on every PR.
  `npm test` is a placeholder in `package.json` and is not in CI yet.

## Dependency rules

- Match the package manager in this file. This project uses npm, not yarn or pnpm.
- Use the existing package scripts before inventing commands.
- Do not add a dependency without explaining why in your report.
- Do not add a UI or component library. This repo is the component library.
- If this file disagrees with `package.json`, inspect the repo and say so.