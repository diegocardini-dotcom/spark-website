# Spark — Build Brief v2

> A jaw-dropping B2B website where selling is a walk in the park.
> Award-site benchmark: wolverineworldwide.com · isadoradigitalagency.com · kudos.framer.media · christoph-gey.de

This brief supersedes the original. Drop it into a fresh Claude Code session and start there.

---

## 0. What this brief is

Diego ran a first pass with an agent. Color tokens got swapped to match the live sparkdigital.agency yellow, but the deeper problems — dull hero, weak logo, white-tiled client logos, project pages that link off-site, services that need polish — are untouched. The first pass also surfaced a brand-level question: the historical yellow reads "orange" against the new dark canvas, and the existing star-mark + dot lockup is not strong enough to anchor a premium site.

The build is a Next.js 14 / App Router / TypeScript / Tailwind / Framer Motion site with Sanity at `/studio`, all already scaffolded. The frame is good — the craft level isn't there yet.

Stack inventory (already in place — **do not rebuild**):
- `app/` — App Router, `page.tsx`, `studio/`, `api/`
- `components/` — `Nav`, `Hero`, `Clients`, `Services`, `Work`, `Process`, `LightUp`, `Contact`, `Footer`, `ui/`
- `lib/i18n.ts` — typed EN/ES dictionary; ALL visible copy goes through `tr(lang, 'path')`
- `lib/LanguageContext.tsx` + `components/ui/LanguageToggle.tsx` — language switcher
- `lib/fallbackData.ts` — 9 real projects, 8 client logos, sourced from the live WP site
- `sanity/schemas/project.ts` — project schema (needs extension; see §6)
- `tailwind.config.ts` — `ink` neutral scale + `ember` accent (currently `#F8D347` from logo)
- `app/globals.css` — `--ember` CSS var, `.bg-grid`, `.hairline`, `.spark-line`, focus rings, reduced-motion override

---

## 1. North star & tone

**Editorial-tech.** Near-black canvas, refined accent, oversized display serif paired with a clean sans, generous whitespace, restrained motion. Confident systems-oriented growth partner — not a creative studio. The copy in `lib/i18n.ts` is largely right and stays.

**Depth, not flatness.** Layered glows, soft vignettes, subtle noise/grain, content that floats. No gradient blobs, no flame clichés. "Spark" = light/ignition, expressed through glow and a single drawn line, never literal fire.

**House easing:** `[0.22, 1, 0.36, 1]`. One easing curve everywhere.

---

## 2. Decisions already made (don't re-litigate)

- **Logo direction: 2 + 3 only.** Build a `/logo-lab` page that presents BOTH:
  - **(2)** Refined `spark` wordmark with a custom ignition mark — premium letterforms, the mark integrated with the type (not a star floating next to text).
  - **(3)** Fresh-concept mark — your interpretation of "ignition / system / signal" as a minimal SVG mark, paired with a clean wordmark.
  - Diego picks one. The current PNG star-mark is retired.
