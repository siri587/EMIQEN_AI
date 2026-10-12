# EMIQEN Website — Agent Instructions

## Goal
Build a polished, responsive public marketing website for EMIQEN, a developing voice-and-text AI product focused on Indian business context and specialized enterprise tasks. Use the public-facing content and brand rules in `docs/`.

## Reference and originality
- Use https://www.sarvam.ai/ as a high-level UX reference for information hierarchy, confidence, spacious layouts, product storytelling, and clear calls to action.
- Do not copy Sarvam's wording, graphics, layout pixel-for-pixel, branding, code, or proprietary assets. Create an original EMIQEN design.
- Treat the supplied EMIQEN brand-board image as the source of truth for the logo concept and colors. Use a clean logo asset if one is available; do not recreate a low-quality screenshot crop as the final logo.

## Required reading
Read these files before implementation:
1. `docs/BRAND_DESIGN.md`
2. `docs/WEBSITE_CONTENT.md`
3. `docs/PRODUCT_SCOPE_AND_CLAIMS.md`
4. `docs/UX_AND_COMPONENTS.md`

## Implementation priorities
- First deliver a complete, attractive, working responsive landing page.
- Use the repository's existing framework and conventions if present. Do not replace a working stack without a reason.
- If starting from an empty project, use React + TypeScript and the simplest stable styling setup already supported by the workspace.
- Build reusable components; keep content separate from presentation where practical.
- Use semantic HTML, accessible contrast, keyboard focus states, descriptive alt text, and reduced-motion support.
- Mobile-first, responsive across phone, tablet, laptop, and wide screens.
- Keep animations subtle and purposeful. Avoid heavy 3D effects, autoplay audio/video, fake dashboards, and excessive gradients.
- Include working navigation, anchor links, CTA actions, form validation, success/error states, and mobile menu behavior.
- If no contact details or form backend are configured, make the contact CTA a mailto only if an approved email is found in the repo. Otherwise create a clearly marked configuration point and never invent an address.
- Do not invent testimonials, customers, partnerships, metrics, certifications, uptime guarantees, benchmarks, product availability, or customer logos.
- Do not expose internal technical documents, private endpoints, credentials, API keys, source datasets, training details, cloud topology, internal costs, vendor bills, or model parameter counts.
- Do not include pricing tables or imply a pricing plan has been approved.
- Mark planned capabilities as “in development”, “designed to”, or “planned” where appropriate. Do not portray roadmap items as shipped features.
- Do not add RAG to the product description or architecture; it is outside the current public scope.
- Avoid fake links. For sections that need future pages, use valid on-page anchors or clearly configurable routes.
- Do not claim that EMIQEN is superior to Sarvam or any named competitor. Differentiate on intended focus, not unverified performance.
- Before finishing, run available lint/build checks and fix errors. Summarize what was built and list any remaining configuration needed.

## Deliverable
A professional public marketing website that communicates what EMIQEN is, who it is for, its intended value, and how interested businesses can contact the team—without disclosing sensitive implementation or commercial information.
