<script lang="ts">
	import TeamSection from './TeamSection.svelte';
	import MatchSection from './MatchSection.svelte';
	import { onMount } from 'svelte';

	import { CoreGetMatch } from '@/lib/wailsjs/go/main/App';
	import { backend } from '@/lib/wailsjs/go/models';

	import { switchSides, teamNames, serveSide, courtData, benchData, rotations } from '@/stores.js';

	async function getMatchState() {
		let matchState = new backend.Match();
		matchState = await CoreGetMatch();

		$serveSide = matchState.serveSide;

		$courtData = [[], []];
		$benchData = [[], []];
		for (let i = 0; i < 2; i++) {
			let team = matchState.teamState[i];
			$teamNames[i] = team.team.name;
			$rotations[i] = team.rotation;

			for (let [numStr, player] of Object.entries(team.team.players)) {
				let type = '';
				type += player.captain ? '🇨  ' : '';
				type += player.libero ? '🇱' : '';

				let num = parseInt(numStr);
				let entry = { team: i, number: num, name: player.name, type: type };
				if (team.rotation.includes(num)) {
					$courtData[i].push(entry);
				} else {
					$benchData[i].push(entry);
				}
			}
		}
	}

	onMount(async () => {
		getMatchState();
	});
</script>

<div class="flex h-screen w-screen justify-center bg-slate-200">
	<div class="mx-4 flex min-w-[1250px] flex-row bg-slate-200">
		<!-- Left Section -->
		<div class="w-1/3" class:order-last={$switchSides}>
			<TeamSection team={0} orientation={!$switchSides} />
		</div>

		<!-- Mid Section -->
		<div class="w-1/3">
			<MatchSection />
		</div>

		<!-- Right Section -->
		<div class="w-1/3" class:order-first={$switchSides}>
			<TeamSection team={1} orientation={$switchSides} />
		</div>
	</div>
</div>
