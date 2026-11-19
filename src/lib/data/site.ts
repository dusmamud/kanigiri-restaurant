// Kanigiri Restaurant — Taste of Andhra.
// ALL content here is MOCK data for design review. Real menu, prices and
// contact details replace this file only after the client approves the design.
export const site = {
	name: 'Kanigiri Restaurant',
	tagline: 'Taste of Andhra',
	phoneDisplay: '+91 90007 90007',
	phoneHref: 'tel:+919000790007',
	whatsappHref: 'https://wa.me/919000790007',
	email: 'hello@kanigiri.in',
	url: 'https://kanigiri-restaurant.pages.dev',
	address: 'Kanigiri Restaurant, Main Road, Kanigiri, Andhra Pradesh, India',
	addressShort: 'Main Road, Kanigiri, Andhra Pradesh',
	hours: '11:00 AM – 10:00 PM, all days',
	hoursShort: '11 AM – 10 PM · Open all days',
	established: 2010,
	fssai: 'FSSAI Lic. No. 10012043001234',
	mapEmbed:
		'https://maps.google.com/maps?q=Kanigiri%2C%20Andhra%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed',
	areas: ['Kanigiri', 'Ongole', 'Markapur', 'Podili', 'Darsi', 'Chimakurthy', 'Kandukur']
};

export const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Menu', href: '/menu' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Offers', href: '/offers' },
	{ label: 'Reviews', href: '/reviews' },
	{ label: 'Contact', href: '/contact' }
];

// ─── Sitemap — single source of truth for static routes ────────────────────
// NEXT AGENT: when you add a page, add its path to `sitePages` below and it
// appears in sitemap.xml automatically — src/routes/sitemap.xml/+server.ts
// builds the sitemap from this array + the dish slugs in `dishes`.
export const sitePages: string[] = [
	'/',
	'/menu',
	'/order',
	'/reservations',
	'/about',
	'/gallery',
	'/offers',
	'/reviews',
	'/contact',
	'/catering',
	'/faq',
	'/privacy',
	'/terms',
	'/gift-cards',
	'/first-visit',
	'/accessibility'
];

// ─── Chefs (mock team) ─────────────────────────────────────────────────────
export type Chef = {
	id: string;
	name: string;
	role: string;
	/** Dish slugs this chef is known for — link with `/menu/${slug}`. */
	speciality: string[];
	bio: string;
};

export const chefs: Chef[] = [
	{
		id: 'srinivas-rao',
		name: 'Srinivas Rao',
		role: 'Head Chef',
		speciality: ['mutton-biryani', 'gongura-mutton', 'andhra-chicken-curry'],
		bio: 'Sixteen years at the dum handi. Srinivas still seals every biryani himself and grinds the Guntur chillies fresh each morning — the fiery dishes are his.'
	},
	{
		id: 'lakshmi-devi',
		name: 'Lakshmi Devi',
		role: 'Head of the Veg Kitchen',
		speciality: ['palak-paneer', 'paneer-butter-masala', 'dal-makhani', 'veg-biryani'],
		bio: 'Lakshmi runs the veg kitchen in separate vessels, exactly as it should be. Her palak paneer converts people who say they do not like palak.'
	},
	{
		id: 'arjun-reddy',
		name: 'Arjun Reddy',
		role: 'Biryani Master',
		speciality: ['chicken-biryani', 'prawn-biryani', 'egg-biryani', 'jeera-chawal', 'ghee-rice', 'lemon-rice', 'curd-rice'],
		bio: 'Arjun owns the rice station — every biryani and every pot of tempered rice passes through his hands, from the saffron soak to the final dum.'
	},
	{
		id: 'meera-nair',
		name: 'Meera Nair',
		role: 'Tandoor & Curries Chef',
		speciality: ['kadai-chicken', 'butter-naan', 'garlic-naan', 'raita', 'salan'],
		bio: 'Meera works the tandoor and the kadai — smoky chicken, blistered naan, and the salan that every biryani on the menu is served with.'
	}
];

// ─── Dishes — THE one canonical menu ───────────────────────────────────────
// One array, all 19 menu items. `Dish.name` is the FULL name everywhere
// (e.g. 'Mutton Biryani') — never a short name. `id` and `slug` are the same
// URL slug: cart lines, menu links and detail pages all key on the slug,
// never on the name. `script` is ONLY the decorative accent word shown in
// the hero / detail header — do NOT render `{script} {name}` together,
// it would repeat the first word (e.g. 'Mutton Mutton Biryani').
// STAND-IN PHOTOS: only 4 real dish photos exist (the transparent cutouts).
// Dishes without their own photo reuse the closest real photo as `image`
// until real photos are generated — do not present them as the dish's own
// photo. `signatureDishes` below lists the 4 dishes with real photos.
export type Dish = {
	id: string;
	slug: string;
	script: string;
	name: string;
	price: number;
	mrp: number;
	rating: number;
	reviews: number;
	desc: string;
	image: string;
	alt: string;
	veg: boolean;
	spice: 1 | 2 | 3;
	serves: string;
	tag?: string;
	category: 'Biryani' | 'Rice' | 'Curries' | 'Breads & Sides';
	allergens: string[];
	chefId: string;
};

