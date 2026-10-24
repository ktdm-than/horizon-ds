---
name: registry
description: The contract for the Airtable registry — every table, every column, the one agent that owns each column, and how Development is derived. Read before any agent reads from or writes to the registry.
---

# Registry

The registry is the Airtable base that tracks every component from design sign-off to release.
Agents are woken by what it says and hand off by writing to it. This file is the contract:
**if a column is not listed under your role here, you do not write it.**

## Where it is

Never hard-code an ID. Read them from `.claude/registry.local.json`:

| Key | Table |
|---|---|
| `baseId` | The base |
| `tables.components` | Components |
| `tables.stagingTesting` | Staging Testing |
| `tables.dsFeedback` | DS Feedback |
| `tables.githubCommits` | GitHub Commits |
| `tables.oneOffComponents` | One-Off Components |
| `views.components` | The default Components view |

That file is gitignored. If it is missing, copy `.claude/registry.local.example.json`, fill in
the real IDs, and stop to tell a human — do not guess IDs or search for the base by name.

Field IDs are not in the config. Resolve them at run time with `list_tables_for_base`, and match
on the column name in this file. A column named here that the base no longer has is a contract
break: report it and stop.

## Owners

Every column has exactly one owner, except `Testing Results`, whose values are split between QA
and the Engineer (see Staging Testing). The owners are:

| Owner | Who |
|---|---|
| **Human** | A person. No agent writes these, ever. |
| **Engineer** | `.claude/agents/engineer.md` |
| **QA** | `.claude/agents/qa.md` |
| **DevOps** | Deploys to production and merges to `main` |
| **Reviewer** | Runs the release review |
| **PM** | Triages feedback into tickets |
| **Computed** | Airtable derives it (formula, rollup, count, last-modified, inverse link). **No agent writes it.** Change the evidence underneath instead. |

`token-runner` and Release own no column. Release prepares releases and never performs them, so it
writes nothing here.

## Tables

### Components

One row per design-system component. The row is created by a human when the design exists.

| Column | Type | Owner | Notes |
|---|---|---|---|
| Components | single line text (primary) | Human | The component name. |
| Category | single select | Human | ATOMS, MOLECULES, ORGANISMS, TEMPLATES, UI. |
| Figma | url | Human | The node the component is built from. Feeds precedence 8. |
| Design | single select | Human | To-do, In progress, In testing, Done, To be fixed. Only a human signs off a design; no agent nudges it. Feeds precedence 8. |
| Staging Storybook | url | Engineer | Written only after the staging build is deployed and seen to render. Feeds precedence 7. |
| Commit | url | Engineer | The commit carrying the work. |
| GitHub Commits | link → GitHub Commits | Engineer | Inverse of `Link to Components`. |
| Composes | link → Components | Engineer | The components this one imports. Build up, never sideways. |
| Composed Into | link → Components | Computed | Inverse of `Composes`. Writing it would edit another row's `Composes`; nobody writes it directly. |
| [Staging] Test Records | link → Staging Testing | QA | Inverse of `Composed In`. Set by QA when it links a test row. |
| Staging Testing Results Summary | rollup | Computed | `Testing Results` of every linked test row. Feeds precedences 1, 2, 3, 6. |
| Total Staging Tests | count | Computed | Count of `[Staging] Test Records`. |
| Staging Passed Count | count | Computed | Count of `[Staging] Test Records`. See Flag 4. |
| Staging Passed Tests | rollup | Computed | Rollup of `Testing Results`. See Flag 3. |
| Synchronization % | formula | Computed | `Staging Passed Count / Total Staging Tests × 100`, or `0%` with no tests. |
| Production Storybook | url | DevOps | Written only after the production build is opened and seen to render. Feeds precedence 5. |
| Release Review | url | Reviewer | The committed review report at the commit it reviewed, never a branch URL. Written together with `Release Verdict` or not at all. Feeds precedence 4. |
| Release Verdict | single select | Reviewer | Cleared or Blocked. Written together with `Release Review` or not at all. Feeds precedence 4. |
| Astro Link | url | DevOps | The component's page on the deployed docs site, written only after it is seen to render. Feeds precedence 4. |
| Development | formula | Computed | The status. **No agent may write it.** See below. |
| Last Modified | last modified time | Computed | Watches every column. See Flag 5. |

