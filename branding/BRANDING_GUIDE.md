# Vigilense AI - Branding & Design System Guide

> Use this document as a reference when building any Vigilense AI software so the UI matches the website's look, feel, and identity. Feed this entire `branding/` folder into Cursor AI as context.

---

## 1. Brand Identity

- **Full name:** Vigilense AI
- **Short name:** Vigilense
- **Tagline:** The Sovereign SOC
- **Positioning:** BYODb SIEM + Autonomous AI SOC Analyst
- **Design philosophy:** "Technical Brutalism" — clean, sharp, engineering-grade aesthetic. Confident, minimal, no unnecessary decoration. The design says "we build serious security infrastructure."

---

## 2. Logo Usage

| File | Purpose |
|------|---------|
| `logos/vigilense-logo.png` | Primary logo (used in navbar, hero sections) |
| `logos/vigilense_logo.png` | Alternative logo variant |
| `icons/favicon.svg` | SVG favicon (scalable) |
| `icons/favicon.ico` | ICO favicon (legacy browsers) |
| `icons/favicon-96x96.png` | PNG favicon 96x96 |
| `icons/apple-touch-icon.png` | Apple touch icon 180x180 |
| `icons/web-app-manifest-192x192.png` | PWA icon 192x192 |
| `icons/web-app-manifest-512x512.png` | PWA icon 512x512 |

### Logo text treatment
When the logo is rendered as text (e.g., in navbars):
- **"Vigilense"** = white (on dark backgrounds) or navy `#0A1628` (on light backgrounds)
- **"AI"** = accent teal `#00D4AA`
- Font: JetBrains Mono, 700 weight, 1.1rem

---

## 3. Color Palette

### Primary Brand Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Accent Teal** | `#00D4AA` | rgb(0, 212, 170) | Primary accent, CTA highlights, brand color |
| **Accent Teal Hover** | `#33E0BB` | rgb(51, 224, 187) | Hover state for teal elements |
| **Accent Teal Dim** | `#00B892` | rgb(0, 184, 146) | Links, subtle accent |
| **Navy** | `#0A1628` | rgb(10, 22, 40) | Primary dark, headings, navbar, footer |
| **Navy Light** | `#0F1E36` | rgb(15, 30, 54) | Hover state for navy, secondary dark |
| **Light Blue** | `#38BDF8` | rgb(56, 189, 248) | Progress indicators, secondary accent |
| **Light Blue Dim** | `#7DD3FC` | rgb(125, 211, 252) | Softer blue accent |

### Backgrounds (Light Theme — Website Default)

| Name | Hex | Usage |
|------|-----|-------|
| **BG Primary** | `#FAFAF8` | Page background |
| **BG Secondary** | `#F2F5F7` | Alternate sections, hero backgrounds |
| **BG Tertiary** | `#E2E8F0` | Heavier background areas |
| **BG Card** | `#FFFFFF` | Cards, panels, modals |

### Text Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Text Primary** | `#0F1419` | Main body text |
| **Text Secondary** | `#475569` | Subtitles, descriptions, supporting text |
| **Text Muted** | `#94A3B8` | Placeholders, de-emphasized text |

### Border Colors

| Name | Value | Usage |
|------|-------|-------|
| **Border Default** | `#E2E8F0` | Card borders, section dividers |
| **Border Light** | `rgba(226, 232, 240, 0.6)` | Subtle separators |
| **Border Accent** | `rgba(0, 212, 170, 0.3)` | Accent-highlighted borders |

### Glow / Shadow Effects

| Name | Value | Usage |
|------|-------|-------|
| **Accent Glow** | `rgba(0, 212, 170, 0.08)` | Subtle teal glow background |
| **Accent Glow Strong** | `rgba(0, 212, 170, 0.15)` | Stronger teal glow |
| **Light Blue Glow** | `rgba(56, 189, 248, 0.1)` | Blue glow for progress states |
| **Card Shadow** | `0 1px 3px rgba(0, 0, 0, 0.04)` | Default card shadow |
| **Elevation Shadow** | `0 4px 40px rgba(10, 22, 40, 0.08)` | Elevated elements |
| **Strong Shadow** | `0 8px 60px rgba(10, 22, 40, 0.12)` | Modals, dropdowns |

### Status Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Success/Compliant** | `#16A34A` | Compliant badges, success states |
| **Progress/Info** | `#38BDF8` | In-progress states |

### Dark Section Colors (Navy Backgrounds)

Used for feature sections, navbar, and footer:

| Element | Color |
|---------|-------|
| Background | `#0A1628` (navy) |
| Heading text | `#FFFFFF` |
| Body text | `rgba(255, 255, 255, 0.7)` |
| Muted text | `rgba(255, 255, 255, 0.6)` |
| Strong/emphasis | `#FFFFFF` |
| Accent emphasis | `#00D4AA` |
| Borders | `rgba(255, 255, 255, 0.08)` - `rgba(255, 255, 255, 0.1)` |
| Card backgrounds | `rgba(255, 255, 255, 0.03)` |

---

## 4. Typography

### Font Stack

| Role | Font Family | Fallback |
|------|-------------|----------|
| **Headings** | JetBrains Mono | Space Mono, monospace |
| **Body** | Outfit | -apple-system, sans-serif |
| **Code / Mono** | JetBrains Mono | Space Mono, monospace |
| **Display (feature sections)** | Syne | sans-serif |

### Google Fonts Import

```
https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap
```

### Font Weights Used

| Font | Weights |
|------|---------|
| JetBrains Mono | 400, 500, 600, **700** |
| Outfit | 300, 400, 500, 600, 700, 800, 900 |
| Space Mono | 400, 700 |
| Syne | 400, 500, 600, 700, 800 |

### Heading Hierarchy

| Level | Size | Line Height | Additional |
|-------|------|-------------|------------|
| **h1** | `clamp(2rem, 5vw, 3.5rem)` | 1.1 | JetBrains Mono, 700, letter-spacing: -0.02em |
| **h2** | `clamp(1.5rem, 3.5vw, 2.5rem)` | 1.2 | JetBrains Mono, 700, letter-spacing: -0.02em |
| **h3** | `clamp(1.1rem, 2vw, 1.4rem)` | default | JetBrains Mono, 700, letter-spacing: -0.02em |
| **Body** | 1rem (16px) | 1.6 | Outfit, regular |
| **Small/Tags** | 0.75rem - 0.85rem | — | JetBrains Mono, 600, uppercase, letter-spacing: 0.15em |

### Heading Color
- On light backgrounds: Navy `#0A1628`
- On dark backgrounds: White `#FFFFFF`

---

## 5. Component Patterns

### Buttons

**Primary Button (Navy):**
```css
background: #0A1628;
color: #FFFFFF;
font-family: 'JetBrains Mono', monospace;
font-size: 0.85rem;
font-weight: 700;
padding: 12px 28px;
border: none;
cursor: pointer;
/* Hover: */
background: #0F1E36;
box-shadow: 0 4px 20px rgba(10, 22, 40, 0.3);
```

**Secondary Button (Outline):**
```css
background: transparent;
color: #0A1628;
border: 2px solid #0A1628;
font-family: 'JetBrains Mono', monospace;
font-size: 0.85rem;
font-weight: 600;
padding: 12px 28px;
/* Hover: */
background: #0A1628;
color: #FFFFFF;
```

**Nav CTA Button (Teal):**
```css
background: #00D4AA;
color: #0A1628;
font-weight: 700;
padding: 8px 20px;
border-radius: 4px;
/* Hover: */
background: #33E0BB;
box-shadow: 0 4px 16px rgba(0, 212, 170, 0.3);
```

**Large variant:** `padding: 16px 36px; font-size: 0.9rem;`

### Cards

```css
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 8px; /* --radius-sm */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
/* Hover: */
border-color: #0A1628;
```

Card headings: Navy `#0A1628`, JetBrains Mono
Card body text: `#475569`

### Section Tags (Labels)

```css
display: inline-block;
font-family: 'JetBrains Mono', monospace;
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.15em;
color: #FFFFFF;
background: #0A1628;
padding: 5px 14px;
margin-bottom: 16px;
```

### Navigation Bar

```css
background: #0A1628;
backdrop-filter: blur(12px);
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
position: fixed;
height: 64px;
padding: 0 24px;
```

Nav links: `rgba(255, 255, 255, 0.7)`, JetBrains Mono, 0.8rem, 500 weight
Nav links hover/active: `#FFFFFF`

### Footer

```css
background: #0A1628;
color: rgba(255, 255, 255, 0.7);
border-top: 1px solid rgba(0, 212, 170, 0.15);
```

Footer headings: `#FFFFFF`
Footer links: `rgba(255, 255, 255, 0.5)`, hover `#00D4AA`

---

## 6. Spacing & Layout

| Token | Value |
|-------|-------|
| **Container max-width** | 1200px |
| **Container padding** | 0 24px (mobile: 0 16px) |
| **Section padding** | 100px 0 (vertical) |
| **Card gap (grids)** | 24px |
| **Border radius - small** | 8px |
| **Border radius - medium** | 12px |
| **Border radius - large** | 16px |
| **Border radius - xl** | 24px |
| **Default transition** | 0.3s ease or 0.2s |

