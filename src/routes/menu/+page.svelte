<script lang="ts">
	import { Check, Plus, Search } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PageHero from '#lib/components/PageHero.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { dishes, inr, menuCategories, menuItems, type MenuItem } from '#lib/data/site.ts';

	let active: (typeof menuCategories)[number] = $state('All');
	let query = $state('');
	let vegOnly = $state(false);
	let addedName = $state('');

	const visible = $derived(
		menuItems.filter((m) => {
			if (active !== 'All' && m.category !== active) return false;
			if (vegOnly && !m.veg) return false;
			if (query && !(m.name + ' ' + m.desc).toLowerCase().includes(query.toLowerCase())) return false;
			return true;
		})
	);

	function order(item: MenuItem) {
		addToOrder(item.name, item.price);
		addedName = item.name;
		window.setTimeout(() => {
			if (addedName === item.name) addedName = '';
		}, 1500);
	}

	const spiceLabel = (n: number) => (n === 1 ? 'Mild' : n === 2 ? 'Medium' : 'Fiery');
	const menuSchema = {
		'@context': 'https://schema.org',
		'@type': 'Menu',
		name: 'Kanigiri Restaurant Menu',
		hasMenuSection: menuCategories
			.filter((c) => c !== 'All')
			.map((c) => ({
				'@type': 'MenuSection',
				name: c,
				hasMenuItem: menuItems
					.filter((m) => m.category === c)
					.map((m) => ({
						'@type': 'MenuItem',
						name: m.name,
						description: m.desc,
						offers: { '@type': 'Offer', price: m.price, priceCurrency: 'INR' }
					}))
			}))
	};
</script>

<svelte:head>
	<title>Full Menu — Kanigiri Restaurant | Biryani, Curries, Rice & Breads</title>
	<meta
		name="description"
		content="The full Kanigiri menu: mutton biryani ₹360, chicken biryani, kadai chicken, palak paneer, jeera chawal and more. Prices include taxes. Order direct and save 10%."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/menu" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(menuSchema)}</script>`}
</svelte:head>

<PageHero
	script="Taste of Andhra"
	title="The full menu"
	sub="Every dish cooked fresh after you order. Prices include all taxes; delivery is free above ₹499. Veg and non-veg are cooked in separate vessels."
/>

<section class="bg-white py-10 sm:py-14" aria-labelledby="menu-list">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Signature dishes, quick links -->
		<div class="flex flex-wrap gap-3">
			{#each dishes as dish (dish.id)}
				<a
					href={`/menu/${dish.id}`}
					class="flex items-center gap-2 rounded-full bg-lavender px-4 py-2 text-sm font-bold text-cocoa transition-colors hover:bg-mango-soft"
				>
					{dish.script} {dish.name} · {inr(dish.price)}
				</a>
			{/each}
		</div>

		<!-- Search + veg toggle -->
		<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
			<label class="relative flex-1">
				<span class="sr-only">Search the menu</span>
				<Search size={18} class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
				<input
					type="search"
					bind:value={query}
					placeholder="Search biryani, chicken, paneer…"
					class="min-h-12 w-full rounded-full border border-line bg-cream pr-4 pl-11 text-base outline-none placeholder:text-muted/70 focus:border-leaf"
				/>
			</label>
			<button
				type="button"
				onclick={() => (vegOnly = !vegOnly)}
				aria-pressed={vegOnly}
				class="flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-colors {vegOnly
					? 'bg-leaf text-white'
					: 'bg-lavender text-cocoa'}"
			>
				<span class="inline-block h-3.5 w-3.5 rounded-sm border-2 border-leaf bg-white" aria-hidden="true">
					<span class="mx-auto mt-[1.5px] block h-1.5 w-1.5 rounded-full bg-leaf"></span>
				</span>
				Veg only
			</button>
		</div>

		<!-- Category jump links -->
		<div class="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter menu by category">
			{#each menuCategories as cat}
				<button
					type="button"
					onclick={() => (active = cat)}
					aria-pressed={active === cat}
					class="min-h-11 rounded-full px-5 text-sm font-bold transition-colors duration-200 {active === cat
						? 'bg-leaf text-white shadow'
						: 'bg-lavender text-cocoa hover:bg-lavender-deep'}"
				>
					{cat}
				</button>
			{/each}
		</div>

		<h2 id="menu-list" class="sr-only">Menu items</h2>
		{#if visible.length === 0}
			<p class="mt-10 rounded-3xl bg-cream p-8 text-center text-muted">
				Nothing matches that search. Try "biryani" or "chicken" — or clear the veg filter.
			</p>
		{:else}
			<ul class="mt-8 grid gap-4 md:grid-cols-2">
				{#each visible as item (item.name)}
					<li
						animate:flip={{ duration: 300 }}
						in:fly={{ y: 16, duration: 250 }}
						out:fade={{ duration: 150 }}
						class="flex items-start justify-between gap-4 rounded-3xl bg-cream p-5 ring-1 ring-line transition-shadow duration-200 hover:shadow-md"
					>
						<div class="min-w-0">
							<p class="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-cocoa">
								<span
									class="inline-block h-3.5 w-3.5 shrink-0 rounded-sm border-2 {item.veg
										? 'border-leaf'
										: 'border-[#a33b1f]'}"
									aria-label={item.veg ? 'Vegetarian' : 'Non-vegetarian'}
								>
									<span
										class="mx-auto mt-[1.5px] block h-1.5 w-1.5 rounded-full {item.veg
											? 'bg-leaf'
											: 'bg-[#a33b1f]'}"
									></span>
								</span>
								<a href={dishes.find((d) => d.name === item.name) ? `/menu/${dishes.find((d) => d.name === item.name)!.id}` : '/menu'} class="hover:text-leaf-dark"
									>{item.name}</a
								>
								<span class="text-xs font-semibold text-muted">· {spiceLabel(item.spice)}</span>
							</p>
							<p class="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
							<p class="mt-2 text-base font-black text-cocoa">
								{inr(item.price)}
								{#if item.mrp}
									<span class="ml-1 text-sm font-semibold text-muted line-through">{inr(item.mrp)}</span>
								{/if}
							</p>
						</div>
						<button
							type="button"
							onclick={() => order(item)}
							class="flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-black tracking-wide uppercase transition-all duration-200 active:scale-95 {addedName ===
							item.name
								? 'bg-leaf text-white'
								: 'bg-mango text-cocoa hover:bg-mango-dark hover:text-white'}"
							aria-label={`Add ${item.name} to order`}
						>
							{#if addedName === item.name}
								<Check size={15} aria-hidden="true" /> Added
							{:else}
								<Plus size={15} aria-hidden="true" /> Add
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		{/if}

		<p class="mt-8 text-center text-sm text-muted">
			Spice guide: <strong class="text-cocoa">Mild</strong> — gentle · <strong class="text-cocoa">Medium</strong> — warm ·
			<strong class="text-cocoa">Fiery</strong> — Guntur chilli heat. Any dish can be toned down on request.
		</p>
		<div class="mt-6 text-center">
			<a
				href="/order"
				class="inline-flex min-h-12 items-center rounded-full bg-mango px-8 text-sm font-black tracking-wider text-cocoa uppercase shadow transition-colors hover:bg-mango-dark hover:text-white"
			>
				Review your order
			</a>
		</div>
	</div>
</section>
