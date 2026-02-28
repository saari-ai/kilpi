# Cybersecurity Methodology: Agent Execution Review

This document is a critical review of the Cybersecurity security methodology from the perspective of an AI agent tasked with applying it end-to-end to a real SaaS product with a REST API, a database, a web frontend, and third-party integrations.

Every MDX file under `content/docs/` was read before writing this review. The assessment is structured section-by-section, walking through the methodology as if actually executing it.

---

## Overview and Foundation (index.mdx)

The overview page establishes that Cybersecurity is a methodology built on NIST CSF 2.0, with six functions, 22 categories, and 106 subcategories. It claims to produce "traceable, outcome-driven" results and to be "directly consumable by AI agents."

### Blockers

- **No execution order specified.** The overview lists the six functions but does not define the sequence in which I should execute them. The diagram implies Govern wraps everything and the five operational functions form a "lifecycle," but nothing says "start here, then do this." The Taskflow example presents them in GV-ID-PR-DE-RS-RC order, which I can infer, but this should be explicit. If I am handed this documentation cold, I have to read the entire Taskflow example to reverse-engineer the intended execution flow.

### Gaps

- **"Agent-first" claim is underdeveloped.** The overview says the methodology is "designed to be directly consumable by AI agents," but the only agent-specific page (`agents.mdx`) is two paragraphs pointing to external skill repos with no specification of what those skills do, what inputs they expect, or what outputs they produce. The skills themselves are hosted externally and the linked repositories are not part of the methodology documentation. An agent reading only the docs has no executable skill definition.

- **No definition of "done."** The overview does not define what a completed Cybersecurity assessment looks like. Is it a filled-in Org template? A filled-in Component template? Both? All 106 subcategories addressed? There is no acceptance criteria for the overall assessment output.

### Polish

- **Technique list is incomplete.** The Techniques table lists STRIDE, MITRE ATT&CK, and Likelihood x Impact. But the methodology also uses OWASP Top 10 (referenced in the Taskflow example), CIS Benchmarks, SLSA, and ISO 27005. These should appear in the techniques table or it should be renamed to something like "Core analytical techniques."

---

## Scope (scope.mdx)

The scope page cleanly separates Org and Component levels. The table showing which functions belong to which level is clear and machine-readable.

### Blockers

None.

### Gaps

- **No guidance on how to decompose a SaaS product into components.** The page says components "inherit Govern, Respond, and Recover from the organisation" and own ID, PR, DE. But it never says how to decide what constitutes a "component." Is a SaaS product with a REST API, database, and frontend one component or three? The Taskflow example treats the entire application (SPA + API + DB + Redis + S3 + integrations) as a single component. This is a reasonable default, but the methodology should state the rule. Without it, I would have to make an assumption that could produce inconsistent results across runs.

- **No guidance on what happens when the org-level assessment does not exist yet.** If I am asked to do a component assessment for a startup that has never done an org assessment, the component template tells me I "inherit" GV, RS, and RC from the org. But there is nothing to inherit. The methodology does not address this bootstrap problem. Do I do a minimal Govern pass first? Do I note the dependency and proceed? I would have to invent a strategy.

### Polish

- **The "Inherits from org" column in the product scope table is helpful but could be more specific.** It says "Org-wide risk appetite, severity thresholds" for Identify, but the actual dependencies are more granular: the component needs the severity matrix from GV.RM-06, the risk response options from GV.RM-04, and the data classification scheme from ID.AM-05. Enumerating these would make the inheritance chain machine-traceable.

---

## Conventions (conventions.mdx)

The conventions page defines three ID schemes (SC-, ST-, SA-), subcategory traceability rules, and a four-level severity scale.

### Blockers

