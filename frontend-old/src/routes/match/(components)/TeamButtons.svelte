<script lang="ts">
	import { assignPoint } from '../(lib)/game';
	import ButtonCount from './ButtonCount.svelte';
	import {
		timeOut,
		gameState,
		GameStates,
		subCount,
		teamColors,
		MAX_SUBS,
		MAX_TIME_OUTS
	} from '@/stores.js';

	export let team: number;
	export let orientation: boolean;

	let color = $teamColors[+orientation].primary;
	let timeOutCount = 0;
	let inRally;
	$: inRally = $gameState == GameStates.rally || $timeOut;

	function callTimeOut() {
		$timeOut = true;
		timeOutCount++;
	}
</script>

<div class="m-2 grid grid-cols-2 gap-2 px-1 text-2xl font-bold text-white">
	<!-- Libero In/Out -->
	<div class:order-1={orientation}>
		<button class="btn btn-outline w-full" on:click={() => callTimeOut()} disabled={inRally}>
			Libero out
		</button>
	</div>

	<!-- Timeout -->
	<div class:order-0={orientation}>
		<ButtonCount
			disabled={inRally}
			{color}
			text="Timeout"
			count={timeOutCount}
			maxedOut={timeOutCount == $MAX_TIME_OUTS}
			callback={callTimeOut}
		/>
	</div>

	<div class:order-3={orientation}>
		<!-- Libero Exchange -->
		<div class:order-1={orientation}>
			<button class="btn btn-outline w-full" on:click={() => callTimeOut()} disabled={inRally}>
				Exchange Libero
			</button>
		</div>
	</div>

	<!-- Substitution -->
	<div class:order-2={orientation}>
		<ButtonCount
			disabled={inRally}
			{color}
			text="Substitutions"
			count={$subCount[team]}
			maxedOut={$subCount[team] == $MAX_SUBS}
			callback={callTimeOut}
		/>
	</div>

	<div class:order-5={orientation}></div>

	<!-- Challenge -->
	<div class:order-4={orientation}>
		<ButtonCount
			disabled={inRally}
			{color}
			text="Challenge"
			count={timeOutCount}
			maxedOut={timeOutCount == $MAX_TIME_OUTS}
			callback={callTimeOut}
		/>
	</div>
</div>

<!-- Score Point -->
<div class="p-3 pt-2">
	<button
		class="btn btn-lg w-full text-white hover:border-none"
		on:click={() => assignPoint(team)}
		style="background-color: {color}"
		disabled={$gameState != GameStates.rally}
	>
		Score Point
	</button>
</div>
