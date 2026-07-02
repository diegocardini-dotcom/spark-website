# Product

## Register

brand

## Users

Small business owners and operators evaluating a partner to fix their digital presence and revenue plumbing. Two primary segments:

- **Independent businesses** (services, e-commerce, professional practices) who need a real website and a CRM that does the chasing for them.
- **Music schools and music retailers** — a vertical Spark knows deeply, where lessons enrollment, lead nurture, and family-account workflows have specific shapes.

They arrive skeptical: they've been burned by template shops, half-built funnels, and "marketing" that produced traffic with no conversions. They're looking for someone who treats their business like infrastructure, not a brochure. The site is read on a phone between meetings or after-hours from a laptop — first impression must hit in 5 seconds and survive a deeper second pass.

## Product Purpose

The site itself is the product demo. It exists to:

1. **Prove craft.** A B2B web/automation agency whose own site is bland is disqualified before the conversation starts. Every section is a working sample of what Spark can build for the prospect.
2. **Translate "GHL automation" into outcomes.** Most visitors don't know GoHighLevel. They know "more bookings", "no lead falls through the cracks", "we get paid faster." Surface outcomes; let the systems language live in supporting copy.
3. **Convert qualified leads** into a discovery call (cal.com link, contact form) without aggressive sales theatre. Trust beats pressure for this audience.
4. **Showcase real client work** at `/work/[slug]` — case studies that read like editorial, not portfolio tiles.

Success = a discovery call booked by someone who has already decided Spark is a serious option before the call starts.

## Brand Personality

**Three words: confident, systems-minded, approachable.**

- **Confident, not loud.** Restraint over hype. The work speaks; the site doesn't have to shout.
- **Systems-minded.** Growth as infrastructure, not magic. Pipelines, automations, measurable outcomes. The aesthetic supports this — editorial-tech, layered depth, one ignition accent.
- **Approachable.** Not stiff agency-speak. A small business owner who isn't a marketing pro should feel met where they are, not condescended to. Plain language, no acronyms without context.

Voice: confident growth partner. Not a creative studio, not a SaaS sales page, not a "we're crushing it" hype machine.

## Anti-references

What this must NOT look like:

- **Generic SaaS-template aesthetic.** No hero-metric template (giant number, three supporting stats, gradient blob). No identical icon-and-text card grids. No "trusted by" white-tile logo wall. No purple-to-blue gradients. No floating dashboard mockup tilted 15°.
- **Creative-studio brutalism for its own sake.** Spark builds for operators, not other designers. Aggressive typography or experimental layouts that obscure the offer fail the "5-second prospect read."
- **Generic agency tropes.** "We're not your average agency" copy. Stock photos of teams pointing at laptops. Color-blocked hero with arrow-shaped CTAs. Flame icons, lightning bolts, or any literal "spark" cliché — the only nod to the name is the thin glowing line + dot used as a section eyebrow accent.
- **Wellness / cream-paper neutral palette.** The 2026 AI default warm-neutral body (cream, sand, parchment, ivory, linen) is the saturated reflex; Spark is near-black canvas with a single ignition accent, never warm-paper.
- **Heavy whitespace minimalism with nothing in it.** Restraint is earned with content density and craft, not absence.

Reference sites for the *right* feel (already in BRIEF.md as award-site benchmarks): wolverineworldwide.com, isadoradigitalagency.com, kudos.framer.media, christoph-gey.de — editorial typography, dark refined canvas, restrained motion, premium without ceremony.

## Design Principles

1. **Practice what you preach.** The site IS the proof. Every section must be the quality Spark would ship for a client. Half-built sections disqualify the offer.
2. **Outcomes first, mechanics second.** Lead with what the prospect gets ("More bookings, fewer dropped leads") not how it's built ("automated lead-routing workflows"). GHL, Sanity, Next.js are credibility in the footnotes, not the headline.
3. **Restraint as signal.** No gradient blobs. One accent color. One easing curve `[0.22, 1, 0.36, 1]`. One ignition motif (line + dot). Repetition of a small system, not variety of effects.
4. **Editorial, not template.** Display serif paired with clean sans. Oversized headlines. Generous but committed whitespace. Long-form case studies that read like a publication, not a portfolio.
5. **Bilingual by discipline.** Every visible string lives in `lib/i18n.ts` (EN/ES). No hardcoded copy. The Spanish version is not an afterthought — it's a first-class read.

## Accessibility & Inclusion

- **WCAG 2.1 AA** target across the site. Body text contrast ≥4.5:1 against `--bg` (near-black `#0a0a0b`); large text and UI states ≥3:1. The current `ember` accent (`#F8D347`) against `ink-900` clears AAA for large text but body copy must use `ink-100` / `ink-50`, never muted gray on the dark canvas.
- **Visible focus rings** on all interactive elements (already in `globals.css`: 2px ember outline, 3px offset).
- **`prefers-reduced-motion`** respected globally. The hero kinetic system graph must have a static fallback (paths + nodes, no particles) that still communicates the pipeline metaphor.
- **Semantic landmarks** — `header`, `main`, `nav`, `footer`, each section with `aria-labelledby` and skip-link targets.
- **Form labels** programmatically associated; placeholder text never substitutes for a label.
- **EN/ES** parity — the language toggle is a first-class accessibility feature for this audience, not an afterthought.
