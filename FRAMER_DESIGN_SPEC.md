# Acira - Framer Design Specification

A comprehensive guide for building the Acira landing page in Framer, with Framer-inspired animations and modern SaaS aesthetics.

---

## Design Philosophy

- **Calm & Professional**: Neutral backgrounds, generous whitespace, restrained motion
- **Typography-First**: Strong hierarchy, clean sans-serif fonts
- **Accent Sparingly**: Color only for CTAs and key highlights
- **Flat & Minimal**: No bubbly buttons, no heavy glassmorphism
- **Slow Motion**: Animations are subtle and purposeful (400-800ms)

---

## 1. Design Tokens

### Colors

```
Neutral Scale:
- White: #FFFFFF
- Gray 50: #FAFAFA (subtle backgrounds)
- Gray 100: #F5F5F5 (muted backgrounds)
- Gray 200: #E5E5E5 (borders)
- Gray 300: #D4D4D4
- Gray 400: #A3A3A3 (muted text)
- Gray 500: #737373
- Gray 600: #525252 (secondary text)
- Gray 700: #404040
- Gray 800: #262626
- Gray 900: #171717 (primary text)
- Black: #0A0A0A (backgrounds in dark mode)

Accent Colors (use sparingly):
- Blue: #0D52FF (primary accent)
- Cyan: #00B4D8 (gradient end)
- Gradient: linear-gradient(135deg, #0D52FF 0%, #00B4D8 100%)
```

### Typography

```
Font Family: Inter (or SF Pro Display as fallback)

Scale:
- XS: 12px / 1.5 line-height
- SM: 14px / 1.5 line-height
- Base: 16px / 1.6 line-height
- LG: 18px / 1.7 line-height
- XL: 20px / 1.5 line-height
- 2XL: 24px / 1.4 line-height
- 3XL: 32px / 1.2 line-height
- 4XL: 40px / 1.1 line-height
- 5XL: 48px / 1.1 line-height
- 6XL: 60px / 1.05 line-height

Weights:
- Regular: 400 (body text)
- Medium: 450-500 (nav links, buttons)
- Semibold: 600 (headings, emphasis)
- Bold: 700 (stats, numbers)

Letter Spacing:
- Headings: -0.02em to -0.03em (tight)
- Body: 0 (default)
- Labels: 0.05em to 0.1em (uppercase labels)
```

### Spacing System

```
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
32: 128px
```

### Border Radius

```
SM: 4px (inputs, small elements)
MD: 6px (buttons, cards)
LG: 8px (cards, containers)
XL: 12px (large cards, modals)
Full: 9999px (pills, badges)
```

### Shadows (Minimal)

```
SM: 0 1px 2px rgba(0, 0, 0, 0.04)
MD: 0 2px 8px rgba(0, 0, 0, 0.06)
LG: 0 4px 16px rgba(0, 0, 0, 0.08)
XL: 0 8px 32px rgba(0, 0, 0, 0.1)
```

### Animation

```
Easing: cubic-bezier(0.25, 0.1, 0.25, 1) - smooth, professional
Duration Fast: 200ms (hovers, small interactions)
Duration Base: 400ms (most transitions)
Duration Slow: 600ms (section reveals)
Duration Slower: 800ms (hero animations)
```

---

## 2. Section Specifications

### 2.1 Navbar (Sticky)

**Structure:**
```
Stack (horizontal) - justify: space-between, align: center
├── Logo (link)
│   ├── Icon (24x24px)
│   └── Text "Acira" (18px, semibold)
├── Nav Links (hidden on mobile)
│   ├── Features
│   ├── FAQ
│   └── Contact
└── Actions
    ├── Theme Toggle (36x36px circle button)
    └── CTA Button "Get Early Access"
```

**Framer Settings:**
- Height: 64px
- Position: Sticky top
- Background: White @ 92% opacity
- Backdrop Filter: blur(8px)
- Border Bottom: 1px solid Gray 100
- On scroll: Background becomes 98% opacity, border darkens

**CTA Button Style:**
- Padding: 8px 16px
- Background: Gray 900 (solid black)
- Text: White, 14px, medium weight
- Border Radius: 6px
- Hover: opacity 0.85, translateY(-1px)

---

### 2.2 Hero Section

**Structure:**
```
Stack (horizontal on desktop, vertical on mobile)
├── Content Column (max-width: 560px)
│   ├── Badge (pill)
│   ├── Title (H1)
│   ├── Description
│   ├── CTA Buttons Row
│   └── Stats Row
└── Visual Column
    └── Laptop Mockup with Demo Animation
```

