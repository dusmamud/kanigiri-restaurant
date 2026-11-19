<script lang="ts">
	import { Flame, Leaf, Timer } from '@lucide/svelte';
	import { site, stats } from '#lib/data/site.ts';
</script>

<section id="about" class="bg-cream py-16 sm:py-20" aria-labelledby="about-title">
	<div class="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
		<div class="reveal">
			<p class="font-script text-4xl text-leaf-dark">Since {site.established}</p>
			<h2 id="about-title" class="mt-1 font-display text-4xl leading-tight font-black text-cocoa sm:text-5xl">
				Andhra on a plate, the way home made it.
			</h2>
			<p class="mt-5 max-w-xl leading-relaxed text-ink/85">
				Kanigiri started as a small family kitchen with one handi, one wood fire and a stubborn belief:
				biryani should smell like a festival before the lid even comes off. Fourteen years later the
				recipes are unchanged — Guntur chillies, gongura from our own farms, and dum cooked slowly, never
				rushed.
			</p>
			<ul class="mt-6 space-y-3 text-[0.95rem] font-medium text-ink/85">
				<li class="flex items-start gap-3">
					<Flame size={19} class="mt-0.5 shrink-0 text-mango-dark" aria-hidden="true" />
					Wood-fire dum biryani, sealed and slow-cooked to order.
				</li>
				<li class="flex items-start gap-3">
					<Leaf size={19} class="mt-0.5 shrink-0 text-leaf-dark" aria-hidden="true" />
					Farm vegetables and spices sourced fresh every morning.
				</li>
				<li class="flex items-start gap-3">
					<Timer size={19} class="mt-0.5 shrink-0 text-leaf-dark" aria-hidden="true" />
					Hot at your door in 30–40 minutes, or your delivery is on us.
				</li>
			</ul>
			<a
				href="#menu"
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-cocoa px-7 text-sm font-black tracking-wider text-white uppercase shadow transition-colors duration-200 hover:bg-black"
			>
				See the full menu
			</a>
		</div>

		<div class="reveal grid grid-cols-2 gap-4">
			{#each stats as stat}
				<div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line">
					<p class="font-display text-4xl font-black text-leaf-dark sm:text-5xl">{stat.value}</p>
					<p class="mt-1 text-sm font-semibold text-muted">{stat.label}</p>
				</div>
			{/each}
			<div class="col-span-2 rounded-3xl bg-leaf p-6 text-white shadow-sm">
				<p class="font-script text-3xl">Our promise</p>
				<p class="mt-1 text-[0.95rem] leading-relaxed text-white/90">
					If your order arrives cold or wrong, we replace it or refund it within 30 minutes — no
					questions, no forms. That is the Kanigiri way.
				</p>
			</div>
		</div>
	</div>
</section>
