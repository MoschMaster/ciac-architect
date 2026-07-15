// Post-build prerender: runs the built SPA in headless Chromium and snapshots
// the fully-rendered DOM (incl. JS-injected meta tags + JSON-LD) to a static
// index.html per route, so crawlers and social scrapers get complete HTML.
// Also emits sitemap.xml from the same route list.
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { cases } from '../src/lib/casesData.js';
import { articles } from '../src/lib/blogData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://conclusion-it-architecture.com').replace(/\/$/, '');

// Vercel's build container lacks the system libraries puppeteer's bundled
// Chromium needs (libnspr4.so, …). On Vercel we launch @sparticuz/chromium,
// which ships those libs; locally we use puppeteer's own Chrome.
const onVercel = !!process.env.VERCEL;

async function getLaunchOptions() {
  if (!onVercel) {
    return { args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  }
  const { default: chromium } = await import('@sparticuz/chromium');
  chromium.setGraphicsMode = false;
  return {
    args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: await chromium.executablePath(),
    headless: true,
  };
}

const routes = [
  '/',
  '/inzichten',
  '/about',
  '/contact',
  ...cases.map((c) => `/cases/${c.slug}`),
  ...articles.map((a) => `/inzichten/${a.slug}`),
];

async function writeRoute(route, html) {
  const dir = route === '/' ? distDir : path.join(distDir, route);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'index.html'), html.trim() + '\n', 'utf8');
}

async function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (r) =>
        `  <url>\n    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
}

async function main() {
  const prerenderer = new Prerenderer({
    staticDir: distDir,
    renderer: new PuppeteerRenderer({
      // Expose window.__PRERENDER_INJECTED so app code can skip analytics.
      inject: { prerender: true },
      // Give React/effects (usePageMeta, JsonLd) and the auth fallback time to settle.
      renderAfterTime: 4000,
      headless: true,
      // Sparticuz Chromium runs single-process; render one route at a time on
      // Vercel to stay stable. Locally we can parallelise.
      maxConcurrentRoutes: onVercel ? 1 : 4,
      launchOptions: await getLaunchOptions(),
    }),
  });

  await prerenderer.initialize();
  try {
    const rendered = await prerenderer.renderRoutes(routes);
    for (const r of rendered) {
      await writeRoute(r.route, r.html);
      console.log(`prerendered ${r.route}`);
    }
    await writeSitemap();
    console.log(`sitemap.xml written with ${routes.length} routes`);
  } finally {
    await prerenderer.destroy();
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
