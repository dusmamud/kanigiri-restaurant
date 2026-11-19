<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { firstVisitSteps, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>First Visit Guide — Kanigiri Restaurant | What to Order First</title>
	<meta
		name="description"
		content="New to Kanigiri? Start with the Mutton Biryani, pick your spice level, and know what to expect. Veg, Jain, ordering, delivery and table booking — the first-visit guide."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/first-visit" />
</svelte:head>

<PageHero
	script="New here? Start here"
	title="First visit guide"
	sub="Six things to know before your first Kanigiri meal — what to order, how spicy it really is, how ordering works, and what it costs."
/>

<section class="bg-white py-10 sm:py-14" aria-label="First visit steps">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<ol class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each firstVisitSteps as item}
				<li class="flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-line">
					<span
						class="flex h-12 w-12 items-center justify-center rounded-full bg-leaf font-display text-2xl font-black text-white"
						aria-hidden="true"
					>
						{item.step}
					</span>
					<h2 class="mt-4 font-display text-2xl font-black text-cocoa">{item.title}</h2>
					<p class="mt-2 flex-1 text-base leading-relaxed text-muted">{item.detail}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="bg-lavender py-10 sm:py-14" aria-label="Spice guide">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="font-display text-2xl font-black text-cocoa sm:text-3xl">The spice guide</h2>
		<p class="mt-2 max-w-2xl text-base leading-relaxed text-muted">
			Every dish on the menu lists its spice level. Here is what the levels mean — and what to do if a dish
			is hotter than you expected.
		</p>
		<div class="mt-6 grid gap-4 md:grid-cols-3">
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<p class="text-base font-black tracking-wider text-leaf-dark uppercase">Mild</p>
				<h3 class="mt-2 font-display text-xl font-black text-cocoa">Gentle heat</h3>
				<p class="mt-2 text-base leading-relaxed text-muted">
					Veg Biryani, Palak Paneer, Dal Makhani, Jeera Chawal. Safe for kids and spice-shy guests — flavour
					first, fire last.
				</p>
			</article>
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<p class="text-base font-black tracking-wider text-mango-dark uppercase">Medium</p>
				<h3 class="mt-2 font-display text-xl font-black text-cocoa">Warm, not wild</h3>
				<p class="mt-2 text-base leading-relaxed text-muted">
					Mutton Biryani, Chicken Biryani, Salan. The Guntur chillies are there for flavour. If you are
					unsure, start here — and ask us to tone it down.
				</p>
			</article>
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<p class="text-base font-black tracking-wider text-red-700 uppercase">Fiery</p>
				<h3 class="mt-2 font-display text-xl font-black text-cocoa">The real Andhra heat</h3>
				<p class="mt-2 text-base leading-relaxed text-muted">
					Kadai Chicken, Andhra Chicken Curry, Gongura Mutton. Hot on purpose. Order raita or curd rice
					alongside — they are the coolers, not an afterthought.
				</p>
			</article>
		</div>
		<p class="mt-6 max-w-2xl text-base leading-relaxed text-muted">
			Veg or non-veg, the kitchen cooks them in separate vessels. Jain preparations (no onion, no garlic, no
			root vegetables) are available with 2 hours notice for most veg dishes — mention it when you order or
			book.
		</p>
	</div>
</section>

<section class="bg-white py-10 sm:py-14" aria-label="Plan your first visit">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-2">
			<div class="rounded-3xl bg-cream p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-black text-cocoa">Good first orders</h2>
				<ul class="mt-4 space-y-3 text-base leading-relaxed text-muted">
					<li>
						<strong class="text-cocoa">One person, first time:</strong>
						<a class="font-bold text-leaf-dark underline" href="/menu/mutton-biryani">Mutton Biryani</a> (₹360) — the signature, with raita and salan.
					</li>
					<li>
						<strong class="text-cocoa">Vegetarian:</strong>
						<a class="font-bold text-leaf-dark underline" href="/menu/palak-paneer">Palak Paneer</a> (₹200) with
						<a class="font-bold text-leaf-dark underline" href="/menu/jeera-chawal">Jeera Chawal</a> (₹180).
					</li>
					<li>
						<strong class="text-cocoa">Feeling brave:</strong>
						<a class="font-bold text-leaf-dark underline" href="/menu/kadai-chicken">Kadai Chicken</a> (₹220) — our hottest chicken — with curd rice (₹140) to cool down.
					</li>
					<li>
						<strong class="text-cocoa">Two people:</strong> one biryani, one curry, one naan — about ₹700–900 all in.
					</li>
				</ul>
			</div>
			<div class="rounded-3xl bg-cream p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-black text-cocoa">Before you come</h2>
				<ul class="mt-4 space-y-3 text-base leading-relaxed text-muted">
					<li><strong class="text-cocoa">Hours:</strong> {site.hours}.</li>
					<li>
						<strong class="text-cocoa">Find us:</strong>
						<span class="break-words">{site.addressShort}</span> — see the
						<a class="font-bold text-leaf-dark underline" href="/contact">contact page</a> for the map.
					</li>
					<li>
						<strong class="text-cocoa">Questions?</strong> Call
						<a class="font-bold break-words text-leaf-dark underline" href={site.phoneHref}>{site.phoneDisplay}</a>
						or
						<a class="font-bold break-words text-leaf-dark underline" href={site.whatsappHref}>WhatsApp us</a>.
					</li>
					<li><strong class="text-cocoa">Delivery:</strong> 30–40 minutes in Kanigiri town, free in town; free above ₹499 within 5 km.</li>
				</ul>
			</div>
		</div>

		<div class="mt-10 flex flex-wrap justify-center gap-3">
			<a
				href="/reservations"
				class="flex min-h-12 items-center rounded-full bg-mango px-6 text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-mango-dark hover:text-white"
			>
				Book a table
			</a>
			<a
				href="/menu"
				class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-6 text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-cocoa hover:text-white"
			>
				See the menu
			</a>
		</div>
	</div>
</section>