export const dishes: Dish[] = [
	{
		id: 'mutton-biryani',
		slug: 'mutton-biryani',
		script: 'Mutton',
		name: 'Mutton Biryani',
		price: 360,
		mrp: 410,
		rating: 4.5,
		reviews: 521,
		desc: 'Tender lamb, saffron rice, fried onions, star anise. Served with raita & salan.',
		image: 'mutton-biryani-transparent',
		alt: 'Mutton biryani in a black tray with raita, salan, lemon and whole spices',
		veg: false,
		spice: 2,
		serves: 'Serves 1–2',
		tag: 'Bestseller',
		category: 'Biryani',
		allergens: ['Milk', 'Nuts'],
		chefId: 'srinivas-rao'
	},
	{
		id: 'chicken-biryani',
		slug: 'chicken-biryani',
		script: 'Chicken',
		name: 'Chicken Biryani',
		price: 320,
		mrp: 360,
		rating: 4.5,
		reviews: 412,
		desc: 'Andhra-style chicken biryani with green chilli and mint, dum-cooked on low flame.',
		image: 'mutton-biryani-transparent',
		alt: 'Chicken biryani — stand-in photo of the mutton biryani tray',
		veg: false,
		spice: 2,
		serves: 'Serves 1–2',
		category: 'Biryani',
		allergens: ['Milk', 'Nuts'],
		chefId: 'arjun-reddy'
	},
	{
		id: 'veg-biryani',
		slug: 'veg-biryani',
		script: 'Veg',
		name: 'Veg Biryani',
		price: 240,
		mrp: 270,
		rating: 4.5,
		reviews: 268,
		desc: 'Garden vegetables and paneer layered with saffron rice and birista.',
		image: 'mutton-biryani-transparent',
		alt: 'Veg biryani — stand-in photo of the mutton biryani tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1–2',
		category: 'Biryani',
		allergens: ['Milk', 'Nuts'],
		chefId: 'lakshmi-devi'
	},
	{
		id: 'prawn-biryani',
		slug: 'prawn-biryani',
		script: 'Prawn',
		name: 'Prawn Biryani',
		price: 420,
		mrp: 460,
		rating: 4.5,
		reviews: 187,
		desc: 'Juicy prawns folded into fragrant rice with curry leaves and pepper.',
		image: 'mutton-biryani-transparent',
		alt: 'Prawn biryani — stand-in photo of the mutton biryani tray',
		veg: false,
		spice: 2,
		serves: 'Serves 1–2',
		category: 'Biryani',
		allergens: ['Shellfish', 'Milk', 'Nuts'],
		chefId: 'arjun-reddy'
	},
	{
		id: 'egg-biryani',
		slug: 'egg-biryani',
		script: 'Egg',
		name: 'Egg Biryani',
		price: 210,
		mrp: 240,
		rating: 4.5,
		reviews: 203,
		desc: 'Masala-coated eggs layered with rice — simple, filling, loved by everyone.',
		image: 'mutton-biryani-transparent',
		alt: 'Egg biryani — stand-in photo of the mutton biryani tray',
		veg: false,
		spice: 1,
		serves: 'Serves 1',
		category: 'Biryani',
		allergens: ['Egg', 'Milk', 'Nuts'],
		chefId: 'arjun-reddy'
	},
	{
		id: 'jeera-chawal',
		slug: 'jeera-chawal',
		script: 'Jeera',
		name: 'Jeera Chawal',
		price: 180,
		mrp: 200,
		rating: 4.5,
		reviews: 312,
		desc: 'Cumin-tempered basmati with ghee. The quiet partner to every curry.',
		image: 'jeera-chawal-transparent',
		alt: 'Jeera chawal — cumin-tempered basmati rice in a black tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Rice',
		allergens: ['Milk'],
		chefId: 'arjun-reddy'
	},
	{
		id: 'ghee-rice',
		slug: 'ghee-rice',
		script: 'Ghee',
		name: 'Ghee Rice',
		price: 190,
		mrp: 210,
		rating: 4.5,
		reviews: 156,
		desc: 'Basmati fried in ghee with cashews, raisins and whole spices.',
		image: 'jeera-chawal-transparent',
		alt: 'Ghee rice — stand-in photo of the jeera chawal tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Rice',
		allergens: ['Milk', 'Nuts'],
		chefId: 'arjun-reddy'
	},
	{
		id: 'lemon-rice',
		slug: 'lemon-rice',
		script: 'Lemon',
		name: 'Lemon Rice',
		price: 160,
		mrp: 180,
		rating: 4.5,
		reviews: 141,
		desc: 'Tangy lemon rice with peanuts, curry leaves and a crackle of mustard.',
		image: 'jeera-chawal-transparent',
		alt: 'Lemon rice — stand-in photo of the jeera chawal tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Rice',
		allergens: ['Nuts'],
		chefId: 'arjun-reddy'
	},
	{
		id: 'curd-rice',
		slug: 'curd-rice',
		script: 'Curd',
		name: 'Curd Rice',
		price: 140,
		mrp: 160,
		rating: 4.5,
		reviews: 178,
		desc: 'Cool, creamy curd rice with pomegranate — the Andhra way to finish a fiery meal.',
		image: 'jeera-chawal-transparent',
		alt: 'Curd rice — stand-in photo of the jeera chawal tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Rice',
		allergens: ['Milk'],
		chefId: 'arjun-reddy'
	},
	{
		id: 'kadai-chicken',
		slug: 'kadai-chicken',
		script: 'Kadai',
		name: 'Kadai Chicken',
		price: 220,
		mrp: 260,
		rating: 4.5,
		reviews: 428,
		desc: 'Smoky kadai masala, capsicum and crushed pepper. Bold, not shy.',
		image: 'kadai-chicken-transparent',
		alt: 'Kadai chicken in a rich reddish masala with capsicum in a black tray',
		veg: false,
		spice: 3,
		serves: 'Serves 1–2',
		tag: 'Spicy',
		category: 'Curries',
		allergens: ['Milk'],
		chefId: 'meera-nair'
	},
	{
		id: 'andhra-chicken-curry',
		slug: 'andhra-chicken-curry',
		script: 'Andhra',
		name: 'Andhra Chicken Curry',
		price: 280,
		mrp: 310,
		rating: 4.5,
		reviews: 356,
		desc: 'Fiery red curry with Guntur chillies — the dish that built our name.',
		image: 'kadai-chicken-transparent',
		alt: 'Andhra chicken curry — stand-in photo of the kadai chicken tray',
		veg: false,
		spice: 3,
		serves: 'Serves 1–2',
		category: 'Curries',
		allergens: [],
		chefId: 'srinivas-rao'
	},
	{
		id: 'gongura-mutton',
		slug: 'gongura-mutton',
		script: 'Gongura',
		name: 'Gongura Mutton',
		price: 380,
		mrp: 420,
		rating: 4.5,
		reviews: 294,
		desc: 'Slow-cooked mutton in tangy gongura leaves. Sour, spicy, unforgettable.',
		image: 'kadai-chicken-transparent',
		alt: 'Gongura mutton — stand-in photo of the kadai chicken tray',
		veg: false,
		spice: 3,
		serves: 'Serves 1–2',
		category: 'Curries',
		allergens: [],
		chefId: 'srinivas-rao'
	},
	{
		id: 'palak-paneer',
		slug: 'palak-paneer',
		script: 'Palak',
		name: 'Palak Paneer',
		price: 200,
		mrp: 220,
		rating: 4.5,
		reviews: 296,
		desc: 'Silky spinach and soft paneer with garlic and a whole red chilli.',
		image: 'palak-paneer-transparent',
		alt: 'Palak paneer — paneer cubes in dark green spinach gravy in a black tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1–2',
		category: 'Curries',
		allergens: ['Milk'],
		chefId: 'lakshmi-devi'
	},
	{
		id: 'paneer-butter-masala',
		slug: 'paneer-butter-masala',
		script: 'Paneer',
		name: 'Paneer Butter Masala',
		price: 230,
		mrp: 260,
		rating: 4.5,
		reviews: 231,
		desc: 'Creamy tomato-butter gravy with soft paneer and kasuri methi.',
		image: 'palak-paneer-transparent',
		alt: 'Paneer butter masala — stand-in photo of the palak paneer tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1–2',
		category: 'Curries',
		allergens: ['Milk', 'Nuts'],
		chefId: 'lakshmi-devi'
	},
	{
		id: 'dal-makhani',
		slug: 'dal-makhani',
		script: 'Dal',
		name: 'Dal Makhani',
		price: 180,
		mrp: 200,
		rating: 4.5,
		reviews: 189,
		desc: 'Black urad simmered overnight with butter and cream.',
		image: 'palak-paneer-transparent',
		alt: 'Dal makhani — stand-in photo of the palak paneer tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1–2',
		category: 'Curries',
		allergens: ['Milk'],
		chefId: 'lakshmi-devi'
	},
	{
		id: 'butter-naan',
		slug: 'butter-naan',
		script: 'Butter',
		name: 'Butter Naan',
		price: 45,
		mrp: 55,
		rating: 4.5,
		reviews: 98,
		desc: 'Tandoor-baked, brushed with butter.',
		image: 'palak-paneer-transparent',
		alt: 'Butter naan — stand-in photo of the palak paneer tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Breads & Sides',
		allergens: ['Gluten', 'Milk'],
		chefId: 'meera-nair'
	},
	{
		id: 'garlic-naan',
		slug: 'garlic-naan',
		script: 'Garlic',
		name: 'Garlic Naan',
		price: 55,
		mrp: 65,
		rating: 4.5,
		reviews: 87,
		desc: 'Naan topped with garlic and coriander.',
		image: 'palak-paneer-transparent',
		alt: 'Garlic naan — stand-in photo of the palak paneer tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Breads & Sides',
		allergens: ['Gluten', 'Milk'],
		chefId: 'meera-nair'
	},
	{
		id: 'raita',
		slug: 'raita',
		script: 'Cucumber',
		name: 'Raita',
		price: 40,
		mrp: 50,
		rating: 4.5,
		reviews: 76,
		desc: 'Cool cucumber raita with cumin and coriander.',
		image: 'palak-paneer-transparent',
		alt: 'Raita — stand-in photo of the palak paneer tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Breads & Sides',
		allergens: ['Milk'],
		chefId: 'meera-nair'
	},
	{
		id: 'salan',
		slug: 'salan',
		script: 'Peanut',
		name: 'Salan',
		price: 50,
		mrp: 60,
		rating: 4.5,
		reviews: 64,
		desc: 'The classic biryani companion — tangy, nutty, gently spiced.',
		image: 'palak-paneer-transparent',
		alt: 'Salan — stand-in photo of the palak paneer tray',
		veg: true,
		spice: 2,
		serves: 'Serves 1',
		category: 'Breads & Sides',
		allergens: ['Nuts'],
		chefId: 'meera-nair'
	}
];

