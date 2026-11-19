<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { allReviews } from '#lib/data/site.ts';

	// No Review/aggregateRating JSON-LD here: Google treats a business rating
	// itself on its own site as self-serving and ineligible for star rich
	// results. Reviews stay as visible HTML only.
</script>

<svelte:head>
	<title>Reviews — Kanigiri Restaurant | 4.5★ from 521 Guests</title>
	<meta
		name="description"
		content="Kanigiri Restaurant is rated 4.5 stars from 521 reviews. Read what guests say about the mutton biryani, kadai chicken and delivery."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/reviews" />
</svelte:head>

<PageHero
	script="Loved by many"
	title="What our guests say"
	sub="4.5★ from 521 reviews across Google, Zomato and Swiggy. A realistic mix — including the 4-star ones — because honest reviews are the ones worth reading."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Guest reviews">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap items-center justify-center gap-4 rounded-3xl bg-cream p-6 ring-1 ring-line">
			<p class="font-display text-5xl font-black text-cocoa">4.5</p>
			<div>
				<Stars rating={4.5} size={22} showValue />
				<p class="mt-1 text-sm text-muted">521 reviews · Google, Zomato & Swiggy</p>
			</div>
			<a
				href="https://www.google.com/maps/search/Kanigiri+Restaurant"
				target="_blank"
				rel="noopener"
				class="ml-auto flex min-h-12 items-center rounded-full bg-mango px-6 text-xs font-black tracking-wider text-cocoa uppercase"
			>
				Read all Google reviews
			</a>
		</div>

		<div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each allReviews as review}
				<article class="flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-line">
					<Stars rating={review.rating} size={17} />
					<p class="mt-3 flex-1 leading-relaxed text-ink/90">"{review.text}"</p>
					<footer class="mt-4 border-t border-line pt-4">
						<p class="font-bold text-cocoa">{review.name}</p>
						<p class="text-sm text-muted">{review.area} · {review.dish} · {review.date}</p>
					</footer>
				</article>
			{/each}
		</div>

		<p class="mt-8 text-center text-sm text-muted">
			Ate with us recently? <a href="https://www.google.com/maps/search/Kanigiri+Restaurant" target="_blank" rel="noopener" class="font-bold text-leaf-dark underline underline-offset-4">Leave a Google review</a> — it helps more than you think.
		</p>
	</div>
</section>
