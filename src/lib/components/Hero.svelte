<script lang="ts">
	import { Bike, Clock, ShieldCheck } from '@lucide/svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { heroDish, inr, site } from '#lib/data/site.ts';

	let added = $state(false);
	function orderNow() {
		addToOrder(heroDish.name, heroDish.price);
		added = true;
		window.setTimeout(() => (added = false), 2000);
	}
</script>

<section class="relative overflow-hidden bg-lavender" aria-labelledby="hero-title">
	<div class="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-28 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pt-14 lg:pb-36">
		<!-- Photo — the hero dish, same composition as the reference -->
		<div class="reveal relative order-2 lg:order-1">
			<div class="rotate-[-1.5deg]">
				<Picture
					name={heroDish.image}
					alt={heroDish.alt}
					width={1920}
					height={1280}
					sizes="(max-width: 1024px) 100vw, 50vw"
					eager
					imgClass="w-full rounded-[2rem] shadow-2xl shadow-cocoa/20"
				/>
			</div>
			<p
				class="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 py-2 pr-4 pl-2 text-xs font-bold text-cocoa shadow-lg sm:left-8"
			>
				<span class="flex h-7 w-7 items-center justify-center rounded-full bg-leaf text-white">
					<Clock size={14} aria-hidden="true" />
				</span>
				Ready in 30–40 min · Free delivery over ₹499
			</p>
		</div>

		<!-- Copy -->
		<div class="reveal relative order-1 lg:order-2 lg:pl-6">
			<!-- Price badge, like the green stamp in the reference -->
			<div
				class="absolute -top-2 right-0 flex h-24 w-24 rotate-6 flex-col items-center justify-center rounded-full bg-leaf text-white shadow-lg ring-2 ring-white/70 ring-dashed sm:h-28 sm:w-28"
				aria-label={`Price ${inr(heroDish.price)}, was ${inr(heroDish.mrp)}`}
			>
				<span class="text-[0.6rem] font-bold tracking-[0.25em]">PRICE</span>
				<span class="font-sans text-2xl font-black tracking-tight sm:text-3xl">{inr(heroDish.price)}</span>
				<span class="font-sans text-sm font-semibold text-white/70 line-through">{inr(heroDish.mrp)}</span>
			</div>

			<p class="font-script text-5xl text-cocoa-soft sm:text-6xl">{heroDish.script}</p>
			<h1
				id="hero-title"
				class="font-display text-6xl leading-[0.95] font-black tracking-tight text-cocoa sm:text-7xl lg:text-8xl"
			>
				{heroDish.name}
			</h1>

			<p class="mt-5 flex flex-wrap items-center gap-2">
				<Stars rating={heroDish.rating} size={20} showValue />
				<a href="#reviews" class="text-sm font-medium text-muted underline underline-offset-4 hover:text-cocoa"
					>{heroDish.reviews} Reviews</a
				>
				<span class="rounded-full bg-mango-soft px-3 py-1 text-xs font-bold text-cocoa">{heroDish.tag}</span>
			</p>

			<div class="mt-6 max-w-xl rounded-2xl bg-white p-6 shadow-sm">
				<p class="leading-relaxed text-[1.05rem] text-ink/90">{heroDish.desc}</p>
				<p class="mt-3 text-sm font-semibold text-muted">{heroDish.serves} · Spice level: Medium</p>
			</div>

			<div class="mt-7 flex flex-wrap items-center gap-4">
				<button
					type="button"
					onclick={orderNow}
					class="flex h-13 min-h-13 items-center rounded-full bg-mango px-8 text-sm font-black tracking-wider text-cocoa uppercase shadow-md transition-all duration-200 hover:bg-mango-dark hover:text-white active:scale-95"
				>
					{added ? '✓ Added to order' : 'Order Now'}
				</button>
				<a
					href="#menu"
					class="flex h-13 min-h-13 items-center rounded-full border-2 border-mango bg-white/60 px-8 text-sm font-black tracking-wider text-mango-dark uppercase transition-colors duration-200 hover:bg-mango hover:text-cocoa"
				>
					Explore More
				</a>
			</div>

			<ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-cocoa/80">
				<li class="flex items-center gap-2">
					<Bike size={17} class="text-leaf-dark" aria-hidden="true" /> Live order tracking
				</li>
				<li class="flex items-center gap-2">
					<ShieldCheck size={17} class="text-leaf-dark" aria-hidden="true" /> FSSAI-certified kitchen
				</li>
				<li class="flex items-center gap-2">
					<Clock size={17} class="text-leaf-dark" aria-hidden="true" /> {site.hours}
				</li>
			</ul>
		</div>
	</div>

	<!-- Wavy edge into the white dishes section, like the reference -->
	<svg
		class="absolute inset-x-0 bottom-0 h-[42px] w-full sm:h-[64px]"
		viewBox="0 0 1440 64"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path
			d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
			fill="#ffffff"
		/>
	</svg>
</section>
