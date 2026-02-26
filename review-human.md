# Kilpi Methodology -- Critical Review from a Non-NIST Founder's Perspective

**Reviewer context:** I am a startup founder and first-time security lead. I have never read the NIST Cybersecurity Framework. I know security matters, I know we need to "do something," but I have never worked through a formal security methodology. I am reading this documentation for the first time, top to bottom, as presented.

---

## Overview (index.mdx)

The overview page is the front door and it carries a lot of weight. It opens well: "Kilpi is a standalone security methodology built on NIST CSF 2.0" -- I immediately know what this is. The sentence about agents being able to apply it autonomously is interesting and differentiating, but it raises a question it does not answer: what does "apply the methodology" actually produce? A document? A set of configuration changes? Tickets? I do not yet know what the output of this process is.

The accordion sections list strong claims (defined procedures, concrete artifacts, traceability chain, worked example). This is good -- it tells me this is not just a checklist. But the accordion for "Defined Procedures" mentions "threat modeling (STRIDE)" and "risk scoring (likelihood x impact)" without any explanation. At this point in my reading, I do not know what STRIDE is. The word appears here, in the techniques table, and nowhere on this page is it explained. I would have to click through to the Risk Assessment function page to learn it. For an overview page, this is a problem -- it name-drops jargon that a NIST-naive reader cannot parse.

The Foundation section is effective. The three-tier hierarchy (Function > Category > Subcategory) with the count (6 > 22 > 106) is immediately graspable. The diagram description of Govern sitting at the centre with the other five forming a lifecycle is clear.

The Scope table is good. Two levels, clear distinction. The Profiles section introduces "Current Profile" and "Target Profile" -- this is useful but the explanation is very brief. I am not sure what "marking each subcategory as in-scope or out-of-scope" looks like in practice. There is no template or example for a Target Profile anywhere in the docs.

The Traceability section with the chain diagram (Asset > Threat > Control > Monitoring > Response > Recovery) is one of the most valuable things on the page. It immediately communicates what this methodology is about. The ID scheme table (SA-, ST-, SC-) is clear.

### Blockers
- None.

### Gaps
- **STRIDE is mentioned but never explained on this page.** The overview says "threat modeling (STRIDE)" in passing. A founder with no NIST background does not know what STRIDE stands for or what the six categories are. The Techniques table says "classify threats by Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege" which is helpful, but it is buried in a table row, not called out as the central threat modeling technique the entire methodology depends on. A two-sentence explanation or a link to a glossary entry would fix this.
- **MITRE ATT&CK is mentioned with zero context.** The Techniques table says "map identified threats to known adversary tactics and techniques" but a reader unfamiliar with ATT&CK has no idea what this means in practice. Is it a database? A tool? A classification system? The methodology later asks you to look up technique IDs, but the overview does not prepare you for this.
- **No "quick start" or "what to do first" guidance.** The overview lists all the sections but does not tell me where to start. Do I start with Govern? Do I start with Identify for my product? The scope page partially answers this, but the overview itself does not sequence the work.
- **Target Profile concept is introduced but has no supporting material anywhere in the docs.** There is no template for a Target Profile and no example in Taskflow.

### Polish
- The accordion component is interactive but hides important differentiating information. Consider whether the key claims should be visible by default.
- "The pipeline IS the policy" is a strong statement that appears in the accordion but is not explained until the GV.PO page. Could confuse readers who are not familiar with CI/CD-as-policy thinking.

---

## Agents (agents.mdx)

This is a short page and it raises more questions than it answers. It lists two skills (kilpi_org, kilpi_component) and tells me they reference sections of the docs. There is a link to an external GitHub repo for the skills.

From a founder's perspective, this page does not tell me:
- What the agent actually does when it runs. Does it fill in the template? Does it ask me questions? Does it read my codebase?
- What I need to provide before invoking the skill. Do I need to have my codebase in a specific state? Do I need to have already written anything?
- What the output looks like. Is it a filled-in template? A set of markdown files? JSON?
- How long it takes. Minutes? Hours?

### Blockers
- None. The page is optional -- you can use Kilpi without agents.

