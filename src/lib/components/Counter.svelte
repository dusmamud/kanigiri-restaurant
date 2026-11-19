<script lang="ts">
	// Animated counter: counts up once when it scrolls into view (en-IN).
	// Reduced motion: shows the final value instantly.
	let { value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number } = $props();
	let el: HTMLElement | undefined = $state();
	let shown = $state(0);
	let started = $state(false);

	$effect(() => {
		const node = el;
		if (!node) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shown = value;
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting || started) return;
				started = true;
				const t0 = performance.now();
				const tick = (t: number) => {
					const p = Math.min(1, (t - t0) / 900);
					shown = value * (1 - Math.pow(1 - p, 3));
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		io.observe(node);
		return () => io.disconnect();
	});

	const text = $derived(
		shown.toLocaleString('en-IN', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		}) + suffix
	);
</script>

<span bind:this={el}>{text}</span>
