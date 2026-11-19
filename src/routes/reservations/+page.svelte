<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	const lunchSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'];
	const dinnerSlots = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
	const allSlots = [...lunchSlots, ...dinnerSlots];

	let date = $state('');
	let slot = $state('');
	let party = $state(2);
	let name = $state('');
	let phone = $state('');
	let note = $state('');
	let error = $state('');
	let ref = $state('');
	let done = $state(false);

	const today = new Date();
	const minDate = today.toISOString().slice(0, 10);
	const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
	const validPhone = $derived(/^[6-9]\d{9}$/.test(phone.trim()));

	// Deterministic mock availability: a couple of slots are "full" per date.
	function slotTaken(s: string) {
		if (!date) return false;
		let h = 0;
		for (const c of date + s) h = (h * 31 + c.charCodeAt(0)) % 97;
		return h < 14;
	}

	/** A slot whose time has already passed today cannot be booked. */
	function slotPassed(s: string) {
		if (!date || date !== minDate) return false;
		const m = s.match(/^(\d+):(\d+) (AM|PM)$/);
		if (!m) return false;
		let hour = Number(m[1]) % 12;
		if (m[3] === 'PM') hour += 12;
		const slotTime = new Date(today);
		slotTime.setHours(hour, Number(m[2]), 0, 0);
		return slotTime.getTime() <= today.getTime();
	}

	const slotUnavailable = (s: string) => slotTaken(s) || slotPassed(s);
	const availableCount = $derived(date ? allSlots.filter((s) => !slotUnavailable(s)).length : allSlots.length);
	const slotLabel = (s: string) => (slotTaken(s) ? ' · Full' : slotPassed(s) ? ' · Passed' : '');

	function book() {
		if (!date) return (error = 'Please pick a date.');
		if (!slot) return (error = 'Please pick a time slot.');
		if (slotUnavailable(slot)) return (error = 'That slot is no longer available — please pick another one.');
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
				{#if note.trim()}
					<p class="mt-3 text-sm text-muted">
						Your note — “{note.trim()}” — is saved with the booking and will be passed to the floor team.
					</p>
				{/if}
				<p class="mt-3 text-sm text-muted">
					Please arrive within 15 minutes of your slot — after that we may release the table to walk-ins.
					Need to change or cancel? Call us on <a class="font-bold text-leaf-dark underline" href={site.phoneHref}>{site.phoneDisplay}</a> at least 24 hours before, free of charge.
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
						max={maxDate}
						onchange={() => (slot = '')}
						class="mt-2 min-h-12 w-full rounded-full border border-line bg-cream px-4 text-base outline-none focus:border-leaf"
					/>
					<p class="mt-2 text-sm text-muted">Bookings open up to 30 days ahead.</p>
				</div>

				<fieldset>
					<legend class="font-display text-xl font-black text-cocoa">Time slot</legend>
					{#if date}
						<p class="mt-1 text-sm font-semibold text-leaf-dark">
							{availableCount} of {allSlots.length} slots available on {new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
							{#if availableCount < allSlots.length} — full slots are marked below; try an earlier or later time.{/if}
						</p>
					{:else}
						<p class="mt-1 text-sm text-muted">Pick a date first to see live availability.</p>
					{/if}
					<p class="mt-4 text-sm text-muted">Lunch</p>
					<div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Lunch slots">
						{#each lunchSlots as s}
							<button
								type="button"
								role="radio"
								aria-checked={slot === s}
								disabled={slotUnavailable(s)}
								onclick={() => (slot = s)}
								class="min-h-12 rounded-full px-4 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 {slot === s
									? 'bg-leaf text-white'
									: 'bg-lavender text-cocoa hover:bg-lavender-deep'}"
							>
								{s}{slotLabel(s)}
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
								disabled={slotUnavailable(s)}
								onclick={() => (slot = s)}
								class="min-h-12 rounded-full px-4 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 {slot === s
									? 'bg-leaf text-white'
									: 'bg-lavender text-cocoa hover:bg-lavender-deep'}"
							>
								{s}{slotLabel(s)}
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
					</select>
					<p class="mt-2 text-sm text-muted">
						Group of 9 or more? The online form takes up to 8 guests — please
						<a class="font-bold text-leaf-dark underline" href={site.phoneHref}>call {site.phoneDisplay}</a> or
						<a class="font-bold text-leaf-dark underline" href={site.whatsappHref}>WhatsApp us</a> and we will arrange a table.
					</p>
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

				<!-- Booking policy — shown BEFORE the confirm button -->
				<div class="rounded-3xl bg-cream p-5 ring-1 ring-line" aria-label="Booking policy">
					<h2 class="font-display text-lg font-black text-cocoa">Before you confirm — the booking policy</h2>
					<ul class="mt-3 space-y-2 text-sm leading-relaxed text-muted">
						<li><strong class="text-cocoa">15-minute grace:</strong> please arrive within 15 minutes of your slot. After that we may release the table to walk-ins.</li>
						<li><strong class="text-cocoa">Free cancellation:</strong> change or cancel free of charge up to 24 hours before your booking — call or WhatsApp us and we will release the table.</li>
						<li><strong class="text-cocoa">Confirmation:</strong> we confirm every booking on WhatsApp within 30 minutes (10 AM–10 PM). If you do not hear from us, call {site.phoneDisplay}.</li>
						<li><strong class="text-cocoa">No deposit:</strong> no payment is taken to hold a table.</li>
					</ul>
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
