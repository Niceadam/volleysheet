<script lang="ts">
	import Court from './Court.svelte';
	import MatchButtons from './MatchButtons.svelte';
	import { switchSides, sets, score, teamColors } from '@/stores.js';

	// Current Time
	var localTime: string;
	setInterval(() => {
		localTime = new Date().toLocaleTimeString();
	}, 1000);
</script>

<div class="flex h-full w-full flex-col items-center text-center">
	<!-- Switch sides -->
	<button
		class="h-18 w-1/3 rounded-b-lg bg-blue-700 p-1 font-bold text-white"
		on:click={() => ($switchSides = !$switchSides)}
	>
		<div class="text-sm text-slate-100">Switch Sides</div>
	</button>

	<!-- Scoreboard -->
	<div class="border-3 mb-14 mt-16 flex h-28 w-80 rounded-lg bg-slate-100 shadow-xl">
		<div
			class="flex w-1/4 items-center justify-center border-r-4"
			style="border-color: {$teamColors[+$switchSides].primary};"
		>
			<div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
				{$sets[+!$switchSides]}
			</div>
		</div>
		<div
			class="m-1 flex w-3/4 items-center justify-center bg-slate-100 bg-white px-2 font-bold shadow"
		>
			<div class="w-16 rounded bg-white py-4 text-4xl shadow" class:order-last={$switchSides}>
				{$score[0]}
			</div>
			<div class="p-2 text-xs">Set {$sets[0] + $sets[1] + 1}</div>
			<div class="w-16 rounded bg-white py-4 text-4xl shadow" class:order-first={$switchSides}>
				{$score[1]}
			</div>
		</div>
		<div
			class="flex w-1/4 items-center justify-center border-l-4"
			style="border-color: {$teamColors[+!$switchSides].primary};"
		>
			<div class="text-md rounded bg-white p-2 px-3 font-bold shadow">{$sets[+$switchSides]}</div>
		</div>
	</div>

	<div class="h-[340px] w-full space-y-2">
		<div class="h-2/3 w-full">
			<Court />
		</div>
		<div class="h-1/3 w-full">
			<MatchButtons />
		</div>
	</div>

	<div class="mt-2 flex w-full grow pb-6 pt-2">
		<div class="grow rounded-xl bg-slate-300"></div>
	</div>
</div>
