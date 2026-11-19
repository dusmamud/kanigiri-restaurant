<script lang="ts">
	import Logo from '#lib/components/Logo.svelte';
	import SocialIcon from '#lib/components/SocialIcon.svelte';
	import { navLinks, site } from '#lib/data/site.ts';
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
		<div class="flex flex-col items-center text-center">
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

			<nav class="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm font-semibold" aria-label="Footer navigation">
				{#each navLinks as link, i}
					<a href={link.href} class="text-leaf-dark transition-colors duration-200 hover:text-cocoa"
						>{link.label}</a
					>
					{#if i < navLinks.length - 1}
						<span class="text-muted/60" aria-hidden="true">/</span>
					{/if}
				{/each}
				<span class="text-muted/60" aria-hidden="true">/</span>
				<a href="#return-policy" class="text-leaf-dark transition-colors duration-200 hover:text-cocoa"
					>Return Policy</a
				>
			</nav>

			<p id="return-policy" class="mt-5 max-w-xl text-xs leading-relaxed text-muted">
				Return policy (mock): wrong or cold order? Tell us within 30 minutes and we replace it or refund
				it — no questions asked.
			</p>
			<p class="mt-4 text-xs text-muted">
				Copyright © 2010–2024 Kanigiri Restaurant. All rights reserved. · Mock website for design review.
			</p>
		</div>
	</div>
</footer>
