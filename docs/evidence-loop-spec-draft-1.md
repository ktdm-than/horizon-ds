# Evidence Loop — pipeline spec (draft for review)

Source: FigJam board "Evidence Loop Mapping", node 24:313, read 2026-10-23.
Status: **draft. Nothing here is approved, and no agent files have been written from it.**

How to read this document:

- **[Board]** means the board says it.
- **[Repo]** means the repo already says it (`CLAUDE.md`, `.claude/skills/registry/SKILL.md`, or
  `.claude/agents/*.md`), and the board does not.
- If neither source settles something, it is listed under *Ambiguities* (section 4) with an ID
  (A1, A2, …) and is not answered anywhere in this document. When an actor section depends on an
  open question, it points to the ID instead of picking an answer.

---

## 1. Tools on the board

[Board] Figma (Edu plan), AI IDE: Claude (Pro), Git: GitHub (Free), hosting and domain: Vercel
(Free), Asana (Free), Airtable (Free).

[Board] The registry is Airtable. The board header names three things: **Registry**,
**Conditional Formula**, and **Development Status**. This reads as: actors write evidence into
registry columns, a formula turns that evidence into a status, and the status wakes the next
actor ("Provoke").

---

## 2. The statuses

[Board] These are every status on the board, with the condition written beside it:

| Status | Condition on the board | Wakes (Provoke) |
|---|---|---|
| To-do | "When Figma Column has Link Exists" | Developer |
| Ready for testing | "When Staging Storybook column has Link Exists" | QA |
| Fixed | "All results are marked as 'Fixed (Re-test)'" | QA |
| Fixing | "Few results are marked as 'Fixed (Re-test)', i.e. partially marked as fixed" | QA (see A9) |
| To be fixed | "One or more = 'Failed'" | Developer |
| To be deployed | "All = 'Passed'" | DevOps |
| Completed | "When Production Storybook column has Link Exists" | QA (blue line, see A14) |

The board gives no precedence order between these conditions (A8).

Changed by A7: "Fixed (Re-test)" now lives in the Developer's claim column, not in
`Testing Results`. Fixed and Fixing read the claim column. QA writes only Passed or Failed.

---

## 3. Actors

### 3.1 Client — Human

- **Access [Board]:** A chat interface such as Claude Cowork, Codex, or Gemini.
- **Reads:** Nothing is drawn.
- **Writes [Board]:** BRD, reference website, MVP.
- **Refuses:** Nothing is stated. The Client is a human, so no refusal list applies.
- **Hands off when [Board]:** A dashed arrow runs from the BRD to the Designer's Figma. The board
  states no condition for it (A1).

### 3.2 Designer — Human

- **Access [Board]:** Figma, FigJam.
- **Reads [Board]:** The Client's BRD, reference, and MVP.
- **Writes [Board]:**
  - Tokens and components in Figma.
  - The Figma node link in Airtable, in `Components / Figma`.
- **Tasks [Board]:**
  - Task 1 is design implementation.
  - Task 2 is design fix. No arrow on the board leads into this task (A2).
- **Refuses:** Nothing is stated. [Repo] Only a human signs off a design.
- **Hands off when [Board]:** `Components / Figma` holds a link. Development then reads **To-do**,
  which wakes the Developer.
  - [Repo] conflicts: the registry also requires `Design = Done` (A3).

### 3.3 Developer — Agent (the repo calls this the Engineer)

- **Woken by [Board]:**
  - **To-do**, through the grey line from the Designer's row.
  - **To be fixed**, through the yellow line from QA.
- **First decision [Board]:** A diamond labelled "New". The Yes and No branches are below. What
  makes work count as "new" is not stated (A4).

**Yes branch: new build**

- **Reads [Board]:**
  - Figma and FigJam: the Designer's tokens and components.
  - The AI IDE.
- **Does [Board]:** Develop branch → PR → merged into the Git staging branch. Who approves or
  merges that PR is not stated (A5).
- **Writes [Board]:**
  - Tokens, components, and a staging URL.
  - The staging link in Airtable, in `Components / Staging Storybook`.
  - The board shows the Developer writing **Tokens**. [Repo] says token files are generated and
    never edited by hand (A6).
- **Hands off when [Board]:** `Components / Staging Storybook` holds a link. Development then
  reads **Ready for testing**, which wakes QA.

**No branch: "Fix in staging"**