- **Control ID category codes are underspecified.** The format is `SC-{category}-{number}` where `{category}` is described as "the two-letter NIST category code (AA, DS, PS, CM, etc.)." But the Taskflow example does NOT use NIST category codes for its control IDs. It uses `SC-TF-1.1`, `SC-TF-2.1`, etc., where `TF` is the product code, not the NIST category code. This directly contradicts the documented convention. An agent following the conventions page would produce IDs like `SC-AA-1` (per the convention), but an agent following the Taskflow example would produce `SC-TF-1` (per the example). This inconsistency will produce different output depending on which source the agent treats as authoritative.

### Gaps

- **No ID scheme for monitoring rules or detection rules.** Assets get SA-, threats get ST-, controls get SC-. But the traceability chain claims to go Asset -> Threat -> Control -> Monitoring -> Response -> Recovery. There is no prefix or ID scheme defined for monitoring rules, response playbooks, or recovery plans. The Taskflow example does not assign IDs to its monitoring rules either. This breaks the traceability chain at the DE layer. An agent cannot produce a machine-verifiable link from a detection rule back to its parent control without an ID.

- **No ID scheme for risk responses.** ID.RA-06 produces risk response decisions (mitigate, accept, transfer, avoid), but there is no ID prefix for these. They exist only as rows in a table. If I need to reference a specific risk response decision from a downstream artifact, I have no stable identifier to use.

- **Severity matrix inconsistency.** The severity matrix in conventions.mdx has four levels (Critical/High/Medium/Low). The matrix in GV.RM-06 methodology page also has four levels. But in the Taskflow example for GV.RM-06, the matrix produces different results: `Likelihood: Low x Impact: Critical = Critical` in Taskflow, versus `Likelihood: Low x Impact: Critical = High` in the methodology page. These are different matrices. An agent needs to know which one is canonical.

### Polish

- **The coverage check guidance is thin.** "List the subcategories relevant to your product (from the Identify phase) and confirm each has at least one control mapped to it." This is the right instruction, but there is no procedure for determining which subcategories are relevant. Do I include all 106? Only the ones where I identified a threat? Only the ones for the functions in scope? The Taskflow example implicitly answers this (it only covers subcategories where it found applicable threats/controls), but the methodology should state the scoping rule explicitly.

---

## Agents (agents.mdx)

### Blockers

- **No executable specification.** The page lists two skills (`kilpi_org`, `kilpi_component`) and says they reference "sections of these docs as its source of truth." But it does not specify: what input the skills expect (system description? architecture diagram? codebase access?), what output they produce (filled template? risk report? control inventory?), what order they execute sections in, what decisions they make autonomously vs. defer to a human, or what constitutes a successful run. An agent cannot self-execute from this page. It is a pointer to external repos, not an operational specification.

- **External dependency with no fallback.** The skills are hosted at `saari-ai/fiksu-skills` and activated via `saari-ai/claude-marketplace`. If these repos are unavailable, moved, or the skills are updated independently of the docs, there is no way for an agent to verify alignment. The methodology documentation should be self-sufficient for agent execution.

### Gaps

- **No guidance on agent limitations.** The page does not address what parts of the methodology an agent cannot execute autonomously. For example: GV.RR (roles and responsibilities) requires knowledge of actual team members. GV.OC-03 (compliance landscape) requires legal analysis. ID.AM-01 (hardware inventory) requires infrastructure access. PR.AT (awareness training) requires human delivery. An agent following the docs will either hallucinate these sections or get stuck. A "human input required" marker per subcategory would be valuable.

### Polish

- **"Other vendor support coming shortly" is not methodology content.** This is a product roadmap statement. It does not help an agent execute anything.

---

## Govern Function (functions/govern/)

### GV.OC: Organizational Context

Well-structured. Each subcategory has a clear table schema with column names and example rows. The tables for stakeholder identification (GV.OC-02), compliance landscape (GV.OC-03), critical capabilities (GV.OC-04), and dependencies (GV.OC-05) are machine-parseable and produce consistent output.

#### Gaps

