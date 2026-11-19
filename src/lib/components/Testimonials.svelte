<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { allReviews } from '#lib/data/site.ts';

	let emblaApi:
		| {
				scrollPrev: () => void;
				scrollNext: () => void;
				scrollTo: (i: number) => void;
				selectedScrollSnap: () => number;
				on: (e: string, f: () => void) => void;
		  }
		| undefined = $state();
	let selected = $state(0);

	function onInit(e: CustomEvent) {
		const api = e.detail;
		emblaApi = api;
		api.on('select', () => (selected = api.selectedScrollSnap()));
	}
</script>

<section id="reviews" class="bg-lavender py-16 sm:py-20" aria-labelledby="reviews-title">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="reveal flex flex-wrap items-end justify-between gap-4">
			<div class="max-w-2xl">
				<p class="font-script text-4xl text-leaf-dark">Loved by many</p>
				<h2 id="reviews-title" class="mt-1 font-display text-4xl font-black text-cocoa sm:text-5xl">
					What our guests say
				</h2>
				<p class="mt-2 flex items-center gap-2 text-muted">
					<Stars rating={4.5} size={18} showValue />
					<span>4.5★ · 521 reviews · <a href="/reviews" class="font-semibold text-leaf-dark underline underline-offset-4">Read all →</a></span>
				</p>
			</div>
			<div class="hidden gap-2 sm:flex">
				<button type="button" onclick={() => emblaApi?.scrollPrev()} aria-label="Previous review" class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-cocoa shadow-sm ring-1 ring-line transition-colors hover:bg-mango">
					<ChevronLeft size={20} aria-hidden="true" />
				</button>
				<button type="button" onclick={() => emblaApi?.scrollNext()} aria-label="Next review" class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-cocoa shadow-sm ring-1 ring-line transition-colors hover:bg-mango">
					<ChevronRight size={20} aria-hidden="true" />
				</button>
			</div>
		</div>

		<div
			class="mt-10 overflow-hidden"
			use:emblaCarouselSvelte={{ options: { loop: true, align: 'start' }, plugins: [Autoplay({ delay: 5000, stopOnInteraction: true })] }}
			onemblaInit={onInit}
		>
			<div class="flex gap-5">
				{#each allReviews as t}
					<figure class="flex min-w-0 shrink-0 basis-[85%] flex-col rounded-3xl bg-white p-6 shadow-sm sm:basis-[47%] lg:basis-[31.5%]">
						<Stars rating={t.rating} size={16} />
						<blockquote class="mt-4 flex-1 leading-relaxed text-ink/85">"{t.text}"</blockquote>
						<figcaption class="mt-5 border-t border-line pt-4">
							<p class="font-bold text-cocoa">{t.name}</p>
							<p class="text-sm text-muted">{t.area} · {t.dish}</p>
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>

		<div class="mt-6 flex justify-center gap-2" role="tablist" aria-label="Choose review">
			{#each allReviews as _, i}
				<button
					type="button"
					role="tab"
					aria-selected={selected === i}
					aria-label={`Go to review ${i + 1}`}
					onclick={() => emblaApi?.scrollTo?.(i)}
					class="h-2.5 rounded-full transition-all duration-200 {selected === i ? 'w-7 bg-leaf' : 'w-2.5 bg-line'}"
				></button>
			{/each}
		</div>
	</div>
</section>
