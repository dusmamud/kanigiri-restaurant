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
	hours: '11:00 AM – 10:00 PM, all days',
	established: 2010
};

export const navLinks = [
	{ label: 'Home', href: '#top' },
	{ label: 'About Us', href: '#about' },
	{ label: 'Menu', href: '#menu' },
	{ label: 'Reviews', href: '#reviews' },
	{ label: 'Contact', href: '#contact' }
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
	image: 'mutton-biryani',
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
		image: 'jeera-chawal',
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
		image: 'kadai-chicken',
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
		image: 'palak-paneer',
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