**Badge:**
- Padding: 8px 16px
- Background: Gray 50
- Border: 1px solid Gray 200
- Border Radius: full (pill)
- Text: 12px, uppercase, letter-spacing 0.05em
- Includes pulsing blue dot (6px, 3s animation)

**Title:**
- Size: clamp(32px, 5vw, 48px)
- Weight: 600
- Letter Spacing: -0.03em
- Rotating words: gradient text, slow fade (4s interval, 600ms transition)

**Description:**
- Size: 18px
- Color: Gray 600
- Max Width: 480px
- Line Height: 1.7

**Primary Button:**
- Padding: 16px 24px
- Background: Gray 900
- Text: White, 16px, medium
- Border Radius: 6px
- Includes arrow icon (16px)
- Hover: opacity 0.85, translateY(-2px), shadow LG

**Secondary Button:**
- Padding: 16px 24px
- Background: transparent
- Border: 1px solid Gray 200
- Text: Gray 900, 16px, medium
- Hover: border Gray 500, background Gray 50

**Stats Row:**
- Border Top: 1px solid Gray 200
- Padding Top: 32px
- Gap: 32px (horizontal)
- Stat Value: 24px, semibold
- Stat Label: 14px, Gray 400

**Laptop Mockup:**
- Max Width: 600px
- 3D Transform: rotateX(5deg) rotateY(-8deg)
- Animation: slow float (8s, ease-in-out, translateY 8px)
- Screen: 16:10 aspect ratio, dark background
- Demo: cycling text (24s total, 4s per message)

---

### 2.3 Integrations Marquee

**Structure:**
```
Section (padding: 64px 0)
├── Label "Works with your favorite apps"
└── Marquee Container
    └── Track (infinite horizontal scroll, 40s duration)
        └── Integration Items (duplicated for seamless loop)
```

**Settings:**
- Background: Gray 50
- Border Top/Bottom: 1px solid Gray 100
- Mask: gradient fade on edges (10% transparent)

**Integration Item:**
- Padding: 12px 20px
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 8px
- Gap: 12px (icon + text)
- Icon: 20px, Gray 400 (colored on hover)
- Text: 14px, Gray 600, medium

---

### 2.4 Problems Section

**Structure:**
```
Section
├── Header (centered, max-width 720px)
│   ├── Label "The Problem"
│   ├── Title
│   └── Description
└── Scrolling Pills Container
    ├── Track 1 (left scroll, 30s)
    ├── Track 2 (right scroll, 35s)
    └── Track 3 (left scroll, 30s)
```

**Problem Pill:**
- Padding: 12px 20px
- Background: White
- Border: 1px solid Gray 200
- Border Radius: full (pill)
- Text: 14px, Gray 600
- Question mark: Gray 400, 600 weight

---

### 2.5 Features Bento Grid

**Structure:**
```
Section (background: Gray 50)
├── Header (centered)
└── Bento Grid
    ├── Large Card (spans 2 columns) - Dashboard mockup
    ├── Regular Card - Device icons
    ├── Regular Card - Stats
    └── Large Card (spans 2 columns) - Flow visualization
```

**Grid Settings:**
- Columns: 3 on desktop, 2 on tablet, 1 on mobile
- Gap: 16px

**Bento Card:**
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 12px
- Padding: 32px
- Hover: border Gray 500, translateY(-4px), shadow LG

**Visual Area:**
- Height: 160px (200px for large cards)
- Background: Gray 100
- Border Radius: 8px
- Contains mockups, icons, or stats

---

### 2.6 Why Acira (Editorial Cards)

**Structure:**
```
Section
├── Header
└── Grid (2fr 1fr 1fr on desktop)
    ├── Large Card - Real-time Fixes
    ├── Card - AI Intelligence
    └── Card - Privacy First
```

**Image Card:**
- Aspect Ratio: 4:3 (16:9 on mobile)
- Border Radius: 12px
- Image: grayscale(20%), colored on hover
- Overlay: gradient from black (70% opacity) to transparent
- Content: positioned at bottom with padding 24px

**Overlay Content:**
- Icon: 40x40px, white on blurred background
- Title: 18px, white, semibold
- Description: 14px, white @ 80% opacity

---

### 2.7 FAQ Accordion

**Structure:**
```
Section (background: Gray 50)
├── Header
└── FAQ List (max-width: 720px, centered)
    └── FAQ Items (stacked, gap 12px)
```

**FAQ Item:**
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 8px
- Hover: border Gray 500

**Question Button:**
- Padding: 20px 24px
- Text: 16px, medium weight
- Chevron: 20px, Gray 400, rotates 180deg when open

