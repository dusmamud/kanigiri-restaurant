<script lang="ts">
	import { Check, Plus } from '@lucide/svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { addToOrder } from '#lib/cart.svelte.ts';
	import { inr, menuCategories, menuItems, type MenuItem } from '#lib/data/site.ts';

	let active: (typeof menuCategories)[number] = $state('All');
	let addedName = $state('');

	const visible = $derived(
		active === 'All' ? menuItems : menuItems.filter((m) => m.category === active)
	);

	function order(item: MenuItem) {
		addToOrder(item.name, item.price);
		addedName = item.name;
		window.setTimeout(() => {
			if (addedName === item.name) addedName = '';
		}, 2000);
	}

	const spiceLabel = (n: number) => (n === 1 ? 'Mild' : n === 2 ? 'Medium' : 'Fiery');
</script>

<section id="menu" class="bg-white py-16 sm:py-20" aria-labelledby="menu-title">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="reveal max-w-2xl">
			<p class="font-script text-4xl text-leaf-dark">Explore more</p>
			<h2 id="menu-title" class="mt-1 font-display text-4xl font-black text-cocoa sm:text-5xl">
				The full menu
			</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Biryanis, rice, curries and breads — everything cooked fresh after you order. Prices include all
				taxes; delivery is free above ₹499.
			</p>
		</div>

		<div class="reveal mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter menu by category">
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

		<ul class="mt-8 grid gap-4 md:grid-cols-2">
			{#each visible as item (item.name)}
				<li
					class="reveal flex items-start justify-between gap-4 rounded-3xl bg-cream p-5 ring-1 ring-line transition-shadow duration-200 hover:shadow-md"
				>
					<div class="min-w-0">
						<p class="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-cocoa">
							<span
								class="inline-block h-3.5 w-3.5 rounded-sm border-2 {item.veg
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
							{item.name}
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
	</div>
</section>
