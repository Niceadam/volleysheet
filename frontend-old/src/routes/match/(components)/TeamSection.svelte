<script lang="ts">
	import PlayerList from './PlayerList.svelte';
	import TeamButtons from './TeamButtons.svelte';
	import { teamNames, teamColors } from '@/stores.js';

	export let team: number;
	export let orientation: boolean;
</script>

<div class="flex h-full flex-col rounded bg-white shadow-lg">
	<!-- Team Name -->
	<div
		class="border-b-4 bg-white py-3 text-center text-xl font-bold text-black shadow-lg"
		style="border-color: {$teamColors[team].primary};"
	>
		{$teamNames[team]}
	</div>

	<!-- Players -->
	<div class="h-4/5 w-full">
		<PlayerList {team} {orientation} />
	</div>

	<!-- Buttons -->
	<TeamButtons {team} {orientation} />
</div>
