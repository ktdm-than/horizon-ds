# Evidence Loop — crew spec (draft for review)

Source: FigJam board "Evidence Loop Mapping" (`ceZmZkqu6UrRdl8IruKMRK`), whole page, read
2026-10-23.
Status: **draft. Nothing here is approved, and no agent files have been written from it.**

The previous draft is kept as `docs/evidence-loop-spec-draft-1.md`. It was read from an older
version of the board: its node 24:313 no longer exists, and its Task 1/2/3 lists and "TIP" are no
longer on the board. That draft also records a decision on who writes "Fixed (To re-test)". The
current board contradicts that decision, so it is listed here as open (Q4) and not carried over.

**Branch model — resolved after this draft (2026-10-25).** The board draws a long-lived Git staging
branch. The repo has since adopted a trunk-based model instead (`CLAUDE.md` → Git, `tools.md` →
Branches and deploys): each component is a short-lived `component/<name>` or `fix/<name>` branch
cut from `main` and merged back into `main` by pull request, and **each pull request's Vercel
preview deployment is staging**. There is no staging branch. Board quotes below are left as the
board wrote them; the lines marked **Resolved (Repo)** say how the repo now works.

## How to read this

- **Board** means the board says it, in its own words where they are quoted.
- **Repo** means the repo says it (`CLAUDE.md`, `.claude/skills/registry/SKILL.md`,
  `.claude/agents/*.md`) and the board does not.
- **Not stated** means neither source says it.
- Where an actor's entry depends on an open question, it points to the question (Q1, Q2, …) in
  section 4. **No ambiguity is resolved in this document**, except the branch model, marked
  **Resolved (Repo)** where it appears.

---

## 1. The crew at a glance

| Actor | Kind | Woken by (Board) | Hands off when (Board) |
|---|---|---|---|
| Client | Human | Not stated | Not stated (Q9) |
| Designer | Human | Not stated | `Components / Figma` holds a link → **To-do** |
| Developer | Agent | **To-do** (grey), **To be fixed** (yellow) | Build: `Components / Staging Storybook` holds a link → **Ready for testing**. Fix: every or some results read "Fixed (To re-test)" → **Fixed** or **Fixing** |
| QA | Agent | **Ready for testing** (grey), **Fixed** and **Fixing** (yellow), **Completed** (blue) | One or more results = "Failed" → **To be fixed**. All = "Passed" → **To be deployed** |
| DevOps | Agent | **To be deployed** (grey) | `Components / Production Storybook` holds a link → **Completed** |
| PM | Agent | "Detect every 9 am daily as a routine" | Not stated (Q34) |

Not an actor, but on the board: the **Registry** (Airtable). Its header reads "Registry →
Conditional Formula → Development Status". Actors write evidence into columns, a formula turns
the evidence into a status, and every dashed "Provoke" line runs from a status to the actor it
wakes.

Tools on the board: Figma (Edu), AI IDE: Claude (Pro), Git: GitHub (Free), hosting and domain:
Vercel (Free), Asana (Free), Airtable (Free).

## 2. The statuses

Every status on the board, with its condition copied as written:

| Status | Condition (Board, verbatim) | Written by | Provokes |
|---|---|---|---|
| To-do | "When Figma Column has Link Exists" | Designer | Developer |
| Ready for testing | "When Staging Storybook column has Link Exists" | Developer | QA |
| Fixed | "All results are marked as "Fixed (To re-test)"" | Developer | QA |
| Fixing | "Few results are marked as "Fixed (To re-test)" i.e. partially marked as fixed" | Developer | QA |
| To be fixed | "One or more = "Failed"" | QA | Developer |
| To be deployed | "All = "Passed"" | QA | DevOps |
| Completed | "When Production Storybook column has Link Exists" | DevOps | QA |

The board gives no order among these conditions. Several are true at the same time: for example,
the Figma link still exists after the component is built (Q5).

---

## 3. Actors

### 3.1 Client — Human

