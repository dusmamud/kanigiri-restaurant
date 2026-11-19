<script lang="ts">
	import Logo from '#lib/components/Logo.svelte';
	import SocialIcon from '#lib/components/SocialIcon.svelte';
	import { site } from '#lib/data/site.ts';

	const explore = [
		{ label: 'Full Menu', href: '/menu' },
		{ label: 'Order Online', href: '/order' },
		{ label: 'Book a Table', href: '/reservations' },
		{ label: 'Offers', href: '/offers' },
		{ label: 'Gallery', href: '/gallery' },
		{ label: 'Catering', href: '/catering' }
	];
	const about = [
		{ label: 'Our Story', href: '/about' },
		{ label: 'Reviews', href: '/reviews' },
		{ label: 'FAQ', href: '/faq' },
		{ label: 'Contact', href: '/contact' },
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms', href: '/terms' }
	];
</script>

<footer id="contact" class="relative bg-[#efedf2] pt-16 pb-8" aria-label="Footer">
	<!-- Wavy top edge -->
	<svg
		class="absolute inset-x-0 -top-[1px] h-[36px] w-full rotate-180"
		viewBox="0 0 1440 64"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
	</svg>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 text-center md:grid-cols-3 md:text-left">
			<div class="flex flex-col items-center md:items-start">
				<Logo />
				<p class="mt-4 max-w-md text-sm leading-relaxed text-muted">
					{site.address}<br />
					{site.hours} · <a class="font-semibold text-cocoa underline underline-offset-4" href={site.phoneHref}
						>{site.phoneDisplay}</a
					>
				</p>
				<div class="mt-6 flex items-center gap-3">
					<a
						href="https://www.facebook.com/"
						target="_blank"
						rel="noopener"
						aria-label="Kanigiri on Facebook"
						class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-cocoa shadow-sm transition-all duration-200 hover:bg-mango hover:scale-105"
					>
						<SocialIcon network="facebook" />
					</a>
					<a
						href="https://www.pinterest.com/"
						target="_blank"
						rel="noopener"
						aria-label="Kanigiri on Pinterest"
						class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-cocoa shadow-sm transition-all duration-200 hover:bg-mango hover:scale-105"
					>
						<SocialIcon network="pinterest" />
					</a>
					<a
						href="https://x.com/"
						target="_blank"
						rel="noopener"
						aria-label="Kanigiri on X"
						class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-cocoa shadow-sm transition-all duration-200 hover:bg-mango hover:scale-105"
					>
						<SocialIcon network="x" />
					</a>
					<a
						href="https://www.instagram.com/"
						target="_blank"
						rel="noopener"
						aria-label="Kanigiri on Instagram"
						class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-cocoa shadow-sm transition-all duration-200 hover:bg-mango hover:scale-105"
					>
						<SocialIcon network="instagram" />
					</a>
				</div>
			</div>

			<nav aria-label="Explore">
				<p class="font-display text-lg font-black text-cocoa">Explore</p>
				<ul class="mt-3 space-y-2 text-sm font-semibold">
					{#each explore as link}
						<li><a href={link.href} class="text-leaf-dark transition-colors hover:text-cocoa">{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="About and help">
				<p class="font-display text-lg font-black text-cocoa">About & help</p>
				<ul class="mt-3 space-y-2 text-sm font-semibold">
					{#each about as link}
						<li><a href={link.href} class="text-leaf-dark transition-colors hover:text-cocoa">{link.label}</a></li>
					{/each}
				</ul>
				<p class="mt-4 text-sm text-muted">
					Also on
					<a href="https://www.zomato.com/" target="_blank" rel="noopener" class="font-semibold text-cocoa underline underline-offset-4">Zomato</a>
					·
					<a href="https://www.swiggy.com/" target="_blank" rel="noopener" class="font-semibold text-cocoa underline underline-offset-4">Swiggy</a>
					·
					<a href="/sitemap.xml" class="font-semibold text-cocoa underline underline-offset-4">Sitemap</a>
				</p>
			</nav>
		</div>

		<div class="mt-10 border-t border-line/70 pt-6 text-center">
			<p class="text-xs leading-relaxed text-muted">
				Return policy (mock): wrong or cold order? Tell us within 30 minutes and we replace it or refund
				it — no questions asked.
			</p>
			<p class="mt-3 text-xs text-muted">
				Copyright © 2010–2026 Kanigiri Restaurant. All rights reserved. · Mock website for design review.
			</p>
		</div>
	</div>
</footer>