- **GV.OC-01 has no table or structured output format.** It says "State the mission in plain language." This is the only subcategory in the entire Govern function that produces free text instead of a structured table. For an agent, this means the output format is undefined and will vary across runs.

### GV.RM: Risk Management Strategy

This is one of the strongest sections. The severity matrix (GV.RM-06) is unambiguous. The risk response options table (GV.RM-04) maps severity to required action. The risk appetite table (GV.RM-02) provides a clear schema.

#### Gaps

- **GV.RM-03 (Enterprise risk integration) has no structured output.** It says "Ensure cybersecurity risks are managed alongside other enterprise risks" but provides no table, checklist, or artifact to produce. An agent would produce a prose statement, which is not verifiable.

- **GV.RM-07 (Strategic opportunities) is hard to execute without business context.** An agent assessing a SaaS product would need to know the product roadmap, competitive pressures, and go-to-market strategy to identify "positive risks." This is inherently a human-input section but is not marked as such.

### GV.RR, GV.PO, GV.OV, GV.SC

All well-structured with table schemas. The Taskflow examples provide excellent demonstrations of how to fill them in.

#### Gaps

- **GV.SC is extremely thorough (10 subcategories) but has no scoping guidance for small teams.** The methodology says "For a small team, this doesn't mean bureaucracy" in GV.RR, but GV.SC has 10 subcategories requiring supplier inventories, contractual reviews, pre-adoption due diligence, ongoing monitoring, incident coordination, build integrity assessment, and termination planning. An agent would dutifully fill in all 10, but a 3-person startup does not need a formal relationship termination plan for npm. There is no guidance on which GV.SC subcategories to prioritize or defer.

---

## Identify Function (functions/identify/)

### ID.AM: Asset Management

Excellent. Seven subcategories, each with a precise table schema. The data classification system (Public/Internal/Confidential/Restricted) and criticality scale (Low/Medium/High/Critical) are defined with clear boundaries.

#### Blockers

None.

#### Gaps

- **ID.AM-03 (Network data flows) requires diagrams but provides no specification for what the diagram must contain.** It says "Architectural diagrams (produced by architecture, annotated by security during Identify) serve as the primary representation. These should show external actors, services, data stores, trust boundaries, data flow direction, and classification labels on flows carrying confidential or restricted data." This is a good list, but an agent cannot produce a diagram. The methodology should either define a text-based representation (like the ASCII diagram in the Taskflow example) or explicitly state that this subcategory requires human-provided architectural diagrams as input.

- **ID.AM-05 specifies classification and criticality definitions but does not say how to assign them.** It provides the scales, but the procedure for classifying a specific asset is not defined. The Taskflow example demonstrates the output but not the decision process. An agent would apply its general knowledge, which would work but could produce different classifications across runs for borderline cases.

### ID.RA: Risk Assessment

This is the analytical core and is well-defined. STRIDE is prescribed for threat identification. Likelihood x Impact is prescribed for scoring. MITRE ATT&CK is prescribed for validation.

#### Blockers

- **ID.RA-03 says "Start with trust boundaries, then extend to components that handle sensitive data or critical operations" but does not define how to identify trust boundaries.** The STRIDE table provides the six categories with example questions, which is helpful. But trust boundaries must come from the ID.AM-03 data flow diagram. If that diagram was not provided or is incomplete, the threat model has no scoping input. The dependency is implicit, not explicit. An agent could proceed by identifying trust boundaries from the asset register, but this is an assumption the methodology does not authorize.

#### Gaps

- **No minimum threat count or coverage requirement.** The methodology does not say how many STRIDE passes to make or how to know when threat identification is "complete." The Taskflow example produces 20 threats, but there is no statement like "apply STRIDE to every data flow crossing a trust boundary" or "apply STRIDE to every asset with Confidential or Restricted classification." An agent would apply STRIDE broadly and stop when it felt complete, which is non-deterministic.