### Gaps
- **No description of the agent workflow.** I cannot tell what the agent does versus what I need to provide. The "Reads from" column tells me what the agent references but not what it produces.
- **No example of agent output.** If the Taskflow example is what the agent produces, say so explicitly. "Running kilpi_component on a product like Taskflow would produce output similar to the Taskflow example" would close this loop.

### Polish
- "appyling" is a typo on line 8 ("for appyling the Kilpi methodology").

---

## Conventions (conventions.mdx)

This page is well-structured and essential. The three ID schemes (SC-, ST-, SA-) are explained with format, example, and meaning. The traceability section shows how IDs appear in threat model tables and control inventory tables. The severity levels (Critical/High/Medium/Low) are clear and consistently defined.

One concern: the Control ID uses a `{category}` segment described as "the two-letter NIST category code (AA, DS, PS, CM, etc.)." As a reader with no NIST background, I do not know what these two-letter codes correspond to. The page says they keep controls traceable to subcategories but does not provide a reference table mapping codes to category names. I have to discover through context that AA means "Access Authorization" (from the PR.AA section). In the Taskflow example, the control IDs actually use product-specific codes like SC-TF-1.1 where TF is the product code, not the category code -- this contradicts the convention described here, where the second segment is supposedly a category code. This inconsistency would confuse me.

### Blockers
- **Control ID convention conflicts with the Taskflow example.** The Conventions page says the format is `SC-{category}-{number}` where `{category}` is the "two-letter NIST category code (AA, DS, PS, CM, etc.)." But in the Taskflow example, all controls use `SC-TF-{number}` where TF is the product code, not the category code. This means either the convention is wrong, the example is wrong, or there are two valid schemes and it is not documented. A reader trying to create their own controls would not know which format to use.

### Gaps
- **No reference table for the two-letter NIST category codes.** If the convention says to use "AA, DS, PS, CM, etc." there should be a complete list so I know all valid codes.

### Polish
- The coverage check section is useful but could link directly to the Protect function page.

---

## Scope (scope.mdx)

This is one of the clearest pages in the docs. The two-level model (Organisation and Product) is immediately understandable. The statement "Products do not redo Govern, Respond, or Recover" is the single most important sentence for someone trying to figure out what to do -- it tells me that Govern, Respond, and Recover are company-level concerns, while Identify, Protect, and Detect are product-level.

The product scope table is effective. The "Inherits from org" column makes the relationship concrete.

### Blockers
- None.

### Gaps
- **No guidance on sequencing.** Should I complete the org-level assessment before starting any component assessment? Or can I do them in parallel? For a startup that might have one product, does it make sense to do both simultaneously? This seems like an obvious question a founder would ask.
- **No guidance for the "I only have one product" case.** Many startups are their product. The distinction between org-level and component-level may feel artificial when the org IS the product team. A sentence acknowledging this and suggesting how to handle it would help.

### Polish
- None.

---

## Functions Index (functions/index.mdx)

A clean, minimal index page. The table repeats the function list from the overview. Fine as navigation. No issues.

---

## GV: Govern (functions/govern/)

### Govern Index
Opens with a strong framing: "Without Govern, the rest of the framework has no anchor." The note "For a small team, this doesn't mean bureaucracy. It means decisions are written down, roles are clear, and the program gets reviewed as the system grows" is exactly the right thing to say to a startup founder. It pre-empts the "this is too enterprise" objection.

### GV.OC: Organizational Context
This is where the methodology starts to feel real. Each subcategory has a clear methodology section with a fill-in table. The tables have italicized example data that shows what good output looks like.

The stakeholder identification table (GV.OC-02) is particularly effective -- the example rows for Leadership, Customers, and Regulators make the abstract concept concrete. The compliance landscape table (GV.OC-03) with GDPR, SOC 2, and Customer DPA examples is similarly helpful.

GV.OC-04 (Critical capabilities and services) introduces "layers of responsibility" -- Cloud provider, Platform, Customer. This is a concept that would be unfamiliar to some founders but is well-explained here.

### GV.RM: Risk Management Strategy
GV.RM-06 (Risk scoring methodology) is the most important subsection in all of Govern. The likelihood x impact severity matrix is clearly presented. However, it appears here in Govern AND again in ID.RA-04 (Risk Assessment). The duplication is not inherently bad, but a reader might wonder which is the "source of truth." This is a minor issue.

