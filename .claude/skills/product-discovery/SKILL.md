---
name: product-discovery
description: >
  Apply the Product Discovery methodology — run a discovery process from problem
  framing through to a Discovery Brief. Use when helping users find and validate
  problems worth solving. Covers: problem framing, hypothesis generation,
  customer research planning, evidence evaluation, opportunity assessment, and
  synthesis. Triggers on: "run a discovery", "product discovery", "find problems
  worth solving", "frame the problem", "discovery brief", "hypothesis",
  "evidence register", "opportunity assessment", starting a new product idea,
  evaluating whether a problem is real.
---

# Product Discovery

Guide users through a complete product discovery — from vague problem space to a validated Discovery Brief.

This skill is a **thin orchestrator**. It manages the workflow, user interaction, and orch state. It does NOT load methodology docs directly. When deep methodology knowledge is needed, it spawns sub-agents that read the docs, do the analytical work, and return concise results.

## Architecture

```
SKILL.md (this file — thin orchestrator)
  ├── Manages: workflow, user interaction, orch CRUD
  ├── Does NOT read: methodology docs in content/docs/product-discovery/
  └── Delegates to: sub-agents for methodology-heavy work

Sub-agents (stateless specialists)
  ├── Read: specific doc files for their task
  ├── Return: concise artifacts (hypotheses, research plans, evidence evaluations)
  └── Context: isolated — does not pollute the main conversation window

Orch MCP (persistent state)
  └── Survives across sessions, sub-agents, and context resets
```

## First step

**Determine what the user wants.** Do not read any files.

Analyse the conversation context — especially recent messages before the skill was activated. Classify the situation:

### Situation A: Clear intent — product discussed AND discovery was suggested

If the conversation contains both a specific product/idea AND the agent (or user) suggested running a product discovery process, **do not prompt**. The intent is clear.

Instead, call `list_work_scopes_by_namespace` with `namespace: "pd.discovery"` to check for existing discoveries that overlap with the discussed product. Compare discovery names against the product/idea from context.

- **If a matching or similar discovery exists:** Tell the user you found it, show its name, key, status, and current progress (call `list_work_scope_children` to get artifact counts/statuses). Ask whether to continue that discovery or start a new one — the user may have forgotten it exists, or they may be intentionally extending it.
- **If no matching discovery exists:** Proceed directly to Kickoff with the product context already established. Skip the kickoff questions that the conversation has already answered.

### Situation B: Product discussed but no explicit discovery suggestion

The user has been talking about a product/idea but hasn't specifically asked for a discovery process.

Call `list_work_scopes_by_namespace` with `namespace: "pd.discovery"` to check for similar existing discoveries.

Then use `AskUserQuestion`:
- If a similar discovery exists: present it as the first option ("Continue **{existing discovery name}**"), plus "Start a new discovery for **{contextual product}**", plus "Something else"
- If no similar discovery exists: present "Start a new discovery for **{contextual product}**", "Start a new discovery for something else", "Continue a different existing discovery"

### Situation C: No prior context (skill activated cold)

Use `AskUserQuestion` with:
1. Start a new discovery
2. Continue an existing discovery

### Loading an existing discovery

When loading an existing discovery (from any situation above):
1. Call `list_work_scope_children` with the discovery's ID.
2. Reconstruct the current state — which hypotheses exist, their statuses, evidence gathered so far.
3. Determine which phase the discovery is in based on what artifacts exist and their statuses.
4. Resume from where the discovery left off.

## Workflow

Work through the phases in order, but expect iteration. Evidence often reshapes problem framing. Do not force linear progression.

### 1. Kickoff

Ask the user:
- What domain or problem space are we exploring?
- Is there an existing product or is this greenfield?
- What triggered this discovery? (user complaints, market signal, strategic bet, hunch)
- Any constraints? (timeline, budget, team size)

From the answers, generate a discovery code (2-4 uppercase letters derived from the discovery name, e.g. FN for FocusNote). This code prefixes all artifact IDs.

Create the discovery in orch:
- `create_work_scope` with `namespace: "pd.discovery"`, the discovery name, and `keyPrefix` set to the discovery code.
- If a parent space exists (e.g. Fiksu), pass its ID as `parentId`. Otherwise create it as a root.
- Update status to `"active"`.

