<script lang="ts">
	import { Clock, MapPin, Phone } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import WhatsAppIcon from '#lib/components/WhatsAppIcon.svelte';
	import { deliveryZones, site } from '#lib/data/site.ts';

	let name = $state('');
	let phone = $state('');
	let message = $state('');
	let sent = $state(false);
	let error = $state('');

	function send() {
		if (!name.trim()) return (error = 'Please enter your name.');
		if (!/^[6-9]\d{9}$/.test(phone.trim())) return (error = 'Please enter a valid 10-digit Indian mobile number.');
		if (!message.trim()) return (error = 'Please write your message.');
		error = '';
		sent = true;
	}
</script>

<svelte:head>
	<title>Contact — Kanigiri Restaurant | Main Road, Kanigiri</title>
	<meta
		name="description"
		content="Kanigiri Restaurant, Main Road, Kanigiri, Andhra Pradesh. Open 11 AM–10 PM, all days. Call +91 90007 90007 or WhatsApp us."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/contact" />
</svelte:head>

<PageHero
	script="Find us"
	title="Contact & location"
	sub="Main Road, Kanigiri — near the bus stand, with parking out front. Open 11 AM–10 PM, all days."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Contact details">
	<div class="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
		<div class="space-y-4">
			<div class="flex gap-4 rounded-3xl bg-cream p-5 ring-1 ring-line">
				<MapPin size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
				<div>
					<h2 class="font-bold text-cocoa">Address</h2>
					<p class="mt-1 text-muted">{site.address}</p>
					<p class="mt-1 text-sm text-muted">Landmark: near Kanigiri bus stand · Parking available</p>
				</div>
			</div>
			<div class="flex gap-4 rounded-3xl bg-cream p-5 ring-1 ring-line">
				<Clock size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
				<div>
					<h2 class="font-bold text-cocoa">Hours</h2>
					<p class="mt-1 text-muted">{site.hours}</p>
					<p class="mt-1 text-sm text-muted">Lunch 12–3:30 PM · Dinner 7–10:30 PM · Last kitchen order 9:45 PM</p>
				</div>
			</div>
			<div class="flex gap-4 rounded-3xl bg-cream p-5 ring-1 ring-line">
				<Phone size={22} class="shrink-0 text-leaf-dark" aria-hidden="true" />
				<div>
					<h2 class="font-bold text-cocoa">Call or WhatsApp</h2>
					<p class="mt-1">
						<a href={site.phoneHref} class="font-bold text-leaf-dark underline underline-offset-4">{site.phoneDisplay}</a>
						· <a href={`mailto:${site.email}`} class="font-bold text-leaf-dark underline underline-offset-4">{site.email}</a>
					</p>
					<p class="mt-1 text-sm text-muted">{site.fssai}</p>
				</div>
			</div>

			<div class="rounded-3xl bg-cream p-5 ring-1 ring-line">
				<h2 class="font-bold text-cocoa">Delivery zones</h2>
				<ul class="mt-3 space-y-2 text-sm text-muted">
					{#each deliveryZones as z}
						<li class="flex justify-between gap-3">
							<span>{z.area}</span>
							<span class="font-semibold text-cocoa">{z.fee === 0 ? 'Free' : `₹${z.fee}`} · {z.time}</span>
						</li>
					{/each}
				</ul>
				<p class="mt-3 text-sm text-muted">We deliver to: {site.areas.join(', ')}.</p>
			</div>

			<div class="overflow-hidden rounded-3xl ring-1 ring-line">
				<iframe
					title="Kanigiri Restaurant on Google Maps"
					src={site.mapEmbed}
					class="h-72 w-full border-0"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>

		<div>
			{#if sent}
				<div class="rounded-3xl bg-cream p-8 text-center ring-1 ring-line">
					<p class="font-script text-4xl text-leaf-dark">Message sent!</p>
					<p class="mt-2 text-muted">Thanks, {name} — we will get back to you on WhatsApp within a few hours (10 AM–10 PM).</p>
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
					<h2 class="font-display text-2xl font-black text-cocoa">Send us a message</h2>
					<div class="mt-4 space-y-4">
						<div>
							<label for="c-name" class="font-semibold text-cocoa">Your name</label>
							<input id="c-name" type="text" bind:value={name} autocomplete="name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base outline-none focus:border-leaf" />
						</div>
						<div>
							<label for="c-phone" class="font-semibold text-cocoa">Mobile</label>
							<input id="c-phone" type="tel" inputmode="numeric" autocomplete="tel" bind:value={phone} placeholder="10-digit mobile" class="mt-2 min-h-12 w-full rounded-full border border-line bg-white px-4 text-base outline-none focus:border-leaf" />
						</div>
						<div>
							<label for="c-msg" class="font-semibold text-cocoa">Message</label>
							<textarea id="c-msg" bind:value={message} rows="4" placeholder="Feedback, bulk order, allergy question…" class="mt-2 min-h-12 w-full rounded-3xl border border-line bg-white p-4 text-base outline-none focus:border-leaf"></textarea>
						</div>
						{#if error}
							<p role="alert" class="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
						{/if}
						<button type="submit" class="flex min-h-13 w-full items-center justify-center rounded-full bg-mango text-sm font-black tracking-wider text-cocoa uppercase transition-colors hover:bg-mango-dark hover:text-white">Send message</button>
						<a href={site.whatsappHref} target="_blank" rel="noopener" class="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#25d366] text-sm font-black tracking-wider text-white uppercase">
							<WhatsAppIcon size={18} /> Chat on WhatsApp
						</a>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
