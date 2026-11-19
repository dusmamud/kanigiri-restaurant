// Real mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, dish cards and /order share one
// live cart. Prices in INR; GST 5% on food; delivery free above ₹499.
//
// Cart lines are keyed by dish SLUG (never by name) — adding the same dish
// from the hero, the menu, a dish page or an offer always merges into one
// line. `addToOrder` still accepts a full name for old call sites and
// resolves it to the canonical slug + name + price from site.ts.
// Direct discount: every order gets 10% off the subtotal, applied BEFORE
// GST (the advertised "order direct, save 10%"). Delivery fee and minimum
// order follow the selected delivery zone (see deliveryZones in site.ts),
// not a flat ₹40.
import { deliveryZones, dishes, menuItems, type DeliveryZone } from '#lib/data/site.ts';

export type CartLine = { slug: string; name: string; price: number; qty: number };

const lines = $state<CartLine[]>([]);
// Selected delivery zone (id from deliveryZones) + order mode. The order
// page should call setZone()/setOrderMode() when the customer changes them.
let zoneId = $state(deliveryZones[0].id);
let mode = $state<'delivery' | 'pickup'>('delivery');

const slugify = (s: string) =>
	s
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

/** Resolve a slug or a full dish/menu name to its canonical dish record. */
function findDish(key: string) {
	const k = key.trim();
	return (
		dishes.find((d) => d.slug === k || d.id === k || d.name.toLowerCase() === k.toLowerCase()) ??
		menuItems.find((m) => m.slug === k || m.name.toLowerCase() === k.toLowerCase())
	);
}

/** Find a zone by its id or its area label (the order page binds the area). */
export function getZone(idOrArea: string): DeliveryZone {
	return (
		deliveryZones.find((z) => z.id === idOrArea || z.area === idOrArea) ?? deliveryZones[0]
	);
}

/** Delivery fee for a zone + subtotal. 0 when the cart is empty, on pickup,
 *  or when the subtotal reaches the zone's free-delivery threshold. */
export function deliveryFeeFor(idOrArea: string, subtotal: number, orderMode: 'delivery' | 'pickup' = 'delivery'): number {
	if (subtotal === 0 || orderMode === 'pickup') return 0;
	const zone = getZone(idOrArea);
	if (zone.freeAbove !== null && subtotal >= zone.freeAbove) return 0;
	return zone.fee;
}

/** Minimum order for a zone (₹0 in Kanigiri town / pickup). */
export function minOrderFor(idOrArea: string): number {
	return getZone(idOrArea).min;
}

export function meetsMinimumFor(idOrArea: string, subtotal: number): boolean {
	return subtotal >= minOrderFor(idOrArea);
}

/** Subtotal at/above which delivery is free in this zone (null = never free). */
export function freeDeliveryThresholdFor(idOrArea: string): number | null {
	return getZone(idOrArea).freeAbove;
}

export function setZone(idOrArea: string) {
	zoneId = getZone(idOrArea).id;
}

export function setOrderMode(m: 'delivery' | 'pickup') {
	mode = m;
}

export const cart = {
	get lines() {
		return lines;
	},
	get count() {
		return lines.reduce((a, l) => a + l.qty, 0);
	},
	get subtotal() {
		return lines.reduce((a, l) => a + l.qty * l.price, 0);
	},
	/** 10% direct-order discount, off the subtotal, before GST. */
	get discount() {
		return Math.round(this.subtotal * 0.1);
	},
	get discountedSubtotal() {
		return this.subtotal - this.discount;
	},
	/** GST 5%, charged on the discounted subtotal. */
	get gst() {
		return Math.round(this.discountedSubtotal * 0.05);
	},
	get zoneId() {
		return zoneId;
	},
	get zone() {
		return getZone(zoneId);
	},
	get orderMode() {
		return mode;
	},
	get deliveryFee() {
		return deliveryFeeFor(zoneId, this.subtotal, mode);
	},
	/** Minimum order for the selected zone (0 for pickup). */
	get minOrder() {
		return mode === 'pickup' ? 0 : minOrderFor(zoneId);
	},
	get meetsMinimum() {
		return this.subtotal >= this.minOrder;
	},
	/** Free-delivery threshold for the selected zone (null = never free). */
	get freeDeliveryThreshold() {
		return freeDeliveryThresholdFor(zoneId);
	},
	get total() {
		return this.discountedSubtotal + this.gst + this.deliveryFee;
	},
	get lastAdded() {
		return lines.length ? lines[lines.length - 1].name : '';
	}
};

/**
 * Add one of a dish. `key` is a dish slug (preferred) or a full dish name;
 * the line is always keyed + displayed with the canonical slug/name/price
 * from site.ts, so the same dish never splits into two lines. `price` is
 * only used when the key matches nothing in the menu (unknown item).
 */
export function addToOrder(key: string, price?: number) {
	const dish = findDish(key);
	const slug = dish ? dish.slug : slugify(key);
	const name = dish ? dish.name : key;
	const unitPrice = dish ? dish.price : (price ?? 0);
	const line = lines.find((l) => l.slug === slug);
	if (line) line.qty += 1;
	else lines.push({ slug, name, price: unitPrice, qty: 1 });
}

/** Add one of a dish by slug. */
export function addDish(slug: string) {
	addToOrder(slug);
}

/** `key` is a line slug (preferred) or a full dish name. */
export function setQty(key: string, qty: number) {
	const line = lines.find((l) => l.slug === key || l.name === key);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
}

/** `key` is a line slug (preferred) or a full dish name. */
export function removeLine(key: string) {
	const i = lines.findIndex((l) => l.slug === key || l.name === key);
	if (i >= 0) lines.splice(i, 1);
}

export function clearCart() {
	lines.splice(0, lines.length);
}

export function addMenuItem(name: string) {
	const item = menuItems.find((m) => m.name === name);
	if (item) addToOrder(item.slug);
}