- **Reads [Board]:** Figma and the Airtable records (QA's test rows).
- **Does [Board]:** Develop branch → new commit, PR, merged into the Git staging branch.
- **Writes [Board]:**
  - Tokens, components, and a staging URL.
  - "Update status in Staging Storybook / testing result". **Changed by A7:** the Developer
    writes "Fixed (Re-test)" on each repaired row in its own claim column, never in
    `Testing Results`. The column's type is open (A7c), as are how a claim is cleared (A7d) and
    which rows may be claimed (A7e).
- **Hands off when [Board]:**
  - Every result reads "Fixed (Re-test)": status is **Fixed**, which wakes QA.
  - Only some results read "Fixed (Re-test)": status is **Fixing**, which wakes QA (A9).

**Developer tasks [Board]:**

- Task 1 is code implementation.
- Task 2 is bug and error fixing from staging.
- "Task 2" is used a second time, for bug and error fixing from production. The board draws no
  production-fix path (A10).

**Refuses:**

- The board states none.
- [Repo] `CLAUDE.md` says: never verifies its own work, never invents a token, no raw values.
- [Repo] `engineer.md` says: never merges to main, never writes Production Storybook, never opens
  an Asana ticket, never writes Development.
- Whether the minted agent keeps all of the repo's rules is open (A7, A11).

### 3.4 QA — Agent

- **Woken by [Board]:**
  - **Ready for testing** (grey line).
  - **Fixed** and **Fixing** (yellow line).
  - **Completed** (blue line).
  - [Repo] `qa.md` instead says QA is called "when a human hands it to you" (A12).
- **Reads [Board]:**
  - The Component Library staging URL ("Staging Test").
  - The Figma **UI Kit**, through "Test against Figma UI Kit". It is not stated whether this means
    the component's own node or the whole library file (A13).
- **Writes [Board]:**
  - Airtable records: "Write Records in Staging Testing Table — One record per variants, states,
    props".
  - The result into `Staging Testing / Testing Results`.
  - [Repo] `qa.md` says QA writes to `reports/` only and never writes a status. The board has QA
    writing the registry, and `registry/SKILL.md` agrees with the board (A12).
- **Tasks [Board]:**
  - Task 1 tests the Developer's output against the Designer's output.
  - Task 2 tests a fixed result from the Developer again.
  - Task 3 is "Testing TIP Fixed result from Devs again". "TIP" is undefined (A15).
- **Hands off when [Board]:**
  - One or more results read "Failed": status is **To be fixed**, which wakes the Developer.
  - All results read "Passed": status is **To be deployed**, which wakes DevOps.
  - A mix that is neither all Passed nor any Failed is not covered (A16).
- **Refuses:**
  - The board states none.
  - [Repo] `CLAUDE.md` says: never repairs.
  - [Repo] `qa.md` says: never tests its own build, never reports only failures, and never builds
    the expected matrix from the story file.

### 3.5 DevOps — Agent

- **Woken by [Board]:** **To be deployed** (grey line).
- **First step [Board]:** An edge labelled "new" leads to Component Library. What happens when the
  work is not "new" is not drawn (A17).
- **Does [Board]:** Merges Git staging → main.
  - The staging branch can hold other components that have not passed yet (A18).
  - No human approval appears before this merge (A19).
- **Writes [Board]:**
  - A production URL.
  - The production link in Airtable, in `Components / Production Storybook`.
- **Hands off when [Board]:** `Components / Production Storybook` holds a link. Development then
  reads **Completed**, and the blue line wakes QA (A14).
- **Refuses:**
  - The board states none.
  - [Repo] DevOps is the only agent allowed to merge to main.
  - [Repo] The registry also gives DevOps ownership of `Astro Link`, which the board does not
    show (A20).

### 3.6 PM — Agent

- **Woken by [Board]:** A routine, "Detect every 9 am daily". It is the only actor on a schedule.
  The time zone is not stated (A21).
- **Reads [Board]:** "Checking all written records and URL by other actors":
  - Airtable: Components columns, Staging Testing records, and Production Testing records.
  - The specific columns checked:
    - Components: Development, Figma, Staging Storybook, Production Storybook.
    - Staging Testing: Testing Results and every record row.
    - Production Testing: Testing Results and every record row. This table does not exist in the
      repo's registry (A22).
- **Writes [Board]:** Asana tickets.
  - The board does not say what earns a ticket, who it is assigned to, or how a repeat ticket is
    avoided on the next day's run (A23).
  - [Repo] The registry says PM triages **DS Feedback** and owns `DS Feedback / Status`. The board
    shows neither (A24).
- **Hands off when:** Not stated. The board draws no line out of the Asana tickets (A25).
- **Refuses:**
  - The board states none.
  - [Repo] `engineer.md` says PM turns gaps into tickets, which implies PM does not fix them.

---

## 4. Ambiguities — not resolved

Each item below would make every minted agent wrong in the same way if it were guessed. They are
grouped by how much of the crew they affect.

### Crew-wide (decide these first)

- **A7. Who writes "Fixed (Re-test)".**
  - The board has the Developer write it after a repair.
  - The repo contract and `engineer.md` forbid this, and say QA writes it after re-testing.
  - If the Developer writes it, the builder marks its own work fixed, which breaks `CLAUDE.md`
    ("never verifies its own work").
  - This one answer changes the Developer, QA, and the formula.
  - **Decided 2026-10-23: a loop between two owners.**
    - **Every column has exactly one owner.** This rule still holds.
    - **The Developer's job:** repair the code, then start QA's re-test by writing the claim
      "Fixed (Re-test)".
    - **QA's job:** test, then write the verdict, Passed or Failed. A Failed verdict sends the
      work back to the Developer. The two agents loop until every row reads Passed.
    - **Where the claim is written:** a new column on each Staging Testing row, written only by
      the Developer. QA alone writes `Testing Results`, and only Passed or Failed.
    - Because the claim is per row, Fixing (only some rows claimed) can still be told apart
      from Fixed (all rows claimed).
    - The builder never writes the verdict, so "never verifies its own work" holds.
  - Work for a human, outside the agents:
    - Add the claim column to Staging Testing in Airtable. The name is not decided. Suggestion:
      `Fix Claim`. Per `CLAUDE.md` this belongs in a naming report under `docs/`.
    - Change `Development` so that Fixed and Fixing read the claim column instead of
      `Testing Results`. The exact fields and formulas are in section 5.
    - Decide whether to retire the "Fixed (To re-test)" option on `Testing Results`. Under this
      decision, QA never writes it.
  - What this decision requires when the agent files are minted:
    - `registry/SKILL.md` gains the new column, owned by the Developer.
    - `engineer.md` keeps "Never write `Testing Results`", and gains write access to the claim
      column only.
  - Still open:
    - **A7c. What type of column is the claim, and what values can it hold?** For example, a
      checkbox, a single select holding only "Fixed (Re-test)", or a link to the repair commit.
    - **A7d. How a claim is cleared.** This one decides whether the loop terminates.
      **Proposed in section 5:** a claim counts only while it is newer than QA's latest
      verdict, so nobody has to clear it. Applies once a human makes the Airtable changes.
      - QA cannot clear the claim, because QA does not own the column.
      - Suppose QA re-tests and writes Failed again while the claim still reads
        "Fixed (Re-test)". The formula would then read Fixed and wake QA again, so the agents
        would loop between them with no new repair in between.
      - Options include:
        - The Developer clears its own claim once a verdict lands.
        - The formula counts a claim only when it is newer than the verdict.
        - The claim is tied to a specific commit, so a verdict on that commit uses it up.
    - **A7e. Which rows the Developer may claim.** Only rows that read Failed, or any row?
- **A8. Status precedence.**
  - The board gives the conditions but not their order.
  - The repo formula has a 9-step order: failure outranks everything, then re-test, and so on.
  - Is the repo order the intended one?
- **A9. Where "Fixing" goes.**
  - On the board, the Fixed and Fixing lines join and run to QA.
  - In the repo, Fixing wakes the Engineer ("finish it").
  - It is also unclear who writes the partial "Fixed (Re-test)" marks that produce Fixing.
- **A11. Board versus repo as the source of truth.**
  - The repo already has a registry contract, plus Engineer, QA, and token-runner agents.
  - Is the board meant to replace those, or to be merged into them?
  - Every [Repo] conflict below depends on this answer.
- **A19. Human approval gate.**
  - `CLAUDE.md` says "a human approves; no agent approves its own work, ever".
  - The board has no human anywhere after the Designer.
  - Where does a human approve? For example: before the staging PR merges, before staging → main,
    or after Completed.
- **A26. How "Provoke" works.**
  - Only the PM's trigger is drawn (the 9 am routine).
  - For the other agents it is not stated what detects a status change. Options include an Airtable
    automation, polling, a scheduled routine per agent, or a human starting the agent.
  - This decides what every agent's "when it's called" section says.
- **A27. Option spelling.**
  - The board writes "Fixed (Re-test)" and "Ready for testing".
  - The repo writes "Fixed (To re-test)" and "Ready for Testing".
  - The repo formula matches `re-test` case-sensitively, so "Fixed (Re-test)" (capital R) would
    **not** match, and precedences 1 and 3 would silently never fire.
  - Which spelling is canonical?

### Missing actors or steps

- **A20. Reviewer, Release, Astro Link, and the "Released" status** exist in the repo contract
  and do not appear on the board. On the board, **Completed** is the last status. Are they being
  dropped, or were they left off the board?
- **A28. token-runner** exists in the repo and does not appear on the board. On the board, the
  Designer produces tokens and the Developer "outputs" tokens (see A6).
- **A6. Who writes tokens in code.**
  - The board shows Tokens as a Developer output in both branches.
  - The repo says `tokens/` is a Figma export, `build/tokens/` is generated, and neither is
    edited by hand.
- **A29. GitHub Commits table.** The repo has the Engineer writing a commit row for each piece of
  work. The board does not show this. Should it stay?
- **A30. Subcomponents.**
  - `CLAUDE.md` requires organisms to be built from subcomponents.
  - The board has one row flowing per component, with no ordering for children before parents.
  - It is not stated what happens when a parent reaches To-do before its child has passed.

### Per actor

- **A1. Client to Designer handoff.** There is no condition, and no registry write. Is the Client
  in scope for the crew at all, or only context?
- **A2. Designer Task 2, "design fix".** Nothing on the board triggers it. Who decides a design
  needs fixing, and how does the Designer find out? For example, a QA finding, a Design column
  value, or an Asana ticket.
- **A3. The To-do condition.**
  - The board's condition is that the Figma link exists.
  - The repo's condition is that the Figma link exists **and** `Design = Done`.
  - The repo also flags that a blank Development value displays as To-do.
- **A4. The Developer's "New" diamond.**
  - It is not stated what makes work "new".
  - It could be the waking status (To-do counts as new, To be fixed does not), or something else.
- **A5. Staging PR approval.** Does the Developer merge its own PR into staging, or is that a human
  step?
- **A10. The production bug-fix path.**
  - It is listed as a Developer task, but no path is drawn.
  - The Developer's only "No" branch is "Fix in staging".
  - Two tasks are both numbered "Task 2".
- **A12. QA's trigger and outputs.**
  - The board says QA is woken by status and writes Airtable rows.
  - The repo's `qa.md` says QA is called by a human and writes `reports/` files.
  - The repo's `registry/SKILL.md` agrees with the board.
  - Should QA write Airtable rows, `reports/` files, or both?
- **A13. "Figma UI Kit".** Is this the component's own node, the whole library file, or something
  else? "Component Library Staging URL" and "Staging Storybook" are also probably the same link,
  but this is not stated.
- **A14. Completed → QA (the blue line).**
  - It is not stated what QA tests in production.
  - It is not stated which table QA writes to. The board names Production Testing only in the PM's
    list.
  - It is not stated what statuses a production test produces, or what a production failure
    wakes.
- **A15. "TIP" in QA's Task 3.** Undefined. Possibly a typo.
- **A16. Mixed test results.** No rule covers results that are Passed plus Fixed (Re-test) with no
  Failed. Should QA re-test only the rows marked fixed, or the full matrix?
- **A31. Re-test rows.** When QA re-tests, does it overwrite the existing row's result or add a new
  row? This affects the PM's history and any pass-rate percentage.
- **A17. DevOps' "new" edge.** It is not stated what DevOps does for work that is not "new", such
  as a redeploy after a production fix.
- **A18. Staging → main granularity.**
  - Merging the staging branch promotes everything on it, including components that are still
    failing.
  - Is the release per component (for example, cherry-pick or a per-component branch), or a batch
    gated on all of staging passing?
  - Is "Production Storybook" one URL per component, or one site-wide URL?
- **A21. PM time zone and calendar.** Does "every 9 am daily" use your time zone, and does it run
  on weekends?
- **A22. The Production Testing table.** It is named by the PM and does not exist in the registry.
  Who creates it, what are its columns, and who owns them?
- **A23. PM ticket rules.**
  - What earns a ticket: a missing link, a Failed row, a stale status, or a mismatch between a URL
    and its status?
  - Who is the assignee?
  - How are repeat tickets avoided, and how are tickets closed?
  - Does the PM write anything back to Airtable?
- **A24. DS Feedback.** The repo gives the PM the job of triaging DS Feedback. The board does not
  show it. Is it kept or dropped?
- **A25. What a PM ticket triggers.** Does an Asana ticket wake anyone, or is it for humans only?

### Refusals

- **A32. No refusals are on the board.** Every "refuses" line in section 3 comes from the repo.
  Confirm that each minted agent should inherit the repo's never-lists. Two of them already
  conflict with the board:
  - The Engineer must not write Testing Results (see A7).
  - QA must not write a status. The board shows QA's Airtable writes changing the status (see A12).

---

## 5. Airtable changes for A7 (a human applies these)

None of this has been applied to the base. Per the registry contract, changing a field or a
formula is a human's call. The changes are written here so that a human can make them.

### What the formulas have to do

- The Developer's claim should count only while it is **newer than QA's latest verdict** on that
  row.
- QA cannot clear the claim, because QA does not own the column.
- Comparing two timestamps settles A7d: once QA writes a verdict after a claim, the claim stops
  counting on its own, and nobody has to clear it.
- Without the comparison, a stale claim would keep the status at Fixed after QA writes Failed
  again. QA would be woken over and over with no new repair in between.

### New fields on Staging Testing

| Field | Type | Owner | Content |
|---|---|---|---|
| `Fix Claim` | Type open (A7c) | Developer | Holds "Fixed (Re-test)" when the Developer has repaired the row. The name is a suggestion. |
| `Claim Modified` | Last modified time, watching **only** `Fix Claim` | Computed | When the claim last changed |
| `Verdict Modified` | Last modified time, watching **only** `Testing Results` | Computed | When QA last wrote a verdict |
| `Row State` | Formula | Computed | Passed, Failed, Claimed, or blank. Formula below. |

`Row State`:

```
IF(
  {Testing Results} = "Failed",
  IF(
    AND({Fix Claim}, IS_AFTER({Claim Modified}, {Verdict Modified})),
    "Claimed",
    "Failed"
  ),
  IF({Testing Results} = "Passed", "Passed", "")
)
```

### New field on Components

| Field | Type | Owner | Content |
|---|---|---|---|
| `Row State Summary` | Rollup of `[Staging] Test Records` → `Row State`, aggregation `ARRAYJOIN(values, ",")` | Computed | Every row state for the component |

### Replacement `Development` formula

```
IF(
  AND(FIND("Failed", {Row State Summary}), FIND("Claimed", {Row State Summary})),
  "Fixing",
IF(
  FIND("Failed", {Row State Summary}),
  "To be fixed",
IF(
  FIND("Claimed", {Row State Summary}),
  "Fixed",
IF(
  AND({Astro Link}, {Release Review}, {Release Verdict} = "Cleared"),
  "Released",
IF(
  {Production Storybook},
  "Completed",
IF(
  {Row State Summary},
  "To be deployed",
IF(
  {Staging Storybook},
  "Ready for Testing",
IF(
  AND({Figma}, {Design} = "Done"),
  "To-do",
  ""
))))))))
```

What each status means under this formula:

- **Fixing:** the Developer has claimed some failed rows, and others still read Failed.
- **To be fixed:** at least one row is Failed, and none is claimed.
- **Fixed:** every failed row is claimed.
- On a re-test, QA writes Passed or Failed. That verdict is newer than the claim, so the row
  returns to Passed or Failed. A row that fails again sends the component back to the
  Developer, and the loop runs again.

### What this formula does not decide

Some parts of the formula above are carried over from the repo's current formula. They are
placeholders until the open questions behind them are settled:

- **Precedence order (A8).** It keeps the repo's order: failure first, then claims, then
  release, production, staging, and design.
- **Who Fixing wakes (A9).** The formula only names the status. The board sends Fixing to QA.
  The repo sends it to the Engineer.
- **Released, Astro Link, Release Review, and Release Verdict (A20).** These are kept as in the
  repo. Remove the Released branch if those columns are being dropped.
- **Status spelling (A27).** It keeps the repo's "Ready for Testing". The `re-test` matching
  problem goes away, because the formula now matches on "Claimed", which the formula writes
  itself.

### Consequences to confirm before applying

- **Claims on Passed rows are ignored (A7e).** A claim counts only on a row that reads Failed.
  If the Developer should be able to send a Passed row back for re-testing, the `Row State`
  formula has to change.
- **Re-claiming after a second failure (A7c).**
  - `Claim Modified` changes only when the value of `Fix Claim` changes.
  - If `Fix Claim` is a checkbox or a single select, writing the same value again does not
    change it. The Developer would have to clear the claim and set it again on every repair
    pass.
  - If `Fix Claim` holds something that differs on each pass, such as the repair commit hash,
    each new repair updates the timestamp on its own.
- **The "Fixed (To re-test)" option on `Testing Results`.** Nothing reads it now. It can be
  retired.
- **Registry Flag 6 still applies.** A row with a blank `Testing Results` has a blank
  `Row State`. A component whose only rows are unscored can still read Ready for Testing.
- **The existing `Staging Testing Results Summary` rollup** stays. Nothing in `Development`
  reads it any more.
