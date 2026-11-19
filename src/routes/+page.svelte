<script lang="ts">
	import { Phone } from '@lucide/svelte';
	import About from '#lib/components/About.svelte';
	import DishCarousel from '#lib/components/DishCarousel.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import MenuSection from '#lib/components/MenuSection.svelte';
	import Testimonials from '#lib/components/Testimonials.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Kanigiri Restaurant — Taste of Andhra | Mutton Biryani & Andhra Meals</title>
	<meta
		name="description"
		content="Kanigiri Restaurant — Taste of Andhra. Mutton Biryani ₹360, Kadai Chicken, Palak Paneer, Jeera Chawal and more. Fresh, hot and delivered in 30–40 minutes."
	/>
</svelte:head>

<div id="top">
	<Hero />
	<DishCarousel />
	<About />
	<MenuSection />
	<Testimonials />

	<!-- Order CTA band -->
	<section class="bg-leaf py-14" aria-labelledby="cta-title">
		<div class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
			<div class="reveal">
				<p class="font-script text-4xl text-white/90">Hungry right now?</p>
				<h2 id="cta-title" class="mt-1 font-display text-3xl font-black text-white sm:text-4xl">
					Hot biryani, at your door in 30–40 minutes.
				</h2>
			</div>
			<a
				href={site.phoneHref}
				class="reveal flex min-h-14 shrink-0 items-center gap-2 rounded-full bg-white px-8 text-sm font-black tracking-wider text-cocoa uppercase shadow transition-transform duration-200 hover:scale-105"
			>
				<Phone size={18} aria-hidden="true" /> Call {site.phoneDisplay}
			</a>
		</div>
	</section>
</div>