/** The hero dish — the same object as dishes[0], not a copy. */
export const heroDish: Dish = dishes[0];

/** Dishes with their own real photo — use for carousels / spotlights that render images. */
export const signatureDishes: Dish[] = dishes.filter((d) =>
	['mutton-biryani', 'jeera-chawal', 'kadai-chicken', 'palak-paneer'].includes(d.id)
);

export type MenuItem = {
	slug: string;
	name: string;
	desc: string;
	price: number;
	mrp?: number;
	category: 'Biryani' | 'Rice' | 'Curries' | 'Breads & Sides';
	veg: boolean;
	spice: 1 | 2 | 3;
	allergens: string[];
	chefId: string;
	image: string;
};

export const menuCategories = ['All', 'Biryani', 'Rice', 'Curries', 'Breads & Sides'] as const;

/** Menu rows, derived from `dishes` so the two can never drift apart again.
 *  Link menu titles with `/menu/${item.slug}` — never by name. */
export const menuItems: MenuItem[] = dishes.map((d) => ({
	slug: d.slug,
	name: d.name,
	desc: d.desc,
	price: d.price,
	mrp: d.mrp,
	category: d.category,
	veg: d.veg,
	spice: d.spice,
	allergens: d.allergens,
	chefId: d.chefId,
	image: d.image
}));

