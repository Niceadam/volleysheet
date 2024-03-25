<script lang="ts">
	import PlayerList from './PlayerList.svelte';
	import TeamButtons from './TeamButtons.svelte';
	import { teamNames, teamColors } from '@/stores.js';

	export let orientation: boolean;
</script>

<div class="flex h-full flex-col">
	<!-- Title -->
	<div class="border-b-4 bg-white px-5 py-4 text-lg font-bold text-slate-600 shadow-lg">
		Match History
	</div>

	<div class="h-full border-2 bg-slate-100"></div>

	<div class="bg-white px-4 py-2">
		<button class="btn btn-outline btn-error w-full">Undo last action</button>
	</div>
</div>
