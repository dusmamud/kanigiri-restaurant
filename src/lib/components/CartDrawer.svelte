<script lang="ts">
	// Slide-in cart drawer: line items, qty steppers, bill with GST + delivery,
	// free-delivery progress. Opens from the header bag / sticky bar.
	import { Minus, Plus, Trash2, X } from '@lucide/svelte';
	import { cart, clearCart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import { inr } from '#lib/data/site.ts';

	let { open = $bindable(false) }: { open: boolean } = $props();

	const threshold = $derived(cart.freeDeliveryThreshold);
	// Zone-aware: Kanigiri town is always free (threshold 0), some zones
	// never get free delivery (threshold null) — never promise free
	// delivery the zone cannot give.
	const remaining = $derived(
		threshold === null ? Infinity : threshold === 0 ? 0 : Math.max(0, threshold - cart.subtotal)
	);
	const progress = $derived(
		threshold === null ? 0 : threshold === 0 ? 100 : Math.min(100, (cart.subtotal / threshold) * 100)
	);
</script>

{#if open}
	<div class="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Your order">
		<button
			type="button"
			class="absolute inset-0 bg-cocoa/50"
			aria-label="Close cart"
			onclick={() => (open = false)}
		></button>
		<aside
			class="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
			data-lenis-prevent
		>
			<div class="flex items-center justify-between border-b border-line px-5 py-4">
				<h2 class="font-display text-2xl font-black text-cocoa">Your order</h2>
				<button
					type="button"
					onclick={() => (open = false)}
					aria-label="Close cart"
					class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa hover:bg-lavender"
				>
					<X size={22} aria-hidden="true" />
				</button>
			</div>

			{#if cart.count === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
					<p class="font-script text-4xl text-leaf-dark">Hungry?</p>
					<p class="text-muted">Your cart is empty. Add a biryani — you know you want to.</p>
					<a
						href="/menu"
						onclick={() => (open = false)}
						class="mt-2 flex min-h-12 items-center rounded-full bg-mango px-8 text-sm font-black tracking-wider text-cocoa uppercase"
					>
						Browse the menu
					</a>
				</div>
			{:else}
				<div class="border-b border-line px-5 py-3">
					{#if remaining === Infinity}
						<p class="text-sm font-semibold text-cocoa">
							Delivery {inr(cart.deliveryFee)} · {cart.zone.area}
						</p>
					{:else if remaining > 0}
						<p class="text-sm font-semibold text-cocoa">Add {inr(remaining)} more for free delivery</p>
					{:else}
						<p class="text-sm font-semibold text-leaf-dark">Free delivery unlocked</p>
					{/if}
					<div class="mt-2 h-2 overflow-hidden rounded-full bg-lavender">
						<div class="h-full rounded-full bg-leaf transition-all duration-300" style="width: {progress}%"></div>
					</div>
				</div>

				<ul class="flex-1 overflow-y-auto px-5 py-4" data-lenis-prevent>
					{#each cart.lines as line (line.name)}
						<li class="flex items-center justify-between gap-3 border-b border-line/70 py-3">
							<div class="min-w-0">
								<p class="font-bold text-cocoa">{line.name}</p>
								<p class="text-sm text-muted">{inr(line.price)} each</p>
							</div>
							<div class="flex shrink-0 items-center gap-2">
								<div class="flex items-center rounded-full bg-lavender">
									<button
										type="button"
										onclick={() => setQty(line.name, line.qty - 1)}
										aria-label={`One less ${line.name}`}
										class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa"
									>
										<Minus size={15} aria-hidden="true" />
									</button>
									<span class="w-6 text-center text-sm font-bold" aria-label={`${line.qty} of ${line.name}`}
										>{line.qty}</span
									>
									<button
										type="button"
										onclick={() => setQty(line.name, line.qty + 1)}
										aria-label={`One more ${line.name}`}
										class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa"
									>
										<Plus size={15} aria-hidden="true" />
									</button>
								</div>
								<p class="w-16 text-right text-sm font-black text-cocoa">{inr(line.price * line.qty)}</p>
								<button
									type="button"
									onclick={() => removeLine(line.name)}
									aria-label={`Remove ${line.name}`}
									class="flex h-12 w-12 items-center justify-center rounded-full text-muted hover:text-cocoa"
								>
									<Trash2 size={16} aria-hidden="true" />
								</button>
							</div>
						</li>
					{/each}
				</ul>

				<div class="space-y-1 border-t border-line px-5 py-4 text-sm">
					<p class="flex justify-between"><span class="text-muted">Subtotal</span><span class="font-semibold">{inr(cart.subtotal)}</span></p>
					<p class="flex justify-between text-leaf-dark">
						<span>Direct-order discount (10% off)</span><span class="font-semibold">− {inr(cart.discount)}</span>
					</p>
					<p class="flex justify-between"><span class="text-muted">GST (5% on discounted total)</span><span class="font-semibold">{inr(cart.gst)}</span></p>
					<p class="flex justify-between">
						<span class="text-muted">Delivery</span><span class="font-semibold"
							>{cart.deliveryFee === 0 ? 'Free' : inr(cart.deliveryFee)}</span
						>
					</p>
					<p class="flex justify-between border-t border-line pt-2 text-base font-black text-cocoa">
						<span>Total</span><span>{inr(cart.total)}</span>
					</p>
					<div class="flex gap-3 pt-3">
						<button
							type="button"
							onclick={clearCart}
							class="min-h-12 rounded-full border border-line px-5 text-sm font-bold text-muted"
						>
							Clear
						</button>
						<a
							href="/order"
							onclick={() => (open = false)}
							class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-mango text-sm font-black tracking-wider text-cocoa uppercase"
						>
							Checkout · {inr(cart.total)}
						</a>
					</div>
				</div>
			{/if}
		</aside>
	</div>
{/if}