export const testimonials = [
	{
		name: 'Priya Sharma',
		area: 'Hyderabad',
		rating: 5,
		text: 'The mutton biryani tastes like it came straight out of a home kitchen in Andhra — soft lamb, real saffron, and the salan is perfect. I order it every Sunday now.'
	},
	{
		name: 'Rahul Verma',
		area: 'Vijayawada',
		rating: 5,
		text: 'Ordered the kadai chicken for a family dinner and it was gone in ten minutes. Spicy in the right way, not just hot for the sake of it. Delivery was still warm.'
	},
	{
		name: 'Ananya Reddy',
		area: 'Kanigiri',
		rating: 4.5,
		text: 'Palak paneer and jeera chawal is my comfort order. Portions are generous, prices are honest, and the food always arrives exactly as promised.'
	}
];

export const stats = [
	{ value: '14+', label: 'Years serving' },
	{ value: '120+', label: 'Dishes on the menu' },
	{ value: '4.5', label: 'Average rating' },
	{ value: '50k+', label: 'Orders delivered' }
];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// ─── Offers ────────────────────────────────────────────────────────────────
export type Offer = { id: string; title: string; detail: string; tag: string; dish?: string };

export const offers: Offer[] = [
	{
		id: 'direct-10',
		title: 'Order direct, save 10%',
		detail: 'Every order placed on this website gets 10% off — no commission to apps, the saving comes to you.',
		tag: 'Direct orders'
	},
	{
		id: 'family-bucket',
		title: 'Family Bucket Biryani',
		detail: 'Chicken biryani for 3–4 with raita, salan and 4 eggs — ₹899, serves the whole table.',
		tag: 'Family pack',
		dish: 'Chicken Biryani'
	},
	{
		id: 'lunch-thali',
		title: 'Andhra Lunch Thali',
		detail: 'Rice, dal, 2 curries, curd, papad and a sweet — ₹199, weekdays 12–3:30 PM.',
		tag: 'Weekday lunch'
	},
	{
		id: 'fifth-free',
		title: '5th biryani free',
		detail: 'Order any 4 biryanis on direct orders and the 5th is on us. Loyalty, the simple way.',
		tag: 'Loyalty'
	}
];