**Persist kickoff context** — these fields will be stored on the discovery work scope when orch supports custom fields:
- `discovery_code`: The generated code
- `domain`: Problem space from user's answers
- `trigger`: What triggered the discovery
- `constraints`: Timeline, budget, team size
- `target_segment`: Target user segment (if discussed)

### 2. Problem Framing

**Spawn a sub-agent** with the Agent tool:

```
Prompt: "You are a Product Discovery specialist. Read these files:
- content/docs/product-discovery/problem-framing/index.mdx
- content/docs/product-discovery/problem-framing/problem-statements.mdx
- content/docs/product-discovery/problem-framing/hypotheses.mdx
- content/docs/product-discovery/conventions.mdx

Here is the discovery context:
{user's domain, trigger, constraints from kickoff}

Generate:
1. A problem statement in the standard format from the docs
2. At least 5 falsifiable hypotheses. Each must state: what you believe, what evidence would support it, what evidence would refute it
3. A priority ranking of which hypotheses to test first, based on risk and uncertainty
4. Challenge any weak hypotheses — flag ones that are not truly falsifiable

Return ONLY the problem statement, hypotheses, and priority ranking. No preamble."
```

**Persist to orch immediately** (capture first — see Interaction principles):

Update the discovery work scope with the problem statement:
- `update_work_scope` on the discovery with the `problem_statement` field.

