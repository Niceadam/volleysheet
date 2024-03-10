<script lang="ts">
	import PlayerList from './PlayerList.svelte';
	import TeamButtons from './TeamButtons.svelte';
	import { teamNames, teamColors } from '@/stores.js';

	export let team = 0;
	export let orientation = false;
</script>

<div class="flex h-full flex-col px-6 py-4">
	<!-- Team Name -->
	<div
		class="border-b-4 bg-white py-5 text-center text-xl font-bold text-black shadow-lg"
		style="border-color: {$teamColors[team].primary};"
	>
		{$teamNames[team]}
	</div>

	<!-- Players -->
	<div class="h-3/5 w-full shadow-lg">
		<PlayerList {team} {orientation} />
	</div>

	<!-- Buttons -->
	<TeamButtons {team} {orientation} />
</div>
