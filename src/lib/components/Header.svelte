<script lang="ts">
	import { Menu, Phone, ShoppingBag, X } from '@lucide/svelte';
	import Logo from '#lib/components/Logo.svelte';
	import { cart } from '#lib/cart.svelte.ts';
	import { drawer } from '#lib/drawer.svelte.ts';
	import { navLinks, site } from '#lib/data/site.ts';

	let open = $state(false);

	// New pages (Gift Cards, First Visit, Accessibility) live in the mobile menu
	// and footer for now: the desktop bar at 1280px has no room for nine links
	// without wrapping, and the desktop nav must not wrap at 1280px.
	const moreLinks = [
		{ label: 'Gift Cards', href: '/gift-cards' },
		{ label: 'First Visit', href: '/first-visit' },
		{ label: 'Accessibility', href: '/accessibility' }
	];
</script>

<header class="sticky top-0 z-50 border-b border-line/60 bg-lavender/90 backdrop-blur-md">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
		<Logo />

		<nav class="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class="flex min-h-12 items-center text-sm font-semibold whitespace-nowrap text-cocoa transition-colors duration-200 hover:text-leaf-dark"
					>{link.label}</a
				>
			{/each}
		</nav>

		<div class="flex items-center gap-2 sm:gap-3">
			<a
				href={site.phoneHref}
				class="hidden min-h-12 items-center gap-2 rounded-full border border-leaf/50 bg-white/70 px-4 py-2 text-sm font-bold text-cocoa transition-colors duration-200 hover:border-leaf md:flex"
			>
				<span class="flex h-6 w-6 items-center justify-center rounded-full bg-leaf text-white">
					<Phone size={13} aria-hidden="true" />
				</span>
				CALL: {site.phoneDisplay}
			</a>

			<button
				type="button"
				onclick={() => (drawer.open = true)}
				class="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-cocoa shadow-sm ring-1 ring-line transition-transform duration-200 hover:scale-105"
				aria-label={`Your order, ${cart.count} item${cart.count === 1 ? '' : 's'}, total ₹${cart.total}`}
			>
				<ShoppingBag size={20} aria-hidden="true" />
				{#if cart.count > 0}
					<span
						class="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-mango px-1 text-[0.65rem] font-black text-cocoa"
						>{cart.count}</span
					>
				{/if}
			</button>

			<a
				href="/order"
				class="hidden h-12 items-center rounded-full bg-mango px-6 text-sm font-black tracking-wide whitespace-nowrap text-cocoa uppercase shadow-sm transition-colors duration-200 hover:bg-mango-dark hover:text-white sm:flex"
			>
				Order Now
			</a>

			<button
				type="button"
				class="flex h-12 w-12 items-center justify-center rounded-full text-cocoa transition-colors duration-200 hover:bg-white xl:hidden"
				aria-expanded={open}
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				{#if open}<X size={24} aria-hidden="true" />{:else}<Menu size={24} aria-hidden="true" />{/if}
			</button>
		</div>
	</div>

	{#if open}
		<nav
			class="border-t border-line bg-lavender px-4 pt-2 pb-5 sm:px-6 xl:hidden"
			aria-label="Mobile navigation"
		>
			{#each navLinks as link}
				<a
					href={link.href}
					class="flex min-h-12 items-center rounded-xl px-3 py-3 text-base font-semibold text-cocoa transition-colors duration-200 hover:bg-white"
					onclick={() => (open = false)}>{link.label}</a
				>
			{/each}
			{#each moreLinks as link}
				<a
					href={link.href}
					class="flex min-h-12 items-center rounded-xl px-3 py-3 text-base font-semibold text-cocoa transition-colors duration-200 hover:bg-white"
					onclick={() => (open = false)}>{link.label}</a
				>
			{/each}
			<a
				href={site.phoneHref}
				class="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white"
			>
				<Phone size={16} aria-hidden="true" /> Call {site.phoneDisplay}
			</a>
		</nav>
	{/if}
</header>
