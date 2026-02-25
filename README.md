# Kilpi

Documentation site for the Kilpi security methodology — a practical framework for applying NIST CSF 2.0 to software products and organisations.

## What this is

Kilpi provides structured templates and conventions for security assessments at two levels:

- **Organisation level** — covers all 6 NIST CSF 2.0 functions: Govern, Identify, Protect, Detect, Respond, Recover
- **Component level** — covers Identify, Protect, and Detect for individual products and system components (inherits Govern, Respond, Recover from the org)

The site includes methodology docs, ID conventions, compliance templates, and worked examples.

## Tech stack

- Next.js 16 + React 19
- Fumadocs for documentation UI
- Tailwind CSS
- TypeScript

## Development

```bash
pnpm install
pnpm dev
```

## Related

- [kilpi-skills](https://github.com/saari-ai/kilpi-skills) — Claude Code plugin that guides users through Kilpi assessments interactively