GV.RM-07 (Strategic opportunities) is a surprisingly thoughtful addition. The idea of documenting positive risks is not something I would have expected in a security methodology. The example of accepting more risk to enable strategic advantage shows this methodology understands startup reality.

### GV.RR: Roles & Responsibilities
The opening sentence is excellent: "On a small team, security roles are not full-time positions -- they are responsibilities that specific people own alongside their other work." This is exactly the framing a startup needs.

### GV.PO: Policy
"The security pipeline IS the policy" is now explained. The concept of expressing policy rules as pipeline checks is powerful and practical. The trigger-based review table (GV.PO-02) is useful.

### GV.OV: Oversight
The review cadence table with four frequencies (after each release, monthly, quarterly, annually) is practical and granular. The performance metrics section (GV.OV-03) gives concrete examples of what to measure.

### GV.SC: Supply Chain Risk Management
This is the longest Govern category (10 subcategories). For a startup founder, this might feel overwhelming. The methodology handles it well by covering open-source libraries, cloud services, and SaaS tools -- all things a startup actually uses. The SLSA section (GV.SC-09) is a standout: it gives specific, actionable build integrity levels rather than vague guidance.

### Blockers
- None.

### Gaps
- **Govern assumes the reader already knows they should do Govern first.** The function pages do not have a "do this before Identify" callout. A reader could skip Govern entirely and start with Identify, which would undermine the entire framework.
- **Risk appetite vs. risk tolerance distinction (GV.RM-02) is never explicitly defined.** The table uses both terms with example data, but a reader unfamiliar with risk management terminology might not understand the difference between "appetite" and "tolerance." The methodology says "Appetite is the general position; tolerance is the measurable threshold" which is adequate but easy to miss.

### Polish
- The informative references tables at the bottom of each page (mapping to ISO 27001, SOC 2, etc.) are useful for compliance mapping but could be distracting for a first-time reader. Consider collapsing them by default.

---

## ID: Identify (functions/identify/)

### Identify Index
Clear framing: "what do we have, and what could go wrong?" The instruction to use the Component Template is helpful.

### ID.AM: Asset Management
Well-structured with seven subcategories. The classification table (Public, Internal, Confidential, Restricted) in ID.AM-05 is useful and well-defined. The data inventory table (ID.AM-07) is concrete.

ID.AM-03 (Network data flows) tells me to produce architectural diagrams but does not show what one looks like. It says "See the Component Template for the full list of what security needs on the diagrams" but the Component Template for ID.AM-03 also does not contain a sample diagram -- it just says to "produce architectural diagrams." The Taskflow example does include an ASCII diagram, but a reader working through the methodology pages alone would not see that.

### ID.RA: Risk Assessment
This is the heaviest page in the docs and the one most likely to cause a founder to give up. It has 10 subcategories and introduces STRIDE, MITRE ATT&CK, and the likelihood x impact matrix all in one place.

The STRIDE explanation here (ID.RA-03) is the best in the docs. The six-row table with Category, Question, and Example is exactly what a non-expert needs. However, this explanation only appears here. If a reader encounters the term "STRIDE" on the overview page or in the Protect function, they have to find their way back to ID.RA-03 to understand it.

MITRE ATT&CK (ID.RA-05) is handled well: "search for matching techniques for each threat in the register and record the technique ID alongside the threat entry." But it still assumes I know how to search ATT&CK. A link to the ATT&CK Navigator or a sentence explaining that ATT&CK is a public database at attack.mitre.org would close this gap.

ID.RA-07 through ID.RA-10 feel like they are aimed at larger organizations. Change management, vulnerability disclosure processes, hardware integrity verification, and critical supplier assessment are all important, but for a 5-person startup shipping a SaaS product, these may be "do later" items. The methodology does not prioritize or sequence these subcategories.

### ID.IM: Improvement
This category is the feedback loop. The table in ID.IM-03 showing how each function feeds back into improvement is one of the best conceptual explanations in the docs. It connects the entire lifecycle into a closed loop.

### Blockers
- None.

