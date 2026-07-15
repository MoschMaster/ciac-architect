import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '@/lib/analytics';

/**
 * Initializes GA4 and sends a page_view on every SPA route change. A no-op when
 * VITE_GA4_ID is unset or during the build-time prerender. Renders nothing.
 */
export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}