**Answer:**
- Max Height: 0 → 300px (animated)
- Padding: 0 24px 20px (when open)
- Text: 14px, Gray 600, line-height 1.7

---

### 2.8 CTA Section

**Structure:**
```
Section
└── CTA Card (centered, max-width: 800px)
    ├── Title
    ├── Description
    └── Primary Button (gradient background)
```

**CTA Card:**
- Padding: 64px 32px
- Background: Gray 50
- Border: 1px solid Gray 200
- Border Radius: 12px
- Text Align: center

**Gradient Button (for CTA only):**
- Background: linear-gradient(135deg, #0D52FF, #00B4D8)
- Hover: opacity 0.9

---

### 2.9 Contact Section

**Structure:**
```
Section (background: Gray 50)
└── Grid (2 columns on desktop)
    ├── Info Column
    │   ├── Label + Title
    │   ├── Description
    │   └── Email with icon
    └── Form Column
        └── Form Card
            ├── Name Input
            ├── Email Input
            ├── Message Textarea
            └── Submit Button
```

**Form Card:**
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 12px
- Padding: 32px

**Input Fields:**
- Padding: 12px 16px
- Border: 1px solid Gray 200
- Border Radius: 6px
- Focus: border Blue
- Placeholder: Gray 400

---

### 2.10 Footer

**Structure:**
```
Footer
├── Grid (3 columns: 2fr 1fr 1fr)
│   ├── Brand Column (logo + tagline)
│   ├── Product Links
│   └── Company Links
└── Bottom Row
    ├── Copyright
    └── Back to Top Button
```

**Footer Links:**
- Size: 14px
- Color: Gray 600, hover Gray 900
- Gap: 12px vertical

**Back to Top:**
- Text button with chevron icon
- Color: Gray 600, hover Gray 900

---

## 3. Responsive Breakpoints

```
Mobile: < 640px
- Single column layouts
- Navbar: hide nav links, keep CTA
- Hero stats: vertical stack
- Bento: 1 column
- Footer: single column

Tablet: 640px - 1024px
- Bento: 2 columns
- Contact: 2 columns

Desktop: > 1024px
- Hero: 2 column grid
- Bento: 3 columns
- Why grid: 2fr 1fr 1fr
```

---

## 4. Animation Guidelines

### Enter Animations (on scroll into view)
- Delay: 0-500ms staggered
- Duration: 600ms
- Easing: cubic-bezier(0.25, 0.1, 0.25, 1)
- Transform: translateY(30px) → translateY(0)
- Opacity: 0 → 1

### Hover States
- Duration: 200-400ms
- Scale: max 1.02 (subtle)
- TranslateY: max -4px (subtle lift)
- Use shadows sparingly

### Rotating Text
- Interval: 4000ms
- Transition: 600ms
- Vertical slide with fade

### Marquees
- Duration: 30-40s
- Linear easing
- Seamless loop (duplicate content)

### Accordion
- Duration: 400ms
- Ease: cubic-bezier(0.25, 0.1, 0.25, 1)
- Chevron rotation: 180deg

---

## 5. Dark Mode

Apply these overrides:
```
Background: #0A0A0A
Subtle BG: #171717
Muted BG: #262626
Text: #F5F5F5
Secondary Text: #A3A3A3
Muted Text: #737373
Border: #262626
Subtle Border: #171717
```

Images: add slight brightness reduction (0.95)
Keep accent colors the same (blue/cyan)

---

## 6. Framer-Specific Tips

1. **Use Stacks** for all layouts - easier responsiveness
2. **Create Color Styles** matching the token system
3. **Use Effects** for hover states with Variants
4. **Scroll-based Animations** via Framer's scroll property
5. **Responsive** - use breakpoint variants on frames
6. **Code Overrides** for rotating text and counters
7. **Assets** - import SVG icons as components
8. **Marquee** - use Framer's built-in scroll component or code override

---

## 7. File Structure Recommendation

```
/Acira
├── /Components
│   ├── Navbar
│   ├── Button (Primary, Secondary variants)
│   ├── Badge
│   ├── Card (Bento, Why, FAQ variants)
│   ├── Input
│   └── Icons (set)
├── /Sections
│   ├── Hero
│   ├── Integrations
│   ├── Problems
│   ├── Features
│   ├── Why
│   ├── FAQ
│   ├── CTA
│   ├── Contact
│   └── Footer
├── /Overrides
│   ├── RotatingText.tsx
│   ├── Counter.tsx
│   └── Marquee.tsx
└── Home (main page)
```

---

This specification provides everything needed to rebuild Acira in Framer with Bird.com's professional, calm aesthetic.