// ─── Delivery ──────────────────────────────────────────────────────────────
// Zone rules — the single source of truth for fee + minimum. The cart
// (src/lib/cart.svelte.ts) reads these, so change the numbers here only.
// fee = delivery charge when the order does NOT qualify for free delivery.
// freeAbove = subtotal at/above which delivery is free (null = never free).
// min = minimum order for the zone; checkout must block below it.
export type DeliveryZone = {
	id: string;
	area: string;
	fee: number;
	min: number;
	freeAbove: number | null;
	time: string;
};

export const deliveryZones: DeliveryZone[] = [
	{ id: 'kanigiri-town', area: 'Kanigiri town', fee: 0, min: 0, freeAbove: 0, time: '30–40 min' },
	{ id: 'within-5km', area: 'Within 5 km', fee: 0, min: 499, freeAbove: 499, time: '35–45 min' },
	{ id: '5-10km', area: '5–10 km', fee: 40, min: 499, freeAbove: null, time: '45–60 min' },
	{ id: 'ongole-markapur', area: 'Ongole & Markapur', fee: 60, min: 999, freeAbove: null, time: '60–75 min' }
];

// ─── Gallery ───────────────────────────────────────────────────────────────
// HONEST gallery: only 4 real dish photos exist, so only 4 items. Do NOT
// pad this back to 12 by repeating a photo under a different label —
// generate/shoot new photos first, then add one entry per new photo.
export type GalleryItem = { image: string; alt: string; label: string; category: string };

export const gallery: GalleryItem[] = [
	{ image: 'mutton-biryani-transparent', alt: 'Mutton biryani tray with raita and salan', label: 'Mutton Biryani', category: 'Biryani' },
	{ image: 'kadai-chicken-transparent', alt: 'Kadai chicken in rich masala', label: 'Kadai Chicken', category: 'Curries' },
	{ image: 'palak-paneer-transparent', alt: 'Palak paneer in spinach gravy', label: 'Palak Paneer', category: 'Curries' },
	{ image: 'jeera-chawal-transparent', alt: 'Jeera chawal rice tray', label: 'Jeera Chawal', category: 'Rice' }
];

export const galleryCategories = ['All', 'Biryani', 'Curries', 'Rice'] as const;

// ─── Dish details (signature dishes) ───────────────────────────────────────
export type DishDetail = { story: string; includes: string[]; spiceNote: string };

