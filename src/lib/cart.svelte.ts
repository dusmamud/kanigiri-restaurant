// Tiny mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header and dish cards share one live count.
export const cart = $state({ count: 0, total: 0, lastAdded: '' });

export function addToOrder(name: string, price: number) {
	cart.count += 1;
	cart.total += price;
	cart.lastAdded = name;
}