- **Hero visual: kinetic system graph** (agent's pick between the two options). An animated node-graph / pipeline as the hero's right side or background: leads flowing as particles through stages (capture → qualify → nurture → close), pulsing along glowing paths, parallax on cursor. This directly visualizes the product. Built so a full-bleed looping video could be swapped in later.
- **Project pages live ON this site** at `/work/[slug]`, not links out to WordPress.
- **Client logos sit on the dark canvas**, no white tiles. Recreate the top 5 as inline SVG.
- **i18n discipline:** every new string lands in `lib/i18n.ts` in BOTH `en` and `es`. No hardcoded visible copy.
- **House easing** `[0.22, 1, 0.36, 1]` everywhere. No new accent colors. No new fonts without explicit OK.

---

## 3. Open questions to resolve EARLY in the session

These are the things to pause and ask Diego about before burning hours.

### Q1 — Accent color direction
The literal logo yellow `#F8D347` is now live in `tailwind.config.ts`. Diego's reaction: *"that orange feels off."* The historical color may not be right for the redesign. Present three live previews on the hero and let Diego pick:
- **A.** Keep `#F8D347` (current — true to the existing brand).
- **B.** Shift cooler/more lemon: `#F4E04A` or `#F6E03C` (less orange perception against near-black).
- **C.** Pivot accent entirely: e.g. signal red `#FF4D2E`, electric green `#22E37A`, or a refined off-white-on-near-black with NO chromatic accent (extremely premium — see christoph-gey.de). Brand color becomes one warm token used sparingly.

This decision unlocks logo, hero glow, and CTA color. Don't proceed past §4 without it.

### Q2 — Type pairing
Current pairing is `Instrument Serif` (display) + `Inter` (sans). Diego is unsure it works with the logo. Once Q1 + logo direction are picked, re-evaluate. Backup pairings to test:
- Editorial: `Tiempos Headline` / `Migra` / `Reckless` (display) + `Söhne` / `Inter`
- Bold-modern: `Söhne Breit` (display) + `Söhne` (text)
- Technical-editorial: keep `Instrument Serif` but pair with `Söhne Mono` or `JetBrains Mono` for kickers

### Q3 — Smooth scroll
Lenis adds buttery scroll-driven feel (matches the benchmark sites) at the cost of ~15kb JS and some perf risk on mobile. Diego's call — default is **no** unless he explicitly asks.

### Q4 — Brand voice on the hero headline
"More attention. More customers." is fine but generic. Once the visual is in, propose 2 alternative headline angles for Diego to choose from (e.g. one outcome-led, one system-led). Don't change without his sign-off.

---

## 4. Section-by-section direction

### 4a. Color system (effectively done, awaiting Q1)
Tokens already updated:
```
ember        = #F8D347   (exact logo color, sampled)
ember-soft   = #FBE17F   (highlights)
ember-deep   = #D9AC1A   (depth/hover)
ember.glow   = rgba(248,211,71,0.18)
```
All hardcoded `rgba(245,181,68,…)` and old hex literals across 11 files have been replaced. **If Q1 picks B or C, only the four token lines + `--ember` in globals.css + `bg-radial-spark` in tailwind.config.ts need to change** — rgba literals already point at the token-aligned color so a fresh sed pass over those four values flows everywhere.

### 4b. Logo
Build `app/logo-lab/page.tsx` (a private design route, not linked from nav). Render direction 2 and direction 3 side-by-side on the dark canvas at three sizes (32px, 64px, 200px) and against three backdrops (pure black, ink-900, ember). Each rendered as **inline SVG** with `currentColor` so they're crisp and themeable.

Once Diego picks, drop the SVG into `components/ui/Logo.tsx` and use it in `Nav` (currently uses the hotlinked PNG) and `Footer`. Delete `SPARK_LOGO_URL` from `lib/fallbackData.ts`.

The mark should not just sit "beside a dot." It should integrate ignition into the letterforms — e.g. the `a` of `spark` opens into a spark, the `k` extends into a beam, or a tight asterisk-mark that sits in place of the dot on the `i` of `digital`. Diego explicitly rejected the current "logo + tiny dot" pattern.

### 4c. Hero — kinetic system visual
Right-side or full-bleed background SVG/canvas of the pipeline:
- Four stage nodes laid out in a soft S-curve (capture → qualify → nurture → close).
- Particles (lead "sparks") spawned at the capture node, traveling along bezier paths between nodes with eased timing, brightening as they "convert" through stages, fading out past `close`.
- Each node a small ring with a soft gold glow, pulsing on the beat when a particle arrives.
- Cursor parallax on the whole graph (subtle — `translateZ` style, max 12px shift).
- `prefers-reduced-motion`: render the graph static (paths + nodes, no particles).
- Performance: GPU transforms only (`transform`, `opacity` — no layout-thrashing properties), `will-change` sparingly, requestAnimationFrame loop with a single tick. Target 60fps on a 2019 MacBook and a 2022 iPhone SE.
- Built as `components/HeroSystemGraph.tsx`, mounted lazily with `dynamic(() => import(...), { ssr: false })` so it doesn't block first paint.
- The hero layout currently has the headline floating alone — restructure so the headline + CTAs sit in a left column and the graph in a right column on desktop, with the graph becoming a softer full-width backdrop on mobile (≤ 768px).
- Leave a clean seam for a later video swap: wrap the graph in a `<HeroBackdrop>` component so a `<video>` can replace it without touching layout.

### 4d. Client logos
Current: small, white-background JPG/PNGs in a marquee — looks amateur.
- Drop `mix-blend-mode` / `brightness` hacks. Recreate the top 5 as clean monochrome SVGs in `components/icons/clients/`: `Ford.tsx`, `Arcor.tsx`, `Garbarino.tsx`, `LeoBurnett.tsx`, `JWT.tsx`. Each component renders the wordmark at full size with `fill="currentColor"`; the parent sets `color`.
- For the remaining 3 (Global Mind, Mataojo, Vamos BA, Selailu) — either commission/build SVGs later, or apply a CSS knock-out filter (`filter: brightness(0) invert(1)`) on a transparent-bg PNG. For now, fetch each, threshold to monochrome PNG, and serve from `public/clients/`.
- Marquee styling: uniform 32px height, opacity `0.55` rest → `1.0` hover, soft gold glow on hover, container is the dark canvas with the existing left/right fade masks. Speed slower (`45s` not `30s`) — restraint reads as premium.

### 4e. Project detail pages (`/work/[slug]`)
Highest-effort section. Required:
1. **Sanity schema extension** — add to `sanity/schemas/project.ts`:
   - `heroImage` (image, hotspot enabled)
   - `challenge` (localized portable text — EN/ES)
   - `approach` (localized portable text, array of services delivered)
   - `outcome` (localized portable text + array of `{ metric, label, suffix }` for the result counters)
   - `gallery` (array of images, each with alt + caption)
   - `nextProjectSlug` (reference to another project) — optional
2. **Fallback data extension** — extend `FallbackProject` in `lib/fallbackData.ts` with the same fields. Seed all 9 projects with real content lifted from the live pages: `sparkdigital.agency/project/{slug}/`. Imagery URLs can hotlink for now (already permitted by `next.config.mjs`); migrate to `public/projects/{slug}/` once Diego confirms layouts.
3. **Route** — `app/work/[slug]/page.tsx`, with `generateStaticParams` reading from Sanity (and falling back to `FALLBACK_PROJECTS`). `revalidate = 60`. 404 if slug unknown.
4. **Layout** — editorial. Full-bleed hero image with title overlaid (display type), then breathing scroll sections: Challenge → Approach (with service chips that link to `/#services`) → Outcome (animated metric counters using the existing `CountUp`) → Gallery (full-bleed images with parallax) → "Next project →" pinned card. Sticky right-rail meta on desktop (client, year, services, URL).
5. **Work grid links** — `components/Work.tsx` cards currently link to `project.url` (off-site). Change to `<Link href={`/work/${slug}`}>`. Keep `project.url` as a small external link inside the detail page only.
6. **Transition** — Framer Motion `layoutId` on the card image → detail hero image for a shared-element transition. If layoutId is too jittery across route boundaries, fall back to a tasteful 280ms fade + scale on the destination.
7. **All copy bilingual** in `lib/i18n.ts` under `work.detail.*` (challenge eyebrow, approach eyebrow, outcome eyebrow, gallery eyebrow, next-project label).

### 4f. Services polish
Bento grid is conceptually right, execution is loose. Refine in this order:
- Re-time SVG micro-animations: each viz should have a 2.4s loop with eased starts and ends, not linear. Use the house cubic-bezier.
- Improve the gradient mask between viz and text — currently sharp; make it a soft 80px gradient from the card bg color to transparent, layered above the viz.
- Hover state: card lifts 2px toward the cursor (translateY + slight rotateX of ±1° based on cursor X — see `components/ui/Magnetic.tsx` for the existing pattern), border brightens to `ember/40`, soft gold drop-shadow `0 30px 60px -30px ember.glow`. Currently uses a flat hover.
- Mobile collapse: at ≤ 640px the bento becomes a single column; each card is 280px tall; the viz scales down to 80% inside the card. Currently spans break awkwardly.

### 4g. The rest
- **Nav** — once the new logo lands, replace the `Image` with the inline SVG `<Logo />` component. Verify the language toggle still feels balanced.
- **Process** — animations are fine; just verify spacing on mobile (380px).
- **LightUp** — keep, this is brand heritage. Just verify the particle field doesn't pop above the new accent color.
- **Contact** — form is fine; verify field focus rings against the new accent.

---

## 5. Global standards (apply throughout, verify before declaring done)

- **Mobile-first, flawless at 380px.** Diego demos on his phone. Every section tight on iPhone SE size.
- **Lighthouse 90+ on mobile** for performance, a11y, best practices, SEO. Hero visual must not jank.
- **WCAG AA contrast** — re-run after every color change. Helper script lives in §8.
- **All animations honor `prefers-reduced-motion`** with a static fallback that still tells the story.
- **`next/image` for everything below-fold.** Lazy by default; only the hero image is `priority`.
- **Semantic landmarks** — `header`, `main`, `nav`, `footer`, each section with `aria-labelledby`.

---

## 6. How to drive this session

**Mode of work:** section by section. After each section, pause for Diego to react in the browser. Commit to git after each section he accepts so nothing is lost. Don't batch.

**Order of operations (don't reorder):**
1. **Resolve Q1 (color)** — show three live previews of the hero with A / B / C and let Diego pick before doing anything else.
2. **Logo lab** at `/logo-lab` — show directions 2 and 3 side by side; Diego picks one.
3. **Hero kinetic graph** — drop it in, refactor hero layout.
4. **Client logos** — SVG-ify top 5, retire white tiles.
5. **Project detail pages** — schema, route, content, transition.
6. **Services polish.**
7. **Resolve Q2 (type)** — once everything else is in, re-evaluate type pairing.
8. **Global standards pass** — Lighthouse, mobile sweep, a11y, reduced-motion.

**Pause points** (do NOT skip):
- After Q1 / Q2 / Q3 / Q4 in §3.
- After §4b (logo).
- After §4c (hero) — Diego sees the most jaw-drop here.
- After §4e (project pages) — content lift is heavy, don't waste cycles if direction is off.

---

## 7. Tooling — skills + MCPs to install

In a fresh Claude Code session, before starting work, ensure these are available. Most are already in your library — call them via `/<skill-name>`.

**Skills (built-in, already available):**
- `/design:design-critique` — feed it screenshots for ongoing critique against the benchmark sites.
- `/design:design-system` — keeps the token system honest as you extend it.
- `/design:accessibility-review` — run after the color decision and again before §8 pass.
- `/design:ux-copy` — for headline alternates in Q4 and any new microcopy.
- `/marketing:brand-review` — sanity-check copy stays in the "systems / growth partner" voice.
- `/run` and `/verify` — start the app and confirm changes actually work in the browser.
- `/code-review` — between sections, on the working diff. Faster than letting bugs accumulate.

**MCPs to connect (if not already):**
- **Claude-in-Chrome** (`mcp__Claude_in_Chrome__*`) — drives a real Chrome session. Critical for inspecting computed styles, taking screenshots, and verifying the hero animation actually renders at 60fps. Install the Chrome extension from the Claude UI.
- **Figma MCP** (in your connecting list) — if you have or want to start a Figma file for the logo lab, this lets the agent read frames directly.

**Useful flags during the build:**
- Keep `npm run dev` running on port 3000 in a separate terminal. The agent should not be killing/restarting it; it should write code and let HMR pick up.
- After each section, run `npm run build` to catch TypeScript errors that HMR may have masked.

**You do NOT need:**
- Lenis (skip unless you decide on Q3 = yes).
- A new component library — Tailwind + the existing `ui/` primitives are sufficient.
- A CMS migration — Sanity is fine, just extend the schema.

---

## 8. Suggested kickoff prompt for the fresh session

Drop this verbatim into Claude Code as the first message:

> Read `BRIEF.md` end to end. Confirm the stack inventory matches reality (run `ls` on the directories listed in §0). Then ask me the four open questions in §3 — one at a time, with concrete previews where applicable — before writing any code. After I answer, work the order in §6, pausing at every pause point.
>
> You are not building features quickly — you are building a jaw-dropping B2B site that makes selling effortless. Match the craft of wolverineworldwide.com, isadoradigitalagency.com, kudos.framer.media, and christoph-gey.de. If a change you're about to make doesn't move it toward that bar, don't make it.

---

## 9. What is already done (don't redo)

- Color tokens swapped to logo-matched yellow (§4a). May be replaced after Q1.
- All hardcoded `rgba(245,181,68,…)` and old gold hex literals across 11 files purged.
- `--ember` CSS var, selection background, focus ring, spark-line glow, all bg-radial-spark instances updated.
- Dev server is running on `localhost:3000` (logs at `/tmp/spark-dev.log` if anything misbehaves).

## 10. Known issues to fix in passing

- `next.config.mjs` allows `sparkdigital.agency` for image hotlinking — keep until project pages are migrated to local assets, then remove.
- Some Services SVG fills use bare hex (`#F8D347`) instead of `currentColor` + Tailwind `text-ember`. Refactor to tokens for theme-shift safety.
- The `Hero.tsx` drifting sparks use raw `box-shadow` rgba — fine, but consider extracting the glow value to a Tailwind shadow token (`shadow-spark`) so it can be tuned in one place.
