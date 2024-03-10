<script lang="ts">
	import SubModal from './SubModal.svelte';
	import ButtonCount from '@/lib/components/ButtonCount.svelte';
	import { CoreTimeOut, CoreSub } from '@wailsjs';

	import {
		timeOut,
		gameState,
		GameStates,
		teamNames,
		updateMatchState,
		subCount,
		maxSubsAllowed,
		maxTimeOutsAllowed
	} from '@/stores.js';
	import { openModalId } from '@/lib/utils.js';

	export let team: number;
	export let orientation: boolean;

	let timeOutCount = 0;

	async function callTimeOut() {
		$timeOut = true;
		await CoreTimeOut(team);
		timeOutCount++;
	}
</script>

<div class="mt-2 grid grid-cols-2 gap-2 text-2xl font-bold text-white">
	<div class:order-1={!orientation}></div>

	<!-- Timeout -->
	<div class:order-0={!orientation}>
		<ButtonCount
			{orientation}
			text="Timeout"
			disabled={$gameState == GameStates.rally || $timeOut}
			count={timeOutCount}
			maxedOut={timeOutCount == $maxTimeOutsAllowed}
			callback={callTimeOut}
		/>
	</div>

	<div class:order-3={!orientation}></div>

	<!-- Substitution -->
	<div class:order-2={!orientation}>
		<ButtonCount
			{orientation}
			text="Substitutions"
			count={$subCount[team]}
			maxedOut={$subCount[team] == $maxSubsAllowed}
		/>
	</div>
</div>
