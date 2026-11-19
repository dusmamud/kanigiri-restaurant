<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { cateringPackages, inr, site } from '#lib/data/site.ts';

	let date = $state('');
	let headcount = $state(50);
	let veg = $state(false);
	let name = $state('');
	let phone = $state('');
	let error = $state('');
	let sent = $state(false);

	const minDate = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);

	function send() {
		if (!date) return (error = 'Please pick an event date (at least 48 hours ahead).');
		if (!name.trim()) return (error = 'Please enter your name.');
		if (!/^[6-9]\d{9}$/.test(phone.trim())) return (error = 'Please enter a valid 10-digit Indian mobile number.');
		error = '';
		sent = true;
	}
</script>

<svelte:head>
	<title>Catering & Bulk Orders — Kanigiri Restaurant | Weddings, Office Lunch</title>
	<meta
		name="description"
		content="Kanigiri catering: veg from ₹249/plate, non-veg from ₹399/plate, minimum 25 plates, 48 hours notice. Weddings, office lunches, family gatherings."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/catering" />
</svelte:head>

<PageHero
	script="Big occasions"
	title="Catering & bulk orders"
	sub="Weddings, office lunches, family gatherings — from 25 plates, with 48 hours notice. Veg from ₹249/plate, non-veg from ₹399/plate."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Catering packages">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-4 md:grid-cols-3">
			{#each cateringPackages as pkg}
				<article class="flex flex-col rounded-3xl bg-cream p-6 ring-1 ring-line">
					<h2 class="font-display text-2xl font-black text-cocoa">{pkg.name}</h2>
					<p class="mt-1 font-sans text-3xl font-black text-leaf-dark">{inr(pkg.price)} <span class="text-base font-semibold text-muted">{pkg.per}</span></p>
					<ul class="mt-4 flex-1 space-y-2 text-muted">
						{#each pkg.includes as item}
							<li class="flex gap-2"><span class="text-leaf-dark" aria-hidden="true">✓</span> {item}</li>
						{/each}
					</ul>
					<p class="mt-4 text-sm text-muted">Minimum 25 plates · 48 hours notice</p>
				</article>
			{/each}
		</div>

		<div class="mt-10 grid gap-8 lg:grid-cols-2">
			<div class="rounded-3xl bg-lavender p-6 sm:p-8">
				<h2 class="font-display text-2xl font-black text-cocoa">How it works</h2>
				<ol class="mt-4 space-y-3 text-muted">
					<li><strong class="text-cocoa">1. Enquire</strong> — fill the form with your date and headcount.</li>
					<li><strong class="text-cocoa">2. We call you</strong> — within a few hours (10 AM–10 PM) to fix the menu and confirm veg/non-veg mix.</li>
					<li><strong class="text-cocoa">3. Advance</strong> — 40% advance confirms the booking; the rest on the day.</li>
					<li><strong class="text-cocoa">4. We deliver & serve</strong> — hot, on time, with serving staff on request.</li>
				</ol>
				<p class="mt-4 text-sm text-muted">Prefer to talk? Call <a class="font-bold text-leaf-dark underline" href={site.phoneHref}>{site.phoneDisplay}</a>.</p>
			</div>

			{#if sent}
				<div class="flex flex-col items-center justify-center rounded-3xl bg-cream p-8 text-center ring-1 ring-line">
					<p class="font-script text-4xl text-leaf-dark">Enquiry sent!</p>
					<p class="mt-2 text-muted">Thanks, {name} — we will call you on {phone} within a few hours to plan your {headcount}-guest event on {date}.</p>
					<p class="mt-3 text-sm text-muted">Mock form — nothing was really sent.</p>
				</div>
			{:else}
				<form
					onsubmit={(e) => {
						e.preventDefault();
						send();
					}}
					class="rounded-3xl bg-cream p-6 ring-1 ring-line"
				>
					<h2 class="font-display text-2xl font-black text-cocoa">Enquire now</h2>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div>
							<label for="ev-date" class="font-semibold text-cocoa">Event date</label>
							<input id="ev-date" type="date" bind:value={date} min={minDate} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base outline-none focus:border-leaf" />
						</div>
						<div>
							<label for="ev-count" class="font-semibold text-cocoa">Headcount</label>
							<input id="ev-count" type="number" min="25" max="1000" bind:value={headcount} class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base outline-none focus:border-leaf" />
						</div>
						<div>
							<label for="ev-name" class="font-semibold text-cocoa">Your name</label>
							<input id="ev-name" type="text" bind:value={name} autocomplete="name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base outline-none focus:border-leaf" />
						</div>
						<div>
							<label for="ev-phone" class="font-semibold text-cocoa">Mobile</label>
							<input id="ev-phone" type="tel" inputmode="numeric" autocomplete="tel" bind:value={phone} placeholder="10-digit mobile" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base outline-none focus:border-leaf" />
						</div>
					</div>
					<label class="mt-4 flex min-h-12 items-center gap-3 text-cocoa">
						<input type="checkbox" bind:checked={veg} class="h-5 w-5 accent-[#5c7a1c]" />
						<span class="font-semibold">Mostly vegetarian guests</span>
					</label>
					{#if error}
						<p role="alert" class="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
					{/if}
					<button type="submit" class="mt-5 flex min-h-13 w-full items-center justify-center rounded-full bg-mango text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-mango-dark hover:text-white">Send enquiry</button>
					<p class="mt-3 text-center text-xs text-muted">Mock form — nothing is really sent.</p>
				</form>
			{/if}
		</div>
	</div>
</section>
