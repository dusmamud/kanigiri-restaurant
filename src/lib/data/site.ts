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

export type Dish = {
	id: string;
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
};

export const heroDish: Dish = {
	id: 'mutton-biryani',
	script: 'Mutton',
	name: 'Biryani',
	price: 360,
	mrp: 410,
	rating: 4.5,
	reviews: 521,
	desc: 'Aromatic, soft, and tender chunks of lamb layered with rice infused with the flavors of spices. The delicate blend of cardamom, cloves, and cinnamon creates a symphony of tastes in every bite.',
	image: 'mutton-biryani-transparent',
	alt: 'Mutton biryani in a black tray with raita, salan, lemon and whole spices',
	veg: false,
	spice: 2,
	serves: 'Serves 1–2',
	tag: 'Bestseller'
};

export const dishes: Dish[] = [
	{
		id: 'jeera-chawal',
		script: 'Jeera',
		name: 'Chawal',
		price: 180,
		mrp: 200,
		rating: 4.5,
		reviews: 312,
		desc: 'Fragrant basmati tossed with cumin, ghee and a whisper of green chilli — the quiet comfort that goes with everything on the table.',
		image: 'jeera-chawal-transparent',
		alt: 'Jeera chawal — cumin-tempered basmati rice in a black tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1'
	},
	{
		id: 'kadai-chicken',
		script: 'Kadai',
		name: 'Chicken',
		price: 220,
		mrp: 260,
		rating: 4.5,
		reviews: 428,
		desc: 'Chicken tossed in a smoky kadai masala with capsicum and crushed pepper, finished the Andhra way — bold, never shy.',
		image: 'kadai-chicken-transparent',
		alt: 'Kadai chicken in a rich reddish masala with capsicum in a black tray',
		veg: false,
		spice: 3,
		serves: 'Serves 1–2',
		tag: 'Spicy'
	},
	{
		id: 'palak-paneer',
		script: 'Palak',
		name: 'Paneer',
		price: 200,
		mrp: 220,
		rating: 4.5,
		reviews: 296,
		desc: 'Silky spinach and soft paneer, slow-cooked with garlic and a whole red chilli. Gentle heat, deep flavour, honest comfort.',
		image: 'palak-paneer-transparent',
		alt: 'Palak paneer — paneer cubes in dark green spinach gravy in a black tray',
		veg: true,
		spice: 1,
		serves: 'Serves 1–2'
	},
	heroDish
];

export type MenuItem = {
	name: string;
	desc: string;
	price: number;
	mrp?: number;
	category: 'Biryani' | 'Rice' | 'Curries' | 'Breads & Sides';
	veg: boolean;
	spice: 1 | 2 | 3;
};

export const menuCategories = ['All', 'Biryani', 'Rice', 'Curries', 'Breads & Sides'] as const;

export const menuItems: MenuItem[] = [
	{ name: 'Mutton Biryani', desc: 'Tender lamb, saffron rice, fried onions, star anise. Served with raita & salan.', price: 360, mrp: 410, category: 'Biryani', veg: false, spice: 2 },
	{ name: 'Chicken Biryani', desc: 'Andhra-style chicken biryani with green chilli and mint, dum-cooked on low flame.', price: 320, mrp: 360, category: 'Biryani', veg: false, spice: 2 },
	{ name: 'Veg Biryani', desc: 'Garden vegetables and paneer layered with saffron rice and birista.', price: 240, mrp: 270, category: 'Biryani', veg: true, spice: 1 },
	{ name: 'Prawn Biryani', desc: 'Juicy prawns folded into fragrant rice with curry leaves and pepper.', price: 420, mrp: 460, category: 'Biryani', veg: false, spice: 2 },
	{ name: 'Egg Biryani', desc: 'Masala-coated eggs layered with rice — simple, filling, loved by everyone.', price: 210, mrp: 240, category: 'Biryani', veg: false, spice: 1 },
	{ name: 'Jeera Chawal', desc: 'Cumin-tempered basmati with ghee. The quiet partner to every curry.', price: 180, mrp: 200, category: 'Rice', veg: true, spice: 1 },
	{ name: 'Ghee Rice', desc: 'Basmati fried in ghee with cashews, raisins and whole spices.', price: 190, category: 'Rice', veg: true, spice: 1 },
	{ name: 'Lemon Rice', desc: 'Tangy lemon rice with peanuts, curry leaves and a crackle of mustard.', price: 160, category: 'Rice', veg: true, spice: 1 },
	{ name: 'Curd Rice', desc: 'Cool, creamy curd rice with pomegranate — the Andhra way to finish a fiery meal.', price: 140, category: 'Rice', veg: true, spice: 1 },
	{ name: 'Kadai Chicken', desc: 'Smoky kadai masala, capsicum and crushed pepper. Bold, not shy.', price: 220, mrp: 260, category: 'Curries', veg: false, spice: 3 },
	{ name: 'Andhra Chicken Curry', desc: 'Fiery red curry with Guntur chillies — the dish that built our name.', price: 280, category: 'Curries', veg: false, spice: 3 },
	{ name: 'Gongura Mutton', desc: 'Slow-cooked mutton in tangy gongura leaves. Sour, spicy, unforgettable.', price: 380, category: 'Curries', veg: false, spice: 3 },
	{ name: 'Palak Paneer', desc: 'Silky spinach and soft paneer with garlic and a whole red chilli.', price: 200, mrp: 220, category: 'Curries', veg: true, spice: 1 },
	{ name: 'Paneer Butter Masala', desc: 'Creamy tomato-butter gravy with soft paneer and kasuri methi.', price: 230, category: 'Curries', veg: true, spice: 1 },
	{ name: 'Dal Makhani', desc: 'Black urad simmered overnight with butter and cream.', price: 180, category: 'Curries', veg: true, spice: 1 },
	{ name: 'Butter Naan', desc: 'Tandoor-baked, brushed with butter.', price: 45, category: 'Breads & Sides', veg: true, spice: 1 },
	{ name: 'Garlic Naan', desc: 'Naan topped with garlic and coriander.', price: 55, category: 'Breads & Sides', veg: true, spice: 1 },
	{ name: 'Raita', desc: 'Cool cucumber raita with cumin and coriander.', price: 40, category: 'Breads & Sides', veg: true, spice: 1 },
	{ name: 'Salan', desc: 'The classic biryani companion — tangy, nutty, gently spiced.', price: 50, category: 'Breads & Sides', veg: true, spice: 2 }
];

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
export const deliveryZones = [
	{ area: 'Kanigiri town', fee: 0, min: 0, time: '30–40 min' },
	{ area: 'Within 5 km', fee: 0, min: 499, time: '35–45 min' },
	{ area: '5–10 km', fee: 40, min: 499, time: '45–60 min' },
	{ area: 'Ongole & Markapur', fee: 60, min: 999, time: '60–75 min' }
];

