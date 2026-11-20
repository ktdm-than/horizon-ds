# Release review: Button

| | |
|---|---|
| Component | Button (with its private `ButtonIcon`, Figma LeadingIcon 280:255 / TrailingIcon 280:271) |
| Registry row | Components `recbxEA7SgZJxY90j` (Button, ATOMS) |
| Woken by | The release agent, "prepare for release" (review run, no version named, no publish) |
| Commit reviewed | `c15aa7276dbb3ed6dce06bc1b170dfb00530c86a` docs(button,card): add best practice to intent (#21) |
| How it reached `main` | PR #21, merged by squash. Code last changed by PR #13 (`59e8717`, the registry `Commit`); since then only `Button.intent.json`, `Button.test.tsx` and a one-line removal in `Button.tsx` |
| `main` at review time | `c15aa72` (level with `origin/main` after `git fetch`) |
| Review date | 2026-11-20 |
| Verdict | **Blocked** (gate 3) |

Every file below was read at `c15aa72` with `git show c15aa72:<path>`. Figma was read live over the
Figma MCP (file `l87TswOf2FHCxsYmK8XhHJ`, component set `Btn` 280:276).

## Gates

| # | Gate | Result | Evidence |
|---|---|---|---|
| 1 | Intent written | Pass | `src/components/Button/Button.intent.json` exists. `ButtonIcon` is a module-private function in `Button.tsx:37`, not a separate component, so it carries no intent of its own. |
| 2 | Development status Completed | Pass | Registry `Development` = Completed (read, not written). `Design` = Done. |
| 3 | Tokens clean | **Fail** | `Button.css:49` `line-height: 1;` is a raw font value with no token (CLAUDE.md: every font value references a token). No raw hex, no `px` value, no `--primitives-*` reference anywhere in `src/components/Button/*.tsx` or `*.css`. `Button.css:22` mentions "20px" only inside a comment, which is not a value. |
| 4 | Public surface decided | Pass | `src/index.ts:4` exports `Button`, `ButtonProps`, `ButtonShape`, `ButtonState`. `ButtonIcon` is not exported from `Button.tsx`, so it is private in code. Nothing internal is exported. |
| 5 | Names final | Pass | Figma `componentPropertyDefinitions` on 280:276: `state` (variant), `shape` (variant), `showLeadingIcon#280:2`, `showTrailingIcon#280:3` (boolean). Code props `state`, `shape`, `showLeadingIcon`, `showTrailingIcon` match exactly. Code-only props `leadingIcon`, `trailingIcon`, `children` are recorded in `docs/button-build-report.md` "Naming suggestions". The fill variants' value `defaul` (Figma typo, still live) is recorded there, and the code's `default` is decided. No open question is left on a prop name. |
| 6 | States complete | Pass | Figma defines `state` = default (`defaul` on fill), hover, focus, disabled across `shape` = fill, outline: 8 variants (280:256, 280:277, 280:285, 280:292, 280:333, 280:339, 280:347, 280:353). All 8 are implemented in `Button.css:56-108` and have a story (`Button.stories.tsx`, DefaultFill through DisabledOutline). The anatomy frame's pressed, loading and error states are not in the component set (see Observations). |
| 7 | Version meaning known | Pass | `VERSIONING.md` exists at `c15aa72`. `package.json` on `main` reads `"version": "0.1.0"`; `npm view @morethanthings/horizon-ds` returns 404 and there is no `v*` tag, so nothing is published, and `release:publish` accepts only the version already in `package.json` on `main`. 0.1.0 is the version this would ship in; VERSIONING.md "Before 1.0.0" says what a 0.x number promises. A human still approves the version. |

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Fields present | Pass | All eight fields present. `placement` and `pairs_with` are empty, and both are listed in `docs/intent-gaps.md` (Open). `variant_intent.*.purpose` is empty, also listed there. |
| 2 | `dont_use_when` names an alternative | **Warn** | 3 of 4 entries have `use_instead: null` (entries 2, 3, 4). Entry 1's `use_instead` is "text links or navigational tabs", Figma's words, not a component in `src/components/` (`docs/intent-gaps.md`, Open questions). Never blocks. |
| 3 | a11y specific | Pass | 8 entries, each a behaviour with a line that says it at `c15aa72`: `Button.tsx:63` `<button`, `:56` `type = 'button'`, `:61` `isDisabled = Boolean(disabled) \|\| state === 'disabled'`, `:64` `{...rest}`, `:72` label span, `:41` `aria-hidden="true"`, `Button.css:93` `outline: none;`, `Button.tsx:8` `ButtonState` has no pressed or loading value. |
| 4 | `required_tokens` resolve | Pass | `npm run build:tokens` succeeded. All 17 names are defined in `build/css/tokens.css`. The 11 `color-*` names are also in `tokens-dark.css`, as their siblings are. `action-button1` and `fontsize-xl` are also in `tokens-english.css` and `tokens-burmese.css`, as theirs are. Spacing, radius and border width are defined only in `:root`, as all their siblings are. No mode gap. |
| 5 | All variants covered | Pass | `ButtonState` (default, hover, focus, disabled), `ButtonShape` (fill, outline), `showLeadingIcon` and `showTrailingIcon` (true, false) all appear in `variant_intent`, and each has a story (8 state x shape stories, NoLeadingIcon, NoTrailingIcon, LabelOnly). |
| 6 | No two components claim the same job | Pass | Compared with every other intent file (Card, CardContainer, CardLayout, CardImage, CardText; the four subcomponents' `use_when` are empty). Button triggers actions; Card displays content on one topic. Closest pair: Button "entry points into deeper workflows, dialogs, or page transitions" and Card "entry points into deeper levels of detail or navigation". One is an action control, the other a content summary, so this is not judged the same situation. A human may want one to name the other. |

## Observations (did not change the verdict)

1. **Focus is a colour change only.** `Button.css:92-94` removes the outline; on fill, focus and hover
   share the same colour value (`docs/button-build-report.md` A1). Whether that meets WCAG 2.4.7 /
   1.4.11 needs a human with a contrast check. This review did not measure it.
2. **Anatomy vs component set.** Figma anatomy 82:139 lists ghost, pressed/active, loading and error;
   the set `Btn` has none of them (`docs/button-build-report.md` G5). CLAUDE.md asks for them where
   the product uses them. For design to decide.
3. **`defaul` typo still live in Figma** (280:256, and the set's default value). Code uses `default`.
4. **Registry `Commit` is older than the reviewed commit** (`59e8717`); the code under review differs
   from it only by tests, intent and one removed line in `Button.tsx`.
5. **Production Storybook not opened.** `https://horizon-f7dc6jew7-tangible7.vercel.app` answers
   302 (Vercel authentication) to an unauthenticated request.

## Verdict

**Blocked.**

| Failing | What | Owner |
|---|---|---|
| Gate 3 | `src/components/Button/Button.css:49` `line-height: 1;` is a raw font value | Engineer, with a human in Figma if no icon line-height token exists (report the gap, do not invent one) |

Warning carried, not blocking: check 2 (null `use_instead` x3, non-component alternative x1).