export const dishDetails: Record<string, DishDetail> = {
	'mutton-biryani': {
		story:
			'Our signature since 2010. Lamb marinated overnight in green chilli, mint and raw papaya, layered with saffron rice and sealed with dough — dum-cooked on a slow wood fire, opened at your table.',
		includes: ['Raita', 'Salan', 'Boiled egg', 'Fried onions', 'Lemon & green chilli'],
		spiceNote: 'Medium heat — Guntur chillies for flavour, not just fire. Ask us to tone it down and we will.'
	},
	'chicken-biryani': {
		story:
			'Andhra-style chicken biryani, dum-cooked on a low flame with green chilli and mint. The weekday favourite — lighter than mutton, just as fragrant.',
		includes: ['Raita', 'Salan', 'Boiled egg', 'Fried onions'],
		spiceNote: 'Medium heat. Ask us to tone it down and we will.'
	},
	'veg-biryani': {
		story:
			'Garden vegetables and paneer layered with saffron rice and birista. No meat, no compromise — the dum does the same slow work as our mutton biryani.',
		includes: ['Raita', 'Salan', 'Papad'],
		spiceNote: 'Mild — gentle enough for kids and spice-shy guests.'
	},
	'prawn-biryani': {
		story:
			'Juicy prawns folded into fragrant rice with curry leaves and cracked pepper. The prawns go in last so they stay tender, never rubbery.',
		includes: ['Raita', 'Salan', 'Lemon'],
		spiceNote: 'Medium heat, with pepper warmth rather than chilli fire.'
	},
	'egg-biryani': {
		story:
			'Masala-coated eggs layered with rice — the simple, filling biryani that regulars order when they want comfort without a decision.',
		includes: ['Raita', 'Salan'],
		spiceNote: 'Mild — a safe first biryani for spice-shy guests.'
	},
	'jeera-chawal': {
		story:
			'Basmati tossed in ghee with cumin, curry leaves and a whisper of green chilli. It looks simple; it is the dish our regulars judge us by.',
		includes: ['Curd on the side', 'Papad'],
		spiceNote: 'Mild — gentle enough for kids, and the perfect partner for any fiery curry.'
	},
	'ghee-rice': {
		story:
			'Basmati fried in ghee with cashews, raisins and whole spices. Rich, fragrant, and the rice our regulars order with a fiery curry on the side.',
		includes: ['Papad'],
		spiceNote: 'Mild — the ghee softens everything around it.'
	},
	'lemon-rice': {
		story:
			'Tangy lemon rice with peanuts, curry leaves and a crackle of mustard. Bright and sharp — the palate cleanser of the Andhra table.',
		includes: ['Papad'],
		spiceNote: 'Mild — tangy rather than hot.'
	},
	'curd-rice': {
		story:
			'Cool, creamy curd rice with pomegranate — the Andhra way to finish a fiery meal. Order it alongside anything spicy and thank us later.',
		includes: ['Pomegranate', 'Curry leaves'],
		spiceNote: 'No heat at all — it is the cooler, not the fire.'
	},
	'kadai-chicken': {
		story:
			'Chicken tossed in a smoky kadai masala with capsicum and crushed black pepper, finished the Andhra way — bold, never shy.',
		includes: ['Onion rings', 'Lemon', 'Green chilli'],
		spiceNote: 'Fiery — our hottest chicken. Raita and curd rice tame it if you need a break.'
	},
	'andhra-chicken-curry': {
		story:
			'Fiery red curry with Guntur chillies — the dish that built our name. Ground fresh every morning, simmered slow, served the way Andhra eats it.',
		includes: ['Onion rings', 'Lemon'],
		spiceNote: 'Fiery — the real Andhra heat. Order curd rice alongside if you are new to it.'
	},
	'gongura-mutton': {
		story:
			'Slow-cooked mutton in tangy gongura leaves. Sour, spicy, unforgettable — the most Andhra dish on the menu, and the one regulars drive in for.',
		includes: ['Onion rings', 'Lemon', 'Green chilli'],
		spiceNote: 'Fiery and tangy — the gongura sourness balances the heat.'
	},
	'palak-paneer': {
		story:
			'Silky spinach and soft paneer, slow-cooked with garlic and a whole red chilli. The dish that converts people who say they do not like palak.',
		includes: ['Butter naan on the side (optional)', 'Cream swirl'],
		spiceNote: 'Mild — gentle heat, deep flavour. A safe first order for spice-shy guests.'
	},
	'paneer-butter-masala': {
		story:
			'Creamy tomato-butter gravy with soft paneer and kasuri methi. The crowd-pleaser — mild, rich, and the first veg curry kids ask for by name.',
		includes: ['Butter naan on the side (optional)', 'Cream swirl'],
		spiceNote: 'Mild — the gentlest curry on the menu.'
	},
	'dal-makhani': {
		story:
			'Black urad simmered overnight with butter and cream. Slow food in the truest sense — it takes a night on the stove and ten minutes at your table.',
		includes: ['Butter naan on the side (optional)', 'Cream swirl'],
		spiceNote: 'Mild — comfort food, no heat to worry about.'
	},
	'butter-naan': {
		story:
			'Tandoor-baked naan, brushed with butter the moment it leaves the flame. Made to order, one at a time — never reheated.',
		includes: ['Butter brush'],
		spiceNote: 'No heat — the vehicle for everything spicy on the table.'
	},
	'garlic-naan': {
		story:
			'Naan topped with garlic and coriander, blistered in the tandoor. The one regulars order an extra of, every time.',
		includes: ['Garlic & coriander topping'],
		spiceNote: 'No heat — garlic warmth, not chilli.'
	},
	raita: {
		story:
			'Cool cucumber raita with cumin and coriander. Small bowl, big job — it is what stands between you and the Guntur chillies.',
		includes: ['Cucumber', 'Cumin tempering'],
		spiceNote: 'No heat at all — it is the cooler.'
	},
	salan: {
		story:
			'The classic biryani companion — tangy, nutty, gently spiced. No biryani leaves the kitchen without it.',
		includes: ['Peanuts', 'Tamarind'],
		spiceNote: 'Medium — gentle spice, tangy finish.'
	}
};

// ─── Reviews (extended) ────────────────────────────────────────────────────
export const allReviews = [
	{
		name: 'Priya Sharma',
		area: 'Hyderabad',
		rating: 5,
		dish: 'Mutton Biryani',
		date: 'Nov 2026',
		text: 'The mutton biryani tastes like it came straight out of a home kitchen in Andhra — soft lamb, real saffron, and the salan is perfect. I order it every Sunday now.'
	},
	{
		name: 'Rahul Verma',
		area: 'Vijayawada',
		rating: 5,
		dish: 'Kadai Chicken',
		date: 'Oct 2026',
		text: 'Ordered the kadai chicken for a family dinner and it was gone in ten minutes. Spicy in the right way, not just hot for the sake of it. Delivery was still warm.'
	},
	{
		name: 'Ananya Reddy',
		area: 'Kanigiri',
		rating: 4.5,
		dish: 'Palak Paneer',
		date: 'Nov 2026',
		text: 'Palak paneer and jeera chawal is my comfort order. Portions are generous, prices are honest, and the food always arrives exactly as promised.'
	},
	{
		name: 'Suresh Kumar',
		area: 'Ongole',
		rating: 5,
		dish: 'Andhra Chicken Curry',
		date: 'Sep 2026',
		text: 'Finally, a place that does not apologise for Andhra spice. The Guntur chilli curry is fiery and full of flavour. Best in the district, easily.'
	},
	{
		name: 'Meena Iyer',
		area: 'Chennai',
		rating: 5,
		dish: 'Family Bucket Biryani',
		date: 'Oct 2026',
		text: 'Ordered the family bucket for a birthday — enough for six of us, still hot, and the kids loved the mild version they made on request.'
	},
	{
		name: 'Arjun Nair',
		area: 'Kanigiri',
		rating: 4,
		dish: 'Chicken Biryani',
		date: 'Nov 2026',
		text: 'Very good biryani and quick delivery. One time the raita was missing, but they sent a fresh one within 15 minutes without being asked. That is service.'
	}
];

