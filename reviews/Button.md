# Release review: Button

| | |
|---|---|
| Component | Button (with its private `ButtonIcon`, Figma LeadingIcon 280:255 / TrailingIcon 280:271) |
| Registry row | Components `recbxEA7SgZJxY90j` (Button, ATOMS) |
| Woken by | The release agent, "prepare for release": a re-review started by the project owner ("Yes, do both", after the engineer updated Button's board row), review only, no package, no publish |
| Commit reviewed | `c836456078f2b54d5dcdb2228e9b306f9ad69ec6` docs(intent-gaps): follow the Card story and CardText prop changes from #25 (#27) |
| How it reached `main` | Button's changes since the last review (`5940f78`) came in by PR #26 (merge `99e2239`, head `b3aebb2`): `72fe325` fix(button): take the icon line height from --lineheight-sm, and `b3aebb2` docs(button): re-point a11y sources and add lineheight-sm to intent. The registry `Commit` (`b3aebb2`) is an ancestor of the reviewed commit. PR #27 (`c836456`) touched only `docs/intent-gaps.md`. |
| `main` at review time | `c836456` (level with `origin/main` after `git fetch`, tree clean) |
| Supersedes | The review at `5940f78` (report commit `b68be56`, Blocked on check 3) |
| Review date | 2026-11-20 |
| Verdict | **Cleared** |

Every file below was read at `c836456` with `git show c836456:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, component set `Btn` 280:276) on 2026-11-20.

Binding rulings for this run (project owner, 2026-11-20):
- Gate 3 is strict: raw px in story fixtures and unitless `line-height` fail.
- `use_instead` is optional; a null is neither a warning nor a block (check 2 of the skill).
- The icon line height is `--lineheight-sm`, with the about-2px Burmese offset accepted. Not warned on.
- The IconBtn waiver does not touch Button: Button neither imports nor renders IconBtn, so nothing in
  this report is waived.

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | Pass | `src/components/Button/Button.intent.json` exists. `ButtonIcon` is a module-private function (`Button.tsx:36`), not a separate component, so it carries no intent of its own. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read, not written). `Design` = Done. |
| 3 | Tokens clean | Pass | `Button.css:50` now reads `line-height: var(--lineheight-sm);`. Figma binds the icon glyph's line height to `lineHeight/sm` and its size to `fontSize/xl` (text nodes `I280:257;326:19`, `I280:272;326:20` and the other six instances, read live; `get_variable_defs` on 280:255 returns `lineHeight/sm` and `fontSize/xl`). No raw hex, no `px` value, no unitless `line-height`, no `font-variation-settings` and no `--primitives-*` reference in any `.tsx` or `.css` in `src/components/Button/` (stories and tests included). `Button.css:51-52` `1em` is relative to the bound font size. The "20px", "24px", "2px" and "20x20" at `Button.css:19-23` and "20x20" at `Button.tsx:5` are inside comments. `Button.stories.tsx:91` uses `var(--spacing-lg)`. |
| 4 | Public surface decided | Pass | `src/index.ts:4` exports `Button`, `ButtonProps`, `ButtonShape`, `ButtonState`. `ButtonIcon` is not exported from `Button.tsx`, so it is private in code. Nothing internal is exported. |
| 5 | Names final | Pass | Figma `Btn` 280:276, read live: `state` (default, hover, focus, disabled), `shape` (fill, outline), `showLeadingIcon`, `showTrailingIcon` (boolean, default true). Code props `state`, `shape`, `showLeadingIcon`, `showTrailingIcon` and every value match exactly (`Button.tsx:8-23`). Code-only props `leadingIcon`, `trailingIcon`, `children` are recorded under "Naming suggestions" in `docs/button-build-report.md`. No open question is left on a prop name. |
| 6 | States complete | Pass | Figma defines 8 variants: `state` default, hover, focus, disabled x `shape` fill, outline (280:256, 280:277, 280:285, 280:292, 280:333, 280:339, 280:347, 280:353). All 8 are implemented (`Button.css:56-110`) and each has a story (`Button.stories.tsx:41-72`, DefaultFill through DisabledOutline). Pressed, loading and error are not in the component set (Observation 2). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `c836456`. `package.json` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns E404 and there is no `v*` tag, so nothing is published and 0.1.0 is the version this would ship in. VERSIONING.md "Before 1.0.0 (now)" says what a 0.x number promises. A human still approves the version. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | Pass | All eight fields present. `placement` and `pairs_with` are empty, and `variant_intent.*.purpose` is empty; all three are listed in `docs/intent-gaps.md` (Open). |
| 2 | `use_instead` well-formed where present | Pass | 1 of 4 `dont_use_when` entries names an alternative, and it is a string: entry 1, "text links or navigational tabs" (Figma's words, not a component in `src/components/`). Entries 2, 3, 4 are `null`, which is correct under the 2026-11-20 ruling. Information only. |
| 3 | a11y specific | Pass | All 8 entries state a behaviour and carry a line that says it at `c836456`. The six stale sources from the last review are re-pointed by `b3aebb2`. See the table below. |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded and left the tree clean. All 18 names are defined in `build/css/tokens.css`. The 11 `color-*` names are also in `tokens-dark.css`, as their siblings are. `action-button1`, `fontsize-xl` and the new `lineheight-sm` are also in `tokens-english.css` and `tokens-burmese.css`, as theirs are (`--lineheight-sm`: 20px English, 24px Burmese, 20px `:root`). Spacing, radius and border width are defined only in `:root`, as all their siblings are. No mode gap. |
| 5 | All variants covered | Pass | `ButtonState` (default, hover, focus, disabled), `ButtonShape` (fill, outline), `showLeadingIcon` and `showTrailingIcon` (true, false) all appear in `variant_intent`, and each has a story (8 state x shape stories, NoLeadingIcon, NoTrailingIcon, LabelOnly, plus Interactive). |
| 6 | No two components claim the same job | Pass | Compared with every other intent file (Card, CardContainer, CardLayout, CardImage, CardText; the four subcomponents' `use_when` are empty). Button triggers actions; Card displays content on one topic. Closest pair: Button "entry points into deeper workflows, dialogs, or page transitions" and Card "entry points into deeper levels of detail or navigation". One is an action control, the other a content summary, so this is not judged the same situation. A human may want one to name the other. |

### Check 3, every source at `c836456`

| `a11y` fact (shortened) | `source` | What that line says |
|---|---|---|
| Renders a native `<button>` | `Button.tsx:62` | `<button` |
| `type` defaults to "button" | `Button.tsx:55` | `type = 'button',` |
| `disabled` / `state="disabled"` sets native disabled | `Button.tsx:60` | `const isDisabled = Boolean(disabled) \|\| state === 'disabled';` |
| Remaining props are spread onto the `<button>` | `Button.tsx:63` | `{...rest}` |
| Accessible name is the label in a `<span>` | `Button.tsx:71` | `<span className="hds-button__label">{children}</span>` |
| Icons are `aria-hidden="true"` | `Button.tsx:40` | `aria-hidden="true"` |
| `:focus-visible` removes the outline; focus is a colour change only | `Button.css:93` | `.hds-button:focus-visible {`, the rule whose body (`:94`) is `outline: none;` |
| No loading or pressed state, no `aria-busy` / `aria-pressed` | `Button.tsx:8` | `export type ButtonState = 'default' \| 'hover' \| 'focus' \| 'disabled';` |

On `Button.css:93`: PR #26 added one comment line above it, so the last review's `:93 outline: none;`
is now `:94`, and `:93` is the selector line of the same rule. This review accepts the citation: the
line names `:focus-visible` on `.hds-button` and opens the one rule that removes the outline, which
is unlike last review's failures, where each line cited said something unrelated (`className,`,
`return (`). A reader who wants the cited line to be the declaration itself would point it at `:94`.

## Observations (did not change the verdict)

1. **Focus is a colour change only.** `Button.css:93-95` removes the outline; on fill, focus and hover
   share a colour (`docs/button-build-report.md` A1). Whether that meets WCAG 2.4.7 / 1.4.11 needs a
   human with a contrast check. This review did not measure it.
2. **Anatomy vs component set.** Figma anatomy 82:139 lists ghost, pressed/active, loading and error;
   the set `Btn` has none of them (`docs/button-build-report.md` G5). For design to decide.
3. **`intent.json` `commit` field** names `72fe325`, the code change of PR #26. `Button.tsx` and
   `Button.css` are unchanged between `72fe325` and `c836456`.
4. **Production Storybook not opened in a browser.** The board's value
   `https://horizon-8po5n4k19-tangible7.vercel.app/?path=/story/components-button--default-fill`
   answers 302 (Vercel authentication) to an unauthenticated request. Over the Vercel API it is a
   READY production deployment built from `main` at `99e2239` (PR #26's merge).
5. **QA re-test.** The board's test summary reads Passed; QA's report-only re-test of `b3aebb2` passed
   15/15, Burmese included.

## Verdict

**Cleared.** Every gate passes and no check fails.

Check 3, which blocked the last review, now passes: `b3aebb2` re-pointed the six stale sources.
No warnings.
