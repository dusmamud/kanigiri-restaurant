import { site } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/#about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/#menu', priority: '0.9', changefreq: 'weekly' },
	{ path: '/#reviews', priority: '0.7', changefreq: 'weekly' },
	{ path: '/#contact', priority: '0.8', changefreq: 'monthly' }
];

export function GET() {
	const urls = staticPages.map(
		(p) =>
			`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
