# RosterUp — Design Principles

These principles guide every visual and interaction decision across the product (web, dashboard, mobile).

## Core Principles
- **Users First**: Optimize for the most common, valuable workflows; reduce friction at every step.
- **Clarity Over Cleverness**: Favor simple, explicit UI and copy. Avoid ambiguity and hidden controls.
- **Speed & Performance**: Design for perceived and real speed. Fast paints, minimal layout shift, responsive interactions.
- **Consistency**: One visual language—colors, type, spacing, motion. Components behave the same everywhere.
- **Accessibility (WCAG 2.1 AA)**: Sufficient contrast, keyboard operability, visible focus, semantic markup.
- **Opinionated Defaults**: Provide sensible defaults to minimize decisions. Advanced options are progressively disclosed.
- **Focus & Hierarchy**: Guide attention with scale, weight, and spacing. Primary actions are unmistakable.
- **Calm Motion**: Animations are purposeful (150–300ms, ease-in-out), never distract from tasks. Honor reduced-motion.

## Interaction Tenets
- Explicit hover/active/disabled states on all interactives
- Always provide feedback: loading, success, error, and empty states
- Confirm destructive actions; enable undo when reasonable
- Respect platform conventions (web/mobile) for expected patterns

## Content & Voice
- Confident, helpful, and succinct. Sports-forward but professional.
- CTA copy communicates outcome, not action (“Create Profile” vs “Submit”).

## Implementation Guardrails
- Use tokens/utilities over “magic numbers” (see style guide)
- Prefer reusable components over ad‑hoc markup
- Test at 1440 / 768 / 375 viewports before shipping

## References
- Design Review Process: `docs/design/Design-Review-Agent-Guide.md`
- S‑Tier SaaS Checklist: `docs/design/SaaS-Dashboard-Checklist.md`
- Style Guide (tokens & patterns): `context/style-guide.md`