Create a hypotheses container (if one doesn't already exist for this discovery):
- `create_work_scope` with `namespace: "pd.hypotheses"`, `name: "Hypotheses"`, and `parentId` set to the discovery's ID.

For each hypothesis from the sub-agent, create a work scope:
- `create_work_scope` with `namespace: "pd.hypothesis"`, the hypothesis text as `name`, and `parentId` set to the **hypotheses container's ID** (not the discovery directly).
- Hypotheses are created with status `pending` (= Draft in the methodology lifecycle).
- Also persist these fields per hypothesis:
  - `support_criteria`: What evidence would support it
  - `refute_criteria`: What evidence would refute it
  - `priority`: Priority ranking from the sub-agent's output

Present the saved artifacts to the user with their assigned keys (e.g. "Created PH-SAO-001 through PH-SAO-005 as drafts"). Then use `AskUserQuestion` to offer next steps: refine hypotheses, drop any, add more, or proceed to research planning.

### 3. Customer Research Planning

**Spawn a sub-agent** with the Agent tool:

```
Prompt: "You are a Product Discovery research planner. Read these files:
- content/docs/product-discovery/customer-research/index.mdx
- content/docs/product-discovery/customer-research/interviews.mdx
- content/docs/product-discovery/customer-research/observation.mdx
- content/docs/product-discovery/customer-research/data-analysis.mdx
- content/docs/product-discovery/techniques/index.mdx
- content/docs/product-discovery/templates/interview-guide/index.mdx

Here are the hypotheses to test:
{list hypotheses from orch state}

Generate:
1. Recommended research techniques matched to each hypothesis
2. An interview guide using the template structure from the docs
3. Suggested sample sizes and participant criteria
4. A research plan the user can execute

Return the complete research plan. No preamble."
```

**Persist to orch immediately:**

Create a research plan work scope:
- `create_work_scope` with `namespace: "pd.research-plan"`, a title like `"{code} Research Plan"` as `name`, and `parentId` set to the discovery's ID.
- Update status to `"active"`.
- Persist these fields from the sub-agent's output:
  - `techniques`: Research techniques matched to hypotheses
  - `sample_sizes`: Participant counts per technique
  - `participant_criteria`: Who to recruit
  - `timeline`: Research timeline
  - `interview_guide`: The full interview guide structure

Present the research plan to the user with its assigned key. The user conducts the research — the agent plans it and will process the results later. Use `AskUserQuestion` to offer next steps: refine the plan, start collecting evidence, or revisit hypotheses.

### 4. Evidence Evaluation

When the user provides research results, **spawn a sub-agent** with the Agent tool:

```
Prompt: "You are a Product Discovery evidence evaluator. Read these files:
- content/docs/product-discovery/evidence/index.mdx
- content/docs/product-discovery/evidence/weights.mdx
- content/docs/product-discovery/evidence/sufficiency.mdx
- content/docs/product-discovery/conventions.mdx

Here are the hypotheses being tested:
{list hypotheses with their current statuses}

Here are the research results:
{user's research data}

For each piece of evidence:
1. Assign an ID (EV-{code}-{n})
2. Summarise it in one sentence
3. Weight it on the 1-5 scale (be conservative — most interview evidence is weight 2-3)
4. Link it to the hypotheses it supports or refutes
5. State whether it supports or refutes each linked hypothesis

Then assess each hypothesis:
- Has it reached sufficient evidence to transition? (3+ items, average weight 3+)
- Recommend state transitions: Draft→Active, Active→Supported, Active→Refuted
- Flag evidence gaps

Return the evidence register and hypothesis transition recommendations. No preamble."
```

**Persist evidence to orch immediately** (additive — no confirmation needed):

Create evidence work scopes:
- `create_work_scope` with `namespace: "pd.evidence"`, the one-sentence summary as `name`, and `parentId` set to the discovery's ID.
- Persist these fields per evidence item:
  - `weight`: 1-5 from the sub-agent's assessment
  - `source_type`: Interview, observation, survey, analytics, etc.
  - `linked_hypotheses`: List of hypothesis keys this evidence relates to
  - `direction`: `supports` or `refutes` (per linked hypothesis)

Update the research plan status:
- `update_work_scope` on the `pd.research-plan` with `status: "completed"` if all planned research is done.

Present the evidence register to the user with assigned keys (e.g. "Captured EV-SAO-008 through EV-SAO-012").

**Hypothesis transitions require confirmation** (destructive — these close doors):

If the sub-agent recommends state transitions, present them to the user and confirm before updating:
- `"active"` = Active (research has begun targeting this hypothesis)
- `"supported"` = Supported (sufficient evidence confirms it)
- `"refuted"` = Refuted (evidence contradicts it)
- `"retired"` = Retired (no longer relevant)

Use `AskUserQuestion` to let the user approve, modify, or defer each recommended transition. Only call `update_work_scope` after confirmation.

### 5. Iteration

When evidence contradicts a hypothesis or reveals a different problem:
- Propose reframing — the user decides whether to loop back
- New hypotheses from reframing: spawn the Problem Framing sub-agent again with the new context
- **Persist new hypotheses immediately** as `pending` drafts under the `pd.hypotheses` container (additive — no confirmation)
- **Confirm before transitioning** the refuted hypothesis to `"refuted"` (destructive — closes a door)
- Maintain the traceability chain through pivots

When the user provides new hypothesis ideas mid-discovery (outside a formal reframing):
- Spawn a sub-agent to sharpen them for falsifiability and check overlap with existing hypotheses
- **Persist immediately** as `pending` drafts — the user already expressed intent by providing the ideas
- Present the saved artifacts with keys: "Added SAO-008 and SAO-009 as drafts"
- Use `AskUserQuestion` to offer next steps: update research plan, add more, continue with evidence

### 6. Opportunity Assessment

**Spawn a sub-agent** with the Agent tool:

```
Prompt: "You are a Product Discovery opportunity assessor. Read these files:
- content/docs/product-discovery/opportunity-assessment/index.mdx
- content/docs/product-discovery/templates/opportunity-scorecard/index.mdx

Here are the supported hypotheses:
{list supported hypotheses}

Here is the evidence base:
{summary of key evidence items}

Generate opportunity scores using the scorecard structure from the docs:
1. Market sizing
2. Competitive landscape
3. Feasibility assessment
4. Composite score and ranking
5. Flag where evidence is thin and scores are uncertain

Return the scored opportunities. No preamble."
```

**Persist to orch immediately** (additive — no confirmation):

Create opportunity work scopes:
- `create_work_scope` with `namespace: "pd.opportunity"`, the opportunity name as `name`, and `parentId` set to the discovery's ID.
- Persist these fields per opportunity:
  - `market_size_score`: 1-5
  - `competitive_score`: 1-5
  - `feasibility_score`: 1-5
  - `composite_score`: Weighted average
  - `confidence`: High | Medium | Low (based on evidence coverage)

Present the scored opportunities to the user with assigned keys. Use `AskUserQuestion` to offer next steps: revise scores, add context, proceed to synthesis.

### 7. Synthesis and Discovery Brief

**Spawn a sub-agent** with the Agent tool:

```
Prompt: "You are a Product Discovery synthesiser. Read these files:
- content/docs/product-discovery/synthesis/index.mdx
- content/docs/product-discovery/templates/discovery-brief/index.mdx

Here is the full discovery state:
- Hypotheses: {all hypotheses with statuses}
- Evidence: {all evidence items with weights and links}
- Opportunities: {all opportunity scores}

Generate:
1. Insights (IN-{code}-{n}) — each must reference at least 2 evidence items
2. A Discovery Brief using the template from the docs
3. A recommendation: proceed to validation, pivot, or kill
4. Full traceability chain: Hypothesis → Evidence → Insight → Opportunity Score → Recommendation

Return the insights and Discovery Brief. No preamble."
```

**Persist insights and brief to orch immediately** (additive — no confirmation):

Create insight work scopes:
- `create_work_scope` with `namespace: "pd.insight"` for each insight, with `parentId` set to the discovery's ID.
- Persist these fields per insight:
  - `linked_evidence`: List of evidence keys (minimum 2)
  - `pattern`: Description of the pattern observed across evidence

Create the Discovery Brief as a draft:
- `create_work_scope` with `namespace: "pd.brief"`, the brief title as `name`, and `parentId` set to the discovery's ID.
- Set status to `"draft"`.
- Persist these fields:
  - `recommendation`: `proceed` | `pivot` | `kill`
  - `recommendation_rationale`: Summary of the traceability chain supporting the recommendation

Present the insights and brief to the user with assigned keys.

**Finalization and completion require confirmation** (destructive — closes doors):

Use `AskUserQuestion` to offer: "Finalize this brief and complete the discovery", "Revise the brief", "Go back to gather more evidence".
- When the user approves finalization: `update_work_scope` on the brief with `status: "finalized"`, then `update_work_scope` on the discovery with `status: "completed"`.
- If the user wants revisions, iterate on the brief before finalizing.

## Interaction principles

### Capture first, ask what's next second

Never ask "Want me to add these?" after a sub-agent returns validated artifacts. The user's intent was clear when they provided the input. Persist immediately, then present what was saved and offer next steps.

**Additive actions — persist immediately, no confirmation:**
- New hypotheses (from user ideas or initial generation) → create as `pending` (draft)
- Evidence items (from user's research results) → create with weights and links
- Research plans (after sub-agent generates) → create as `active`
- Insights (from synthesis) → create as `pending`
- Opportunities (from assessment) → create as `pending`
- Problem statement updates → update discovery scope
- Discovery Brief → create as `draft`

After persisting, present the artifacts with their assigned keys (e.g. "Added SAO-008 and SAO-009 as drafts") and use `AskUserQuestion` to offer next steps: revise, continue to next phase, add more, etc.

**Destructive transitions — confirm before persisting:**
- Hypothesis lifecycle changes that close doors: `active` → `supported`, `active` → `refuted`, any → `retired`
- Brief finalization: `draft` → `finalized`
- Discovery completion: `active` → `completed`
- Deleting any artifact

These change the trajectory of the discovery. Present the sub-agent's recommendation, then confirm with the user before updating status in orch.

### Discussion vs. capture

When a sub-agent generates artifacts from scratch (e.g. initial hypothesis batch, opportunity scores), the user hasn't seen them yet. The pattern is still capture-first: persist as drafts immediately, present them, and let the user revise or delete. The user can always refine — but the ideas are never lost to a confirmation prompt.

When a sub-agent sharpens user-provided input (e.g. user throws out raw hypothesis ideas), persist immediately. The user already expressed intent.

## Key rules

- Never skip traceability. Every artifact traces back to its predecessors.
- Be conservative with evidence weights. Most interview evidence is weight 2-3.
- The methodology finds problems, not solutions. Do not design or propose solutions.
- The user makes the decisions. The agent structures the thinking and does the analytical work.
- Orphaned artifacts indicate a gap. Link them or document why they stand alone.
- **Never read methodology docs directly.** Always delegate to sub-agents.
- Keep the main conversation lean. Sub-agent results should be concise artifacts, not raw doc content.

## State management via orch MCP

All discovery state is tracked in orch via MCP tools. This enables persistence across sessions and gives visibility into discovery progress.

### Work scope types and fields

Each work scope type stores structured data. Fields beyond `name` and `status` will be stored as custom fields on the work scope when orch supports them.

**pd.discovery**
- `name`: Discovery name (e.g. "Solo Agent Orchestration")
- `status`: `pending` | `active` | `completed` | `archived`
- `discovery_code`: 2-4 uppercase letter code (e.g. SAO)
- `problem_statement`: The structured problem statement from Problem Framing
- `domain`: Problem space / domain
- `trigger`: What triggered this discovery
- `constraints`: Timeline, budget, team size constraints
- `target_segment`: Description of the target user segment

**pd.hypothesis**
- `name`: The hypothesis statement
- `status`: `pending` (Draft) | `active` | `supported` | `refuted` | `retired`
- `support_criteria`: What evidence would support this hypothesis
- `refute_criteria`: What evidence would refute this hypothesis
- `priority`: Priority ranking (1 = highest risk/uncertainty, test first)

**pd.evidence**
- `name`: One-sentence evidence summary
- `status`: `pending`
- `weight`: 1-5 (Anecdotal to Statistically Significant)
- `source_type`: Interview, observation, survey, analytics, etc.
- `linked_hypotheses`: List of hypothesis keys this evidence relates to
- `direction`: `supports` | `refutes` (per linked hypothesis)

**pd.insight**
- `name`: The insight statement
- `status`: `pending`
- `linked_evidence`: List of evidence keys (minimum 2)
- `pattern`: Description of the pattern observed across evidence

**pd.opportunity**
- `name`: Opportunity name
- `status`: `pending`
- `market_size_score`: 1-5
- `competitive_score`: 1-5
- `feasibility_score`: 1-5
- `composite_score`: Weighted average
- `confidence`: High | Medium | Low (based on evidence coverage)

**pd.brief**
- `name`: Brief title
- `status`: `pending` | `draft` | `finalized`
- `recommendation`: `proceed` | `pivot` | `kill`
- `recommendation_rationale`: Summary of the traceability chain supporting the recommendation

**pd.research-plan**
- `name`: Research plan title (e.g. "SAO Research Plan")
- `status`: `pending` | `active` | `completed`
- `techniques`: List of research techniques and their matched hypotheses
- `sample_sizes`: Participant counts per technique
- `participant_criteria`: Who to recruit
- `timeline`: Research timeline
- `interview_guide`: The full interview guide structure

### Resuming an existing discovery

When the user chooses to continue an existing discovery (see First step):
1. Call `list_work_scopes_by_namespace` with `namespace: "pd.discovery"` to fetch all discoveries.
2. Present them to the user. Once they pick one, call `list_work_scope_children` with the discovery's ID.
3. Use the children to reconstruct the current state — which hypotheses exist, their statuses, evidence gathered so far.
4. Resume from where the discovery left off.

### Key MCP operations

| Action | Tool | Key parameters |
|--------|------|----------------|
| Create a discovery | `create_work_scope` | `namespace: "pd.discovery"`, `name`, `keyPrefix`, `parentId` (optional) |
| Create hypotheses container | `create_work_scope` | `namespace: "pd.hypotheses"`, `name: "Hypotheses"`, `parentId` (discovery ID) |
| Create a hypothesis | `create_work_scope` | `namespace: "pd.hypothesis"`, `name`, `parentId` (hypotheses container ID) |
| Create evidence | `create_work_scope` | `namespace: "pd.evidence"`, `name`, `parentId` (discovery ID) |
| Create an insight | `create_work_scope` | `namespace: "pd.insight"`, `name`, `parentId` (discovery ID) |
| Create an opportunity | `create_work_scope` | `namespace: "pd.opportunity"`, `name`, `parentId` (discovery ID) |
| Create a research plan | `create_work_scope` | `namespace: "pd.research-plan"`, `name`, `parentId` (discovery ID) |
| Create the brief | `create_work_scope` | `namespace: "pd.brief"`, `name`, `parentId` (discovery ID) |
| Transition a hypothesis | `update_work_scope` | `id` (hypothesis ID), `status` (new state) |
| Complete the discovery | `update_work_scope` | `id` (discovery ID), `status: "completed"` |
| List discovery contents | `list_work_scope_children` | `parentId` (discovery ID) |
| Find all discoveries | `list_work_scopes_by_namespace` | `namespace: "pd.discovery"` |
| Delete an artifact | `delete_work_scope` | `id` (work scope ID) |

## Boundary

Product Discovery finds problems worth solving. It does NOT design solutions, test prototypes, or validate product concepts. If the user needs solution validation, hand off to Product Validation.
