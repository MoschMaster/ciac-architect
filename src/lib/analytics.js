// Google Analytics 4 (gtag) with Consent Mode v2.
//
// AVG/GDPR: analytics_storage defaults to "denied", so GA4 runs cookieless
// (no consent cookie set) until the visitor opts in. Wire a consent banner to
// grantAnalyticsConsent() to upgrade to full, cookie-based measurement.
//
// Gated on VITE_GA4_ID and skipped during the build-time prerender.

const GA_ID = import.meta.env.VITE_GA4_ID;

let initialized = false;

function gtag() {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** Load gtag.js once and set consent defaults. No-op without an ID / in prerender. */
export function initAnalytics() {
  if (initialized) return;
  if (!GA_ID) return;
  if (typeof window === 'undefined' || window.__PRERENDER_INJECTED) return;

  initialized = true;
  window.dataLayer = window.dataLayer || [];

  // Consent Mode v2 — denied by default until the visitor opts in.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });

  gtag('js', new Date());
  // send_page_view: false — the RouteTracker sends SPA page_views explicitly.
  gtag('config', GA_ID, { anonymize_ip: true, send_page_view: false });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Record a SPA page view. */
export function trackPageView(pathname) {
  if (!GA_ID || !initialized) return;
  gtag('event', 'page_view', {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Call from a consent banner once the visitor accepts analytics. */
export function grantAnalyticsConsent() {
  if (!GA_ID || !initialized) return;
  gtag('consent', 'update', { analytics_storage: 'granted' });
}
