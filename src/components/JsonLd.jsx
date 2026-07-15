import { useEffect } from 'react';

/**
 * Injects a <script type="application/ld+json"> into the document head with the
 * given schema.org data, and removes it on unmount. The build-time prerender
 * captures the injected script into the static HTML per route.
 *
 * @param {object} data - A schema.org JSON-LD object.
 */
export default function JsonLd({ data }) {
  useEffect(() => {
    if (!data) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}
