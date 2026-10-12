# EMIQEN Website Brief for Antigravity

This folder contains the product and design instructions to give an AI coding agent before it builds the EMIQEN marketing website.

## Files
- `AGENTS.md` — Primary instructions for the coding agent.
- `docs/BRAND_DESIGN.md` — Logo direction, official palette, typography, and visual style.
- `docs/WEBSITE_CONTENT.md` — Public-facing website copy and section content.
- `docs/PRODUCT_SCOPE_AND_CLAIMS.md` — What may be said publicly and what must remain confidential.
- `docs/UX_AND_COMPONENTS.md` — Sitemap, layout, interactions, accessibility, and component suggestions.
- `public/brand/emiqen-brand-board-reference.jpg` — The supplied logo/palette reference image.

## How to use
1. Unzip this folder into the root of the website repository, or copy these files into the existing project.
2. Keep `AGENTS.md` at the repository root.
3. Give Antigravity this instruction:

   > Read `AGENTS.md` and every file in `docs/`. Inspect the current repository before changing anything. Build the EMIQEN marketing website to the requirements, using the supplied brand reference. Keep all internal pricing, infrastructure, dataset, model-training, and other confidential details out of public pages. Do not invent product claims or contact details. Implement the site, run available checks, and report what remains to configure.

4. Review the output before publishing. In particular, confirm current feature availability, contact details, privacy/legal requirements, and that no internal project details were exposed.

## Important
The supplied DPR is a confidential internal planning document. These website instructions intentionally exclude cost tables, cloud instance details, model parameters, training plans, private datasets, and internal implementation specifics. Product features that are not yet validated are written as development goals rather than shipped guarantees.