### Gaps
- **ID.AM-03 does not include a sample data flow diagram.** The methodology page tells you to produce architectural diagrams but does not show what one looks like. The Taskflow example has a basic ASCII diagram, but the methodology page itself has no visual.
- **ID.RA does not sequence its 10 subcategories.** A founder reading through ID.RA-01 to ID.RA-10 would not know which ones are essential for a first pass and which can be deferred. ID.RA-01 through ID.RA-06 are the core analytical chain; ID.RA-07 through ID.RA-10 are supporting processes. This distinction is not made.
- **MITRE ATT&CK is referenced without a link to the actual database.** The methodology tells me to "search for matching techniques" but does not tell me where to search or provide a URL.

### Polish
- The note about ID.AM-06 not existing in CSF 2.0 (numbering jumps from 05 to 07) is a helpful comment. More of these "why is there a gap" notes throughout would reduce confusion.

---

## PR: Protect (functions/protect/)

### Protect Index
The five-step process (Gather threats > Select controls > Map to subcategories > Prioritize > Verify coverage) is the clearest procedural guidance in the docs. This is where the methodology earns the title "methodology" rather than "framework."

### PR.AA: Identity Management & Access Control
Well-structured. The tables for each subcategory (identity lifecycle, proofing, authentication, assertions, permissions, physical access) are practical and concrete. The italicized examples are consistently helpful.

### PR.DS: Data Security
Good coverage of at-rest, in-transit, in-use, and backups. The "Do not reuse production data in non-production environments" callout in PR.DS-02 is the kind of specific, actionable advice that makes this methodology practical.

### PR.PS: Platform Security
The configuration management table (PR.PS-01) with baselines for web application, TLS, server, container runtime, cloud account, and database is excellent. This is where the methodology gets concretely technical. The secure development practices table (PR.PS-06) with practice, timing, tool, and failure action columns is one of the most directly actionable tables in the docs.

### PR.AT: Awareness & Training
Appropriately scoped: "This is less about formal training programmes and more about building security knowledge into everyday work." Good for a startup context.

### PR.IR: Infrastructure Resilience
The network segmentation table (PR.IR-01) with segments, allowed traffic, and enforcement mechanisms is concrete. The rate limiting and input validation rules table is particularly useful -- these are things a developer can implement immediately.

### Blockers
- None.

### Gaps
- **The Protect function does not have a "control inventory" template.** The methodology says to produce a control inventory where every control maps to a threat. The Taskflow example shows this implicitly (controls tagged with SC-TF-* IDs), but there is no explicit control inventory table template showing ID, Control Description, Threat Mitigated, Subcategory, Evidence, Status. The templates jump straight into subcategory-specific tables. A reader could complete all the Protect subcategory templates and still not have a consolidated view of their control inventory.
- **No explicit link between the threat register output (from ID.RA) and the Protect input.** The Protect index says "Gather threats -- read the scored threats from Identify" but does not show what this handoff looks like structurally. A reader filling in the Protect template would need to manually cross-reference back to their ID.RA output.

### Polish
- PR.AA-06 (Physical access) correctly notes that cloud-hosted products delegate to the provider. Including this rather than omitting it shows completeness.

---

## DE: Detect (functions/detect/)

### Detect Index
"For each control implemented in Protect, define how you would know if it fails or is bypassed." This is an outstanding framing. It converts detection from "monitor everything" to "monitor the things that matter."

### DE.CM: Continuous Monitoring
The five subcategories cover network, physical, personnel, external providers, and application monitoring. The tables are practical but somewhat abstract compared to the Taskflow example. The methodology page gives generic examples ("Failed login spikes, credential reuse") while the Taskflow example gives specific alert thresholds (">10 failed logins for a single account in 10 minutes"). This is the correct relationship -- methodology provides the structure, example provides the specifics -- but a reader working only from the methodology page might produce monitoring rules that are too vague to be actionable.

### DE.AE: Adverse Event Analysis
This category does a good job distinguishing between signals and incidents. The incident declaration criteria table (DE.AE-08) is especially useful -- it defines when an event becomes an incident before one occurs, which is exactly what you want.

### Blockers
- None.

### Gaps
- **No guidance on tooling selection for monitoring.** The methodology assumes you have a SIEM, log aggregation platform, and alerting system, but does not offer guidance on what these could be for a startup. Even a brief mention of CloudWatch, Datadog, or open-source alternatives would ground the abstract guidance in reality.
- **DE.CM numbering has gaps (DE.CM-04, DE.CM-05, DE.CM-07, DE.CM-08 do not exist).** Unlike the note about ID.AM-06, there is no comment explaining these gaps. A reader might think they are missing content.

