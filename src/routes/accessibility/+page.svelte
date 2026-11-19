<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { accessibilityFeatures, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Accessibility — Kanigiri Restaurant | Everyone Is Welcome</title>
	<meta
		name="description"
		content="Kanigiri accessibility: help on request, service animals welcome, large-print menu, quiet seating, allergen and Jain food. Call ahead and we will reserve the most suitable table."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/accessibility" />
</svelte:head>

<PageHero
	script="Everyone is welcome"
	title="Accessibility"
	sub="Good food should be easy to reach. Here is what we offer, how to ask for help, and who to call before you visit — if anything here is unclear, call us and we will talk it through."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Accessibility features">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each accessibilityFeatures as feature}
				<article class="flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-line">
					<h2 class="font-display text-2xl font-black text-cocoa">{feature.title}</h2>
					<p class="mt-2 flex-1 text-base leading-relaxed text-muted">{feature.detail}</p>
				</article>
			{/each}
		</div>

		<div class="mt-8 rounded-3xl bg-lavender p-6 sm:p-8">
			<h2 class="font-display text-2xl font-black text-cocoa">Step-free access &amp; washroom — please call ahead</h2>
			<p class="mt-3 max-w-3xl text-base leading-relaxed text-muted">
				We want your visit to go smoothly, and the honest answer is that access arrangements vary by table
				and by day. If you use a wheelchair, have limited mobility, or need an accessible washroom, please
				call us on
				<a class="font-bold break-words text-leaf-dark underline" href={site.phoneHref}>{site.phoneDisplay}</a>
				before you visit. We will confirm the step-free route, check what is available that day, and reserve
				the most suitable table for you — rather than leaving you to find out at the door.
			</p>
			<p class="mt-3 max-w-3xl text-base leading-relaxed text-muted">
				The same goes for seating: if you need extra space, a chair with arms, or a quieter corner, tell us
				when you book and we will do our best, especially at lunch when the dining room is quieter.
			</p>
		</div>
	</div>
</section>

<section class="bg-cream py-10 sm:py-14" aria-label="Get assistance">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-2">
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-black text-cocoa">Ask for assistance</h2>
				<p class="mt-3 text-base leading-relaxed text-muted">
					You do not need a reason to ask. When you book a table, use the "Anything we should know?" note
					on the reservations page, or call or WhatsApp us before you come. On the day, any member of staff
					can help with seating, reading the menu aloud, or carrying trays to your table.
				</p>
				<div class="mt-5 flex flex-wrap gap-3">
					<a
						href={site.phoneHref}
						class="flex min-h-12 items-center rounded-full bg-mango px-6 text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-mango-dark hover:text-white"
					>
						Call {site.phoneDisplay}
					</a>
					<a
						href={site.whatsappHref}
						target="_blank"
						rel="noopener noreferrer"
						class="flex min-h-12 items-center rounded-full border-2 border-leaf px-6 text-sm font-black tracking-wider text-leaf-dark uppercase transition-colors hover:bg-leaf hover:text-white"
					>
						WhatsApp us
					</a>
					<a
						href="/reservations"
						class="flex min-h-12 items-center rounded-full border-2 border-cocoa px-6 text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-cocoa hover:text-white"
					>
						Book a table
					</a>
				</div>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-black text-cocoa">This website — WCAG 2.2 AA</h2>
				<p class="mt-3 text-base leading-relaxed text-muted">
					This site is built to meet WCAG 2.2 AA: body text is at least 16px, tap targets are at least
					48px, text contrast meets the 4.5:1 standard, every dish photo has alt text, and the menu, cart
					and forms are keyboard-operable with a visible focus outline.
				</p>
				<p class="mt-3 text-base leading-relaxed text-muted">
					If something on this site is hard for you to use — a button too small, a label that does not read
					clearly, a page your screen reader struggles with — please tell us on
					<a class="font-bold break-words text-leaf-dark underline" href="mailto:{site.email}">{site.email}</a>
					or by phone. We will fix it and let you know.
				</p>
			</div>
		</div>
	</div>
</section>
