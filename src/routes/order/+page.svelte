<script lang="ts">
	import { Check, Minus, Plus, Trash2 } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { deliveryZones, inr, menuItems, site } from '#lib/data/site.ts';
	import { addToOrder } from '#lib/cart.svelte.ts';

	let step = $state(1);
	let mode = $state<'delivery' | 'pickup'>('delivery');
	let zone = $state(deliveryZones[0].area);
	let name = $state('');
	let phone = $state('');
	let address = $state('');
	let payment = $state<'upi' | 'card' | 'cod'>('upi');
	let error = $state('');
	let ref = $state('');

	const paymentOptions = [
		{ v: 'upi' as const, l: 'UPI', d: 'GPay / PhonePe / Paytm' },
		{ v: 'card' as const, l: 'Card', d: 'Visa / Mastercard / RuPay' },
		{ v: 'cod' as const, l: 'Cash on delivery', d: 'Pay when it arrives' }
	];

	const validPhone = $derived(/^[6-9]\d{9}$/.test(phone.trim()));
	const eta = $derived(mode === 'delivery' ? '35–45 min' : '25 min (ready for pickup)');

	function goStep2() {
		if (cart.count === 0) return;
		step = 2;
	}
	function placeOrder() {
		if (!name.trim()) return (error = 'Please enter your name.');
		if (!validPhone) return (error = 'Please enter a valid 10-digit Indian mobile number.');
		if (mode === 'delivery' && !address.trim()) return (error = 'Please enter your delivery address.');
		error = '';
		ref = `KAN-${Math.floor(100000 + Math.random() * 900000)}`;
		step = 3;
		clearCartKeepRef();
	}
	// Clear items but keep the confirmation visible (cart is emptied after placing).
	function clearCartKeepRef() {
		clearCart();
	}
</script>

<svelte:head>
	<title>Order Online — Kanigiri Restaurant | Delivery & Pickup</title>
	<meta
		name="description"
		content="Order direct from Kanigiri Restaurant — delivery in 30–40 minutes, free above ₹499, or pickup. UPI, cards and cash on delivery accepted."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/order" />
</svelte:head>

