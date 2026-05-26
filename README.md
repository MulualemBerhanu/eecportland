# Ebenezer Ethiopian Church — Website

Production-ready marketing site built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide** icons.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run production server locally
npm run lint    # ESLint
```

## Architecture

- **`app/`** — Routes, layouts, and page-level metadata. Each route exports `metadata` for SEO.
- **`components/layout/`** — `Navbar` (client: scroll + mobile menu), `Footer`, shared nav config.
- **`components/home/`** — Homepage-only sections (hero, strips, previews).
- **`components/shared/`** — Reusable UI: `AnimatedSection`, `PageHero`, cards, forms, CTAs.
- **`data/`** — Mock content (ministries, events, sermons, values, FAQs, beliefs). Swap for CMS/API later.
- **`lib/`** — `site.ts` (church name, address, hours, URLs) and `cn()` utility.

Content is intentionally **data-driven** so you can later replace `data/*.ts` with fetches from Sanity, Contentful, or your own API without restructuring pages.

## Placeholders to replace before launch

- **`lib/site.ts`** — Domain, address, phone, email, social URLs.
- **Giving** — `app/give/page.tsx`: wire the primary CTA to your processor (e.g. Pushpay, Tithe.ly, Planning Center).
- **Sermons** — `app/sermons/page.tsx`: embed player (YouTube/Vimeo) and connect search to your media source.
- **Events** — Event cards use static data; integrate a calendar or headless CMS when ready.
- **Forms** — `PrayerRequestForm` and `ContactForm` simulate success; replace the mock `setTimeout` handlers with `fetch` to your API, Formspree, or server actions + email.
- **Membership form** — Submits to `POST /api/membership`, builds a PDF, and emails recipients via SMTP. Copy `.env.example` to `.env.local` (IONOS) for local testing; add the same variables in Vercel before launch.
- **Maps** — `app/contact/page.tsx`: replace the map placeholder with Google Maps / Mapbox.
- **Privacy / Terms** — Legal placeholders in `app/privacy` and `app/terms`; replace with counsel-reviewed copy.
- **Images** — Remote images use Unsplash; replace with your photography in `public/` or your CDN.

## Notes

- Navbar is **transparent on the home hero** and solidifies on scroll.
- **Lucide** no longer ships some brand icons; the footer uses generic icons with clear `aria-label`s.
- **Future**: i18n, CMS, livestream block, newsletter, and admin workflows can plug in at the data and form layers above.
