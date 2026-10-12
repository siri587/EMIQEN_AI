# Website Structure and UX Specification

## Overall experience
Create an original premium AI product website informed by the information architecture of https://www.sarvam.ai/: strong hero, clear product explanation, capability blocks, workflow storytelling, use cases, trust-conscious positioning, and a direct contact CTA. Do not reproduce its exact layout or copy.

## Recommended sitemap
For the initial release, a single-page landing site is sufficient:
- `/` — Hero, challenge, platform, workflow, use cases, differentiators, product status, contact CTA.
- Optional later pages: `/privacy`, `/terms`, `/contact` only when real content and approved contact details are available.

## Header
- Left: EMIQEN logo and/or wordmark.
- Navigation anchors: Platform, How it works, Use cases, About, Contact.
- Right: primary “Talk to our team” CTA.
- Sticky header is optional; if used, keep it compact and ensure anchor targets are not obscured.

## Hero
- Large concise headline and supporting paragraph.
- Primary and secondary CTAs.
- On the right or below, create a custom abstract voice/text visual or restrained product-interface illustration.
- Do not fabricate a live playground, dashboard metrics, customer logo wall, or demo transcript that looks like a real customer interaction.
- Clearly identify any prototype mockup as illustrative.

## Main sections
1. Challenge / context.
2. Platform capabilities (3–6 cards).
3. How it works (4-step flow).
4. Example use cases (3–4 cards).
5. Differentiators.
6. Development status / responsible claims.
7. Contact CTA.
8. Footer.

## Interaction behavior
- Header links scroll to the correct section.
- Mobile navigation opens, closes, and is keyboard accessible.
- CTA scrolls to contact or opens a configured contact channel.
- Contact form validates required fields and email format. If no backend exists, do not fake a successful submission; show a clear message that submission requires configuration, or use an approved mailto fallback.
- Any microphone control shown in a mockup must be clearly illustrative unless actual recording and transcription are implemented.
- Cards may have small hover states but should not look clickable unless they are interactive.

## Responsive layout
- Mobile: single column, short hero copy, full-width CTA buttons if useful, compact navigation, no horizontal overflow.
- Tablet: 2-column card layout where appropriate.
- Desktop: constrained content width, hero split layout, 3-column cards where readable.
- Large screens: avoid excessively wide paragraphs and oversized empty space.

## Accessibility and quality
- Semantic landmarks and ordered heading levels.
- Keyboard-accessible controls and visible focus indicators.
- WCAG-conscious contrast using the provided palette.
- Reduced-motion support.
- Descriptive image alt text; decorative visuals hidden from assistive technology.
- Form labels, useful errors, and success/error feedback.
- Avoid text embedded in images.
- Add page title, description, Open Graph metadata, favicon placeholder only if a proper icon asset is available.
- Add a `robots.txt` and sitemap only if the app setup supports them cleanly.
- Do not include tracking scripts by default.

## Suggested design tokens
- `--color-navy: #071B3A`
- `--color-blue: #1769F8`
- `--color-cyan: #00D4E8`
- `--color-violet: #6D28D9`
- `--color-white: #FFFFFF`
- `--color-soft-bg: #F5F8FF`
- Use a consistent spacing scale, restrained corner radius, and accessible button states.

## Suggested component breakdown
- `SiteHeader`
- `HeroSection`
- `ChallengeSection`
- `CapabilityCard`
- `CapabilitiesSection`
- `WorkflowSteps`
- `UseCaseCard`
- `DifferentiatorsSection`
- `DevelopmentStatusSection`
- `ContactSection`
- `SiteFooter`

Keep components simple; avoid premature abstraction.
