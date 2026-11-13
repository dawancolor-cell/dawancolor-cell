# DAWAN profile assets

## Visual direction

The DAWAN master identity uses a restrained hybrid-luxury palette:
- Midnight Navy — `#07121C`
- Deep Petrol Teal — `#082F34`
- Aurora Cyan — `#13C5C2`
- Champagne Gold — `#D8C69A`
- Warm Ivory — `#F5F3EA`
- Slate Grey — `#94A3B8`

The visual language prioritizes editorial typography, generous negative space, precise alignment and purposeful motion. Glow, particles and gradients remain secondary details rather than the main event.

## Published assets

- `assets/wordmark.svg` — DAWAN master wordmark.
- `assets/portrait-original.jpg` — original founder portrait; preserved unchanged.
- `assets/typography-motion.svg` and `assets/typography-motion.gif` — DAWAN kinetic typography banner.
- `assets/work-showcase.svg` and `assets/work-showcase.gif` — selected ventures: NextBorder, NextBorder Import and Dawan Trade Link.
- `assets/nextborder-founder-motion.svg` and `assets/nextborder-founder-motion.gif` — Next Border founder identity panel.

## Selected ventures content rules

Only projects and business initiatives supported by verified repository or website information are presented. NextBorder and NextBorder Import link to their existing public repositories; Dawan Trade Link is identified as a business initiative without inventing a public repository URL.

## Brand relationship

DAWAN is the master personal identity. The Next Border founder panel remains a distinct company sub-brand asset and may retain its own company-specific motion accents. This prevents the personal and business identities from becoming visually indistinguishable.

## Rendering

SVG files are the editable motion sources. GitHub Actions renders the DAWAN typography, selected ventures and Next Border founder panels as optimized GIFs at 8 fps for README compatibility. The renderer uses a pinned Playwright version and publishes generated assets to the branch that triggered the workflow.

## GitHub platform boundary

GitHub Profile README does not provide a normal custom website runtime. Arbitrary page-level CSS, JavaScript, WebGL and scroll-controlled animation are not available. The profile uses supported Markdown, HTML fragments and self-contained image assets instead.

The native GitHub contribution graph and activity timeline are controlled by GitHub and cannot be restyled by the README.