// ─── Catering ──────────────────────────────────────────────────────────────
export type CateringPackage = { id: string; name: string; price: number; per: string; includes: string[] };

export const cateringPackages: CateringPackage[] = [
	{
		id: 'veg',
		name: 'Veg Feast',
		price: 249,
		per: 'per plate',
		includes: ['Veg biryani or pulao', 'Dal + 1 veg curry', 'Curd rice', 'Papad, pickle & sweet']
	},
	{
		id: 'nonveg',
		name: 'Andhra Non-Veg Feast',
		price: 399,
		per: 'per plate',
		includes: ['Chicken or mutton biryani', 'Andhra chicken curry', 'Raita & salan', 'Papad, pickle & sweet']
	},
	{
		id: 'premium',
		name: 'Premium Celebration',
		price: 599,
		per: 'per plate',
		includes: ['Mutton biryani + prawn curry', 'Kadai chicken', 'Dessert & soft drink', 'Live counters on request']
	}
];

// ─── Gift cards (for the /gift-cards page — add its path to `sitePages`) ───
export const giftCards = {
	amounts: [500, 1000, 2500, 5000],
	howToBuy:
		'Call +91 90007 90007 or WhatsApp us with the amount — we confirm the card on WhatsApp. Cards are ready for pickup or delivery.',
	terms: [
		'Valid for dine-in, takeaway and delivery at Kanigiri Restaurant.',
		'Valid for 12 months from the date of purchase.',
		'No online payment is taken on this site — buy by phone or WhatsApp.',
		'Not redeemable for cash. Check your balance by calling the restaurant.',
		'One card per bill; gift cards cannot be combined with other offers.'
	]
};

// ─── First visit (for the /first-visit page — add its path to `sitePages`) ─
export type FirstVisitStep = { step: number; title: string; detail: string };

export const firstVisitSteps: FirstVisitStep[] = [
	{
		step: 1,
		title: 'Start with the biryani',
		detail: 'First time here? Order the Mutton Biryani. It is the dish we are known for — dum-cooked, served with raita and salan. Veg? The Veg Biryani is the same dum, no meat.'
	},
	{
		step: 2,
		title: 'Pick your spice level',
		detail: 'Every dish lists its spice level — Mild, Medium or Fiery. Andhra food is honestly hot, but we can tone any dish down on request. Raita, pachadi and curd rice cool things down.'
	},
	{
		step: 3,
		title: 'Veg? You are covered',
		detail: 'About half the menu is vegetarian, cooked in separate vessels — veg biryani, palak paneer, dal makhani and paneer butter masala. Jain preparations are available with 2 hours notice.'
	},
	{
		step: 4,
		title: 'How ordering works',
		detail: 'Order on this site and save 10% versus food apps, or call us. Delivery takes 30–40 minutes in Kanigiri town; pickup is ready in about 25 minutes. UPI, cards and cash on delivery all work.'
	},
	{
		step: 5,
		title: 'Dining in? What to expect',
		detail: 'Lunch 12–3:30 PM, dinner 7–10:30 PM. Book a table on the reservations page — we confirm on WhatsApp within 30 minutes. Last kitchen order is 9:45 PM for dine-in.'
	},
	{
		step: 6,
		title: 'What it costs',
		detail: 'The average bill for two is about ₹700–900. Biryanis run ₹210–420, curries ₹180–380, and breads from ₹40.'
	}
];

// ─── Accessibility (for the /accessibility page — add its path to `sitePages`)
// NOTE: physical access facts (step-free entry, washroom) are NOT verified
// with the restaurant yet. Do not publish firmer claims than the 'call ahead'
// wording below until the restaurant confirms them.
export type AccessibilityFeature = { title: string; detail: string };

