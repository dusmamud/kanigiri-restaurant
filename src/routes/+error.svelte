<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page not found — Kanigiri Restaurant</title>
	<meta
		name="description"
		content="That page does not exist at Kanigiri Restaurant. Head back to the menu or order a biryani instead."
	/>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
	<p class="font-script text-5xl text-leaf-dark">Oops, wrong turn</p>
	<p class="mt-4 font-display text-7xl font-black text-cocoa">404</p>
	<h1 class="mt-4 font-display text-3xl font-black text-cocoa">This dish is not on the menu</h1>
	<p class="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
		The page you are looking for ({page.url.pathname}) has moved or never existed. The biryani, on the
		other hand, is very much here.
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href="/"
			class="inline-flex min-h-12 items-center rounded-full bg-mango px-7 text-base font-bold text-cocoa transition-colors duration-200 hover:bg-mango-dark hover:text-white"
		>
			Back to home
		</a>
		<a
			href="/menu"
			class="inline-flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 text-base font-bold text-cocoa transition-colors duration-200 hover:bg-cocoa hover:text-white"
		>
			See the menu
		</a>
		<a
			href="/order"
			class="inline-flex min-h-12 items-center rounded-full bg-leaf px-7 text-base font-bold text-white transition-colors duration-200 hover:bg-leaf-dark"
		>
			Order online
		</a>
	</div>
	<p class="mt-8 text-base text-muted">
		Looking for something? Call us on
		<a href="tel:+919000790007" class="font-bold text-leaf-dark underline underline-offset-4"
			>+91 90007 90007</a
		>
		— we will point you the right way.
	</p>
</section>
