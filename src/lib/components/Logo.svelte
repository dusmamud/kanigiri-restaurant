<script lang="ts">
	// Kanigiri mark — a kolam-style starburst drawn as SVG (24×24 grid rules:
	// 2px stroke, round caps/joins, currentColor where it fits the palette).
	// Wordmark is real text so it stays crisp at every size.
	let { compact = false }: { compact?: boolean } = $props();
</script>

<a href="#top" class="flex shrink-0 items-center gap-2.5" aria-label="Kanigiri Restaurant — home">
	<svg width="44" height="44" viewBox="0 0 48 48" role="img" aria-hidden="true" class="shrink-0">
		<g fill="#eda63f">
			<circle cx="24" cy="6" r="3.2" />
			<circle cx="24" cy="42" r="3.2" />
			<circle cx="6" cy="24" r="3.2" />
			<circle cx="42" cy="24" r="3.2" />
			<circle cx="11.3" cy="11.3" r="3.2" />
			<circle cx="36.7" cy="11.3" r="3.2" />
			<circle cx="11.3" cy="36.7" r="3.2" />
			<circle cx="36.7" cy="36.7" r="3.2" />
		</g>
		<circle cx="24" cy="24" r="6.5" fill="#7a9a2e" />
		<circle cx="24" cy="24" r="2.6" fill="#f4f2f8" />
	</svg>
	<span class="leading-none">
		<span class="block font-display text-[1.15rem] font-black tracking-[0.08em] text-cocoa sm:text-[1.65rem]">KANIGIRI</span>
		{#if !compact}
			<span class="mt-1 hidden text-[0.6rem] font-semibold tracking-[0.42em] text-leaf-dark sm:block"
				>TASTE OF ANDHRA</span
			>
		{/if}
	</span>
</a>
