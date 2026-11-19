<script lang="ts">
	// Small hero for inner pages: script label + big title + sub copy.
	let { script, title, sub }: { script: string; title: string; sub?: string } = $props();
</script>

<section class="bg-lavender pt-10 pb-12 sm:pt-14 sm:pb-16" aria-labelledby="page-title">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<p class="font-script text-4xl text-leaf-dark">{script}</p>
		<h1 id="page-title" class="mt-1 font-display text-4xl font-black tracking-tight text-cocoa sm:text-5xl">
			{title}
		</h1>
		{#if sub}
			<p class="mt-3 max-w-2xl leading-relaxed text-muted">{sub}</p>
		{/if}
	</div>
</section>