- **MITRE ATT&CK validation (ID.RA-05) is described in two sentences.** "Search for matching techniques for each threat in the register and record the technique ID alongside the threat entry. Where ATT&CK has no matching technique, the threat may be theoretical -- reassess its likelihood rating." This is thin. Which ATT&CK matrices should I search? Enterprise? Mobile? ICS? Cloud? The Taskflow example references T-codes but does not show the ATT&CK validation process. An agent would search the Enterprise matrix by default, but the methodology should specify.

- **ID.RA-07 through ID.RA-10 are organizational processes, not per-assessment activities.** Vulnerability disclosure (ID.RA-08), hardware integrity (ID.RA-09), and supplier assessment (ID.RA-10) are ongoing operational processes. An agent performing a point-in-time assessment would document the current state of these processes, not execute them. The methodology does not distinguish between "do this during the assessment" and "verify this process exists."

### ID.IM: Improvement

#### Gaps

- **ID.IM is entirely retrospective.** All four subcategories are about capturing improvements from past evaluations, tests, operations, and plans. For a first-time assessment, there are no past evaluations, tests, or incidents to draw from. The methodology does not address the initial state. An agent would produce empty tables for ID.IM-01, ID.IM-02, and ID.IM-03 on a first run, which is correct but feels like wasted structure.

---

## Protect Function (functions/protect/)

### Threat-to-Control Process

The Protect index page defines a five-step process: gather threats, select controls, map to subcategories, prioritize by severity, verify coverage. This is the clearest procedural definition in the entire methodology.

#### Blockers

None.

#### Gaps

- **No control selection guidance.** Step 2 says "for each threat, write a testable control statement. The threat describes the attack mechanism; the control is what prevents it." But the methodology does not provide a catalogue of control options or selection criteria. The agent is expected to independently determine the appropriate technical control for each threat. This works because LLMs have broad security knowledge, but it means the control selection is driven by the agent's training data, not by the methodology. Two agents could produce materially different control inventories for the same threat register. The Taskflow example provides excellent concrete controls, but those are specific to Express/PostgreSQL/AWS. A different stack would require different controls, and the methodology provides no guidance for that translation.

- **The "verify coverage" step (step 5) says "scan the completeness check against your classification results" but does not define what the completeness check is or where it lives.** This appears to reference the coverage check from the conventions page, but the cross-reference is vague. The procedure should say "for each PR subcategory, verify at least one control is mapped; for each data classification level, verify encryption controls exist."

### PR.AA through PR.IR

All five Protect categories are well-structured with table schemas per subcategory. The Taskflow examples demonstrate high-quality control documentation.

#### Gaps

- **PR.AT (Awareness and Training) cannot be assessed by an agent.** It requires knowledge of actual training programs, delivery mechanisms, and cadence. An agent can produce a template of what training should exist (as the Taskflow example does), but cannot verify whether training is actually delivered. This is a human-dependent section that should be marked as such.

- **PR.PS-01 (Configuration management) references CIS Benchmarks but does not specify which benchmark to use for which technology.** The methodology page provides a generic table with examples (web application security headers, TLS settings, CIS Docker Benchmark), but an agent assessing a specific stack needs to know: "for PostgreSQL on AWS RDS, use CIS PostgreSQL Benchmark" or "for a Node.js API, use the OWASP Node.js checklist." The Taskflow example shows this mapping for its specific stack, but the methodology does not generalize it.

---

## Detect Function (functions/detect/)

### DE.CM: Continuous Monitoring

#### Gaps

- **No minimum monitoring coverage requirement.** The methodology says "For each control implemented in Protect, define how you would know if it fails or is bypassed" -- this is the right principle. But there is no checklist or completeness gate. An agent could map monitoring rules to 5 of 20 controls and the methodology would not flag the gap. A statement like "every control with severity High or Critical must have at least one monitoring rule" would make this verifiable.

