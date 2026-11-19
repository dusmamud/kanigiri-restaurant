<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { giftCards, inr, site } from '#lib/data/site.ts';

	// Pick an amount, then call or WhatsApp — no online payment on this site.
	let selected = $state(giftCards.amounts[1]);

	const whatsappText = $derived(
		`Hi Kanigiri! I'd like to buy a ${inr(selected)} gift card. Please confirm how to collect it.`
	);
	const whatsappHref = $derived(`${site.whatsappHref}?text=${encodeURIComponent(whatsappText)}`);
</script>

<svelte:head>
	<title>Gift Cards — Kanigiri Restaurant | Give a Taste of Andhra</title>
	<meta
		name="description"
		content="Kanigiri gift cards from ₹500 to ₹5000, valid for dine-in, takeaway and delivery for 12 months. Buy by phone or WhatsApp — no online payment."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/gift-cards" />
</svelte:head>

<PageHero
	script="Give a taste of Andhra"
	title="Gift cards"
	sub="A Kanigiri gift card is dinner sorted — biryani, a family bucket, or a full Andhra feast. Pick an amount, call or WhatsApp us, and we confirm the card the same day."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Choose a gift card amount">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="font-display text-2xl font-black text-cocoa sm:text-3xl">Pick an amount</h2>
		<p class="mt-2 max-w-2xl text-base leading-relaxed text-muted">
			Every card works for dine-in, takeaway and delivery, and is valid for 12 months from the day you buy it.
		</p>

		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Gift card amounts">
			{#each giftCards.amounts as amount}
				<button
					type="button"
					onclick={() => (selected = amount)}
					aria-pressed={selected === amount}
					class="flex min-h-12 flex-col items-start rounded-3xl p-6 text-left ring-2 transition-colors {selected ===
					amount
						? 'bg-leaf text-white ring-leaf-dark'
						: 'bg-cream text-cocoa ring-line hover:ring-leaf'}"
				>
					<span class="font-display text-3xl font-black">{inr(amount)}</span>
					<span class="mt-1 text-base {selected === amount ? 'text-white/90' : 'text-muted'}">
						{#if amount === 500}One biryani &amp; a drink{:else if amount === 1000}Dinner for two{:else if amount === 2500}Family feast{:else}A celebration table{/if}
					</span>
					<span class="mt-3 text-sm font-black tracking-wider uppercase {selected === amount ? 'text-white' : 'text-leaf-dark'}">
						{selected === amount ? '✓ Selected' : 'Select'}
					</span>
				</button>
			{/each}
		</div>

		<div class="mt-8 rounded-3xl bg-lavender p-6 sm:p-8">
			<h2 class="font-display text-2xl font-black text-cocoa">Buy your {inr(selected)} gift card</h2>
			<p class="mt-2 max-w-2xl text-base leading-relaxed text-muted">{giftCards.howToBuy}</p>
			<div class="mt-5 flex flex-wrap gap-3">
				<a
					href={site.phoneHref}
					class="flex min-h-12 items-center rounded-full bg-mango px-6 text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-mango-dark hover:text-white"
				>
					Call {site.phoneDisplay}
				</a>
				<a
					href={whatsappHref}
					target="_blank"
					rel="noopener noreferrer"
					class="flex min-h-12 items-center rounded-full border-2 border-leaf px-6 text-sm font-black tracking-wider text-leaf-dark uppercase transition-colors hover:bg-leaf hover:text-white"
				>
					WhatsApp us
				</a>
			</div>
			<p class="mt-4 text-base text-muted">
				No online payment is taken on this site — you pay when you collect the card, or on delivery.
			</p>
		</div>
	</div>
</section>

<section class="bg-cream py-10 sm:py-14" aria-label="How gift cards work">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-2">
			<div>
				<h2 class="font-display text-2xl font-black text-cocoa sm:text-3xl">How it works</h2>
				<ol class="mt-4 space-y-3 text-base leading-relaxed text-muted">
					<li><strong class="text-cocoa">1. Pick an amount</strong> — ₹500, ₹1000, ₹2500 or ₹5000.</li>
					<li><strong class="text-cocoa">2. Call or WhatsApp us</strong> — tell us the amount and who it is for.</li>
					<li><strong class="text-cocoa">3. We confirm on WhatsApp</strong> — the card is ready for pickup, or we deliver it with your next order.</li>
					<li><strong class="text-cocoa">4. They redeem it</strong> — at the counter, on the phone, or on this site when they order.</li>
				</ol>
				<p class="mt-4 text-base leading-relaxed text-muted">
					Gift cards make a good first visit too — the recipient gets a reason to try us, and you get to
					look generous. If they have never eaten here, point them at the
					<a class="font-bold text-leaf-dark underline" href="/first-visit">first-visit guide</a>.
				</p>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-black text-cocoa">Terms</h2>
				<ul class="mt-4 space-y-3 text-base leading-relaxed text-muted">
					{#each giftCards.terms as term}
						<li class="flex gap-2">
							<span class="text-leaf-dark" aria-hidden="true">✓</span>
							<span>{term}</span>
						</li>
					{/each}
				</ul>
				<p class="mt-4 text-base leading-relaxed text-muted">
					Questions about a card — balance, expiry, or a lost card? Call
					<a class="font-bold break-words text-leaf-dark underline" href={site.phoneHref}>{site.phoneDisplay}</a>
					and we will sort it out.
				</p>
			</div>
		</div>

		<div class="mt-10 flex flex-wrap justify-center gap-3">
			<a
				href="/order"
				class="flex min-h-12 items-center rounded-full bg-mango px-6 text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-mango-dark hover:text-white"
			>
				Order food
			</a>
			<a
				href="/contact"
				class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-6 text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-cocoa hover:text-white"
			>
				Contact us
			</a>
		</div>
	</div>
</section>
