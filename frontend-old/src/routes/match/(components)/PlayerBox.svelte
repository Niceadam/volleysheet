<script>
	export let idx;
	export let number;
	export let team;

	export let libero = false;
	export let captain = false;
</script>

<div id={idx} class="mr-[2px] flex items-center justify-center font-bold hover:bg-amber-400">
	<div
		class="relative flex aspect-square w-12 items-center justify-center rounded-2xl text-xl text-white"
		class:bg-blue-900={team == 1}
		class:bg-red-900={team == 0}
	>
		<span class="inline-block align-middle">{number}</span>
		{#if captain}
			<span class="absolute -bottom-2 -left-2">
				<img src="/c-letter.svg" alt="c-letter" width="20" />
			</span>
		{/if}
		{#if libero}
			<span class="absolute -bottom-2 -right-2">
				<img src="/l-letter.svg" alt="c-letter" width="20" />
			</span>
		{/if}
	</div>
</div>
