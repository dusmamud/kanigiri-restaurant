import { dishes } from '#lib/data/site.ts';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	return dishes.map((d) => ({ slug: d.slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const dish = dishes.find((d) => d.slug === params.slug || d.id === params.slug);
	if (!dish) error(404, 'Dish not found');
	return { dish };
}
