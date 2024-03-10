<script lang="ts">
	import { gameState, GameStates } from '@/stores.js';

	function confirmLineUps() {
		$gameState = GameStates.beforeSet;
	}
</script>

<dialog class="modal">
	<div class="modal w-auto">
		<h3 class="text-lg font-bold">Line-Ups</h3>
		<p class="py-4">Pick Lineup</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn" on:click={() => confirmLineUps()}>Ok</button>
				<button class="btn">Cancel</button>
			</form>
		</div>
	</div>
</dialog>
