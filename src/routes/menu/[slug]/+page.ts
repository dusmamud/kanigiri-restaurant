import { dishes, heroDish } from '#lib/data/site.ts';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	return [...dishes, heroDish].map((d) => ({ slug: d.id }));
}

export function load({ params }: { params: { slug: string } }) {
	const dish = [...dishes, heroDish].find((d) => d.id === params.slug);
	if (!dish) error(404, 'Dish not found');
	return { dish };
}
