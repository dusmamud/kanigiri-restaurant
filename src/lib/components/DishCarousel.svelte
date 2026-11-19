<script lang="ts">
	import { Check, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { dishes, inr, type Dish } from '#lib/data/site.ts';

	let scroller: HTMLDivElement | undefined = $state();
	let addedId = $state('');

	function scrollByCard(dir: 1 | -1) {
		const el = scroller;
		if (!el) return;
		const card = el.querySelector<HTMLElement>('[data-dish-card]');
		const w = card ? card.offsetWidth + 24 : 360;
		el.scrollBy({ left: dir * w, behavior: 'smooth' });
	}

	function order(dish: Dish) {
		addToOrder(dish.name, dish.price);
		addedId = dish.id;
		window.setTimeout(() => {
			if (addedId === dish.id) addedId = '';
		}, 2000);
	}
</script>

<section class="relative bg-white pt-6 pb-20" aria-labelledby="dishes-title">
	<h2 id="dishes-title" class="sr-only">Popular dishes</h2>
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Arrows, at the edges like the reference -->
		<button
			type="button"
			onclick={() => scrollByCard(-1)}
			aria-label="Previous dishes"
			class="absolute top-1/2 -left-1 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#e9e7ec] text-cocoa/70 shadow-sm transition-all duration-200 hover:bg-mango hover:text-cocoa sm:flex lg:-left-4"
		>
			<ChevronLeft size={22} aria-hidden="true" />
		</button>
		<button
			type="button"
			onclick={() => scrollByCard(1)}
			aria-label="Next dishes"
			class="absolute top-1/2 -right-1 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#e9e7ec] text-cocoa/70 shadow-sm transition-all duration-200 hover:bg-mango hover:text-cocoa sm:flex lg:-right-4"
		>
			<ChevronRight size={22} aria-hidden="true" />
		</button>

		<div
			bind:this={scroller}
			class="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pt-14 pb-4"
			role="region"
			aria-label="Popular dishes carousel"
		>
			{#each dishes as dish, i (dish.id)}
				<article
					data-dish-card
					class="relative w-[86%] shrink-0 snap-start rounded-[1.75rem] pt-0 pb-7 shadow-lg shadow-cocoa/10 sm:w-[46%] lg:w-[31.5%] {i % 2 === 0
						? 'bg-leaf'
						: 'bg-mango'}"
				>
					<!-- Dish photo overlapping the top edge -->
					<div class="relative mx-5 -mt-10 aspect-[4/3]">
						<div class="h-full rotate-[-2deg]">
							<!-- Transparent tray cutout: floats above the card, card colour
							     shows through around it, like the reference. Fixed 4:3 box
							     with object-contain keeps every card the same height. -->
							<Picture
								name={dish.image}
								alt={dish.alt}
								width={1200}
								height={900}
								sizes="(max-width: 640px) 86vw, (max-width: 1024px) 46vw, 31vw"
								transparent
								imgClass="h-full w-full object-contain drop-shadow-xl"
							/>
						</div>
						<!-- Veg / non-veg mark -->
						<span
							class="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-md bg-white shadow"
							aria-label={dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
							title={dish.veg ? 'Vegetarian' : 'Non-vegetarian'}
						>
							<span class="h-3 w-3 rounded-full {dish.veg ? 'bg-leaf' : 'bg-[#a33b1f]'}"></span>
						</span>
						{#if dish.tag}
							<span
								class="absolute top-3 right-3 rounded-full bg-cocoa px-3 py-1 text-[0.65rem] font-black tracking-wider text-white uppercase"
								>{dish.tag}</span
							>
						{/if}
						<!-- Price badge -->
						<div
							class="absolute -right-2 -bottom-6 flex h-24 w-24 rotate-3 flex-col items-center justify-center rounded-full bg-white text-leaf-dark shadow-lg ring-2 ring-white"
							aria-label={`Price ${inr(dish.price)}, was ${inr(dish.mrp)}`}
						>
							<span class="text-[0.55rem] font-bold tracking-[0.25em] text-muted">PRICE</span>
							<span class="font-sans text-[1.55rem] leading-none font-black tracking-tight"
								>{inr(dish.price)}</span
							>
							<span class="font-sans text-xs font-semibold text-muted line-through">{inr(dish.mrp)}</span>
						</div>
					</div>

					<div class="px-6 pt-10">
						<p class="font-script text-4xl leading-none text-white/95">{dish.script}</p>
						<h3 class="font-display text-4xl leading-tight font-black text-white">{dish.name}</h3>
						<p class="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
							<Stars rating={dish.rating} size={13} />
							<span class="text-sm font-black text-cocoa">{dish.rating.toFixed(1)}</span>
							<span class="text-xs font-medium text-muted">({dish.reviews})</span>
						</p>
						<p class="mt-4 line-clamp-3 min-h-[4.2rem] text-[0.95rem] leading-relaxed text-white/90">
							{dish.desc}
						</p>
						<div class="mt-5 flex items-center justify-between gap-3">
							<button
								type="button"
								onclick={() => order(dish)}
								class="flex min-h-11 items-center gap-2 rounded-full bg-cocoa px-6 text-xs font-black tracking-wider text-white uppercase shadow transition-all duration-200 hover:bg-black active:scale-95"
							>
								{#if addedId === dish.id}
									<Check size={15} aria-hidden="true" /> Added
								{:else}
									Order Now
								{/if}
							</button>
							<span class="text-xs font-semibold text-white/80">{dish.serves}</span>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<!-- Mobile arrows -->
		<div class="mt-2 flex justify-center gap-3 sm:hidden">
			<button
				type="button"
				onclick={() => scrollByCard(-1)}
				aria-label="Previous dishes"
				class="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9e7ec] text-cocoa"
			>
				<ChevronLeft size={20} aria-hidden="true" />
			</button>
			<button
				type="button"
				onclick={() => scrollByCard(1)}
				aria-label="Next dishes"
				class="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9e7ec] text-cocoa"
			>
				<ChevronRight size={20} aria-hidden="true" />
			</button>
		</div>
	</div>
</section>
