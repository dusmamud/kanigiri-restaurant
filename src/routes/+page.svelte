<script lang="ts">
	import { Bike, Clock, MapPin, Phone, ShieldCheck, Star } from '@lucide/svelte';
	import About from '#lib/components/About.svelte';
	import DishCarousel from '#lib/components/DishCarousel.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Marquee from '#lib/components/Marquee.svelte';
	import MenuSection from '#lib/components/MenuSection.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Testimonials from '#lib/components/Testimonials.svelte';
	import { instagramPosts, offers, site } from '#lib/data/site.ts';
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
	<Marquee />

	<!-- Trust strip -->
	<section class="border-b border-line bg-white py-6" aria-label="Why trust Kanigiri">
		<div class="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-center sm:px-6 lg:px-8">
			<p class="flex items-center gap-2 text-sm font-bold text-cocoa">
				<Star size={17} class="fill-mango text-mango" aria-hidden="true" /> 4.5★ · 521 reviews
			</p>
			<p class="text-sm font-bold text-cocoa">14+ years serving Andhra</p>
			<p class="text-sm font-bold text-cocoa">50,000+ orders delivered</p>
			<p class="flex items-center gap-2 text-sm font-bold text-cocoa">
				<ShieldCheck size={17} class="text-leaf-dark" aria-hidden="true" /> FSSAI-certified kitchen
			</p>
		</div>
	</section>

	<DishCarousel />
	<About />
	<MenuSection />

	<!-- Offers strip -->
	<section class="bg-lavender py-14 sm:py-16" aria-labelledby="offers-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p class="font-script text-4xl text-leaf-dark">Good deals</p>
					<h2 id="offers-title" class="mt-1 font-display text-4xl font-black text-cocoa sm:text-5xl">Offers & combos</h2>
				</div>
				<a href="/offers" class="font-bold text-leaf-dark underline underline-offset-4">All offers →</a>
			</div>
			<div class="mt-8 grid gap-4 md:grid-cols-3">
				{#each offers.slice(0, 3) as offer}
					<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
						<span class="w-fit rounded-full bg-leaf px-3 py-1 text-xs font-black tracking-wider text-white uppercase">{offer.tag}</span>
						<h3 class="mt-3 font-display text-xl font-black text-cocoa">{offer.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-muted">{offer.detail}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<Testimonials />

	<!-- Hygiene & why direct -->
	<section class="bg-white py-14 sm:py-16" aria-label="Hygiene and direct ordering">
		<div class="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
			<div class="rounded-3xl bg-cream p-6 ring-1 ring-line sm:p-8">
				<p class="font-script text-4xl text-leaf-dark">Clean kitchen</p>
				<h2 class="mt-1 font-display text-2xl font-black text-cocoa sm:text-3xl">Hygiene you can taste</h2>
				<p class="mt-3 leading-relaxed text-muted">
					{site.fssai}. Masala ground fresh every morning, vegetables from the morning market, and veg and
					non-veg cooked in separate vessels. If your order arrives cold or wrong, we replace it or refund
					it within 30 minutes — no questions asked.
				</p>
			</div>
			<div class="rounded-3xl bg-leaf p-6 text-white sm:p-8">
				<p class="font-script text-4xl text-white/90">Save 10%</p>
				<h2 class="mt-1 font-display text-2xl font-black sm:text-3xl">Why order direct?</h2>
				<p class="mt-3 leading-relaxed text-white/90">
					Food apps take 15–30% commission. Ordering here costs us about 2% — so the saving comes straight
					to your plate. Order direct, save 10%, and your loyalty actually means something.
				</p>
				<a href="/order" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-black tracking-wider text-cocoa uppercase">
					Order direct →
				</a>
			</div>
		</div>
	</section>

	<!-- Location + hours -->
	<section class="bg-lavender py-14 sm:py-16" aria-labelledby="visit-title">
		<div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
			<div>
				<p class="font-script text-4xl text-leaf-dark">Come by</p>
				<h2 id="visit-title" class="mt-1 font-display text-4xl font-black text-cocoa sm:text-5xl">Visit us</h2>
				<p class="mt-3 flex items-start gap-2 text-muted">
					<MapPin size={18} class="mt-0.5 shrink-0 text-leaf-dark" aria-hidden="true" /> {site.address}
				</p>
				<p class="mt-2 flex items-center gap-2 text-muted">
					<Clock size={18} class="shrink-0 text-leaf-dark" aria-hidden="true" /> {site.hours} · Last kitchen order 9:45 PM
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<a
					href="/reservations"
					class="flex min-h-12 items-center rounded-full bg-mango px-7 text-sm font-black tracking-wider text-cocoa uppercase shadow"
				>
					Book a table
				</a>
				<a
					href="/contact"
					class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 text-sm font-black tracking-wider text-cocoa uppercase"
				>
					Directions & hours
				</a>
			</div>
		</div>
	</section>

	<!-- Instagram feed -->
	<section class="bg-white py-14 sm:py-16" aria-labelledby="insta-title">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p class="font-script text-4xl text-leaf-dark">Follow along</p>
					<h2 id="insta-title" class="mt-1 font-display text-4xl font-black text-cocoa sm:text-5xl">@kanigiri.eats</h2>
				</div>
				<a href="https://www.instagram.com/" target="_blank" rel="noopener" class="font-bold text-leaf-dark underline underline-offset-4">Follow on Instagram →</a>
			</div>
			<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
				{#each instagramPosts as post}
					<a
						href="https://www.instagram.com/"
						target="_blank"
						rel="noopener"
						class="group overflow-hidden rounded-3xl bg-lavender ring-1 ring-line"
						aria-label={post.caption}
					>
						<Picture
							name={post.image}
							alt={post.alt}
							width={480}
							height={360}
							sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
							transparent
							imgClass="aspect-square w-full object-contain p-2 drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
						/>
						<p class="line-clamp-2 bg-white px-3 py-2 text-xs leading-snug text-muted">{post.caption}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Order CTA band -->
	<section class="bg-leaf py-14" aria-labelledby="cta-title">
		<div class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
			<div class="reveal">
				<p class="font-script text-4xl text-white/90">Hungry right now?</p>
				<h2 id="cta-title" class="mt-1 font-display text-3xl font-black text-white sm:text-4xl">
					Hot biryani, at your door in 30–40 minutes.
				</h2>
			</div>
			<div class="reveal flex flex-wrap justify-center gap-3">
				<a
					href="/order"
					class="flex min-h-14 shrink-0 items-center gap-2 rounded-full bg-white px-8 text-sm font-black tracking-wider text-cocoa uppercase shadow transition-transform duration-200 hover:scale-105"
				>
					Order Online
				</a>
				<a
					href={site.phoneHref}
					class="flex min-h-14 shrink-0 items-center gap-2 rounded-full border-2 border-white px-8 text-sm font-black tracking-wider text-white uppercase transition-colors duration-200 hover:bg-white hover:text-cocoa"
				>
					<Phone size={18} aria-hidden="true" /> Call {site.phoneDisplay}
				</a>
			</div>
		</div>
	</section>
</div>