export const accessibilityFeatures: AccessibilityFeature[] = [
	{
		title: 'Help on request',
		detail: 'Tell us when you book or when you arrive and a member of staff will help with seating, reading the menu aloud, or carrying trays to your table.'
	},
	{
		title: 'Service animals welcome',
		detail: 'Service animals are welcome in the dining room.'
	},
	{
		title: 'Large-print menu',
		detail: 'Ask for the large-print menu — we keep one at the counter.'
	},
	{
		title: 'Step-free access — call ahead',
		detail: 'If you use a wheelchair or have limited mobility, call us on +91 90007 90007 before you visit and we will confirm the step-free route and reserve the most suitable table.'
	},
	{
		title: 'Allergen & Jain food',
		detail: 'Every dish lists its allergens on the menu page. Jain preparations (no onion, no garlic, no root vegetables) are available with 2 hours notice for most veg dishes.'
	},
	{
		title: 'Quiet seating',
		detail: 'Ask for a quieter corner table when you book — we will do our best, especially at lunch.'
	}
];

// ─── FAQ ───────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
	{
		q: 'How spicy is Andhra food, really?',
		a: 'Honest answer: our fiery dishes are hot. But every dish lists its spice level — Mild, Medium or Fiery — and we can tone any dish down on request. Raita, pachadi and curd rice are always on the menu to cool things down.'
	},
	{
		q: 'What are your delivery areas and charges?',
		a: 'Kanigiri town is free, with no minimum. Within 5 km, delivery is free on orders of ₹499 and above. 5–10 km costs ₹40 with a ₹499 minimum. Ongole and Markapur need a ₹999 minimum and cost ₹60.'
	},
	{
		q: 'Is there a minimum order?',
		a: 'No minimum for pickup, and no minimum in Kanigiri town. For delivery, the minimum is ₹499 outside Kanigiri town (₹999 for Ongole and Markapur).'
	},
	{
		q: 'What payment methods do you accept?',
		a: 'UPI (GPay / PhonePe / Paytm), all major cards, and cash on delivery. Online orders can also be paid at the counter for pickup.'
	},
	{
		q: 'Do you do bulk or catering orders?',
		a: 'Yes — weddings, office lunches and family gatherings from 25 plates. Veg from ₹249/plate, non-veg from ₹399/plate. We need 48 hours notice; enquire on the catering page.'
	},
	{
		q: 'Are there good veg options?',
		a: 'Yes — about half the menu is vegetarian, including veg biryani, palak paneer, dal makhani and paneer butter masala. Veg and non-veg are cooked in separate vessels.'
	},
	{
		q: 'Do you have allergen information?',
		a: 'Yes. Dishes may contain nuts, dairy, gluten or shellfish — ask us before ordering and we will tell you exactly what is in each dish. Nut-free preparation is available on request.'
	},
	{
		q: 'Can I book a table?',
		a: 'Yes — lunch 12–3:30 PM and dinner 7–10:30 PM. Book on the reservations page; we confirm on WhatsApp within 30 minutes between 10 AM and 10 PM.'
	},
	{
		q: 'What time is the last order?',
		a: 'Last kitchen order is 9:45 PM for dine-in and 9:30 PM for delivery. The restaurant closes at 10 PM.'
	},
	{
		q: 'Do you do Jain food on request?',
		a: 'Yes — Jain preparations (no onion, no garlic, no root vegetables) are available with 2 hours notice for most veg dishes.'
	},
	{
		q: 'Is the kitchen FSSAI certified?',
		a: 'Yes. Our FSSAI licence number is on the contact page, and the kitchen is inspected regularly. Veg and non-veg are cooked separately.'
	},
	{
		q: 'What if my order arrives wrong or cold?',
		a: 'Tell us within 30 minutes and we replace it or refund it — no questions asked. That is the Kanigiri promise.'
	}
];

// ─── Instagram (mock) ──────────────────────────────────────────────────────
export type InstagramPost = { image: string; alt: string; caption: string; likes: string };

export const instagramPosts: InstagramPost[] = [
	{ image: 'mutton-biryani-transparent', alt: 'Mutton biryani', caption: 'Dum biryani, sealed and slow-cooked. The lid comes off at your table.', likes: '2.1k' },
	{ image: 'kadai-chicken-transparent', alt: 'Kadai chicken', caption: 'Kadai chicken, straight off the flame. Fiery, not just hot.', likes: '1.4k' },
	{ image: 'palak-paneer-transparent', alt: 'Palak paneer', caption: 'Palak paneer for the spice-shy. Gentle heat, deep flavour.', likes: '980' },
	{ image: 'jeera-chawal-transparent', alt: 'Jeera chawal', caption: 'Jeera chawal — the quiet hero of every Andhra table.', likes: '1.1k' },
	{ image: 'mutton-biryani-transparent', alt: 'Biryani close-up', caption: 'Saffron rice, fried onions, star anise. No shortcuts.', likes: '1.8k' },
	{ image: 'kadai-chicken-transparent', alt: 'Chicken curry', caption: 'Guntur chillies, ground fresh every morning.', likes: '1.2k' }
];
