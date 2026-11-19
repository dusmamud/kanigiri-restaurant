<script lang="ts">
	import { Check, Minus, Plus, Trash2 } from '@lucide/svelte';
	import { page } from '$app/state';
	import PageHero from '#lib/components/PageHero.svelte';
	import { cart, clearCart, removeLine, setQty, setZone, setOrderMode } from '#lib/cart.svelte.ts';
	import { chefs, deliveryZones, inr, menuItems, site, type Chef } from '#lib/data/site.ts';
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
	/** Mock payment-failure state: the order stays alive, cart untouched. */
	let paymentFailed = $state(false);
	let failedMethod = $state('');
	/** Snapshot of the placed order, shown on the confirmation after the cart clears. */
	let placedLines = $state<{ name: string; qty: number; price: number }[]>([]);
	let placedTotal = $state(0);

	// Chef deep link: /order?chef=<chef-id> from a dish page's "Order with {chef}".
	// Read in $effect (browser-only) — searchParams is unavailable during prerendering.
	let chef = $state<Chef | undefined>(undefined);
	$effect(() => {
		chef = chefs.find((c) => c.id === (page.url.searchParams.get('chef') ?? '')) ?? undefined;
	});

	// Keep the shared cart's zone + mode in sync so its fee/minimum maths
	// (10% direct discount, zone-aware delivery fee) is what we display.
	$effect(() => {
		setZone(zone);
		setOrderMode(mode);
	});

	const validPhone = $derived(/^[6-9]\d{9}$/.test(phone.trim()));
	const eta = $derived(mode === 'delivery' ? '35–45 min' : '25 min (ready for pickup)');
	const belowMinimum = $derived(mode === 'delivery' && !cart.meetsMinimum);

	function goStep2() {
		if (cart.count === 0) return;
		if (belowMinimum) {
			error = `Minimum order for ${cart.zone.area} is ${inr(cart.minOrder)}. Add ${inr(cart.minOrder - cart.subtotal)} more to continue.`;
			return;
		}
		error = '';
		step = 2;
	}

	function placeOrder() {
		if (!name.trim()) return (error = 'Please enter your name.');
		if (!validPhone) return (error = 'Please enter a valid 10-digit Indian mobile number.');
		if (mode === 'delivery' && !address.trim()) return (error = 'Please enter your delivery address.');
		if (belowMinimum) {
			return (error = `Minimum order for ${cart.zone.area} is ${inr(cart.minOrder)}. Add ${inr(cart.minOrder - cart.subtotal)} more to continue.`);
		}
		error = '';
		paymentFailed = false;
		ref = `KAN-${Math.floor(100000 + Math.random() * 900000)}`;
		placedLines = cart.lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price }));
		placedTotal = cart.total;
		step = 3;
		clearCart();
	}

	/**
	 * Mock payment failure (test control for the UPI/card path): the payment
	 * is declined, but NOTHING is lost — the cart, the details and the bill
	 * stay exactly as they were, and the customer can try again or switch
	 * to cash on delivery. Only a successful placeOrder() clears the cart.
	 */
	function simulateFailedPayment() {
		if (!name.trim()) return (error = 'Please enter your name first — then test a failed payment.');
		if (!validPhone) return (error = 'Please enter a valid 10-digit mobile number first.');
		failedMethod = payment === 'upi' ? 'UPI' : payment === 'card' ? 'Card' : 'Cash on delivery';
		paymentFailed = true;
		error = '';
	}

	function retryPayment() {
		paymentFailed = false;
		placeOrder();
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
		{#if chef}
			<div class="mb-6 rounded-3xl bg-mango-soft p-5 ring-1 ring-line">
				<p class="text-xs font-black tracking-widest text-cocoa uppercase">Ordering with</p>
				<p class="mt-1 font-display text-xl font-black text-cocoa">
					Chef {chef.name} · {chef.role}
				</p>
				<p class="mt-1 text-sm leading-relaxed text-muted">
					{chef.bio} Add their dishes below — or anything else from the menu.
				</p>
			</div>
		{/if}

		<!-- Steps -->
		<ol class="flex items-center gap-2 text-sm font-bold">
			{#each ['Your items', 'Delivery & details', 'Done'] as label, i}
				<li class="flex items-center gap-2">
					<span
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full {step >= i + 1
							? 'bg-leaf text-white'
							: 'bg-lavender text-muted'}"
					>
						{step > i + 1 ? '✓' : i + 1}
					</span>
					<span class="hidden sm:inline {step === i + 1 ? 'text-cocoa' : 'text-muted'}">{label}</span>
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
				{#if chef}
					<p class="mt-2 text-sm text-muted">Ordered with Chef {chef.name}.</p>
				{/if}
				<div class="mx-auto mt-6 max-w-md rounded-2xl bg-white p-5 text-left ring-1 ring-line">
					<p class="text-sm font-black tracking-wide text-cocoa uppercase">Your order</p>
					<ul class="mt-2 space-y-1 text-sm">
						{#each placedLines as l}
							<li class="flex justify-between gap-3">
								<span class="text-muted">{l.qty} × {l.name}</span>
								<span class="font-semibold text-cocoa">{inr(l.price * l.qty)}</span>
							</li>
						{/each}
					</ul>
					<p class="mt-3 flex justify-between border-t border-line pt-2 text-base font-black text-cocoa">
						<span>Total paid</span><span>{inr(placedTotal)}</span>
					</p>
				</div>
				<ol class="mx-auto mt-6 max-w-md space-y-2 text-left text-sm">
					{#each ['Received', 'Preparing', mode === 'delivery' ? 'On the way' : 'Ready for pickup', 'Delivered'] as s, i}
						<li class="flex items-center gap-3">
							<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full {i === 0 ? 'bg-leaf text-white' : 'bg-lavender text-muted'}"
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
					{#each cart.lines as line (line.slug)}
						<li class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:flex-nowrap">
							<div class="min-w-0 flex-1">
								<p class="font-bold break-words text-cocoa">{line.name}</p>
								<p class="text-sm text-muted">{inr(line.price)} each</p>
							</div>
							<div class="flex shrink-0 items-center gap-2">
								<div class="flex items-center rounded-full bg-white ring-1 ring-line">
									<button type="button" onclick={() => setQty(line.slug, line.qty - 1)} aria-label={`One less ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa"><Minus size={15} aria-hidden="true" /></button>
									<span class="w-6 text-center text-sm font-bold">{line.qty}</span>
									<button type="button" onclick={() => setQty(line.slug, line.qty + 1)} aria-label={`One more ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa"><Plus size={15} aria-hidden="true" /></button>
								</div>
								<p class="w-16 text-right text-sm font-black text-cocoa">{inr(line.price * line.qty)}</p>
								<button type="button" onclick={() => removeLine(line.slug)} aria-label={`Remove ${line.name}`} class="flex h-12 w-12 items-center justify-center rounded-full text-muted hover:text-cocoa"><Trash2 size={16} aria-hidden="true" /></button>
							</div>
						</li>
					{/each}
				</ul>

				<div class="mt-4 space-y-1 rounded-3xl bg-cream p-5 text-sm ring-1 ring-line">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
					<p class="flex justify-between text-leaf-dark"><span>Direct-order discount (10% off)</span><span class="font-semibold">− {inr(cart.discount)}</span></p>
					<p class="flex justify-between"><span class="text-muted">GST (5% on discounted total)</span><span class="font-semibold">{inr(cart.gst)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Delivery ({cart.zone.area})</span><span class="font-semibold">{cart.deliveryFee === 0 ? 'Free' : inr(cart.deliveryFee)}</span></p>
					<p class="flex justify-between border-t border-line pt-2 text-base font-black text-cocoa"><span>Total</span><span>{inr(cart.total)}</span></p>
					{#if mode === 'delivery' && cart.freeDeliveryThreshold !== null && cart.deliveryFee > 0}
						<p class="pt-1 text-xs text-muted">Free delivery in {cart.zone.area} on orders of {inr(cart.freeDeliveryThreshold)} and above — add {inr(cart.freeDeliveryThreshold - cart.subtotal)} more.</p>
					{/if}
					{#if belowMinimum}
						<p role="alert" class="pt-1 text-sm font-semibold text-red-700">Minimum order for {cart.zone.area} is {inr(cart.minOrder)} — add {inr(cart.minOrder - cart.subtotal)} more to check out.</p>
					{/if}
				</div>

				{#if error}
					<p role="alert" class="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
				{/if}

				<!-- Quick add bestsellers -->
				<h2 class="mt-8 font-display text-xl font-black text-cocoa">Add a bestseller</h2>
				<div class="mt-3 flex flex-wrap gap-2">
					{#each menuItems.slice(0, 4) as item}
						<button
							type="button"
							onclick={() => addToOrder(item.slug)}
							class="flex min-h-12 items-center gap-1 rounded-full bg-lavender px-4 text-sm font-bold text-cocoa hover:bg-mango-soft"
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
			<!-- Step 2: mode, zone, details, UPI-first payment -->
			<div class="mt-8 space-y-6">
				{#if chef}
					<p class="rounded-2xl bg-mango-soft p-4 text-sm font-semibold text-cocoa">
						Ordering with Chef {chef.name} ({chef.role}) — their dishes are marked on the menu.
					</p>
				{/if}
				<div>
					<h2 class="font-display text-xl font-black text-cocoa">Delivery or pickup?</h2>
					<div class="mt-3 grid gap-3 sm:grid-cols-2" role="group" aria-label="Order type">
						<button type="button" onclick={() => (mode = 'delivery')} aria-pressed={mode === 'delivery'} class="min-h-12 rounded-3xl p-5 text-left ring-2 {mode === 'delivery' ? 'bg-cream ring-leaf' : 'bg-white ring-line'}">
							<p class="font-bold text-cocoa">Delivery</p>
							<p class="mt-1 text-sm text-muted">Hot at your door in 35–45 min. Free above ₹499.</p>
						</button>
						<button type="button" onclick={() => (mode = 'pickup')} aria-pressed={mode === 'pickup'} class="min-h-12 rounded-3xl p-5 text-left ring-2 {mode === 'pickup' ? 'bg-cream ring-leaf' : 'bg-white ring-line'}">
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
								<option value={z.area}>{z.area} — {z.fee === 0 && z.freeAbove === 0 ? 'Free delivery, no minimum' : z.freeAbove !== null ? `Free above ${inr(z.freeAbove)}` : `${inr(z.fee)} fee`} · min {inr(z.min)} · {z.time}</option>
							{/each}
						</select>
						<p class="mt-2 text-sm text-muted">
							{cart.zone.area}: delivery {cart.deliveryFee === 0 ? 'free' : inr(cart.deliveryFee)} · minimum order {inr(cart.minOrder)} · {cart.zone.time}.
							{#if belowMinimum}
								<strong class="text-red-700">Your order is {inr(cart.minOrder - cart.subtotal)} below the minimum for this area.</strong>
							{/if}
						</p>
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
					<legend class="font-display text-xl font-black text-cocoa">Payment — UPI first</legend>
					<div class="mt-3 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment method">
						{#each ([{ v: 'upi', l: 'UPI', d: 'GPay / PhonePe / Paytm — recommended' }, { v: 'card', l: 'Card', d: 'Visa / Mastercard / RuPay' }, { v: 'cod', l: 'Cash on delivery', d: 'Pay when it arrives' }] as const) as p}
							<button type="button" role="radio" aria-checked={payment === p.v} onclick={() => (payment = p.v)} class="min-h-12 rounded-3xl p-4 text-left ring-2 {payment === p.v ? 'bg-cream ring-leaf' : 'bg-white ring-line'}">
								<p class="font-bold text-cocoa">{p.l}{p.v === 'upi' ? ' ★' : ''}</p>
								<p class="mt-1 text-sm text-muted">{p.d}</p>
							</button>
						{/each}
					</div>
					{#if payment === 'upi'}
						<p class="mt-3 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-muted">
							<strong class="text-cocoa">Paying by UPI:</strong> confirm the order and we send a UPI payment link on WhatsApp — it opens
							your UPI app with the amount ({inr(cart.total)}) already filled. No UPI ID is charged on this page.
						</p>
					{:else if payment === 'card'}
						<p class="mt-3 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-muted">
							<strong class="text-cocoa">Paying by card:</strong> no card is charged online here — pay by card on delivery
							or at the counter when you pick up.
						</p>
					{:else}
						<p class="mt-3 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-muted">
							<strong class="text-cocoa">Cash on delivery:</strong> keep {inr(cart.total)} ready — exact change helps our rider.
						</p>
					{/if}
				</fieldset>

				<!-- Order summary, repeated before paying (step 2) -->
				<div class="space-y-1 rounded-3xl bg-cream p-5 text-sm ring-1 ring-line">
					<p class="text-sm font-black tracking-wide text-cocoa uppercase">Order summary</p>
					{#each cart.lines as line (line.slug)}
						<p class="flex justify-between gap-3">
							<span class="text-muted">{line.qty} × {line.name}</span>
							<span class="font-semibold">{inr(line.price * line.qty)}</span>
						</p>
					{/each}
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
					<p class="flex justify-between text-leaf-dark"><span>Direct-order discount (10% off)</span><span class="font-semibold">− {inr(cart.discount)}</span></p>
					<p class="flex justify-between"><span class="text-muted">GST (5%)</span><span class="font-semibold">{inr(cart.gst)}</span></p>
					<p class="flex justify-between"><span class="text-muted">Delivery ({cart.zone.area})</span><span class="font-semibold">{cart.deliveryFee === 0 ? 'Free' : inr(cart.deliveryFee)}</span></p>
					<p class="flex justify-between border-t border-line pt-2 text-base font-black text-cocoa"><span>Total</span><span>{inr(cart.total)}</span></p>
				</div>

				{#if paymentFailed}
					<div role="alert" class="rounded-3xl bg-red-50 p-5 ring-1 ring-red-200">
						<p class="font-display text-xl font-black text-red-700">Payment failed — your order is safe.</p>
						<p class="mt-2 text-sm leading-relaxed text-red-700">
							Your {failedMethod} payment did not go through. Nothing was charged and nothing was lost:
							your {cart.count} item{cart.count === 1 ? '' : 's'} ({inr(cart.total)}) are still in your order, exactly as you left them.
						</p>
						<div class="mt-4 flex flex-wrap gap-3">
							<button
								type="button"
								onclick={retryPayment}
								class="flex min-h-12 items-center rounded-full bg-mango px-7 text-sm font-black tracking-wider text-cocoa uppercase shadow"
							>
								Try {failedMethod} again
							</button>
							<button
								type="button"
								onclick={() => {
									payment = 'cod';
									paymentFailed = false;
									error = '';
								}}
								class="flex min-h-12 items-center rounded-full border border-line bg-white px-7 text-sm font-bold text-cocoa"
							>
								Switch to cash on delivery
							</button>
						</div>
					</div>
				{/if}

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
				<p class="text-center text-sm">
					<button type="button" onclick={simulateFailedPayment} class="font-bold text-leaf-dark underline underline-offset-4">
						Test a failed {payment === 'upi' ? 'UPI' : payment === 'card' ? 'card' : 'COD'} payment
					</button>
					<span class="text-muted"> — mock checkout, nothing is charged and your order stays intact.</span>
				</p>
				<p class="text-center text-xs text-muted">Mock checkout — no payment is taken and no order is really placed.</p>
			</div>
		{/if}
	</div>
</section>
