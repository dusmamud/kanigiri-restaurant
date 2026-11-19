<script lang="ts">
	import { Check, Minus, Plus, Trash2 } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder, cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { dishDetails, dishes, inr, site, chefs } from '#lib/data/site.ts';

	let { data } = $props();
	const dish = $derived(data.dish);
	const detail = $derived(dishDetails[dish.id]);
	const chef = $derived(chefs.find((c) => c.id === dish.chefId));
	const chefSpecialities = $derived(
		(chef?.speciality ?? [])
			.map((slug) => dishes.find((d) => d.slug === slug)?.name)
			.filter((n): n is string => Boolean(n))
	);
	let added = $state(false);

	function order() {
		addToOrder(dish.slug);
		added = true;
		window.setTimeout(() => (added = false), 2000);
	}

	const inCart = $derived(cart.lines.find((l) => l.slug === dish.slug));
</script>

<svelte:head>
	<title>{dish.name} — {inr(dish.price)} | Kanigiri Restaurant</title>
	<meta
		name="description"
		content={`${dish.name} — ${inr(dish.price)} at Kanigiri Restaurant. ${dish.desc}`}
	/>
	<link rel="canonical" href={`https://kanigiri-restaurant.pages.dev/menu/${dish.slug}`} />
</svelte:head>

