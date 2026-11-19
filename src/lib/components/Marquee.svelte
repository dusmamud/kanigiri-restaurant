<script lang="ts">
	// Marquee strip: dish words scrolling on mango, CSS transform only.
	const words = [
		'Mutton Biryani',
		'Kadai Chicken',
		'Andhra Chicken Curry',
		'Gongura Mutton',
		'Palak Paneer',
		'Jeera Chawal',
		'Butter Naan',
		'Curd Rice'
	];
	const row = [...words, ...words];
</script>

<div class="marquee overflow-hidden bg-mango py-3" aria-hidden="true">
	<div class="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
		{#each row as word}
			<span class="font-display text-lg font-bold tracking-wide text-cocoa">{word}</span>
			<span class="text-cocoa/60">✦</span>
		{/each}
	</div>
</div>
