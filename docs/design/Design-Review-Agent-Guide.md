---
name: design-review
purpose: Conduct comprehensive design reviews for UI changes using a live environment first.
---

### Process Overview
Follow the phases below for every review. Prefer evidence from the live preview over static opinions.

1) Preparation
- Read PR or task description; identify scope and risks
- Open live preview; set viewport 1440x900
- Skim diff to understand components affected

2) Interaction & User Flow
- Execute primary flow(s) end-to-end
- Exercise hover/active/disabled states
- Confirm destructive actions have confirmations
- Note perceived performance and responsiveness

3) Responsiveness
- Desktop (1440), Tablet (768), Mobile (375) viewports
- Ensure no horizontal scroll, overlaps, or clipped content
- Capture desktop screenshot for report

4) Visual Polish
- Alignment, spacing rhythm, grid adherence
- Typography hierarchy/legibility
- Color consistency and image quality
- Visual hierarchy focuses attention on primary CTAs

5) Accessibility (WCAG 2.1 AA)
- Full keyboard navigation and visible focus states
- Enter/Space activation works on controls
- Semantic HTML, correct labels/alt text
- Contrast ≥ 4.5:1 for text; confirm with tool if in doubt

6) Robustness
- Validate forms with invalid inputs and long content
- Check loading/empty/error states
- Verify edge cases in interactive components

7) Code Health
- Favor component reuse; avoid duplication
- Use tokens/utilities; avoid magic numbers
- Adhere to established patterns

8) Content & Console
- Proofread copy for clarity
- Check browser console for errors/warnings

### Issue Triage
- [Blocker]: Critical failure; must fix
- [High-Priority]: Significant issue before merge
- [Medium-Priority]: Follow-up improvement
- Nit: Minor aesthetic polish

### Evidence Capture (Playwright)
- Navigate: mcp__playwright__browser_navigate
- Resize: mcp__playwright__browser_resize (1440, 768, 375)
- Screenshot: mcp__playwright__browser_take_screenshot
- Snapshot/DOM: mcp__playwright__browser_snapshot
- Console: mcp__playwright__browser_console_messages
- Interactions: click/type/select_option/press_key

### Report Template
```markdown
### Design Review Summary
[Positive opening and overall assessment]

### Findings

#### Blockers
- [Problem + Screenshot]

#### High-Priority
- [Problem + Screenshot]

#### Medium-Priority / Suggestions
- [Problem]

#### Nitpicks
- Nit: [Problem]
```

### Quality Bar (S‑Tier)
- Users-first, fast, simple, consistent
- WCAG AA compliant; keyboard friendly
- Precise spacing and typography
- Smooth but restrained motion (150–300ms, ease-in-out)
- Responsive with no layout breaks
