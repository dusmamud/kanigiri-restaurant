<script lang="ts">
	import { Flame, Leaf, Timer } from '@lucide/svelte';
	import Counter from '#lib/components/Counter.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site, stats } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>About Us — Kanigiri Restaurant | Taste of Andhra Since 2010</title>
	<meta
		name="description"
		content="Kanigiri started as a small family kitchen in 2010. Wood-fire dum biryani, Guntur chillies, gongura from our own farms — Andhra food the way home made it."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/about" />
</svelte:head>

<PageHero
	script="Since 2010"
	title="Andhra on a plate, the way home made it."
	sub="Kanigiri started as a small family kitchen with one handi, one wood fire and a stubborn belief: biryani should smell like a festival before the lid comes off."
/>

<section class="bg-white py-12 sm:py-16" aria-label="Our story">
	<div class="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
		<div class="animate-float">
			<Picture
				name="mutton-biryani-transparent"
				alt="Mutton biryani tray with raita and salan"
				width={1200}
				height={900}
				sizes="(max-width: 1024px) 100vw, 50vw"
				transparent
				imgClass="w-full drop-shadow-2xl"
			/>
		</div>
		<div>
			<h2 class="font-display text-3xl font-black text-cocoa sm:text-4xl">Why "Kanigiri"?</h2>
			<p class="mt-4 leading-relaxed text-muted">
				Kanigiri is a town in Andhra Pradesh — dusty roads, chilli fields, and kitchens where the masala is
				ground by hand every morning. Our family cooked there for generations before we opened this
				restaurant in 2010. The name is a promise: the food tastes like it came from there.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Fourteen years later the recipes are unchanged — Guntur chillies, gongura from our own farms, and
				dum cooked slowly, never rushed. What changed is the room: more tables, more regulars, and a
				delivery kitchen that keeps the biryani hot on the way to you.
			</p>
			<ul class="mt-6 space-y-4">
				<li class="flex gap-3">
					<Flame size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
					<p><strong class="text-cocoa">Wood-fire dum biryani</strong> — sealed and slow-cooked to order.</p>
				</li>
				<li class="flex gap-3">
					<Leaf size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
					<p><strong class="text-cocoa">Farm vegetables and spices</strong> — sourced fresh every morning.</p>
				</li>
				<li class="flex gap-3">
					<Timer size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
					<p><strong class="text-cocoa">Hot at your door in 30–40 minutes</strong> — or your delivery is on us.</p>
				</li>
			</ul>
		</div>
	</div>
</section>

<!-- Stats with animated counters -->
<section class="bg-lavender py-12" aria-label="Kanigiri in numbers">
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
		{#each stats as stat}
			<div class="rounded-3xl bg-white p-6 text-center ring-1 ring-line">
				<p class="font-display text-4xl font-black text-leaf-dark">
					{#if stat.value === '4.5'}
						<Counter value={4.5} decimals={1} />
					{:else if stat.value === '14+'}
						<Counter value={14} suffix="+" />
					{:else if stat.value === '120+'}
						<Counter value={120} suffix="+" />
					{:else}
						<Counter value={50} suffix="k+" />
					{/if}
				</p>
				<p class="mt-1 text-sm font-semibold text-muted">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Chef + kitchen -->
<section class="bg-white py-12 sm:py-16" aria-label="The kitchen">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="font-display text-3xl font-black text-cocoa sm:text-4xl">The kitchen, in three rules</h2>
		<div class="mt-8 grid gap-4 md:grid-cols-3">
			<div class="rounded-3xl bg-cream p-6 ring-1 ring-line">
				<p class="font-script text-3xl text-leaf-dark">Rule one</p>
				<h3 class="mt-1 font-display text-xl font-black text-cocoa">Masala is ground daily</h3>
				<p class="mt-2 leading-relaxed text-muted">No pre-ground packets. Chillies, coriander and garam masala are ground fresh every morning — that is where the smell comes from.</p>
			</div>
			<div class="rounded-3xl bg-cream p-6 ring-1 ring-line">
				<p class="font-script text-3xl text-leaf-dark">Rule two</p>
				<h3 class="mt-1 font-display text-xl font-black text-cocoa">The dum is never rushed</h3>
				<p class="mt-2 leading-relaxed text-muted">Biryani cooks sealed, on low heat, for as long as it takes. A rushed dum is a dry biryani, and we would rather you wait ten minutes than eat a dry one.</p>
			</div>
			<div class="rounded-3xl bg-cream p-6 ring-1 ring-line">
				<p class="font-script text-3xl text-leaf-dark">Rule three</p>
				<h3 class="mt-1 font-display text-xl font-black text-cocoa">Veg and non-veg stay separate</h3>
				<p class="mt-2 leading-relaxed text-muted">Separate vessels, separate counters, separate hands. Vegetarian guests can order with complete confidence.</p>
			</div>
		</div>
		<p class="mt-8 text-center text-sm text-muted">
			{site.fssai} · Kitchen inspected regularly · {site.hours}
		</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a href="/menu" class="flex min-h-12 items-center rounded-full bg-mango px-7 text-sm font-black tracking-wider text-cocoa uppercase">See the menu</a>
			<a href="/reservations" class="flex min-h-12 items-center rounded-full border-2 border-mango px-7 text-sm font-black tracking-wider text-mango-dark uppercase">Book a table</a>
		</div>
	</div>
</section>