- **Monitoring rules reference tooling that varies by stack.** The Taskflow example uses CloudWatch, PagerDuty, and Slack. The methodology guidance says generic things like "Structured application logging" and "Behavioural analytics." An agent assessing a product that uses Datadog, Splunk, or GCP Cloud Logging would need to translate. This is not a methodology problem per se, but the gap between the abstract guidance and concrete implementation is wider in Detect than in any other function.

### DE.AE: Adverse Event Analysis

Well-structured. The Taskflow example is particularly strong here, showing concrete correlation patterns and incident declaration criteria.

#### Gaps

- **DE.AE-02 through DE.AE-08 reference capabilities (SIEM, correlation engines, threat intelligence feeds) that a startup may not have.** The methodology does not provide a minimum viable detection stack or say what to do when these tools are unavailable. An agent would document the ideal state, which is useful, but might not match reality.

---

## Respond Function (functions/respond/)

### Blockers

None.

### Gaps

- **Respond is org-level only, but the Taskflow example fills it in with product-specific detail.** The scope page says "Products do not redo Govern, Respond, or Recover." But the Taskflow example includes RS.MA through RS.MI with product-specific incident types, containment actions, and eradication steps. This creates confusion: should an agent filling in a component template also produce Respond content? The Taskflow example suggests yes, but the scope model says no. The resolution is probably that the Taskflow example is an "org that has one product" -- but this is not stated.

- **Response playbooks are implied but not formalized.** The RS.MI-01 containment table in the Taskflow example is effectively a set of playbooks indexed by incident type. But the methodology never defines a "playbook" as a named artifact. There is no playbook ID scheme (analogous to SC- or ST-). The Taskflow RC.RP-04 section references "6 playbooks" and "5 scenarios" but these are not enumerated or cross-referenced anywhere. An agent would produce the containment tables but would not know to also produce standalone playbook documents.

---

## Recover Function (functions/recover/)

### Blockers

None.

### Gaps

- **The feedback loop in RC.RP-04 is the most important part of Recover, but it is not formalized as a procedure.** The Taskflow example shows an excellent feedback loop table mapping recovery types to Identify, Protect, and Detect updates. But the methodology page just says "Update asset registers if scope changed" and "Update threat models with the attack that actually happened." There is no structured table schema in the methodology guidance for this feedback loop. The Taskflow example invented one. The methodology should prescribe it.

---

## Template (templates/)

### Blockers

None. The templates are clean, machine-parseable, and faithfully mirror the methodology pages.

### Gaps

- **Templates are MDX files with JSX components, not a portable format.** The template pages include `import { SquareArrowOutUpRight } from 'lucide-react'` and use `<span style={{whiteSpace: 'nowrap'}}>` for formatting. An agent producing output cannot use these templates as-is. It would need to strip the JSX and produce markdown tables. This is trivial to work around but means the templates are presentation formats, not data formats.

- **No machine-readable schema.** The templates use markdown tables with column headers, which is parseable. But there is no JSON Schema, YAML schema, or similar formal definition of what a valid filled-in template looks like. An agent could produce output that fills in some columns but leaves others empty, and there is no validation mechanism to catch this. A schema file per category would make output validation automated.

- **Component template does not include a "Control Inventory" aggregate table.** The Protect methodology says controls should be inventoried, but the component template only has per-subcategory tables (PR.AA-01, PR.DS-01, etc.). There is no single table that lists all controls for the component with their IDs, threat mappings, and subcategory mappings. The Taskflow example produces per-subcategory control tables but also references control IDs (SC-TF-*) throughout. The aggregate inventory that connects them all is implied but not templated.

---

## Taskflow Example (examples/taskflow/)

The Taskflow example is the single most valuable artifact in the entire methodology. It demonstrates end-to-end execution across all six functions with full traceability.

### Blockers

None.

### Gaps