<PageHero
	script="Hot & fresh"
	title="Order online"
	sub="Delivery in 30–40 minutes, free above ₹499 — or pick up from the counter. Order direct and save 10% versus food apps."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Checkout">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Steps -->
		<ol class="flex items-center gap-2 text-sm font-bold">
			{#each ['Your items', 'Delivery & details', 'Done'] as label, i}
				<li class="flex items-center gap-2">
					<span
						class="flex h-8 w-8 items-center justify-center rounded-full {step >= i + 1
							? 'bg-leaf text-white'
							: 'bg-lavender text-muted'}"
					>
						{step > i + 1 ? '✓' : i + 1}
					</span>
					<span class={step === i + 1 ? 'text-cocoa' : 'text-muted'}>{label}</span>
				</li>
				{#if i < 2}<li class="h-px flex-1 bg-line" aria-hidden="true"></li>{/if}
			{/each}
		</ol>

		{#if step === 3}
			<!-- Confirmation -->
			<div class="mt-8 rounded-3xl bg-cream p-8 text-center ring-1 ring-line">
				<p class="font-script text-5xl text-leaf-dark">Order placed!</p>
				<h2 class="mt-2 font-display text-3xl font-black text-cocoa">Thank you, {name}.</h2>
				<p class="mt-3 text-muted">
					Order <strong class="text-cocoa">{ref}</strong> is confirmed.
					{#if mode === 'delivery'}It will reach you in about {eta}.{:else}It will be ready for pickup in about {eta}.{/if}
					We will confirm on WhatsApp shortly.
				</p>
				<ol class="mx-auto mt-6 max-w-md space-y-2 text-left text-sm">
					{#each ['Received', 'Preparing', mode === 'delivery' ? 'On the way' : 'Ready for pickup', 'Delivered'] as s, i}
						<li class="flex items-center gap-3">
							<span class="flex h-7 w-7 items-center justify-center rounded-full {i === 0 ? 'bg-leaf text-white' : 'bg-lavender text-muted'}"
								>{i === 0 ? '✓' : i + 1}</span
							>
							<span class={i === 0 ? 'font-bold text-cocoa' : 'text-muted'}>{s}</span>
						</li>
					{/each}
				</ol>
				<p class="mt-6 text-sm text-muted">Payment: {payment === 'upi' ? 'UPI' : payment === 'card' ? 'Card' : 'Cash on delivery'} · Mock order — no payment was taken.</p>
				<div class="mt-6 flex flex-wrap justify-center gap-3">
					<a href="/menu" class="flex min-h-12 items-center rounded-full bg-mango px-7 text-sm font-black tracking-wider text-cocoa uppercase">Order more</a>
					<a href="/" class="flex min-h-12 items-center rounded-full border border-line px-7 text-sm font-bold text-cocoa">Back home</a>
				</div>
			</div>
		{:else if step === 1}
			<!-- Cart review -->
			{#if cart.count === 0}
				<div class="mt-8 rounded-3xl bg-cream p-10 text-center ring-1 ring-line">
					<p class="font-script text-4xl text-leaf-dark">Your cart is empty</p>
					<p class="mt-2 text-muted">Add a biryani or two — the mutton one is calling.</p>
					<a href="/menu" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-mango px-8 text-sm font-black tracking-wider text-cocoa uppercase">Browse the menu</a>
				</div>
			{:else}
				<ul class="mt-8 divide-y divide-line rounded-3xl bg-cream ring-1 ring-line">
					{#each cart.lines as line (line.name)}
						<li class="flex items-center justify-between gap-3 px-5 py-4">
							<div class="min-w-0">
								<p class="font-bold text-cocoa">{line.name}</p>
								<p class="text-sm text-muted">{inr(line.price)} each</p>
							</div>
							<div class="flex shrink-0 items-center gap-2">
								<div class="flex items-center rounded-full bg-white ring-1 ring-line">
									<button type="button" onclick={() => setQty(line.name, line.qty - 1)} aria-label={`One less ${line.name}`} class="flex h-10 w-10 items-center justify-center rounded-full text-cocoa"><Minus size={15} aria-hidden="true" /></button>
									<span class="w-6 text-center text-sm font-bold">{line.qty}</span>
									<button type="button" onclick={() => setQty(line.name, line.qty + 1)} aria-label={`One more ${line.name}`} class="flex h-10 w-10 items-center justify-center rounded-full text-cocoa"><Plus size={15} aria-hidden="true" /></button>
								</div>
								<p class="w-16 text-right text-sm font-black text-cocoa">{inr(line.price * line.qty)}</p>
								<button type="button" onclick={() => removeLine(line.name)} aria-label={`Remove ${line.name}`} class="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:text-cocoa"><Trash2 size={16} aria-hidden="true" /></button>
							</div>
						</li>
					{/each}
				</ul>

				<div class="mt-4 space-y-1 rounded-3xl bg-cream p-5 text-sm ring-1 ring-line">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
					<p class="flex justify-between"><span class="text-muted">GST (5%)</span><span class="font-semibold">{inr(cart.gst)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Delivery</span><span class="font-semibold">{cart.deliveryFee === 0 ? 'Free' : inr(cart.deliveryFee)}</span></p>
					<p class="flex justify-between border-t border-line pt-2 text-base font-black text-cocoa"><span>Total</span><span>{inr(cart.total)}</span></p>
				</div>

				<!-- Quick add bestsellers -->
				<h2 class="mt-8 font-display text-xl font-black text-cocoa">Add a bestseller</h2>
				<div class="mt-3 flex flex-wrap gap-2">
					{#each menuItems.slice(0, 4) as item}
						<button
							type="button"
							onclick={() => addToOrder(item.name, item.price)}
							class="flex min-h-11 items-center gap-1 rounded-full bg-lavender px-4 text-sm font-bold text-cocoa hover:bg-mango-soft"
						>
							+ {item.name} · {inr(item.price)}
						</button>
					{/each}
				</div>

				<button
					type="button"
					onclick={goStep2}
					class="mt-8 flex min-h-13 w-full items-center justify-center rounded-full bg-mango text-sm font-black tracking-wider text-cocoa uppercase shadow transition-colors hover:bg-mango-dark hover:text-white"
				>
					Continue · {inr(cart.total)}
				</button>
			{/if}
		{:else}
			<!-- Step 2: mode, zone, details -->
			<div class="mt-8 space-y-6">
				<div>
					<h2 class="font-display text-xl font-black text-cocoa">Delivery or pickup?</h2>
					<div class="mt-3 grid gap-3 sm:grid-cols-2" role="group" aria-label="Order type">
						<button type="button" onclick={() => (mode = 'delivery')} aria-pressed={mode === 'delivery'} class="rounded-3xl p-5 text-left ring-2 {mode === 'delivery' ? 'bg-cream ring-leaf' : 'bg-white ring-line'}">
							<p class="font-bold text-cocoa">Delivery</p>
							<p class="mt-1 text-sm text-muted">Hot at your door in 35–45 min. Free above ₹499.</p>
						</button>
						<button type="button" onclick={() => (mode = 'pickup')} aria-pressed={mode === 'pickup'} class="rounded-3xl p-5 text-left ring-2 {mode === 'pickup' ? 'bg-cream ring-leaf' : 'bg-white ring-line'}">
							<p class="font-bold text-cocoa">Pickup</p>
							<p class="mt-1 text-sm text-muted">Ready in ~25 min. {site.addressShort}.</p>
						</button>
					</div>
				</div>

				{#if mode === 'delivery'}
					<div>
						<label for="zone" class="font-display text-xl font-black text-cocoa">Your area</label>
						<select id="zone" bind:value={zone} class="mt-3 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
							{#each deliveryZones as z}
								<option value={z.area}>{z.area} — {z.fee === 0 ? 'Free delivery' : `₹${z.fee} fee`} · {z.time}</option>
							{/each}
						</select>
						<label for="address" class="mt-4 block font-semibold text-cocoa">Delivery address</label>
						<textarea id="address" bind:value={address} rows="2" placeholder="House no, street, landmark…" class="mt-2 min-h-12 w-full rounded-3xl border border-line bg-cream p-4 text-base outline-none focus:border-leaf"></textarea>
					</div>
				{/if}

				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="name" class="font-semibold text-cocoa">Your name</label>
						<input id="name" type="text" bind:value={name} autocomplete="name" placeholder="Full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base outline-none focus:border-leaf" />
					</div>
					<div>
						<label for="phone" class="font-semibold text-cocoa">Mobile (WhatsApp)</label>
						<input id="phone" type="tel" inputmode="numeric" autocomplete="tel" bind:value={phone} placeholder="10-digit mobile" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base outline-none focus:border-leaf" />
					</div>
				</div>

				<fieldset>
					<legend class="font-display text-xl font-black text-cocoa">Payment</legend>
					<div class="mt-3 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment method">
						{#each ([{ v: 'upi', l: 'UPI', d: 'GPay / PhonePe / Paytm' }, { v: 'card', l: 'Card', d: 'Visa / Mastercard / RuPay' }, { v: 'cod', l: 'Cash on delivery', d: 'Pay when it arrives' }] as const) as p}
							<button type="button" role="radio" aria-checked={payment === p.v} onclick={() => (payment = p.v)} class="rounded-3xl p-4 text-left ring-2 {payment === p.v ? 'bg-cream ring-leaf' : 'bg-white ring-line'}">
								<p class="font-bold text-cocoa">{p.l}</p>
								<p class="mt-1 text-sm text-muted">{p.d}</p>
							</button>
						{/each}
					</div>
				</fieldset>

				{#if error}
					<p role="alert" class="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
				{/if}

				<div class="flex gap-3">
					<button type="button" onclick={() => (step = 1)} class="min-h-13 rounded-full border border-line px-6 text-sm font-bold text-cocoa">Back</button>
					<button
						type="button"
						onclick={placeOrder}
						class="flex min-h-13 flex-1 items-center justify-center rounded-full bg-mango text-sm font-black tracking-wider text-cocoa uppercase shadow transition-colors hover:bg-mango-dark hover:text-white"
					>
						Place order · {inr(cart.total)}
					</button>
				</div>
				<p class="text-center text-xs text-muted">Mock checkout — no payment is taken and no order is really placed.</p>
			</div>
		{/if}
	</div>
</section>
