# RosterUp — Brand Style Guide

This guide defines the visual system (tokens) and usage patterns for consistent UI.

## Typography
- **Font**: Inter (fallback: system-ui, -apple-system, Segoe UI, Roboto)
- **Scale** (desktop baseline):
  - H1: 48 / 56, SemiBold
  - H2: 36 / 44, SemiBold
  - H3: 28 / 36, Semibold
  - Body-L: 18 / 28, Regular
  - Body: 16 / 26, Regular
  - Caption: 14 / 22, Regular
- Use stronger weight for headers and labels; keep body comfortable (1.6 line-height average).

## Colors (Light)
- **Primary**: Blue 600 (#2563eb)
- **Accent**: Cyan 500 (#06b6d4)
- **Foreground**: Gray 900 (#111827)
- **Muted FG**: Gray 600 (#4b5563)
- **Background**: White (#ffffff)
- **Surface**: Gray 50 (#f9fafb)
- **Border**: Gray 200 (#e5e7eb)
- **Success**: Green 500 (#10b981)
- **Warning**: Amber 500 (#f59e0b)
- **Error**: Red 500 (#ef4444)

## Colors (Dark)
- **Background**: #0b0f1a
- **Surface**: #111827
- **Foreground**: #e5e7eb
- **Muted FG**: #9ca3af
- **Border**: #1f2937
- **Primary**: #3b82f6
- **Accent**: #22d3ee

Contrast must meet WCAG AA (≥ 4.5:1 for text). Avoid low-contrast pairings.

## Spacing & Grid
- **Base unit**: 8px
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- **Containers**: 1200–1280px max width; horizontal padding 16–24px on mobile, 24–32px desktop
- Maintain consistent vertical rhythm between sections (typically 64–96px depending on density).

## Border Radius
- **XS**: 4px (inputs)
- **MD**: 8px (buttons, small cards)
- **LG**: 12px (cards, modals)
- **Full**: for chips/avatars

## Components
- Buttons: primary (blue), secondary (neutral), outline, ghost, destructive
- Inputs: always labeled; helper and error text where needed
- Badges: status colors with readable foreground
- Cards: padded LG radius; use elevation sparingly
- Nav: visible focus states, active indicators, accessible contrast

## Motion
- Duration: 150–300ms; Easing: ease-in-out
- Respect `prefers-reduced-motion`
- Use for affordances (hover, press, transitions), not decoration

## Imagery
- Use next/image with responsive sizes; avoid layout shifts
- Maintain aspect ratios (16:9, 4:3) for previews

## Do / Don’t
- Do: reuse components; use tokens/utilities; keep layouts breathable
- Don’t: introduce magic spacing; stack multiple shadows; rely solely on color to convey state

## Implementation Pointers
- Tailwind tokens/utilities mapped in `apps/web/src/app/globals.css`
- Utilities: `@/lib/utils` (class merge), `@/components/ui/*` for base components
- Always check: 1440 / 768 / 375 viewports before shipping
