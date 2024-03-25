<script lang="ts">
	export let disabled: boolean;
	export let color: number;
	export let text: string;
	export let count: number;
	export let maxedOut: boolean;
	export let callback: Function;
</script>

<button class="w-full" on:click={() => callback()} {disabled}>
	<div class="flex h-full">
		<div
			class="btn btn-outline w-4/5 rounded-r-none border border-blue-800 hover:border-none"
			class:btn-disabled={disabled || maxedOut}
			style="border-color: {color}"
		>
			{text}
		</div>
		<div
			class="flex w-1/5 items-center justify-center rounded-lg rounded-l-none text-lg"
			class:bg-red-800={maxedOut}
			class:bg-blue-800={!maxedOut}
			style="background-color: {color}"
		>
			<div>{count}</div>
		</div>
	</div>
</button>
