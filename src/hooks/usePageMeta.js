import { useEffect } from 'react';

const SITE_NAME = 'CIAC – Conclusion IT Architecture Consulting';
// Absolute base URL for canonical/OG tags. Configured via env so the prerender
// (which runs on localhost) never bakes a localhost origin into the tags.
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://conclusion-it-architecture.com').replace(/\/$/, '');

/** Create-or-update a <meta> tag, keyed by name or property. */
function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content ?? '');
}

/** Create-or-update the canonical <link>. */
function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets document title, description, canonical, Open Graph and Twitter Card tags
 * for SEO on a per-page basis. Runs client-side; the build-time prerender
 * snapshots the resulting tags into the static HTML per route.
 *
 * @param {string} title       - Page title (appended with the site name).
 * @param {string} description - Meta description (150–160 chars recommended).
 * @param {string} [image]     - Social share image (absolute URL or root-relative path).
 * @param {'website'|'article'} [type='website'] - Open Graph type.
 */
export default function usePageMeta(title, description, image, type = 'website') {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const desc = description || '';
    const canonical = `${SITE_URL}${window.location.pathname}`;
    const rawImage = image || '/og-image.png';
    const imageUrl = rawImage.startsWith('http') ? rawImage : `${SITE_URL}${rawImage}`;

    document.title = fullTitle;

    upsertMeta('name', 'description', desc);
    upsertCanonical(canonical);

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:site_name', 'CIAC');
    upsertMeta('property', 'og:locale', 'nl_NL');
    upsertMeta('property', 'og:image', imageUrl);

    // Twitter Card
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', imageUrl);
  }, [title, description, image, type]);
}
