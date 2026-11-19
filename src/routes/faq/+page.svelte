<script lang="ts">
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { faqs } from '#lib/data/site.ts';

	// No FAQPage JSON-LD: Google stopped showing FAQ rich results in May 2026.
	// The visible FAQs stay — they are useful for visitors and AI answers.
</script>

<svelte:head>
	<title>FAQ — Kanigiri Restaurant | Spice, Delivery, Booking & More</title>
	<meta
		name="description"
		content="Answers to the questions guests actually ask: spice levels, delivery areas, minimum order, bulk orders, veg options, allergens, payment methods and parking."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/faq" />
</svelte:head>

<PageHero
	script="Good to know"
	title="Frequently asked questions"
	sub="Spice, delivery, bookings, bulk orders — the questions guests actually ask, answered straight."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Frequently asked questions">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<FaqAccordion items={faqs} />
		<p class="mt-8 text-center text-muted">
			Still stuck? Call <a class="font-bold text-leaf-dark underline underline-offset-4" href="tel:+919000790007">+91 90007 90007</a> or
			<a class="font-bold text-leaf-dark underline underline-offset-4" href="/contact"> message us</a>.
		</p>
	</div>
</section>
