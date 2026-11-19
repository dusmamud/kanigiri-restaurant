<script lang="ts">
	// Star rating: grey stars underneath, amber stars clipped to rating/5.
	// Pure CSS width — no half-star icon hacks, works for 4.5, 4.0, 5.0.
	let { rating, size = 16, showValue = false }: { rating: number; size?: number; showValue?: boolean } =
		$props();
	const pct = $derived(`${(rating / 5) * 100}%`);
</script>

<span class="inline-flex items-center gap-1.5" role="img" aria-label={`Rated ${rating} out of 5`}>
	<span class="relative inline-flex" aria-hidden="true">
		<span class="flex gap-0.5 text-[#d8d2c8]">
			{#each Array(5) as _}
				<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"
					/></svg
				>
			{/each}
		</span>
		<span class="absolute inset-0 flex gap-0.5 overflow-hidden text-[#f0a832]" style={`width: ${pct}`}>
			{#each Array(5) as _}
				<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" class="shrink-0"
					><path
						d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"
					/></svg
				>
			{/each}
		</span>
	</span>
	{#if showValue}
		<span class="text-sm font-bold text-cocoa">{rating.toFixed(1)}</span>
	{/if}
</span>
