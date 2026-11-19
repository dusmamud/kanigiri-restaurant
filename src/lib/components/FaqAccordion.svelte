<script lang="ts">
	// Accessible FAQ accordion — one open at a time, keyboard friendly.
	import { ChevronDown } from '@lucide/svelte';
	import type { FaqItem } from '#lib/data/site.ts';

	let { items }: { items: FaqItem[] } = $props();
	let open = $state(0);
</script>

<div class="divide-y divide-line rounded-3xl bg-white ring-1 ring-line">
	{#each items as item, i}
		<div>
			<button
				type="button"
				onclick={() => (open = open === i ? -1 : i)}
				aria-expanded={open === i}
				aria-controls={`faq-panel-${i}`}
				class="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
			>
				<span class="font-display text-lg font-bold text-cocoa">{item.q}</span>
				<ChevronDown
					size={20}
					class="shrink-0 text-leaf-dark transition-transform duration-200 {open === i
						? 'rotate-180'
						: ''}"
					aria-hidden="true"
				/>
			</button>
			{#if open === i}
				<p id={`faq-panel-${i}`} class="px-5 pb-5 leading-relaxed text-muted">{item.a}</p>
			{/if}
		</div>
	{/each}
</div>