### Polish
- The alerting tiers section in the Taskflow example (Critical/High/Medium with response times) is extremely useful but only exists in the example, not in the methodology pages or templates. Consider promoting this pattern to the methodology level.

---

## RS: Respond (functions/respond/)

### Respond Index
The escalation matrix at the function level is a good choice. Severity-to-response mapping is defined before any detail pages. The four categories (Management, Analysis, Reporting, Mitigation) are logically sequenced.

### RS.MA: Incident Management
RS.MA-02 (Triage) stands out: "Triage should take minutes, not hours -- the goal is 'good enough to prioritize,' not 'fully understood.'" This is practical wisdom that saves startups from over-analyzing during a crisis.

RS.MA-05 (Recovery initiation criteria) is a well-designed gate between Respond and Recover.

### RS.AN: Incident Analysis
The root cause analysis guidance ("the root cause is not 'the attacker exploited a vulnerability' -- it is the reason the vulnerability existed and was exploitable") shows deep understanding. The investigation record-keeping and evidence preservation tables are thorough.

### RS.CO: Incident Response Reporting
The internal and external notification tables are concrete. The GDPR 72-hour deadline is called out explicitly, which is essential for any product with EU users.

### RS.MI: Incident Mitigation
The containment-then-eradication sequence is clearly explained. The containment table with trade-offs column is honest about the cost of containment actions.

### Blockers
- None.

### Gaps
- **No sample incident response playbook.** The methodology describes what a playbook should contain and the Taskflow example provides containment actions mapped to specific threats, but there is no standalone playbook template. A reader completing the Respond section would produce notification matrices and escalation tables but not an actual step-by-step playbook they could hand to an on-call engineer at 3 AM.

### Polish
- RS.CO (Reporting) and RC.CO (Recovery Communication) are closely related and easy to confuse. The distinction is well-explained in RC.CO but could be previewed in RS.CO.

---

## RC: Recover (functions/recover/)

### Recover Index
The feedback loop section is valuable: it explicitly lists what the post-mortem feeds back into (asset registers, threat models, risk scores, controls, detection rules). This closes the lifecycle.

### RC.RP: Recovery Plan Execution
Six subcategories covering initiation through closure. The sequence is logical and well-documented. RC.RP-03 (Backup verification) includes the important warning about recent backups potentially being compromised.

RC.RP-06 (After-action report and closure) provides a clear report structure and closure criteria checklist. This is complete enough to use directly.

### RC.CO: Recovery Communication
The distinction between response reporting and recovery communication is clear: "Response reporting is about notifying stakeholders that an incident occurred. Recovery communication is about keeping stakeholders informed as services are restored."

### Blockers
- None.

### Gaps
- **No guidance on RTO/RPO.** Recovery Time Objective and Recovery Point Objective are standard concepts in disaster recovery but are never mentioned in the methodology. The recovery prioritization table (RC.RP-02) implicitly addresses RTO through prioritization, but making these explicit would be valuable, especially since NIST CSF GV.OC-04 implementation examples mention "recovery time objectives."

### Polish
- None.

---

## Template (templates/)

### Template structure
The template is a unified structure with org-level sections (Govern, Respond, Recover) and a Component Register that nests per-component Identify, Protect, and Detect assessments. Each subcategory has a brief instruction and a link icon to the corresponding methodology section. This is well-executed.

### Blockers
- None.

### Gaps
- **Templates do not include a "how to use this template" instruction.** The org template says "Copy this structure when applying the methodology to your organisation" but does not explain whether I should create a new document, fill in the tables inline, use a specific file format, or maintain it as a living document. For agent-based use, this matters even more -- does the agent fill in these tables in a new file?
- **No consolidated control inventory table in the templates.** As noted in the Protect section, the templates have per-subcategory tables but no rollup. A "master" threat register table and control inventory table would be valuable additions.
- **No template for the data flow diagram.** ID.AM-03 in both templates says to produce architectural diagrams but provides no diagram template or even a placeholder for where the diagram should go.