// ─── Gallery ───────────────────────────────────────────────────────────────
export type GalleryItem = { image: string; alt: string; label: string; category: string };

export const gallery: GalleryItem[] = [
	{ image: 'mutton-biryani-transparent', alt: 'Mutton biryani tray with raita and salan', label: 'Mutton Biryani', category: 'Biryani' },
	{ image: 'kadai-chicken-transparent', alt: 'Kadai chicken in rich masala', label: 'Kadai Chicken', category: 'Curries' },
	{ image: 'palak-paneer-transparent', alt: 'Palak paneer in spinach gravy', label: 'Palak Paneer', category: 'Curries' },
	{ image: 'jeera-chawal-transparent', alt: 'Jeera chawal rice tray', label: 'Jeera Chawal', category: 'Rice' },
	{ image: 'mutton-biryani-transparent', alt: 'Mutton biryani served hot', label: 'Dum Biryani', category: 'Biryani' },
	{ image: 'kadai-chicken-transparent', alt: 'Kadai chicken close-up', label: 'Kadai Chicken', category: 'Curries' },
	{ image: 'palak-paneer-transparent', alt: 'Palak paneer bowl', label: 'Palak Paneer', category: 'Curries' },
	{ image: 'jeera-chawal-transparent', alt: 'Jeera chawal with ghee', label: 'Jeera Chawal', category: 'Rice' },
	{ image: 'mutton-biryani-transparent', alt: 'Biryani family pack', label: 'Family Pack', category: 'Biryani' },
	{ image: 'kadai-chicken-transparent', alt: 'Andhra chicken curry', label: 'Andhra Curry', category: 'Curries' },
	{ image: 'palak-paneer-transparent', alt: 'Veg main course', label: 'Veg Special', category: 'Curries' },
	{ image: 'jeera-chawal-transparent', alt: 'Ghee rice', label: 'Ghee Rice', category: 'Rice' }
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
	'jeera-chawal': {
		story:
			'Basmati tossed in ghee with cumin, curry leaves and a whisper of green chilli. It looks simple; it is the dish our regulars judge us by.',
		includes: ['Curd on the side', 'Papad'],
		spiceNote: 'Mild — gentle enough for kids, and the perfect partner for any fiery curry.'
	},
	'kadai-chicken': {
		story:
			'Chicken tossed in a smoky kadai masala with capsicum and crushed black pepper, finished the Andhra way — bold, never shy.',
		includes: ['Onion rings', 'Lemon', 'Green chilli'],
		spiceNote: 'Fiery — our hottest chicken. Raita and curd rice tame it if you need a break.'
	},
	'palak-paneer': {
		story:
			'Silky spinach and soft paneer, slow-cooked with garlic and a whole red chilli. The dish that converts people who say they do not like palak.',
		includes: ['Butter naan on the side (optional)', 'Cream swirl'],
		spiceNote: 'Mild — gentle heat, deep flavour. A safe first order for spice-shy guests.'
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

// ─── FAQ ───────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
	{
		q: 'How spicy is Andhra food, really?',
		a: 'Honest answer: our fiery dishes are hot. But every dish lists its spice level — Mild, Medium or Fiery — and we can tone any dish down on request. Raita, pachadi and curd rice are always on the menu to cool things down.'
	},
	{
		q: 'What are your delivery areas and charges?',
		a: 'Kanigiri town is free. Within 5 km, delivery is free above ₹499, otherwise ₹40. 5–10 km costs ₹40 with a ₹499 minimum. Ongole and Markapur need ₹999 minimum and cost ₹60.'
	},
	{
		q: 'Is there a minimum order?',
		a: 'No minimum for pickup. For delivery, the minimum is ₹499 outside Kanigiri town.'
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
