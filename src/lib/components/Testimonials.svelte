<script lang="ts">
	import Stars from '#lib/components/Stars.svelte';
	import { testimonials } from '#lib/data/site.ts';
</script>

<section id="reviews" class="bg-lavender py-16 sm:py-20" aria-labelledby="reviews-title">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="reveal max-w-2xl">
			<p class="font-script text-4xl text-leaf-dark">Loved by many</p>
			<h2 id="reviews-title" class="mt-1 font-display text-4xl font-black text-cocoa sm:text-5xl">
				What our guests say
			</h2>
		</div>
		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each testimonials as t}
				<figure class="reveal flex flex-col rounded-3xl bg-white p-6 shadow-sm">
					<Stars rating={t.rating} size={16} />
					<blockquote class="mt-4 flex-1 leading-relaxed text-ink/85">“{t.text}”</blockquote>
					<figcaption class="mt-5 border-t border-line pt-4">
						<p class="font-bold text-cocoa">{t.name}</p>
						<p class="text-sm text-muted">{t.area}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>