- **The Taskflow example is too clean.** Every threat has a control. Every control is "Implemented." There are zero accepted risks without mitigation. There are no unresolved findings. A real assessment would have gaps, accepted risks, deferred items, and partially implemented controls. The example does not demonstrate how to document these states, which means an agent will produce unrealistically complete assessments.

- **The Taskflow tech stack (React + Express + PostgreSQL + Redis + S3 + Stripe + SendGrid) is specific.** An agent assessing a different stack (e.g., Next.js + Django + MongoDB + Firebase + Twilio) would need to translate every concrete control. The Taskflow example does not say which controls are stack-specific versus which are universal. For example, "parameterised queries" (SC-TF-1.1) is universal, but "Helmet middleware for security headers" (PR.PS-01) is Express-specific. An agent might copy the example's specific controls verbatim instead of adapting them.

- **The Taskflow example uses SC-TF-* control IDs (product-scoped), while the conventions page documents SC-{category}-* IDs (NIST-category-scoped).** As noted in the conventions section above, this is a real inconsistency. The Taskflow example is the only worked example, so agents will follow its convention, not the documented one.

### Polish

- **The Taskflow GV.RM-06 severity matrix differs from the methodology's canonical matrix.** In the methodology: `Likelihood: Low x Impact: Critical = High` and `Likelihood: Medium x Impact: Low = Low`. In Taskflow: `Likelihood: Low x Impact: Critical = Critical` and `Likelihood: Medium x Impact: Low = Medium`. The Taskflow version is more conservative (higher severities), which is arguably better for a SaaS product handling user data. But the methodology should either adopt the Taskflow matrix as canonical or explicitly state that the matrix can be customized and the methodology version is a starting point.

---

## References (references/)

### Blockers

None.

### Gaps

- **ISO 27001 mapping is selective.** The page says "Not all 93 controls are relevant to every organisation" and maps approximately 25 of the 93 Annex A controls. This is reasonable, but an agent performing an ISO 27001 gap analysis alongside a Cybersecurity assessment would produce incomplete ISO coverage. The methodology should state that the ISO mapping covers "controls most relevant to software product security" and is not a complete ISO 27001 SoA.

- **CIS Benchmarks mapping is generic.** The page maps CIS control areas to CSF subcategories but does not map specific benchmark recommendations. An agent cannot go from "PR.PS-01 requires configuration management" to "run this specific CIS benchmark check." The Taskflow example fills this gap for its stack, but the methodology-level mapping stays abstract.

### Polish

- **SLSA mapping is clear and well-done.** The four levels with CSF subcategory mappings and Annex A cross-references are precise and actionable.

---

## Cross-Cutting Concerns

### Traceability Chain Completeness

The claimed traceability chain is: `Asset (ID.AM) -> Threat (ID.RA) -> Control (PR.*) -> Monitoring (DE.*) -> Response (RS.*) -> Recovery (RC.*)`

**The chain breaks at Monitoring (DE.*).** There are no monitoring rule IDs, so the link from Control to Monitoring is by prose reference, not by ID. The Taskflow DE.CM tables reference control IDs (e.g., "SC-TF-2.1") in the descriptions, which provides informal traceability, but there is no formal monitoring rule ID that can be referenced from the Response function.

**The chain also breaks at Response (RS.*).** There are no response playbook IDs. The RS.MI containment table references threat IDs (ST-TF-*), which provides backward traceability to threats, but there is no forward link to Recovery.

**Net effect:** The traceability chain is complete from Asset to Control (three links with IDs). From Control to Recovery (three more links), it is traceable by human reading but not by machine parsing. This matters for an agent because it means I cannot automatically generate a traceability report that chains every artifact from SA-* through to RC closure.

### Determinism Across Runs

If I ran this methodology twice on the same SaaS product, the following sections would produce consistent output:

- GV.OC (structured tables, clear schemas)
- GV.RM (defined severity matrix, defined risk response options)
- ID.AM (defined classification and criticality scales)
- ID.RA-04 (defined scoring matrix)
- PR.* (defined table schemas)
- DE.CM / DE.AE (defined table schemas)
- RS.* / RC.* (defined table schemas)

