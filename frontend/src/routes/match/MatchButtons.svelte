<script lang="ts">
	import Timer from 'easytimer.js';
	import LineUpsModal from './LineUpsModal.svelte';
	import { CoreAssignPoint, CoreSwitchServe } from '@wailsjs';
	import { openModalId } from '@/lib/utils';
	import {
		switchSides,
		timeOut,
		score,
		gameState,
		GameStates,
		timeOutTime,
		serveSide,
		rotations,
		updateMatchState
	} from '@/stores.js';

	// Timer
	function timeOutTimer(node) {
		var timer = new Timer();
		timer.start({ countdown: true, startValues: { seconds: $timeOutTime } });

		node.style.setProperty('--thickness', '5px');
		function update() {
			node.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
			let progress = (timer.getTotalTimeValues().seconds / $timeOutTime) * 100;
			node.style.setProperty('--value', progress.toString());
		}

		update();
		timer.addEventListener('secondsUpdated', function (e) {
			update();
		});

		timer.addEventListener('targetAchieved', function (e) {
			$timeOut = false;
		});
	}

	$gameState = GameStates.lineUps;

	async function assignPoint(team: number) {
		let matchState = await CoreAssignPoint(team);
		updateMatchState(matchState);
	}

	function startRally() {
		$gameState = GameStates.rally;
	}

	function stopRally() {
		$gameState = GameStates.beforeRally;
	}

	function startSet() {
		$gameState = GameStates.beforeRally;
	}

	async function switchServe() {
		await CoreSwitchServe();
		$switchServe = 1 - $switchServe;
	}

	$gameState = GameStates.beforeSet;
</script>

<div class="flex h-full items-center justify-center text-center text-2xl font-bold">
	{#if $timeOut}
		<div
			use:timeOutTimer
			class="radial-progress border-4 border-blue-800 bg-blue-800 text-lg font-normal text-white shadow-xl"
			role="progressbar"
		></div>
	{:else if $gameState == GameStates.beforeRally}
		<button class="btn h-full w-full animate-pulse text-4xl" on:click={() => startRally()}>
			Start rally
		</button>
	{:else if $gameState == GameStates.lineUps}
		<button
			class="btn h-full w-full text-4xl"
			on:click={() => openModalId('set-server-side-modal')}
		>
			Line-ups
		</button>
	{:else if $gameState == GameStates.beforeSet}
		<button class="btn btn-block h-full w-1/2 text-2xl" on:click={() => startSet()}>
			Start set
		</button>
		<button class="btn h-full w-1/2 text-2xl" on:click={() => switchServe()}> Switch serve </button>
	{:else}
		<div class="flex-col">
			<button class="btn-red btn mb-2" on:click={() => stopRally()}> Stop Rally </button>
			<div>
				<button class="btn btn-lg" on:click={() => assignPoint(+$switchSides)}>
					Assign Point
				</button>
				<button class="btn btn-lg" on:click={() => assignPoint(+!$switchSides)}>
					Assign Point
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- Line-Ups Modal -->
<LineUpsModal />

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