- **Uses (Board):** "Chat interface (claude cowork, codex, gemini, …)".
- **Reads:** Not stated.
- **Writes (Board):** "BRD, Reference Website, MVP…".
- **Refuses:** Not stated. The Client is a human, so no refusal list is minted.
- **Moves work on when:** No condition is written. A dashed arrow runs from the BRD box to the
  Designer's "Figma, Figjam, …". The board draws no line from the Client to the chat interface,
  and none from the chat interface to the BRD (Q9).

### 3.2 Designer — Human

- **Uses (Board):** "Figma, Figjam, …".
- **Reads (Board):** The Client's BRD, reference website, and MVP, through the dashed arrow.
- **Writes (Board):**
  - Tokens and Components, in Figma.
  - "Write Figma Node link in Airtable", into `Components / Figma`.
- **Refuses:** Not stated. Repo: only a human signs off a design (`Design` column).
- **Moves work on when (Board):** `Components / Figma` holds a link. The status reads **To-do**,
  which provokes the Developer.
  - Repo adds a second condition, `Design = Done` (Q10).
- **Also (Board):** A dashed arrow runs from the Designer's Components to the Developer's
  "Figma, Figjam", so the Developer reads the Designer's Figma output.
- **Not drawn:** Any path back to the Designer, such as a design gap found by the Developer or
  QA (Q12).

### 3.3 Developer — Agent (the repo calls it the Engineer)

- **Woken by (Board):**
  - **To-do**, by the grey line.
  - **To be fixed**, by the yellow line.
- **First step (Board):** A diamond labelled "New". Its two exits carry no Yes or No label. One
  exit goes right to the build path and the other goes down to the fix path (Q13).

**Build path (right exit of "New")**

- **Reads (Board):** "Figma, Figjam", fed by the Designer's Components.
- **Uses (Board):** "AI IDE".
- **Does (Board):** "Develop branch → PR and Merged into Git Staging Branch" (Q15).
  - **Resolved (Repo):** the Developer cuts `component/<name>` from `main` and opens a PR to
    `main`. It never merges. The PR's preview deployment of the exact commit is the staging URL.
- **Writes (Board):**
  - Tokens, Components, and a Staging URL (Q14 on tokens).
  - "Write staging link in Airtable record", into `Components / Staging Storybook`.
- **Moves work on when (Board):** `Components / Staging Storybook` holds a link. The status reads
  **Ready for testing**, which provokes QA.

**Fix path (lower exit of "New")**

- **Reads (Board):** "Figma" and "Airtable Records" (Q17).
- **Uses (Board):** "AI IDE".
- **Does (Board):** "Develop branch → New commit, PR and merged into Git staging branch" (Q15).
  - **Resolved (Repo):** while the component's PR is open, the repair is a new commit on that
    PR; once it has merged, the repair is a `fix/<name>` branch from `main` with its own PR. The
    new commit's preview is the new staging URL.
- **Writes (Board):**
  - Tokens, Components, and a Staging URL.
  - "Update status in Staging Storybook/ testing result", into
    `Staging Testing / Testing Result` = "Fixed (To re-test)" (Q4, Q16).
- **Moves work on when (Board):**
  - All results read "Fixed (To re-test)": the status reads **Fixed**, which provokes QA.
  - Only some results read it: the status reads **Fixing**, which also provokes QA (Q6).

**Refuses:**

- Board: none stated.
- Repo, `CLAUDE.md`: never verifies its own work; never invents a token; no raw hex, px, or font
  values; never copies another component's styles; never edits `build/tokens/` by hand.
- Repo, `engineer.md` and the registry: never writes `Testing Results`, `Development`,
  `Production Storybook`, or any column it does not own. It never merges to main.
- Two of these conflict with the board: writing `Testing Results` (Q4) and verifying its own
  repair (Q4). Whether the minted Developer inherits the rest is Q35.

### 3.4 QA — Agent

- **Woken by (Board):**
  - **Ready for testing**, by the grey line.
  - **Fixed** and **Fixing**, by the yellow line. The two lines join before reaching QA.
  - **Completed**, by the blue line (Q22).
  - Repo, `qa.md`: "a human hands it to you" (Q2).
- **Reads (Board):**
  - "Component Library Staging URL", along the edge labelled "Staging Test" (Q19).
  - "UI Kit", along the edge labelled "Test against Figma UI Kit" (Q19).