### Polish
- The SquareArrowOutUpRight icon links to methodology pages are a nice UX touch.

---

## References (references/)

### References Index
The framing is clear: NIST CSF defines outcomes, Informative References bridge to specific controls. The three-step chain (CSF subcategory > ISO 27001 control > CIS Benchmark setting) is an excellent explanation of how the references layer.

### ISO 27001
The Annex A mapping is well-organized. The Statement of Applicability section acknowledges that not all 93 controls apply. The note about A.7 (Physical controls) being delegated to cloud providers is relevant for startups.

### CIS Benchmarks
The explanation of CIS Benchmarks as "testable configuration requirements" is the right pitch. The chain example (CSF outcome > ISO control > CIS setting) is clear. The compliance verification section mentions CI/CD pipeline checks, which aligns with the "pipeline is the policy" philosophy.

### SLSA
Good coverage of the four SLSA levels with CSF mappings. The progressive requirements (documented > hosted > auditable > reproducible) are clearly explained.

### NIST CSF 2.0 Reference Data
The raw subcategory definitions and implementation examples are comprehensive. This is reference material, not guidance, and it is appropriately positioned. The implementation examples from NIST provide additional context beyond what the methodology pages offer.

### Blockers
- None.

### Gaps
- **No guidance on when to use which reference.** A founder does not know whether they need ISO 27001, CIS Benchmarks, or SLSA. The references index lists them but does not help a reader decide which are relevant to their situation. A sentence like "If you are a SaaS startup, start with CIS Benchmarks for your cloud provider and SLSA Level 1-2 for your build pipeline" would be actionable.

### Polish
- The "These are our mappings" disclaimer is important and correctly positioned.

---

## Taskflow Example (examples/taskflow/)

The Taskflow example is the single most valuable section of the entire methodology. It takes every abstract concept and makes it concrete with a realistic SaaS product (React SPA, Express API, PostgreSQL, Redis, S3, Stripe, SendGrid).

### Govern
The Taskflow Govern section demonstrates exactly what a completed assessment looks like. The stakeholder table includes real external parties (Stripe as a partner with PCI DSS expectations). The risk appetite table is impressive in its specificity -- it maps threat IDs to appetite areas, which demonstrates the traceability chain in action.

The risk scoring matrix in GV.RM-06 differs slightly from the methodology page (the Taskflow matrix has Medium in cells where the methodology page has Low). This inconsistency needs to be resolved -- a reader comparing the two will notice the discrepancy and wonder which is correct.

### Identify
The asset register with SA-TF-* IDs anchored as HTML elements is clever -- it means you can deep-link to specific assets. The threat register with 20 threats is comprehensive and demonstrates that STRIDE systematically covers the attack surface.

The impact and likelihood scoring matrix populated with actual threat IDs is the best single table in the entire documentation. It shows exactly how the abstract severity matrix translates into real risk decisions.

### Protect
The control inventory is implicitly spread across the five Protect category pages. Each control ID (SC-TF-*) traces back to threat IDs. The platform security section with specific Helmet middleware settings, RDS configuration, and ElastiCache settings is exactly the level of detail a developer needs.

### Detect
The monitoring rules with specific alert thresholds (">50 validation failures from a single IP in 5 minutes") are excellent. The alerting tiers section at the bottom provides a meta-structure that the methodology pages lack. The adverse event analysis section with cross-source correlation examples is sophisticated but practical.

### Respond
The incident management section maps incident types to Taskflow-specific impacts. The mitigation section maps every one of the 20 threats to a specific containment and eradication action. This is the playbook that the methodology pages describe but do not template.

### Recover
The recovery procedures mapped to threat groups (credential compromise, session hijacking, data exposure, application attack, dependency compromise) are outstanding. The feedback loop table showing how each recovery type updates Identify, Protect, and Detect is the definitive demonstration of the closed-loop methodology.