---

## 7. Design Patterns & Conventions

### General Rules
- **No rounded corners on buttons** — buttons are squared/minimal (except nav CTA which uses 4px)
- **Monospace headings everywhere** — every heading uses JetBrains Mono. This is the signature visual trait.
- **Navy-on-white** is the default pairing for light sections
- **White-on-navy** for dark feature sections
- **Teal accent is used sparingly** — for CTAs, links, highlighted keywords, and the "AI" in the brand name
- **No gradients** on light sections. Clean, flat backgrounds.
- **Subtle shadows only** — avoid heavy drop shadows

### Dark Sections
Navy background sections are used for:
- Feature explanations
- Vendor comparison areas
- Narrative/story sections

These use: `rgba(255, 255, 255, 0.03)` for inner card backgrounds and `rgba(255, 255, 255, 0.08)` for borders.

### Accent Highlight Patterns
- `.accent-text`: Teal `#00D4AA`, font-weight 600
- `.navy-highlight`: Navy `#0A1628`, font-weight 700
- `.navy-mark`: Navy background, white text, padding `1px 8px` (inline highlight)

### Brand Name Display
When showing "Vigilense AI" in text:
```html
<span class="brand-name">
  <span class="vigilense">Vigilense</span>
  <span class="ai"> AI</span>
</span>
```
- "Vigilense" = navy or white depending on background
- "AI" = teal `#00D4AA`

---

## 8. CSS Variables Quick Reference

Copy these into any new project to instantly match the website:

```css
:root {
    /* Brand */
    --accent: #00D4AA;
    --accent-dim: #00B892;
    --accent-hover: #33E0BB;
    --accent-glow: rgba(0, 212, 170, 0.08);
    --accent-glow-strong: rgba(0, 212, 170, 0.15);
    --navy: #0A1628;
    --navy-light: #0F1E36;
    --light-blue: #38BDF8;
    --light-blue-dim: #7DD3FC;
    --light-blue-glow: rgba(56, 189, 248, 0.1);

    /* Backgrounds */
    --bg-primary: #FAFAF8;
    --bg-secondary: #F2F5F7;
    --bg-tertiary: #E2E8F0;
    --bg-card: #FFFFFF;

    /* Text */
    --text-primary: #0F1419;
    --text-secondary: #475569;
    --text-muted: #94A3B8;

    /* Borders */
    --border: #E2E8F0;
    --border-light: rgba(226, 232, 240, 0.6);
    --border-accent: rgba(0, 212, 170, 0.3);

    /* Shadows */
    --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04);
    --shadow-elevated: 0 4px 40px rgba(10, 22, 40, 0.08);
    --shadow-strong: 0 8px 60px rgba(10, 22, 40, 0.12);

    /* Radii */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;

    /* Fonts */
    --font-mono: 'JetBrains Mono', 'Space Mono', monospace;
    --font-body: 'Outfit', -apple-system, sans-serif;
    --font-display: 'Syne', sans-serif;

    /* Transition */
    --transition: 0.3s ease;
}
```

---

## 9. Images Included

| File | Description |
|------|-------------|
| `images/og-image.png` | Open Graph social preview image (1200x630) |
| `images/og-preview.jpg` | Alternative social preview |
| `images/Vigilense photo.png` | Brand photo |

---

## 10. PWA / Manifest Theme

```json
{
    "theme_color": "#0A1628",
    "background_color": "#0A1628"
}
```

---

## 11. Implementation Checklist for Software

When building the Vigilense AI software, ensure:

- [ ] Import Google Fonts: JetBrains Mono, Outfit, Syne
- [ ] Use JetBrains Mono for ALL headings and labels (this is the brand's visual signature)
- [ ] Use Outfit for body text
- [ ] Apply the CSS variables from Section 8
- [ ] Navbar: navy background, fixed position, 64px height
- [ ] Primary buttons: navy background, monospace font, no border-radius
- [ ] Accent teal (`#00D4AA`) for CTAs, active states, and links
- [ ] Cards: white bg, `#E2E8F0` border, hover turns border navy
- [ ] Section tags/labels: navy bg, white uppercase monospace text
- [ ] Footer: navy bg, teal accent border-top
- [ ] "Vigilense" in navy/white, "AI" always in teal
- [ ] Keep the design clean, flat, engineering-grade — no flashy gradients or heavy decoration
- [ ] Use the favicon.svg for browser tab icon
- [ ] Match light theme as default (dark navy sections for emphasis only)
