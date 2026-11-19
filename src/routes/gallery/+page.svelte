<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { gallery, galleryCategories } from '#lib/data/site.ts';

	let active: (typeof galleryCategories)[number] = $state('All');
	const visible = $derived(active === 'All' ? gallery : gallery.filter((g) => g.category === active));
</script>

<svelte:head>
	<title>Gallery — Kanigiri Restaurant | Biryani, Curries & Rice</title>
	<meta
		name="description"
		content="See the food: mutton biryani, kadai chicken, palak paneer, jeera chawal — cooked fresh at Kanigiri Restaurant."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/gallery" />
</svelte:head>

<PageHero
	script="From our kitchen"
	title="The gallery"
	sub="Real dishes from our kitchen — no stock photos. What you see is what arrives at your table."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Photo gallery">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
			{#each galleryCategories as cat}
				<button
					type="button"
					onclick={() => (active = cat)}
					aria-pressed={active === cat}
					class="min-h-11 rounded-full px-5 text-sm font-bold transition-colors duration-200 {active === cat
						? 'bg-leaf text-white shadow'
						: 'bg-lavender text-cocoa hover:bg-lavender-deep'}"
				>
					{cat}
				</button>
			{/each}
		</div>

		<div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
			{#each visible as item, i (i)}
				<figure
					animate:flip={{ duration: 300 }}
					in:fly={{ y: 16, duration: 250 }}
					out:fade={{ duration: 150 }}
					class="overflow-hidden rounded-3xl bg-lavender ring-1 ring-line"
				>
					<Picture
						name={item.image}
						alt={item.alt}
						width={800}
						height={600}
						sizes="(max-width: 1024px) 50vw, 33vw"
						transparent
						imgClass="aspect-[4/3] w-full object-contain p-4 drop-shadow-xl"
					/>
					<figcaption class="flex items-center justify-between gap-2 bg-white px-4 py-3">
						<span class="font-bold text-cocoa">{item.label}</span>
						<span class="rounded-full bg-mango-soft px-2.5 py-0.5 text-xs font-bold text-cocoa">{item.category}</span>
					</figcaption>
				</figure>
			{/each}
		</div>

		<p class="mt-8 text-center">
			<a href="/order" class="font-bold text-leaf-dark underline underline-offset-4">Hungry now? Order online →</a>
		</p>
	</div>
</section>