### Blockers
- **Severity matrix inconsistency between the methodology (GV.RM-06) and the Taskflow example (GV.RM-06).** In the methodology page, Likelihood: Low x Impact: Low = Low, and Likelihood: Medium x Impact: Low = Low. In the Taskflow example, Likelihood: Medium x Impact: Low = Medium, and Likelihood: Low x Impact: High = High (versus Medium in the methodology). These are different matrices. A reader following the methodology would produce different severity ratings than the example shows. One of them needs to be corrected. UPDATE: On closer inspection, the Taskflow matrix also has Likelihood: Low x Impact: Critical = Critical while the methodology matrix has this as High. Multiple cells differ. The Taskflow example appears to use a more aggressive (higher severity) matrix without acknowledging or justifying the deviation.

### Gaps
- **The Taskflow control ID scheme (SC-TF-*) does not match the documented convention (SC-{category}-*).** As noted under Conventions above, this is a systemic inconsistency. The Taskflow example uses product-scoped control IDs while the convention says to use NIST category-scoped IDs. This needs to be reconciled.
- **No explicit control inventory table.** The controls are distributed across 5 Protect subcategory pages. A consolidated table listing all 18 controls with their threat mappings, subcategory mappings, and evidence would demonstrate the "control inventory" artifact that the overview page promises.

### Polish
- The HTML ID anchors on asset, threat, and control IDs (e.g., `<span id="SA-TF-1">`) are a nice implementation detail that enables deep linking. More of this would be useful.

---

## Changelog (changelog.mdx)

The changelog has a single entry for 2025-02-25. This is fine for a new methodology. It lists the key decisions (naming, restructuring, scope model, templates, example, references, conventions, skills).

The changelog mentions "three Claude Code skills: kilpi_docs, kilpi_org, kilpi_component" but the Agents page only lists two (kilpi_org, kilpi_component). This is a discrepancy -- either the changelog is outdated or the Agents page is missing one.

### Blockers
- None.

### Gaps
- **kilpi_docs skill mentioned in changelog but not on the Agents page.** Either the skill was removed or the Agents page is incomplete.

### Polish
- None.

---

## Summary Verdict

### Would this methodology succeed end-to-end?

**Yes, with caveats.** The methodology is genuinely well-constructed. It is more practical than most security frameworks I have seen aimed at startups. The traceability chain (Asset > Threat > Control > Monitoring > Response > Recovery) is the structural backbone that makes this a methodology and not just a checklist. The Taskflow example is exceptional -- it is the most valuable section and should be positioned even more prominently.

A startup founder with no NIST background could work through this methodology and produce a meaningful security posture. The function pages are well-written, the tables are practical, and the example data is realistic. The scope model (Org vs Component) is a smart design that prevents the methodology from being impossibly heavy for small teams.

The agent integration story is the strategic differentiator but the documentation about it is the weakest section. A reader cannot tell what the agent produces, what inputs it needs, or how the output relates to the templates and examples.

### The three things that would actually block a real adoption

1. **The severity matrix inconsistency between the methodology and the Taskflow example.** A reader following the methodology guidance would score threats differently than the worked example shows. This undermines trust in the methodology at the exact point where precision matters most. One matrix needs to be authoritative and the other needs to reference it.

2. **The control ID convention does not match the worked example.** The Conventions page says `SC-{category}-{number}` using NIST category codes. The Taskflow example uses `SC-{product}-{number}`. A reader starting their own assessment would not know which scheme to follow. This needs a clear decision and consistent documentation.

3. **No explicit sequencing guide.** A founder opening this documentation does not know what to do first, second, and third. The linear reading order (Overview > Agents > Conventions > Scope > Functions > Templates > References > Examples) is not the execution order. The execution order should be: (1) Read Overview + Scope to understand the model, (2) Complete Govern at the org level, (3) Complete Identify/Protect/Detect per component, (4) Establish Respond and Recover at the org level. This sequence is implied but never stated. A "Getting Started" page that maps the execution order would be the single highest-leverage addition to the docs.

### Single biggest risk

**A founder gives up in the middle of Govern because they do not know when they are done or what to do next.** Govern has 6 categories and 32 subcategories. The subcategories range from essential (GV.OC-01: state your mission) to enterprise-grade (GV.SC-10: relationship termination provisions). Without a priority tier or maturity model that says "for your first pass, complete these 10 subcategories; add these 12 in your second pass; add the remaining 10 when you scale," a startup founder will either try to complete everything and burn out, or skip Govern entirely and undermine the framework.

The Taskflow example proves the methodology works. The execution path to get there is not yet documented.
