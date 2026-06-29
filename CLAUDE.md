# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this app is

Marketing/portfolio site for **Conclusion IT Architecture Consulting (CIAC)** — a Dutch IT architecture consultancy. The site presents the firm's services, case studies, and blog articles, and includes an AI-powered consultation chat widget backed by a Base44 serverless function.

Live production URL: **https://conclusion-it-architecture.com** (hosted on Vercel)

## Commands

```bash
npm run dev       # Start local dev server (Vite)
npm run build     # Production build
npm run lint      # ESLint (quiet mode — only errors)
npm run lint:fix  # ESLint with auto-fix
```

There are no tests. No test runner is configured.

## Local environment setup

Create `.env.local` in the project root:

```
VITE_BASE44_APP_ID=<your_app_id>
VITE_BASE44_APP_BASE_URL=<your_backend_url>
```

The `@/lib/app-params.js` module reads these values (and also accepts them as URL query params or localStorage, which Base44 uses for its builder integration).

## Architecture

### Stack

- **React 18** + **React Router v6** (SPA, no SSR)
- **Vite** with the `@base44/vite-plugin` (enables HMR notifier, analytics, visual edit agent)
- **Tailwind CSS** + **shadcn/ui** (Radix UI primitives in `src/components/ui/`)
- **@tanstack/react-query** for async state
- **Framer Motion** for animations
- **Base44** as the backend platform (auth, serverless functions)

### Provider tree (App.jsx)

```
AuthProvider → QueryClientProvider → LanguageProvider → Router → Routes
```

### Routing

| Path | Page |
|---|---|
| `/` | `CIACPage` — main landing page |
| `/cases/:slug` | `CaseDetailPage` |
| `/inzichten` | `BlogPage` |
| `/inzichten/:slug` | `ArticleDetailPage` |
| `/about` | `AboutPage` |
| `/contact` | `ContactPage` |

### Data

All content is **static data in `src/lib/`** — not fetched from an API:

- `casesData.js` — array of case study objects, each with a `slug`, rich text fields, and structured sections (challenge, approach, results, quote)
- `blogData.js` — array of article metadata objects; full article content lives in dedicated components (e.g. `src/components/blog/ITSavvyArticle.jsx`)

To add a case: add an object to `cases` in `casesData.js`. To add a blog article: add metadata to `blogData.js` and create the content component in `src/components/blog/`.

### Base44 backend

`src/api/base44Client.js` creates the SDK client (`requiresAuth: false` — the site is public). Backend calls go through:

- `base44.functions.invoke('publicConsultationCoach', {...})` — AI chat widget
- `base44.functions.invoke('detectVisitorLanguage', {})` — language auto-detection on first visit

### Internationalisation (NL/EN)

`src/lib/LanguageContext.jsx` implements a DOM-walking translation strategy: after render, it walks all text nodes and replaces Dutch strings with English equivalents using a flat lookup table in `src/lib/languageDictionary.js`. Default language is Dutch (`nl`); preference is persisted in `localStorage`. Language is also auto-detected via a Base44 function on first visit.

**When adding new UI text:** always write the Dutch string as the source, then add the NL→EN mapping to `languageDictionary.js`.

### Styling conventions

Brand colours are defined as CSS variables and exposed via Tailwind under the `brand.*` namespace:
- `brand-green` — primary accent
- `brand-charcoal` — dark backgrounds
- `brand-offwhite` — light backgrounds
- `brand-light`, `brand-mid`, `brand-highlight` — green scale

Typography: `font-inter` (body/UI) and `font-playfair` (editorial/headings).

### Component organisation

```
src/components/
  ciac/        # All sections for the CIACPage landing page
  cases/       # Reusable building blocks for CaseDetailPage
  blog/        # Full article content components (one per article)
  ui/          # shadcn/ui primitives — don't edit these directly
```

### SEO

Use the `usePageMeta(title, description)` hook at the top of every page component. It sets `<title>`, `<meta name="description">`, and Open Graph tags.

### Path alias

`@/` maps to `src/` (configured in `jsconfig.json` and Vite).
