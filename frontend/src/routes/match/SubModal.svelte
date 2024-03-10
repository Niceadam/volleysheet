<script lang="ts">
	export let side: number;

	function confirmSub() {}
</script>

<!-- Substitution Modal -->
<dialog id="substitution-modal-{side.toString()}" class="modal">
	<div class="flex w-1/2 flex-col">
		<h3 class="text-lg font-bold">Substitution</h3>
		<p class="py-4">Pick Sub</p>

		<div class="flex h-full space-x-6">
			<div class="w-1/2 bg-slate-400"></div>
			<div class="w-1/2 bg-slate-400"></div>
		</div>

		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn" on:click={() => confirmSub()}>Ok</button>
				<button class="btn">Cancel</button>
			</form>
		</div>
	</div>
</dialog>