- **Writes (Board):**
  - "Airtable Records": "Write Records in Staging Testing Table. One record Per variants, states,
    props".
  - The result into `Staging Testing / Testing Results`.
  - Repo, `qa.md`: writes to `reports/` only. The registry contract agrees with the board (Q20).
- **Moves work on when (Board):**
  - One or more results = "Failed": the status reads **To be fixed**, which provokes the
    Developer.
  - All results = "Passed": the status reads **To be deployed**, which provokes DevOps.
  - Not covered: results that are neither, such as a mix of Passed and blank (Q23). When the
    matrix counts as finished is also not stated (Q24).
- **Refuses:**
  - Board: none stated.
  - Repo, `CLAUDE.md`: never repairs.
  - Repo, `qa.md`: never tests a component it built; never reports only failures; never builds
    the expected matrix from the story file.
  - Repo, registry: never writes `Development`. The board has QA's writes change the status
    through the formula, which the registry allows. It does not have QA write the status cell
    itself.

### 3.5 DevOps — Agent

- **Woken by (Board):** **To be deployed**, by the grey line.
- **First step (Board):** An edge labelled "new" leads to "Component Library". No other exit is
  drawn (Q25).
- **Does (Board):** "Git Staging → Main" (Q3, Q26).
  - **Resolved (Repo):** DevOps merges the component's own PR into `main`, only after its
    required checks pass and a human has approved it. `main` deploys production Storybook.
- **Writes (Board):**
  - A Production URL.
  - "Write production link in Airtable record", into `Components / Production Storybook` (Q27).
- **Moves work on when (Board):** `Components / Production Storybook` holds a link. The status
  reads **Completed**, and the blue line provokes QA (Q22).
- **Refuses:**
  - Board: none stated.
  - Repo, registry: owns `Production Storybook` and `Astro Link`, and writes a link only after
    opening it and seeing it render. `Astro Link` is not on the board (Q28).

### 3.6 PM — Agent

- **Woken by (Board):** A terminal icon, "Detect every 9 am daily as a routine", then Provoke. It
  is the only actor on a schedule and not on a status (Q29).
- **Reads (Board):** "Airtable Records", along "Checking all written records and url by other
  actors". The attached note lists:
  - Components Columns
  - Staging Testing Records
  - Production Testing Records (Q31)
- **Writes (Board):** "Asana Tickets".
- **Then (Board):** An edge labelled "Check all columns entries and records" leads from Asana
  Tickets to a document listing:
  - Components/Development
  - Components/Figma
  - Components/Staging Storybook
  - Components/Production Storybook
  - Staging Testing /Testing Results and all record rows
  - Production Testing /Testing Results and all record rows

  Whether this list is what PM checks or what a ticket contains is not stated (Q32).
- **Moves work on when:** Not stated. No line leaves the Asana tickets or the list (Q34).
- **Refuses:**
  - Board: none stated.
  - Repo, registry: PM owns only `DS Feedback / Status`. DS Feedback is not on the board (Q33).

---

## 4. Ambiguities — not resolved

Each question names the agents it would make wrong. The crew-wide questions come first, because
a guess on any of them puts the same error into all four agents.

### Crew-wide

- **Q1. Board or repo: which one wins?**
  - The repo already has a registry contract plus `engineer`, `qa`, and `token-runner` agents.
  - The repo also has things the board does not show: the Reviewer, Release, the Released
    status, `Astro Link`, `Release Review` and `Release Verdict`, DS Feedback, GitHub Commits,
    and One-Off Components.
  - Is the board a replacement for the repo, a subset of it, or meant to be merged with it?
  - Affects all four agents. Every "Repo" line in section 3 depends on this answer.
- **Q2. What does "Provoke" mean mechanically?**
  - Only the PM's trigger is drawn: a 9 am routine.
  - For the other three agents it is not stated what notices a status change. Options include an
    Airtable automation, polling, a schedule per agent, or a human starting the agent.
  - `engineer.md` says it is woken by the registry. `qa.md` says a human hands work to it.
  - Affects: Developer, QA, DevOps.
