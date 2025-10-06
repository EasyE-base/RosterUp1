# RosterUp Style Guide

## Brand Identity
Clean, modern, athletic. Think Apple meets Nike - premium sports technology.

## Color Palette

### Primary Colors
- **Pure Black**: #000000 - Headlines, primary text
- **Pure White**: #FFFFFF - Backgrounds, reversed text
- **Apple Blue**: #0071E3 - Primary CTAs, links, active states

### Grays (Apple-inspired)
- **Gray 50**: #F5F5F7 - Subtle backgrounds
- **Gray 100**: #E8E8ED - Borders, dividers
- **Gray 200**: #D2D2D7 - Disabled states
- **Gray 400**: #86868B - Secondary text
- **Gray 600**: #424245 - Dark backgrounds
- **Gray 900**: #1D1D1F - Near black

### Accent Colors
- **Athletic Orange**: #FF6B35 - Energy, sport elements (use sparingly)
- **Success Green**: #34C759 - Positive states
- **Warning Red**: #FF3B30 - Errors, urgent

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif;
```

### Type Scale
- **Hero**: 80px (5rem) - Landing page hero only
- **Display**: 64px (4rem) - Major section headers
- **Title 1**: 48px (3rem) - Page titles
- **Title 2**: 40px (2.5rem) - Section headers
- **Title 3**: 32px (2rem) - Card headers
- **Large**: 21px (1.3125rem) - Intro text
- **Body**: 17px (1.0625rem) - Default text
- **Small**: 14px (0.875rem) - Captions, metadata
- **Micro**: 12px (0.75rem) - Legal, timestamps

### Font Weights
- **Light**: 300 - Large display text only
- **Regular**: 400 - Body text
- **Medium**: 500 - UI elements, buttons
- **Semibold**: 600 - Emphasis, small headers
- **Bold**: 700 - Headlines

### Line Heights
- Headlines: 1.1
- Body text: 1.5
- UI elements: 1.2

## Spacing System

### Base Unit: 4px
- **0**: 0px
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **5**: 20px
- **6**: 24px
- **8**: 32px
- **10**: 40px
- **12**: 48px
- **16**: 64px
- **20**: 80px
- **24**: 96px
- **32**: 128px

### Container Widths
- **Max Width**: 1200px
- **Content Width**: 980px
- **Narrow Width**: 720px

### Standard Padding
- Mobile: 20px
- Tablet: 40px
- Desktop: 80px

## Components

### Buttons
- **Height**: 48px (mobile), 44px (desktop)
- **Padding**: 20px horizontal
- **Border Radius**: 24px (pill shape)
- **Font**: 17px medium
- **Transition**: all 0.3s ease

### Cards
- **Background**: White
- **Border**: None (use shadow)
- **Shadow**: 0 2px 8px rgba(0,0,0,0.04)
- **Hover Shadow**: 0 8px 24px rgba(0,0,0,0.08)
- **Radius**: 12px
- **Padding**: 32px

### Navigation
- **Height**: 48px
- **Background**: rgba(255,255,255,0.8) + backdrop-blur
- **Border**: 1px solid rgba(0,0,0,0.04)

## Animation

### Timing Functions
- **Default**: cubic-bezier(0.25, 0.1, 0.25, 1)
- **Spring**: cubic-bezier(0.68, -0.55, 0.265, 1.55)

### Durations
- **Fast**: 0.15s - Hovers, small transitions
- **Normal**: 0.3s - Most animations
- **Slow**: 0.5s - Page transitions

## Imagery
- High-quality photography only
- Prefer conceptual over literal
- Light, bright, optimistic tone
- Subtle gradients over solid colors
- No stock photography clichés

## Iconography
- **Style**: SF Symbols aesthetic
- **Weight**: 2px strokes
- **Size**: 24px standard, 20px small, 32px large
- **Color**: Inherit from text

## Voice & Tone
- **Clear**: No jargon, straight talk
- **Confident**: We know sports
- **Inspiring**: Elevate the game
- **Friendly**: Approachable, not corporate