<section class="bg-lavender pt-8 pb-12 sm:pt-12">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
		<div class="animate-float">
			<Picture
				name={dish.image}
				alt={dish.alt}
				width={1200}
				height={900}
				sizes="(max-width: 1024px) 100vw, 50vw"
				eager
				transparent
				imgClass="w-full drop-shadow-2xl"
			/>
		</div>
		<div>
			<p class="font-script text-5xl text-cocoa-soft">{dish.script}</p>
			<h1 class="font-display text-6xl leading-[0.95] font-black tracking-tight text-cocoa sm:text-7xl">
				{dish.name}
			</h1>
			<p class="mt-4 flex flex-wrap items-center gap-2">
				<Stars rating={dish.rating} size={20} showValue />
				<span class="text-sm font-medium text-muted">{dish.reviews} reviews</span>
				{#if dish.tag}
					<span class="rounded-full bg-mango-soft px-3 py-1 text-xs font-bold text-cocoa">{dish.tag}</span>
				{/if}
				<span class="rounded-full {dish.veg ? 'bg-leaf text-white' : 'bg-[#a33b1f] text-white'} px-3 py-1 text-xs font-bold"
					>{dish.veg ? 'Veg' : 'Non-veg'}</span
				>
			</p>
			<p class="mt-5 max-w-xl leading-relaxed text-[1.05rem] text-ink/90">{dish.desc}</p>
			<p class="mt-4 text-sm font-semibold text-muted">{dish.serves} · Spice: {dish.spice === 1 ? 'Mild' : dish.spice === 2 ? 'Medium' : 'Fiery'}</p>
			{#if dish.allergens.length > 0}
				<p class="mt-3 flex flex-wrap items-center gap-2 text-sm">
					<span class="font-semibold text-cocoa">Contains:</span>
					{#each dish.allergens as a}
						<span class="rounded-full bg-cream px-3 py-1 text-xs font-bold text-cocoa ring-1 ring-line">{a}</span>
					{/each}
				</p>
			{:else}
				<p class="mt-3 text-sm text-muted">No major allergens listed — ask us if you are unsure.</p>
			{/if}

			<div class="mt-6 flex flex-wrap items-center gap-4">
				<p class="font-sans text-4xl font-black text-cocoa">
					{inr(dish.price)}
					<span class="ml-2 text-xl font-semibold text-muted line-through">{inr(dish.mrp)}</span>
				</p>
				{#if inCart}
					<div class="flex items-center rounded-full bg-white shadow-sm ring-1 ring-line">
						<button
							type="button"
							onclick={() => setQty(dish.slug, inCart.qty - 1)}
							aria-label={`One less ${dish.name}`}
							class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa"
						>
							<Minus size={17} aria-hidden="true" />
						</button>
						<span class="w-8 text-center font-bold">{inCart.qty}</span>
						<button
							type="button"
							onclick={() => setQty(dish.slug, inCart.qty + 1)}
							aria-label={`One more ${dish.name}`}
							class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa"
						>
							<Plus size={17} aria-hidden="true" />
						</button>
					</div>
					<a
						href="/order"
						class="flex min-h-12 items-center rounded-full bg-mango px-7 text-sm font-black tracking-wider text-cocoa uppercase"
					>
						Go to order
					</a>
				{:else}
					<button
						type="button"
						onclick={order}
						class="flex min-h-12 items-center rounded-full bg-mango px-8 text-sm font-black tracking-wider text-cocoa uppercase shadow transition-all duration-200 hover:bg-mango-dark hover:text-white active:scale-95"
					>
						{added ? '✓ Added to order' : 'Add to order'}
					</button>
				{/if}
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-12" aria-label="About this dish">
	<div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
		<div class="rounded-3xl bg-cream p-6 ring-1 ring-line">
			<h2 class="font-display text-2xl font-black text-cocoa">The story</h2>
			<p class="mt-3 leading-relaxed text-muted">{detail.story}</p>
		</div>
		<div class="rounded-3xl bg-cream p-6 ring-1 ring-line">
			<h2 class="font-display text-2xl font-black text-cocoa">What comes with it</h2>			<ul class="mt-3 space-y-2">
				{#each detail.includes as item}
					<li class="flex items-center gap-2 text-muted">
						<Check size={16} class="text-leaf-dark" aria-hidden="true" /> {item}
					</li>
				{/each}
			</ul>
			<p class="mt-4 rounded-2xl bg-mango-soft p-4 text-sm leading-relaxed text-cocoa">
				<strong>Spice note:</strong> {detail.spiceNote}
			</p>
		</div>
	</div>
</section>

{#if chef}
	<section class="bg-white py-12" aria-labelledby="chef">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="rounded-3xl bg-cream p-6 ring-1 ring-line sm:p-8">
				<p class="text-xs font-black tracking-widest text-leaf-dark uppercase">Made by</p>
				<h2 id="chef" class="mt-1 font-display text-2xl font-black text-cocoa sm:text-3xl">
					Chef {chef.name} · {chef.role}
				</h2>
				<p class="mt-3 max-w-2xl leading-relaxed text-muted">{chef.bio}</p>
				{#if chefSpecialities.length > 0}
					<p class="mt-4 text-sm">
						<span class="font-bold text-cocoa">Also by {chef.name.split(' ')[0]}:</span>
						{#each chef.speciality as slug, i}
							{@const sName = dishes.find((d) => d.slug === slug)?.name}
							{#if sName}
								<a href={`/menu/${slug}`} class="font-bold text-leaf-dark underline underline-offset-4">{sName}</a>{i < chef.speciality.length - 1 ? ' · ' : ''}
							{/if}
						{/each}
					</p>
				{/if}
				<div class="mt-5 flex flex-wrap gap-3">
					<a
						href={`/order?chef=${chef.id}`}
						class="flex min-h-12 items-center rounded-full bg-mango px-7 text-sm font-black tracking-wider text-cocoa uppercase shadow transition-colors hover:bg-mango-dark hover:text-white"
					>
						Order with {chef.name}
					</a>
					<a
						href="/reservations"
						class="flex min-h-12 items-center rounded-full border border-line px-7 text-sm font-bold text-cocoa"
					>
						Book a table for this dish
					</a>
				</div>
			</div>
		</div>
	</section>
{/if}

<section class="bg-lavender py-12" aria-labelledby="more-dishes">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 id="more-dishes" class="font-display text-3xl font-black text-cocoa">More bestsellers</h2>
		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each dishes.filter((d) => d.id !== dish.id) as other (other.id)}
				<a
					href={`/menu/${other.id}`}
					class="group flex items-center gap-4 rounded-3xl bg-white p-4 ring-1 ring-line transition-shadow hover:shadow-md"
				>
					<div class="w-20 shrink-0">
						<Picture name={other.image} alt={other.alt} width={480} height={360} sizes="80px" transparent imgClass="w-full drop-shadow" />
					</div>
					<div class="min-w-0">
						<p class="font-display text-lg font-bold text-cocoa group-hover:text-leaf-dark">
							{other.name}
						</p>
						<p class="text-sm font-black text-cocoa">{inr(other.price)}</p>
						<p class="text-xs text-muted">{other.serves}</p>
					</div>
				</a>
			{/each}
		</div>
		<p class="mt-8 text-center">
			<a href="/menu" class="font-bold text-leaf-dark underline underline-offset-4">Back to the full menu →</a>
		</p>
	</div>
</section>
