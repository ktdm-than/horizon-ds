# Release review: Button

| | |
|---|---|
| Component | Button (with its private `ButtonIcon`, Figma LeadingIcon 280:255 / TrailingIcon 280:271) |
| Registry row | Components `recbxEA7SgZJxY90j` (Button, ATOMS) |
| Woken by | The release agent, "prepare for release": a re-review started by the project owner ("Yes, run release"), review only, no package, no publish |
| Commit reviewed | `5940f787e8892d8ccc08306819202655d444b2d0` fix(card): drop raw story sizes and rename CardText booleans (#25) |
| How it reached `main` | Button's changes since the last review (`c15aa72`) came in by PR #24 (`2742f12`, fix(button): put icon line-height on a font token), merged with a merge commit. The registry `Commit` (`b4d50e9`) is an ancestor of the reviewed commit. |
| `main` at review time | `5940f78` (level with `origin/main` after `git fetch`, tree clean) |
| Supersedes | The review at `c15aa72` (report commit `2df2c68`, Blocked on gate 3) |
| Review date | 2026-11-20 |
| Verdict | **Blocked** (check 3) |

Every file below was read at `5940f78` with `git show 5940f78:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, component set `Btn` 280:276) on 2026-11-20.

Binding rulings for this run: gate 3 is strict (ruled 2026-11-20: raw px in story fixtures and
unitless `line-height` fail). The IconBtn waiver (project owner, 2026-11-20) does not touch Button:
Button neither imports nor renders IconBtn, so nothing in this report is waived.

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | Pass | `src/components/Button/Button.intent.json` exists. `ButtonIcon` is a module-private function (`Button.tsx:36`), not a separate component, so it carries no intent of its own. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read, not written). `Design` = Done. |
| 3 | Tokens clean | Pass | Last review's failure is gone: `Button.css:49` now reads `line-height: var(--fontsize-xl);`. Figma binds both the icon glyph's font size and its line height to `fontSize/xl` (text nodes 326:19 and 326:20, read live), so the token is the bound one. No raw hex, no `px` value, no unitless `line-height` and no `--primitives-*` reference in any `.tsx` or `.css` in `src/components/Button/` (stories and tests included). `Button.css:50-51` `1em` is relative to the bound font size, not a raw value. `Button.css:19` "42", "24" and `Button.tsx:5` "20x20" are inside comments. `Button.stories.tsx:91` uses `var(--spacing-lg)`. |
| 4 | Public surface decided | Pass | `src/index.ts:4` exports `Button`, `ButtonProps`, `ButtonShape`, `ButtonState`. `ButtonIcon` is not exported from `Button.tsx`, so it is private in code. Nothing internal is exported. |
| 5 | Names final | Pass | Figma `componentPropertyDefinitions` on 280:276: `state` (variant: default, hover, focus, disabled), `shape` (variant: fill, outline), `showLeadingIcon#280:2`, `showTrailingIcon#280:3` (boolean). Code props `state`, `shape`, `showLeadingIcon`, `showTrailingIcon` and the value `default` match exactly. The `defaul` typo is gone from Figma (280:256 now reads `state=default, shape=fill`) and is marked resolved in `docs/button-build-report.md`. Code-only props `leadingIcon`, `trailingIcon`, `children` are recorded under "Naming suggestions" there. No open question is left on a prop name. |
| 6 | States complete | Pass | Figma defines 8 variants: `state` default, hover, focus, disabled × `shape` fill, outline (280:256, 280:277, 280:285, 280:292, 280:333, 280:339, 280:347, 280:353). All 8 are implemented (`Button.css:56-108`) and each has a story (`Button.stories.tsx:41-72`, DefaultFill through DisabledOutline). Pressed, loading and error are not in the component set (Observation 2). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `5940f78`. `package.json` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns 404 and there is no `v*` tag, so nothing is published and 0.1.0 is the version this would ship in. VERSIONING.md "Before 1.0.0" says what a 0.x number promises. A human still approves the version. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | Pass | All eight fields present. `placement` and `pairs_with` are empty, and `variant_intent.*.purpose` is empty; all three are listed in `docs/intent-gaps.md` (Open). |
| 2 | `dont_use_when` names an alternative | **Warn** | 3 of 4 entries have `use_instead: null` (entries 2, 3, 4). Entry 1's `use_instead` is "text links or navigational tabs", Figma's words, not a component in `src/components/` (`docs/intent-gaps.md`, Open questions). Never blocks. |
| 3 | a11y specific | **Fail** | PR #24 removed one comment line from `Button.tsx` (old line 16), so every line after it moved up by one. `Button.intent.json` was not refreshed, and six of its eight `source` lines no longer say their fact at `5940f78`. See the table below. The other two still hold: `Button.css:93` `outline: none;` and `Button.tsx:8` `export type ButtonState = 'default' \| 'hover' \| 'focus' \| 'disabled';`. |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded. All 17 names are defined in `build/css/tokens.css`. The 11 `color-*` names are also in `tokens-dark.css`, as their siblings are. `action-button1` and `fontsize-xl` are also in `tokens-english.css` and `tokens-burmese.css`, as theirs are. Spacing, radius and border width are defined only in `:root`, as all their siblings are. No mode gap. |
| 5 | All variants covered | Pass | `ButtonState` (default, hover, focus, disabled), `ButtonShape` (fill, outline), `showLeadingIcon` and `showTrailingIcon` (true, false) all appear in `variant_intent`, and each has a story (8 state × shape stories, NoLeadingIcon, NoTrailingIcon, LabelOnly). |
| 6 | No two components claim the same job | Pass | Compared with every other intent file (Card, CardContainer, CardLayout, CardImage, CardText; the four subcomponents' `use_when` are empty). Button triggers actions; Card displays content on one topic. Closest pair: Button "entry points into deeper workflows, dialogs, or page transitions" and Card "entry points into deeper levels of detail or navigation". One is an action control, the other a content summary, so this is not judged the same situation. A human may want one to name the other. |

### Check 3, the six stale sources

| `a11y` fact (shortened) | `source` in the intent | What that line says at `5940f78` | Where the fact now is |
|---|---|---|---|
| Renders a native `<button>` | `Button.tsx:63` | `{...rest}` | `Button.tsx:62` `<button` |
| `type` defaults to "button" | `Button.tsx:56` | `className,` | `Button.tsx:55` `type = 'button',` |
| `disabled` / `state="disabled"` sets native disabled | `Button.tsx:61` | `return (` | `Button.tsx:60` `const isDisabled = …` |
| Remaining props are spread onto the `<button>` | `Button.tsx:64` | `type={type}` | `Button.tsx:63` `{...rest}` |
| Accessible name is the label in a `<span>` | `Button.tsx:72` | `{showTrailingIcon && <ButtonIcon … />}` | `Button.tsx:71` `<span className="hds-button__label">` |
| Icons are `aria-hidden="true"` | `Button.tsx:41` | `>` | `Button.tsx:40` `aria-hidden="true"` |

The facts themselves are still true of the code. Only their line references are wrong, but check 3
asks for a line that says the fact at the reviewed commit, and the intent file is what the docs site
and consumers will cite. This review does not edit the intent file.

## Observations (did not change the verdict)

1. **Focus is a colour change only.** `Button.css:92-94` removes the outline; on fill, focus and hover
   share a colour (`docs/button-build-report.md` A1). Whether that meets WCAG 2.4.7 / 1.4.11 needs a
   human with a contrast check. This review did not measure it.
2. **Anatomy vs component set.** Figma anatomy 82:139 lists ghost, pressed/active, loading and error;
   the set `Btn` has none of them (`docs/button-build-report.md` G5). For design to decide.
3. **Icon line height uses a font-size token.** `--fontsize-xl` (20px) sits on `line-height`, as Figma
   binds it, while a `--lineheight-*` family exists (`--lineheight-xl` is 28px). It follows the
   binding exactly; design may prefer a line-height variable.
4. **`intent.json` `commit` field** still names `14a76fd`, older than the code it describes.
5. **Production Storybook not opened.** `https://horizon-8n4ytc0y0-tangible7.vercel.app` answers 302
   (Vercel authentication) to an unauthenticated request.

## Verdict

**Blocked.**

| Failing | What | Owner |
|---|---|---|
| Check 3 | Six `a11y` `source` lines in `Button.intent.json` point one line below their fact after PR #24 removed a line from `Button.tsx` | The component-intent run (doc-generator, Job A) refreshes the sources at the current commit |

Gate 3, which blocked the last review, now passes.

Warning carried, not blocking: check 2 (null `use_instead` ×3, non-component alternative ×1).
