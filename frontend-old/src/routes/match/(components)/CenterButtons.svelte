<script lang="ts">
	import { timeOut, gameState, GameStates, serveSide, teamColors, teamNames } from '@/stores.js';
	import { assignPoint, startRally, startSet, stopRally, switchServe } from '../(lib)/game';
	import { timeOutTimer } from '../(lib)';

	$gameState = GameStates.beforeRally;
</script>

<div class="flex h-full flex-col justify-between">
	<div class="h-1/4 w-full">
		<div class="flex h-full items-center justify-center text-center text-2xl font-bold">
			{#if $timeOut}
				<div
					use:timeOutTimer
					class="radial-progress border-4 border-blue-800 bg-blue-800 text-lg font-normal text-white shadow-xl"
					role="progressbar"
				></div>
			{:else if $gameState == GameStates.beforeRally}
				<!-- Start Rally -->
				<button
					class="btn btn-lg btn-wide w-full text-white hover:border-none"
					on:click={() => startRally()}
					style="background-color: {$teamColors[$serveSide].primary}"
				>
					Start Rally
				</button>
			{:else}
				<button
					class="btn btn-outline btn-lg btn-wide w-full hover:border-none"
					on:click={() => stopRally()}
				>
					Stop rally
				</button>
			{/if}
		</div>
	</div>

	<div class="flex h-1/4 w-full space-x-4">
		<button
			class="w-1/2 rounded bg-white shadow hover:bg-slate-100"
			on:click={() => {
				document.getElementById('injury-modal').showModal();
			}}>Injury</button
		>
		<button class="w-1/2 rounded bg-white shadow hover:bg-slate-100" on:click={() => {}}
			>Sanction</button
		>
	</div>
</div>

<!-- Injury Modal -->
<dialog id="injury-modal" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Injury</h3>
		<p class="py-4">Pick team with injury</p>
		<div class="modal-action">
			<form method="dialog" class="space-x-2">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn btn-lg" on:click={() => {}}>{$teamNames[0]}</button>
				<button class="btn btn-lg" on:click={() => {}}>{$teamNames[1]}</button>
			</form>
		</div>
	</div>
</dialog>

<!-- Set serve and sides of team? Modal -->
<dialog id="set-server-side-modal" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Coin Toss</h3>
		<p class="py-4">Have you set the serve and position of the teams on the court?</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn" on:click={() => {}}>div</button>
				<button class="btn">Cancel</button>
			</form>
		</div>
	</div>
</dialog>
