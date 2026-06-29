import { useEffect } from 'react';

/**
 * Sets document title and meta description for SEO on a per-page basis.
 * @param {string} title - Page title (will be appended with site name)
 * @param {string} description - Meta description (150–160 characters recommended)
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | CIAC – Conclusion IT Architecture Consulting`
      : 'CIAC – Conclusion IT Architecture Consulting';

    document.title = fullTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || '';

    // Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = fullTitle;

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description || '';
  }, [title, description]);
}