- **Q3. Where does a human approve?**
  - `CLAUDE.md`: "A human approves. No agent approves its own work, ever."
  - The board shows no human after the Designer. The Developer merges its own PR into staging,
    and DevOps merges staging into main.
  - Candidates: before the staging merge, before staging → main, after Completed, or none.
  - Affects: Developer, DevOps.
  - **Resolved (Repo):** there is no staging merge. A human approves each component's PR to
    `main`; no agent approves any PR. DevOps merges only after that approval and green checks
    (`CLAUDE.md` → Roles and Git).
- **Q4. Who writes "Fixed (To re-test)", and into which column?**
  - Board: the Developer writes it into `Staging Testing / Testing Result` after a repair.
  - Repo, registry: QA owns every Staging Testing column; "The Engineer never writes this,
    including after a repair."
  - `CLAUDE.md`: the engineer "never verifies its own work". Marking a row fixed is arguably a
    verification claim.
  - The previous draft recorded a decision: a separate claim column owned by the Developer, with
    QA writing only Passed or Failed. The current board does not show it. Does that decision still
    stand, or does the board replace it?
  - Affects: Developer, QA, and the formula.
- **Q5. Status precedence.**
  - The board lists the conditions but no order, and they overlap. The Figma link still exists
    once the component is Ready for testing, and the Staging link still exists while results
    read Failed.
  - The repo formula has a 9-step order: failure first, then re-test, release, production, test
    rows, staging, and design. Is that the intended order?
  - Affects all four agents, because each one is woken by the status.
- **Q6. Who does Fixing wake?**
  - Board: QA. The Fixed and Fixing lines join and run to QA.
  - Repo: the Engineer ("A repair pass landed but some rows are still Failed. Finish it.").
  - If the answer is QA, should QA re-test the claimed rows while other rows still read Failed?
  - Affects: Developer, QA.
- **Q7. When is a write "done" enough to provoke?**
  - QA writes one record per variant, state, and prop. After the first Passed row and before any
    Failed row, "All = Passed" is already true, so DevOps could be woken in the middle of a test
    run.
  - The same happens to the Developer: its first "Fixed (To re-test)" mark makes the status read
    Fixing, so QA could be woken in the middle of a repair.
  - Is there a "finished" signal, or does each agent write everything at once?
  - Affects: QA, Developer, DevOps.
- **Q8. What stops the Developer ↔ QA loop?**
  - No retry limit or escalation is drawn. If a row keeps failing, the two agents loop forever.
  - Is there a limit, and who is told when it is reached (a human, or PM through Asana)?
  - Affects: Developer, QA, PM.
- **Q36. Status spelling.**
  - The board writes "Ready for testing". The repo formula writes "Ready for Testing".
  - The board's "Fixed (To re-test)" now matches the repo option. `FIND` is case-sensitive, so
    this matters.
  - Which spelling is canonical?