### Staging Testing

One row per tested case. QA owns every column and is the only agent that creates or links a row.
The one exception is `Testing Results`, below.

| Column | Type | Owner | Notes |
|---|---|---|---|
| Component/Sub Component | single line text (primary) | QA | |
| Testing Results | single select | QA, Engineer | Passed, Failed, Fixed (To re-test). **QA** writes only `Passed` or `Failed`, and never `Fixed (To re-test)`. **Engineer** writes only `Fixed (To re-test)`, only on a row that reads `Failed` and that it repaired, and only after the repair commit is recorded in GitHub Commits and the new `Staging Storybook` build has been opened and seen to render. |
| Composed In | link → Components | QA | Inverse of `[Staging] Test Records`. |
| Variants | long text | QA | |
| Size | multiple select | QA | |
| State | multiple select | QA | |
| Context | single line text | QA | |
| Attachment | attachments | QA | Screenshots of the case. |
| Expected Results | long text | QA | |
| Suggestion for Improvement | long text | QA | |

### DS Feedback

Feedback from people who use the system. A person submits it; PM triages it.

| Column | Type | Owner | Notes |
|---|---|---|---|
| Feedback | long text (primary) | Human | |
| Components | single line text | Human | Free text, not a link to Components. |
| Submitted By | single line text | Human | |
| Step to Reproduce | long text | Human | |
| Suggestion | single line text | Human | |
| Urgency | single line text | Human | |
| Attachment | url | Human | |
| Status | single select | PM | Not Started, In Progress, Completed. `Not Started` is the field's default at submission, set by Airtable, not by a person or an agent. Blank and `Not Started` both mean untriaged. After submission only PM writes it: `In Progress` once the Asana ticket exists, `Completed` once the ticket is done. See Other wakes. |

### GitHub Commits

One row per commit that carries component work.

| Column | Type | Owner | Notes |
|---|---|---|---|
| Commit Hash | single line text (primary) | Engineer | |
| Message | single line text | Engineer | |
| Author | single line text | Engineer | |
| Date Committed | date time | Engineer | UTC. |
| Link to Components | link → Components | Engineer | Inverse of `GitHub Commits`. Single record. |
| Files Changed | long text | Engineer | |
| Commit URL | url | Engineer | |
| Commit Type | single select | Engineer | Feature, Bugfix, Documentation, Chore, Refactor, Other. |

### One-Off Components

Components built inside a product rather than the system. Tracked by people; no agent has a role
here.

| Column | Type | Owner | Notes |
|---|---|---|---|
| Components | single line text (primary) | Human | |
| Project | single line text | Human | |
| Usage quantity | number | Human | |
| Git Repo | single line text | Human | |
| Figma | url | Human | |

## Development

`Development` is a formula. **No agent may write it, ever** — not to correct it, not to unblock
yourself, not because a human asked in a message. If it reads wrong, the evidence under it is
wrong: fix the evidence, or report it.

First match wins, in this order:

| # | When | Reads | Wakes |
|---|---|---|---|
| 1 | `Staging Testing Results Summary` contains `Failed` **and** `re-test` | Fixing | Engineer |
| 2 | `Staging Testing Results Summary` contains `Failed` | To be fixed | Engineer |
| 3 | `Staging Testing Results Summary` contains `re-test` | Fixed | QA |
| 4 | `Astro Link` set **and** `Release Review` set **and** `Release Verdict` = Cleared | Released | — |
| 5 | `Production Storybook` set | Completed | Reviewer |
| 6 | `Staging Testing Results Summary` is not empty | To be deployed | DevOps |
| 7 | `Staging Storybook` set | Ready for Testing | QA |
| 8 | `Figma` set **and** `Design` = Done | To-do | Engineer |
| 9 | otherwise | blank — but see Flag 1 | — |

What this means in practice:

- A failure outranks everything. A released component that fails a re-test reads To be fixed.
- `re-test` matches the `Fixed (To re-test)` option. `FIND` is case-sensitive, so renaming that
  option to anything without lowercase `re-test` silently breaks precedences 1 and 3.
