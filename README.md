# Spark Digital Agency, website

Production-ready marketing site for **Spark Digital Agency**, built on Next.js 14, Tailwind CSS, Framer Motion, and Sanity CMS.

Projects, service pages, hero copy, and translations are all editable without touching code: projects and imagery live in the Sanity Studio at `/studio`, and text copy lives in a single translation file.

---

## Table of contents

1. [Editing content (non-technical guide)](#1-editing-content-non-technical-guide)
2. [Deploying online (first time)](#2-deploying-online-first-time)
3. [Local development](#3-local-development)
4. [Contact form (Resend setup)](#4-contact-form-resend-setup)
5. [Project structure](#5-project-structure)

---

## 1. Editing content (non-technical guide)

### Projects (portfolio case studies), the easy way

Once the site is deployed and Sanity is connected:

1. Go to `https://sparkdigital.agency/studio`
2. Log in with your Sanity account
3. Click **Project → Create new**
4. Fill in title, client, summary, upload the cover image, tag the services used, publish
5. Your homepage updates within 60 seconds

**Fields:**

| Field       | What it is                                                           |
| ----------- | -------------------------------------------------------------------- |
| Title       | Project name shown in the grid and detail page                       |
| Client      | Company name shown under the title                                   |
| Summary     | 1 to 2 lines, shown in the grid card                                 |
| Services    | Multi-select, drives the filter on the Work section                  |
| Cover image | Main visual, drag any image                                          |
| Year        | Optional                                                             |
| Live URL    | Optional, adds a "Visit live" link                                   |
| Order       | Lower number = shown earlier                                         |
| Body        | Optional rich case study, images and text                            |

### Site copy (headlines, blurbs, CTAs)

All text lives in one file: `lib/i18n.ts`. Open it, find the string you want to change, edit it in English (`en`) and Spanish (`es`), save. Deploy.

### Service pages

Service content lives in `lib/servicesData.ts`. Each of the 8 services has: title, kicker, lead, intro, includes, process steps, outcomes, "who it's for", and FAQ, all in EN/ES.

To edit, open the file, find the service (by slug), edit the fields, save.

---

## 2. Deploying online (first time)

### Step 1, Sanity (5 minutes)

```bash
npx sanity@latest init --bare
```

Pick **Production** dataset. It gives you a Project ID, save it.

Then in the Sanity dashboard → **API → CORS origins**, add:
- `http://localhost:3000` (with credentials)
- your production domain (e.g. `https://sparkdigital.agency`)

### Step 2, Resend (contact form, 3 minutes)

1. Sign up at [resend.com](https://resend.com), free tier includes 3,000 emails/month
2. Verify `sparkdigital.agency` as a sending domain
3. Generate an API key, save it

### Step 3, Deploy to Vercel (3 minutes)

1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. In **Project Settings → Environment Variables**, add:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID   = (your Sanity id)
   NEXT_PUBLIC_SANITY_DATASET      = production
   NEXT_PUBLIC_SANITY_API_VERSION  = 2024-07-01
   RESEND_API_KEY                  = re_xxxxxxxxxx
   CONTACT_TO_EMAIL                = hello@sparkdigital.agency
   CONTACT_FROM_EMAIL              = leads@sparkdigital.agency
   ```

4. Deploy
5. Add your Vercel domain to Sanity CORS origins
6. Point your `sparkdigital.agency` DNS at Vercel

Done. The Studio is at `https://sparkdigital.agency/studio`.

### Optional, instant revalidation on publish

The site regenerates every 60 seconds automatically. If you want changes to appear instantly, add a webhook in Sanity → **API → Webhooks** pointing at `https://sparkdigital.agency/api/revalidate` and add a matching handler.

---

## 3. Local development

```bash
npm install
cp .env.example .env.local     # fill in the values
npm run dev
```

- Site: <http://localhost:3000>
- Studio: <http://localhost:3000/studio>
- Hero preview lab: <http://localhost:3000/hero-lab>
- Logo lab: <http://localhost:3000/logo-lab>

---

## 4. Contact form (Resend setup)

The form posts to `/api/contact`. In production it sends via [Resend](https://resend.com):

- API key: `RESEND_API_KEY`
- Where leads land: `CONTACT_TO_EMAIL` (default `hello@sparkdigital.agency`)
- Sender address: `CONTACT_FROM_EMAIL` (default `leads@sparkdigital.agency`)

If `RESEND_API_KEY` is not set, the endpoint still returns 200 and logs to the server so you can develop locally without keys.

If you'd rather push into GoHighLevel (or in addition to email), open `app/api/contact/route.ts` and add a `fetch()` to your GHL inbound webhook, it's a 5-line change.

---

## 5. Project structure

```
spark/
├── app/
│   ├── api/contact/route.ts        # contact form, Resend-backed
│   ├── services/[slug]/page.tsx    # 8 service inner pages
│   ├── studio/[[...tool]]/page.tsx # Sanity Studio mount
│   ├── work/[slug]/page.tsx        # project detail pages
│   ├── sitemap.ts                  # auto-generated sitemap
│   ├── robots.ts                   # crawler rules
│   ├── layout.tsx                  # metadata, JSON-LD org schema
│   └── page.tsx                    # homepage
├── components/
│   ├── ui/                         # Container, Reveal, Eyebrow, etc.
│   ├── Nav.tsx, Footer.tsx
│   ├── Hero.tsx, HeroFlowField.tsx, HeroSparkles.tsx
│   ├── Services.tsx                # 8-card grid, links to detail pages
│   ├── ServiceDetail.tsx           # editorial service page layout
│   ├── Work.tsx                    # CMS-driven filterable grid
│   ├── ProjectDetail.tsx           # case study layout
│   ├── Process.tsx, Contact.tsx
│   └── Clients.tsx
├── lib/
│   ├── i18n.ts                     # EN + ES copy for the whole site
│   ├── servicesData.ts             # rich content for 8 service pages
│   ├── fallbackData.ts             # 9 projects shown when Sanity is empty
│   ├── LanguageContext.tsx
│   └── sanity.ts                   # Sanity client + queries
├── sanity/
│   └── schemas/                    # Sanity Studio schemas
├── public/
│   └── clients/                    # processed monochrome client logos
├── sanity.config.ts
├── tailwind.config.ts
└── .env.example
```

---

## Stack

- Next.js 14 (App Router, RSC, ISR, static generation)
- Tailwind CSS + custom tokens (ink neutrals, ember accent)
- Framer Motion for scroll-aware reveals
- Sanity Studio for editable projects
- Resend for contact form delivery
- TypeScript
- SEO: sitemap, robots, Open Graph, Twitter cards, JSON-LD Organization schema
- Accessibility: WCAG-AA, focus rings, `prefers-reduced-motion` respected globally

---

## Scripts

| Command       | What it does                 |
| ------------- | ---------------------------- |
| `npm run dev` | Run Next.js + Studio in dev  |
| `npm run build` | Production build           |
| `npm start`   | Start production server      |
| `npm run lint` | ESLint                      |

Built to compound.
