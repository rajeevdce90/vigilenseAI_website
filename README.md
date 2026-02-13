# Vigilense AI - The Sovereign SOC

Marketing website for Vigilense AI, an autonomous SOC platform that delivers detection, investigation, and response on your data, under your control.

## Core Messaging

- **Primary**: The Sovereign SOC - your data, your infrastructure, our intelligence
- **Secondary**: BYODb (Bring Your Own Database), BYO-LLM, integrated detection engine

## Tech Stack

Pure HTML, CSS, and JavaScript. No build process required.

## File Structure

```
├── index.html                  # Homepage (Sovereign SOC landing page)
├── styles.css                  # Base structural styles
├── theme.css                   # Light theme overrides (loaded after styles.css)
├── design-tokens.css           # Color palette reference (not linked in HTML)
├── script.js                   # Navigation, interactions
├── trust.html                  # Trust Center
├── security.html               # Security page
├── privacy.html                # Privacy Policy
├── terms.html                  # Terms of Service
├── disclaimer.html             # Disclaimer
├── CNAME                       # Custom domain (vigilense.ai)
├── Vigilense Logo.png          # Brand logo
├── images/
│   └── og-preview.png          # 1200×630 Open Graph / Twitter Card preview image
└── resources/
    ├── byodb-architecture.html
    ├── byollm-guide.html
    ├── deployment-comparison.html
    ├── healthcare-case-study.html
    ├── siem-buyers-guide.html
    └── tenant-separation.html
```

## Design

- **Color palette**: Deep navy (#0A1628), electric teal (#00D4AA), warm amber (#F59E0B) on light off-white (#FAFAF8)
- **Fonts**: JetBrains Mono (headings, code), Outfit (body)
- **Theme**: Clean authority - light, editorial, premium feel

## Running Locally

Open `index.html` in a browser. No dependencies or build step needed.

## Deployment

Hosted via GitHub Pages with custom domain `vigilense.ai`.

## Link previews (Open Graph / Twitter Cards)

All pages include Open Graph and Twitter Card meta tags for rich previews when sharing links. The default preview image is `images/og-preview.png` (1200×630). Favicon links point to `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`, and `/apple-touch-icon.png`; generate these from the Vigilense logo and place them in the site root. After deploy, validate previews with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), [Twitter Card Validator](https://cards-dev.twitter.com/validator), or [opengraph.xyz](https://www.opengraph.xyz/).