- **Q37. Unit of work and subcomponents.**
  - The board flows one Components row at a time.
  - `CLAUDE.md` builds organisms from subcomponents. The registry has `Composes` ("Build up,
    never sideways").
  - What happens when a parent reaches To-do before a child has passed? Does each subcomponent
    get its own row and run through the loop on its own?
  - Affects: Developer, QA, DevOps.

### Client and Designer

- **Q9. Is the Client part of the crew?** No arrows connect the Client to its chat interface or
  to the BRD, and the BRD → Designer handoff has no condition and no registry write. Is the
  Client context only?
- **Q10. The To-do condition.**
  - Board: the Figma link exists.
  - Repo: the Figma link exists **and** `Design = Done`. Repo Flag 1 also says a blank status
    displays as To-do.
  - Affects: Developer, which decides whether to build.
- **Q11. One link per component?** "Write Figma Node link" means one node per Components row.
  Does that node hold the whole variant set?
- **Q12. No way back to the Designer.**
  - `CLAUDE.md` says to report a missing token or a mode gap rather than fill it in.
  - The board draws no path for that report. Where does it go: a Design column value, an Asana
    ticket, or a human?
  - Affects: Developer, QA.

### Developer

- **Q13. The "New" diamond.** Its exits are unlabelled. What makes work "new"? It may be the
  waking status (To-do counts as new, To be fixed does not), whether a staging link exists, or
  something else.
- **Q14. Tokens as a Developer output.**
  - Board: both paths output "Tokens".
  - Repo: `tokens/` is a Figma plugin export, `build/` is generated and never edited by hand,
    and `token-runner` owns token syncs. `token-runner` is not on the board.
  - Does the Developer run the token build, write token files, or neither?
- **Q15. Branches and merges.**
  - "Develop branch → PR and Merged into Git Staging Branch". Who merges that PR: the Developer
    or a human? (See Q3.)
  - What are the branch names? Is there one branch per component or per fix?
  - **Resolved (Repo):** the Developer opens the PR and never merges it (see Q3). Branch names
    are in `tools.md`: `component/<name>` for a build, `fix/<name>` for a repair after merge, one
    open PR per component.
- **Q16. "Update status in Staging Storybook/ testing result".** The label names Staging
  Storybook, but the document it points to is `Staging Testing / Testing Result`.
  - Does the fix path rewrite the `Staging Storybook` link too?
  - Which rows may the Developer mark: only the Failed rows, or any row?
- **Q17. "Airtable Records" on the fix path.** Which records does the Developer read: only the
  Failed rows of its component, or every row?
- **Q18. GitHub Commits table.** The repo has the Engineer write one row per commit. The board
  does not show this. Keep it or drop it?

### QA

- **Q19. What exactly QA reads.**
  - "UI Kit": the component's own Figma node, or the whole library file?
  - "Component Library Staging URL": the same link as `Components / Staging Storybook`?
    **Resolved (Repo):** yes — the PR preview URL of the exact commit, never the branch alias.
- **Q20. Where QA writes.** The board and the registry say Airtable rows. `qa.md` says
  `reports/` only. Airtable, `reports/`, or both?
- **Q21. Re-test rows.** On a re-test, does QA overwrite the existing row or add a new one? Does
  it test the full matrix again, or only the rows marked "Fixed (To re-test)"?
- **Q22. Completed → QA (the blue line).**
  - What does QA test in production, and against what?
  - Where does it write? "Production Testing" appears only in the PM's lists, and the table does
    not exist in the registry.
  - What statuses can a production result produce, and what does a production failure wake?
    Under the repo order, a Failed row pulls a completed component back to To be fixed.
- **Q23. Results that are neither all Passed nor any Failed.** For example, some rows Passed and
  some blank. No status is drawn for this.
- **Q24. When is the test matrix complete?** "All = Passed" has no expected count. Who decides
  how many rows a component needs (see Q7)?

### DevOps

- **Q25. The "new" edge.** What does DevOps do with work that is not "new", such as a component
  already in production that has been repaired?
- **Q26. What staging → main promotes.** Merging the staging branch promotes everything on it,
  including components still failing. Is release per component, or a batch gated on all of
  staging passing?
  - **Resolved (Repo):** per component. Each component has its own PR, so merging it promotes
    that component only.
- **Q27. The production link.** Is `Production Storybook` one URL per component, or one site-wide
  URL? Is it a Vercel deploy?
- **Q28. Astro Link.** The repo gives DevOps the docs-site link. Keep it or drop it?

### PM

- **Q29. The schedule.** Which time zone is "9 am"? Does it run on weekends?
- **Q30. Ticket rules.**
  - What earns a ticket: a missing link, a Failed row, a status that has not moved for a while,
    or a URL that does not match its status?
  - Who is the assignee?
  - How are repeat tickets avoided on the next day's run? Who closes a ticket?
  - Does PM write anything back to Airtable?
- **Q31. Production Testing table.** The board names it twice. It does not exist. Who creates it,
  and who owns its columns?
- **Q32. The list after "Asana Tickets".** Is it what PM checks, or what each ticket contains?
- **Q33. DS Feedback.** The repo makes triaging DS Feedback PM's only job. The board does not
  show it. Keep it or drop it?
- **Q34. What a ticket triggers.** Does an Asana ticket wake an agent, or is it for humans only?

### Refusals

- **Q35. The board states no refusals for any actor.** Every "Refuses" line in section 3 comes
  from the repo. Should each minted agent inherit the repo's never-lists? Two of them already
  conflict with the board:
  - The Developer must not write `Testing Results` (Q4).
  - QA writes to `reports/` only (Q20).
