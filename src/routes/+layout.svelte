<script lang="ts">
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/700.css';
	import '@fontsource/playfair-display/800.css';
	import '@fontsource/playfair-display/900.css';
	import '@fontsource/great-vibes/400.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '../app.css';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { Phone, ShoppingBag } from '@lucide/svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import WhatsAppIcon from '#lib/components/WhatsAppIcon.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { site } from '#lib/data/site.ts';

	let { children } = $props();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: site.name,
		slogan: site.tagline,
		description:
			'Kanigiri Restaurant — Taste of Andhra. Mutton biryani, Andhra chicken curry, kadai chicken, palak paneer and jeera chawal, cooked fresh and delivered hot.',
		telephone: site.phoneDisplay,
		email: site.email,
		servesCuisine: ['Andhra', 'South Indian', 'North Indian'],
		priceRange: '₹₹',
		url: site.url,
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Main Road, Kanigiri',
			addressLocality: 'Kanigiri',
			addressRegion: 'Andhra Pradesh',
			addressCountry: 'IN'
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens: '11:00',
			closes: '22:00'
		},
		aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '521' },
		sameAs: ['https://www.instagram.com/', 'https://www.facebook.com/']
	};

	// Smooth scroll (Lenis) + GSAP ScrollTrigger, one rAF loop, reduced-motion gated.
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);
		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			smoothWheel: true,
			syncTouch: false // native inertia on touch devices
		});
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		const progress = document.getElementById('scroll-progress');
		if (progress) {
			gsap.to(progress, {
				scaleX: 1,
				ease: 'none',
				scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
			});
		}
		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			lenis.destroy();
		};
	});

	// Reveal-on-scroll: transform + opacity only, 300ms, respects reduced motion via CSS.
	$effect(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>Kanigiri Restaurant — Taste of Andhra</title>
	<meta
		name="description"
		content="Kanigiri Restaurant — Taste of Andhra. Mutton Biryani, Kadai Chicken, Palak Paneer and Jeera Chawal, cooked fresh and delivered hot in 30–40 minutes."
	/>
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Kanigiri Restaurant — Taste of Andhra" />
	<meta
		property="og:description"
		content="Mutton Biryani ₹360, Kadai Chicken, Palak Paneer and more — fresh Andhra food, delivered hot."
	/>
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-white"
>
	Skip to main content
</a>

<!-- Scroll progress (mango line, transform only) -->
<div
	id="scroll-progress"
	class="fixed top-0 left-0 z-[55] h-[3px] w-full origin-left scale-x-0 bg-mango"
	aria-hidden="true"
></div>

<Header />
<main id="main">{@render children()}</main>
<Footer />

<!-- Floating WhatsApp (desktop/tablet) -->
<a
	href={site.whatsappHref}
	target="_blank"
	rel="noopener"
	aria-label="Chat with Kanigiri on WhatsApp"
	class="fixed right-5 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-105 md:flex"
>
	<WhatsAppIcon size={26} />
</a>

<!-- Sticky mobile bottom bar: Call / WhatsApp / Order -->
<nav
	aria-label="Quick actions"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
>
	<a href={site.phoneHref} class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink">
		<Phone size={20} class="text-leaf-dark" aria-hidden="true" />
		Call
	</a>
	<a
		href={site.whatsappHref}
		target="_blank"
		rel="noopener"
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink"
	>
		<span class="text-[#25d366]"><WhatsAppIcon size={20} /></span>
		WhatsApp
	</a>
	<a href="#menu" class="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-mango text-sm font-bold text-cocoa">
		<ShoppingBag size={20} aria-hidden="true" />
		Order{#if cart.count > 0} ({cart.count}){/if}
	</a>
</nav>
<!-- Spacer so the sticky bar never covers footer content on mobile -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>