The following sections would produce materially different output:

- ID.RA-03 (threat identification): STRIDE provides categories but not a deterministic enumeration procedure. Different runs would identify different threats based on which trust boundaries the agent notices first and how deeply it explores each STRIDE category.
- PR control selection: The "right" control for a given threat is judgment-dependent. Two runs might produce "rate limiting" vs. "CAPTCHA" for the same brute force threat.
- DE.CM monitoring rules: What constitutes the "right" alert threshold is judgment-dependent and stack-specific.

### Picking This Up With Zero Context

**Can an agent pick this up cold and produce a complete security assessment?** Yes, with caveats:

1. The agent needs a system description as input. The methodology does not specify the format or minimum content of this input. The Taskflow example provides one implicitly (the ID.AM-01/02/03 tables serve as the system description), but the methodology does not say "provide a system description in this format before starting."

2. The agent can fill in approximately 80% of the methodology autonomously for a typical SaaS product. The remaining 20% requires human input: actual team member names and roles (GV.RR), real compliance obligations (GV.OC-03), actual supplier contracts (GV.SC-05), real training programs (PR.AT), and real monitoring tooling configuration (DE.CM specifics).

3. The Govern and Respond/Recover functions are org-level but the Taskflow example fills them in with product-specific detail. An agent assessing a component would be confused about whether to skip these or include them.

---

## Summary Verdict

**Would this pass actually succeed end-to-end?** Yes, with significant agent judgment filling gaps that the methodology leaves open. The methodology provides enough structure to produce a recognizable, traceable security assessment. An agent with strong security knowledge would produce a useful artifact. An agent without security training would not be saved by the methodology alone.

**The single biggest risk:** The inconsistency between the conventions page and the Taskflow example on control ID schemes (SC-{category}-{number} vs. SC-{product}-{number}) will cause agents to produce inconsistent identifiers. This breaks the one thing the methodology claims as its differentiator: traceable, ID-linked artifact chains. If the IDs are not consistent, the traceability chain fragments, and the assessment becomes a collection of independent tables rather than an integrated security model.

**Ranked priorities for improvement:**

1. **Fix the control ID convention to match the Taskflow example (or vice versa).** Pick one scheme and use it everywhere. This is the only true blocker for consistent agent output.

2. **Add monitoring rule and playbook ID schemes** to complete the traceability chain through DE, RS, and RC. Without these, the chain from Control to Recovery exists only in prose.

3. **Define an explicit execution order** on the overview page. Something like: "Execute in this order: GV (once per org), then per component: ID.AM -> ID.RA -> PR -> DE. Org-level RS and RC are defined once and referenced by all components."

4. **Reconcile the severity matrices** between the methodology page and the Taskflow example. Pick one and make it canonical.

5. **Add "human input required" markers** to subcategories that an agent cannot execute autonomously (GV.RR-01, GV.OC-03, PR.AT-01, PR.AT-02, and others). This would let an agent produce a partial assessment with clearly marked gaps rather than hallucinating content it cannot know.

6. **Add a minimum input specification** for agents: what does the agent need to receive before it can start? (System description, architecture diagram, tech stack, team structure, compliance requirements, existing security controls.)

7. **Specify the intended output format.** Are filled-in templates the output? Markdown files? A single document? Multiple documents per function? The methodology produces tables, but it never says what the deliverable is.

The methodology is genuinely good. The structure is sound, the traceability concept is strong, the Taskflow example is excellent, and the NIST CSF 2.0 alignment is thorough. The gaps are mostly at the "last mile" of agent execution -- the places where human practitioners would use judgment that agents need to have codified. Fixing the ID convention inconsistency and adding the missing ID schemes would address the two most impactful issues. Everything else is refinement, not redesign.
