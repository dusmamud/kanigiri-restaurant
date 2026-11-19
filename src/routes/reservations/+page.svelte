<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	const lunchSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'];
	const dinnerSlots = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];

	let date = $state('');
	let slot = $state('');
	let party = $state(2);
	let name = $state('');
	let phone = $state('');
	let note = $state('');
	let error = $state('');
	let ref = $state('');
	let done = $state(false);

	const minDate = new Date().toISOString().slice(0, 10);
	const validPhone = $derived(/^[6-9]\d{9}$/.test(phone.trim()));

	// Deterministic mock availability: a couple of slots are "full" per date.
	function slotTaken(s: string) {
		if (!date) return false;
		let h = 0;
		for (const c of date + s) h = (h * 31 + c.charCodeAt(0)) % 97;
		return h < 14;
	}

	function book() {
		if (!date) return (error = 'Please pick a date.');
		if (!slot) return (error = 'Please pick a time slot.');
		if (!name.trim()) return (error = 'Please enter your name.');
		if (!validPhone) return (error = 'Please enter a valid 10-digit Indian mobile number.');
		error = '';
		ref = `KAN-T${Math.floor(1000 + Math.random() * 9000)}`;
		done = true;
	}
</script>

<svelte:head>
	<title>Book a Table — Kanigiri Restaurant | Reservations</title>
	<meta
		name="description"
		content="Book a table at Kanigiri Restaurant — lunch 12–3:30 PM, dinner 7–10:30 PM. Family seating, groups of 8+. We confirm on WhatsApp within 30 minutes."
	/>
	<link rel="canonical" href="https://kanigiri-restaurant.pages.dev/reservations" />
</svelte:head>

<PageHero
	script="Save your seat"
	title="Book a table"
	sub="Lunch 12–3:30 PM · Dinner 7–10:30 PM · Last kitchen order 9:45 PM. We confirm every booking on WhatsApp within 30 minutes (10 AM–10 PM)."
/>

<section class="bg-white py-10 sm:py-14" aria-label="Reservation form">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		{#if done}
			<div class="rounded-3xl bg-cream p-8 text-center ring-1 ring-line">
				<p class="font-script text-5xl text-leaf-dark">Table booked!</p>
				<h2 class="mt-2 font-display text-3xl font-black text-cocoa">See you soon, {name}.</h2>
				<p class="mt-3 text-muted">
					Booking <strong class="text-cocoa">{ref}</strong> — {party} {party === 1 ? 'guest' : 'guests'} on
					<strong class="text-cocoa">{new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
					at <strong class="text-cocoa">{slot}</strong>. We will confirm on WhatsApp at {phone} shortly.
				</p>
				<p class="mt-4 text-sm text-muted">Mock booking — no table was really reserved.</p>
				<div class="mt-6 flex flex-wrap justify-center gap-3">
					<a href="/menu" class="flex min-h-12 items-center rounded-full bg-mango px-7 text-sm font-black tracking-wider text-cocoa uppercase">See the menu</a>
					<a href="/" class="flex min-h-12 items-center rounded-full border border-line px-7 text-sm font-bold text-cocoa">Back home</a>
				</div>
			</div>
		{:else}
			<form
				onsubmit={(e) => {
					e.preventDefault();
					book();
				}}
				class="space-y-6"
			>
				<div>
					<label for="date" class="font-display text-xl font-black text-cocoa">Date</label>
					<input
						id="date"
						type="date"
						bind:value={date}
						min={minDate}
						onchange={() => (slot = '')}
						class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base outline-none focus:border-leaf"
					/>
				</div>

				<fieldset>
					<legend class="font-display text-xl font-black text-cocoa">Time slot</legend>
					<p class="mt-1 text-sm text-muted">Lunch</p>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Lunch slots">
						{#each lunchSlots as s}
							<button
								type="button"
								role="radio"
								aria-checked={slot === s}
								disabled={slotTaken(s)}
								onclick={() => (slot = s)}
								class="min-h-11 rounded-full px-4 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 {slot === s
									? 'bg-leaf text-white'
									: 'bg-lavender text-cocoa hover:bg-lavender-deep'}"
							>
								{s}{slotTaken(s) ? ' · Full' : ''}
							</button>
						{/each}
					</div>
					<p class="mt-4 text-sm text-muted">Dinner</p>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Dinner slots">
						{#each dinnerSlots as s}
							<button
								type="button"
								role="radio"
								aria-checked={slot === s}
								disabled={slotTaken(s)}
								onclick={() => (slot = s)}
								class="min-h-11 rounded-full px-4 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 {slot === s
									? 'bg-leaf text-white'
									: 'bg-lavender text-cocoa hover:bg-lavender-deep'}"
							>
								{s}{slotTaken(s) ? ' · Full' : ''}
							</button>
						{/each}
					</div>
				</fieldset>

				<div>
					<label for="party" class="font-display text-xl font-black text-cocoa">Party size</label>
					<select id="party" bind:value={party} class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base">
						{#each [1, 2, 3, 4, 5, 6, 7, 8] as n}
							<option value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
						{/each}
						<option value={9}>9+ (group — we will call you)</option>
					</select>
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="name" class="font-semibold text-cocoa">Your name</label>
						<input id="name" type="text" bind:value={name} autocomplete="name" placeholder="Full name" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base outline-none focus:border-leaf" />
					</div>
					<div>
						<label for="phone" class="font-semibold text-cocoa">Mobile (WhatsApp)</label>
						<input id="phone" type="tel" inputmode="numeric" autocomplete="tel" bind:value={phone} placeholder="10-digit mobile" class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base outline-none focus:border-leaf" />
					</div>
				</div>

				<div>
					<label for="note" class="font-semibold text-cocoa">Anything we should know? <span class="font-normal text-muted">(optional)</span></label>
					<textarea id="note" bind:value={note} rows="2" placeholder="Birthday, window seat, wheelchair access…" class="mt-2 min-h-12 w-full rounded-3xl border border-line bg-cream p-4 text-base outline-none focus:border-leaf"></textarea>
				</div>

				{#if error}
					<p role="alert" class="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>
				{/if}

				<button
					type="submit"
					class="flex min-h-13 w-full items-center justify-center rounded-full bg-mango text-sm font-black tracking-wider text-cocoa uppercase shadow transition-colors hover:bg-mango-dark hover:text-white"
				>
					Confirm booking
				</button>
				<p class="text-center text-xs text-muted">
					Mock booking — no table is really reserved. Prefer to call? <a class="font-bold text-leaf-dark underline" href={site.phoneHref}>{site.phoneDisplay}</a>
				</p>
			</form>
		{/if}
	</div>
</section>
