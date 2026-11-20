# Release review: Button

| | |
|---|---|
| Component | Button (with its private `ButtonIcon`, Figma LeadingIcon 280:255 / TrailingIcon 280:271) |
| Registry row | Components `recbxEA7SgZJxY90j` (Button, ATOMS) |
| Woken by | The release agent, "release and publish 0.1.0" (project owner's instruction, 2026-11-20), the review step of the release run |
| Commit reviewed | `d1860feaaa47e0af02a0d0b0f0ac52cba9a7aca2` docs(review): Card — Cleared (#23) |
| How it reached `main` | Button's last code change is PR #26 (merge `99e2239`, head `b3aebb2`). Since the previous review at `c836456`, `main` gained only PR #22 (merge `36a6646`) and PR #23 (merge `d1860fe`), which add `reviews/Button.md` and `reviews/Card.md`; `git diff c836456 d1860fe -- src VERSIONING.md package.json tokens docs` is empty. The registry `Commit` (`b3aebb2`) is an ancestor of the reviewed commit. |
| `main` at review time | `d1860fe` (level with `origin/main` after `git fetch`, tree clean) |
| Supersedes | The review at `c836456` (report commit `dfcb7cf`, Cleared) |
| Review date | 2026-11-20 |
| Verdict | **Cleared** |

Every file below was read at `d1860fe` with `git show d1860fe:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, component set `Btn` 280:276) on 2026-11-20.

Binding rulings for this run (project owner, 2026-11-20):
- Gate 3 is strict: raw px in story fixtures and unitless `line-height` fail.
- `use_instead` is optional; a null is neither a warning nor a block (check 2 of the skill).
- The icon line height is `--lineheight-sm`, with the about-2px Burmese offset accepted. Not warned on.
- `Button.css:93` (the `.hds-button:focus-visible {` rule opener) is accepted as the a11y source for
  the focus fact.
- The IconBtn waiver does not touch Button: Button neither imports nor renders IconBtn, so nothing in
  this report is waived.

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | Pass | `src/components/Button/Button.intent.json` exists at `d1860fe`. `ButtonIcon` is a module-private function in `Button.tsx`, not a separate component, so it carries no intent of its own. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read 2026-11-20, not written). `Design` = Done. |
| 3 | Tokens clean | Pass | A scan of every `.tsx` and `.css` in `src/components/Button/` (stories and tests included) for hex, `px`, `--primitives-*`, unitless `line-height`, `font-variation-settings`, `font-family`, numeric `font-weight` / `font-size` finds only `Button.css:22-23`, which are inside a comment ("20px in English, 24px in Burmese ... about 2px low in its 20x20 box"). The only inline style is `Button.stories.tsx:91` `gap: 'var(--spacing-lg)'`. |
| 4 | Public surface decided | Pass | `src/index.ts:4` exports `Button`, `ButtonProps`, `ButtonShape`, `ButtonState`. `ButtonIcon` is not exported from `Button.tsx`, so it is private in code. Nothing internal is exported. |
| 5 | Names final | Pass | Figma `Btn` 280:276, read live: the eight variants are named `state=default/hover/focus/disabled, shape=fill/outline`. Code props `state`, `shape` and every value match exactly (`Button.tsx:8`). `showLeadingIcon` / `showTrailingIcon` match the Figma booleans as recorded at `c836456`; no Button source changed since. Code-only props `leadingIcon`, `trailingIcon`, `children` are recorded under "Naming suggestions" in `docs/button-build-report.md`. No open question is left on a prop name. |
| 6 | States complete | Pass | Figma defines 8 variants (280:256, 280:277, 280:285, 280:292, 280:333, 280:339, 280:347, 280:353). All 8 are implemented in `Button.css` and each has a story; the production Storybook (opened in the signed-in browser, 2026-11-20) lists `default-fill` through `disabled-outline`, plus `no-leading-icon`, `no-trailing-icon`, `label-only`, `interactive`. Pressed, loading and error are not in the component set (Observation 2). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `d1860fe`. `package.json` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns 404 and there is no `v*` tag, so 0.1.0 is the version this ships in. The project owner named 0.1.0 ("release and publish 0.1.0"). VERSIONING.md "Before 1.0.0 (now)" says what a 0.x number promises. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | Pass | All eight fields present. `placement` and `pairs_with` are empty, and `variant_intent.*.purpose` is empty; all are listed in `docs/intent-gaps.md` (Open). |
| 2 | `use_instead` well-formed where present | Pass | 1 of 4 `dont_use_when` entries names an alternative, and it is a string: "text links or navigational tabs". Entries 2, 3, 4 are `null`, correct under the 2026-11-20 ruling. Information only. |
| 3 | a11y specific | Pass | All 8 entries state a behaviour and carry a line that says it at `d1860fe`. See the table below. |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded and left the tree clean. All 18 names are defined in `build/css/tokens.css`. The 11 `color-*` names are also in `tokens-dark.css` (which defines only `color-*`). `action-button1`, `fontsize-xl`, `lineheight-sm` are also in `tokens-english.css` and `tokens-burmese.css`, which define only the typography families. Spacing, radius and border width are `:root`-only, as all their siblings are. No mode gap. |
| 5 | All variants covered | Pass | `ButtonState` (default, hover, focus, disabled), `ButtonShape` (fill, outline), `showLeadingIcon`, `showTrailingIcon` all appear in `variant_intent`, and each has a story (8 state x shape stories, NoLeadingIcon, NoTrailingIcon, LabelOnly, Interactive). |
| 6 | No two components claim the same job | Pass | Compared with every other intent file (Card, CardContainer, CardLayout, CardImage, CardText; the four subcomponents' `use_when` are empty). Button triggers actions; Card displays content on one topic. Closest pair: Button "entry points into deeper workflows, dialogs, or page transitions" and Card "entry points into deeper levels of detail or navigation"; an action control and a content summary, not the same situation. A human may want one to name the other. |

### Check 3, every source at `d1860fe`

| `a11y` fact (shortened) | `source` | What that line says |
|---|---|---|
| Renders a native `<button>` | `Button.tsx:62` | `<button` |
| `type` defaults to "button" | `Button.tsx:55` | `type = 'button',` |
| `disabled` / `state="disabled"` sets native disabled | `Button.tsx:60` | `const isDisabled = Boolean(disabled) \|\| state === 'disabled';` |
| Remaining props are spread onto the `<button>` | `Button.tsx:63` | `{...rest}` |
| Accessible name is the label in a `<span>` | `Button.tsx:71` | `<span className="hds-button__label">{children}</span>` |
| Icons are `aria-hidden="true"` | `Button.tsx:40` | `aria-hidden="true"` |
| `:focus-visible` removes the outline; focus is a colour change only | `Button.css:93` | `.hds-button:focus-visible {` (accepted by the project owner, 2026-11-20; the declaration `outline: none;` is `:94`) |
| No loading or pressed state, no `aria-busy` / `aria-pressed` | `Button.tsx:8` | `export type ButtonState = 'default' \| 'hover' \| 'focus' \| 'disabled';` |

## Observations (did not change the verdict)

1. **Focus is a colour change only.** `Button.css:93-95` removes the outline; on fill, focus and hover
   share a colour (`docs/button-build-report.md` A1). Whether that meets WCAG 2.4.7 / 1.4.11 needs a
   human with a contrast check. This review did not measure it.
2. **Anatomy vs component set.** Figma anatomy 82:139 lists ghost, pressed/active, loading and error;
   the set `Btn` has none of them (`docs/button-build-report.md` G5). For design to decide.
3. **Production Storybook opened** in the signed-in built-in browser:
   `https://horizon-8po5n4k19-tangible7.vercel.app/?path=/story/components-button--default-fill`
   renders `<button type="button" data-state="default" data-shape="fill" class="hds-button">`.
4. **Figma booleans** were read from the component set's variant names this run; the boolean property
   names were last read live in the `c836456` review the same day, and no Button source has changed.

## Verdict

**Cleared.** Every gate passes and no check fails. No warnings.
