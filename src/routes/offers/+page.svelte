<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { inr, menuItems, offers } from '#lib/data/site.ts';

	let addedOffer = $state('');
	function addDish(name: string | undefined, offerId: string) {
		if (!name) return;
		const item = menuItems.find((m) => m.name === name);
		if (item) addToOrder(item.name, item.price);
		addedOffer = offerId;
		window.setTimeout(() => {
			if (addedOffer === offerId) addedOffer = '';
		}, 2000);
	}
</script>

<svelte:head>
	<title>Offers — Kanigiri Restaurant | Family Packs, Thali & Direct-Order Deals</title>
	<meta
		name="description"
		content="Kanigiri offers: 10% off direct orders, family bucket biryani ₹899, Andhra lunch thali ₹199, and every 5th biryani free."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/offers" />
</svelte:head>

<PageHero
	script="Good deals"
	title="Offers & combos"
	sub="One honest perk for ordering direct beats a discount we cannot sustain. All offers are mock — the real ones replace these after the client approves the design."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Current offers">
	<div class="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		{#each offers as offer}
			<article class="flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-line">
				<span class="w-fit rounded-full bg-leaf px-3 py-1 text-xs font-black tracking-wider text-white uppercase">{offer.tag}</span>
				<h2 class="mt-3 font-display text-2xl font-black text-cocoa">{offer.title}</h2>
				<p class="mt-2 flex-1 leading-relaxed text-muted">{offer.detail}</p>
				<div class="mt-5 flex flex-wrap gap-3">
					<a
						href="/order"
						class="flex min-h-11 items-center rounded-full bg-mango px-6 text-xs font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-mango-dark hover:text-white"
					>
						Order now
					</a>
					{#if offer.dish}
						<button
							type="button"
							onclick={() => addDish(offer.dish, offer.id)}
							class="flex min-h-11 items-center rounded-full border-2 border-mango px-6 text-xs font-black tracking-wider text-mango-dark uppercase"
						>
							{addedOffer === offer.id ? '✓ Added' : `Add ${offer.dish}`}
						</button>
					{/if}
				</div>
			</article>
		{/each}
	</div>

	<div class="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="rounded-3xl bg-leaf p-8 text-center text-white">
			<p class="font-script text-4xl text-white/90">Why order direct?</p>
			<h2 class="mt-1 font-display text-3xl font-black">Save 10% — and we keep the rest.</h2>
			<p class="mx-auto mt-3 max-w-xl leading-relaxed text-white/90">
				Food apps take 15–30% commission. Ordering here costs us about 2% — so the saving comes straight to
				your plate, and your loyalty points actually mean something.
			</p>
			<p class="mt-4 text-sm font-semibold text-white/80">Zomato & Swiggy links stay for discovery — but regulars order direct.</p>
		</div>
	</div>
</section>
