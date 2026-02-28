---
name: cybersecurity_docs
description: >
  Cybersecurity documentation structure and maintenance. Use when editing,
  restructuring, or adding pages to the Cybersecurity docs at
  content/docs/cybersecurity/. Covers: page hierarchy, meta.json
  conventions, category page template, ID schemes, sidebar navigation. Does NOT
  apply the security methodology — use the cybersecurity skill for that.
  Triggers on: editing security doc structure, adding new category pages,
  updating security meta.json files, fixing security doc links.
---

# Cybersecurity Docs

Maintain the Cybersecurity documentation at `content/docs/cybersecurity/`.

## First step

Read `content/docs/cybersecurity/index.mdx` on activation. It is the map of the entire Cybersecurity methodology — scope, techniques, traceability, functions, templates, references, compliance, and examples. Use it to orient before making any changes.

## Fumadocs conventions

- Each folder needs a `meta.json` with `title` and `pages` array
- Omit `"index"` from `pages` array — Fumadocs uses index.mdx as the collapsible label's page
- Use `{/* */}` for comments (not HTML comments)
- Wrap short IDs in `<span style={{whiteSpace: 'nowrap'}}>...</span>` to prevent table column collapse
- Literal curly braces need `{'P'}` syntax in MDX

## Category page template

Every category page under `functions/` follows this structure:

1. Frontmatter: `title: "XX.YY: Category Name"`
2. Subcategories table (ID column links to csf.tools)
3. `## Our methodology` with subcategory-keyed sections (`### XX.YY-01: ...`)
4. Each section has a directive sentence + template table
5. `## Informative References` table at bottom

## Function folder conventions

- meta.json title prefixed with code: `"GV: Govern"`, `"ID: Identify"`, etc.
- No `"index"` in pages array

## NIST reference data

Raw subcategory definitions and implementation examples live in `content/docs/cybersecurity/references/nist-csf/`. Load the relevant function page when verifying subcategory IDs or outcome wording.
