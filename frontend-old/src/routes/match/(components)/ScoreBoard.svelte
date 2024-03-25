<script lang="ts">
	import { sets, score, teamColors } from '@/stores.js';
	export let orientation: boolean;
</script>

<!-- Scoreboard -->
<div class="border-3 flex h-28 w-80 rounded-lg bg-slate-100 shadow-xl">
	<div
		class="flex w-1/4 items-center justify-center border-r-4"
		style="border-color: {$teamColors[+!orientation].primary};"
	>
		<div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
			{$sets[+!orientation]}
		</div>
	</div>
	<div
		class="m-1 flex w-3/4 items-center justify-center bg-slate-100 bg-white px-2 font-bold shadow"
	>
		<div class="w-16 rounded bg-white py-4 text-4xl shadow" class:order-last={orientation}>
			{$score[0]}
		</div>
		<div class="p-2 text-xs">Set {$sets[0] + $sets[1] + 1}</div>
		<div class="w-16 rounded bg-white py-4 text-4xl shadow" class:order-first={orientation}>
			{$score[1]}
		</div>
	</div>
	<div
		class="flex w-1/4 items-center justify-center border-l-4"
		style="border-color: {$teamColors[+orientation].primary};"
	>
		<div class="text-md rounded bg-white p-2 px-3 font-bold shadow">{$sets[+orientation]}</div>
	</div>
</div>
