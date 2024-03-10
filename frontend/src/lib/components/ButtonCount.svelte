<script>
	export let orientation = false;
	export let disabled = false;
	export let text = 'Test';
	export let count = 0;
	export let maxedOut = false;
	export let callback = null;
</script>

<button class="w-full" on:click={() => callback()} {disabled}
	>{#if orientation}
		<div class="flex h-full">
			<div
				class="btn w-4/5 rounded-r-none border border-blue-800 hover:border-none"
				class:btn-disabled={disabled || maxedOut}
			>
				{text}
			</div>
			<div
				class="flex w-1/5 items-center justify-center rounded-lg rounded-l-none text-lg"
				class:bg-red-800={maxedOut}
				class:bg-blue-800={!maxedOut}
			>
				<div class="">{count}</div>
			</div>
		</div>
	{:else}
		<div class="flex h-full">
			<div
				class="flex w-1/5 items-center justify-center rounded-lg rounded-r-none text-lg"
				class:bg-red-800={maxedOut}
				class:bg-blue-800={!maxedOut}
			>
				<div class="">{count}</div>
			</div>
			<div
				class="btn w-4/5 rounded-l-none border border-blue-500 hover:border-none"
				class:btn-disabled={disabled}
			>
				{text}
			</div>
		</div>
	{/if}
</button>