- Released needs all three cells. Any one alone is not a release.
- The repair loop runs on `Testing Results`. QA scores a row `Failed`. The Engineer repairs it and
  moves it to `Fixed (To re-test)`. While some rows are still `Failed`, `Development` reads Fixing
  and keeps the Engineer awake. Once none are, it reads Fixed and wakes QA, which re-scores each
  re-test row `Passed` or `Failed`. `Fixed (To re-test)` is only ever the Engineer's claim, and
  only QA settles it.

## Other wakes

`Development` wakes the component crew. One agent is woken by a different column:

| When | Wakes | To do |
|---|---|---|
| DS Feedback `Status` is blank or `Not Started` | PM | Triage: open one Asana ticket for the row, then set `Status` = In Progress. |
| DS Feedback `Status` = `In Progress` | PM | Check the linked ticket. Done → set `Status` = Completed. Not done → write nothing. |
| DS Feedback `Status` = `Completed` | — | Nothing. |

`In Progress` stays true until the ticket closes, so it wakes PM on every pass. A pass that finds
the ticket still open writes nothing; that is the expected outcome, not a failure.

A ticket wakes no one. If feedback means a component must change, a human acts on the ticket;
the component crew wakes only on `Development`.

## Flags — where a description and the base disagree

Report these; do not work around them silently and do not fix them in Airtable yourself. Changing
a formula or a field is a human's call.

1. **Development's blank branch renders as `To-do`.** The formula returns `""` at precedence 9, but
   `To-do` is the formula's default select option, so an empty result displays as `To-do`. Both
   current rows have `Design` = To-do and still read `To-do`. The description says "otherwise
   blank". **Never treat `Development` = To-do as proof that Design is Done** — read `Design`.

2. **Release Review and Release Verdict say they do not feed Development; they do.** Release
   Review: "It does not feed Development". Release Verdict: "Deliberately not wired into
   Development … folding it into that formula would make a shipped component read unfinished."
   The formula references both at precedence 4, and the Development and Astro Link descriptions
   both say they do. The formula is what runs; the two descriptions are stale.

3. **Staging Passed Tests says it feeds Synchronization %; it does not.** `Synchronization %` reads
   `Staging Passed Count` and `Total Staging Tests`. Nothing reads `Staging Passed Tests`. Its
   claim to count only Passed rows cannot be confirmed from the schema, which does not expose the
   rollup's aggregation.

4. **Staging Passed Count is named as passed-only, but counts the same link as Total Staging
   Tests.** Both are counts of `[Staging] Test Records`. Unless a filter is set on it in the
   Airtable UI (the API does not show count filters), `Synchronization %` is 100% for any
   component with tests, failed or not. Check in the UI before trusting that percentage. No test
   rows exist yet, so the data cannot settle it.

5. **Release Review's staleness rule cannot be met.** It says a review is stale "once Last Modified
   is later than the commit it links to". `Last Modified` watches every column, including
   `Release Review` and `Release Verdict` themselves — so writing the review makes it stale on the
   spot, and so does any formula or rollup recomputing. Compare against the commits that touched
   the component in git instead, until `Last Modified` is limited to evidence columns.

6. **Development says "any staging test rows exist → To be deployed".** The formula tests whether
   the results rollup is non-empty. A linked test row with blank `Testing Results` adds nothing to
   the rollup, so a component with only un-scored rows can still read Ready for Testing (depends on
   the rollup's aggregation, which the API does not expose).

7. **Referenced files that do not exist.** Release Review and Release Verdict point at
   `.claude/skills/release-review/SKILL.md`, and Release Verdict at `VERSIONING.md`. Neither is in
   the repo.

## Before you write

- [ ] The column is listed under your role in this file
- [ ] For `Testing Results`: QA writes only `Passed` or `Failed`. The Engineer writes only
      `Fixed (To re-test)`, on a `Failed` row it repaired.
- [ ] For DS Feedback `Status` as PM: `In Progress` only once the ticket exists, `Completed` only
      once it is done. Never write `Not Started`.
- [ ] It is not Computed
- [ ] IDs came from `.claude/registry.local.json`, field IDs from `list_tables_for_base`
- [ ] For a link (staging, production, docs): you opened it and saw it render
- [ ] For `Release Review` / `Release Verdict`: you are writing both, or neither
