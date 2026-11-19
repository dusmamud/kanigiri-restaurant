import { dishes, site, sitePages } from '#lib/data/site.ts';

export const prerender = true;

// Per-page priority/changefreq; anything in `sitePages` without an entry
// here gets the default (0.7 / monthly). Keep this map in sync when a
// page's importance changes — do NOT hand-add URLs.
const meta: Record<string, { priority: string; changefreq: string }> = {
	'/': { priority: '1.0', changefreq: 'weekly' },
	'/menu': { priority: '0.9', changefreq: 'weekly' },
	'/order': { priority: '0.9', changefreq: 'weekly' },
	'/reservations': { priority: '0.8', changefreq: 'monthly' },
	'/about': { priority: '0.8', changefreq: 'monthly' },
	'/offers': { priority: '0.8', changefreq: 'weekly' },
	'/contact': { priority: '0.8', changefreq: 'monthly' },
	'/privacy': { priority: '0.3', changefreq: 'yearly' },
	'/terms': { priority: '0.3', changefreq: 'yearly' }
};

const withMeta = (path: string) => ({
	path,
	priority: meta[path]?.priority ?? '0.7',
	changefreq: meta[path]?.changefreq ?? 'monthly'
});

// Static pages come from the single source of truth in site.ts, so a new
// route only needs its path added to `sitePages`. Dish pages come from
// `dishes` only — `heroDish` IS `dishes[0]`, so spreading it in again
// duplicated /menu/mutton-biryani. Dedupe by path as a safety net.
const pages = [
	...sitePages.map(withMeta),
	...dishes.map((d) => withMeta(`/menu/${d.slug}`))
];
const uniquePages = [...new Map(pages.map((p) => [p.path, p])).values()];

export function GET() {
	const urls = uniquePages.map(
		(p) =>
			`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
