<script>
	import { goto } from '$app/navigation';

	goto('/match');
</script>

<div class="h-screen space-y-5">
	<!-- Header-->
	<div class="h-1/6 bg-blue-400">
		<div class="p-8 text-5xl font-bold italic text-white">VolleySheet</div>
	</div>

	<!-- Buttons-->
	<div class="flex h-2/5 items-center justify-center">
		<div class="flex w-1/4 flex-col space-y-4">
			<button class="btn btn-lg" on:click={() => goto('/match')}>New Match</button>
			<button class="btn btn-lg" on:click={() => goto('/teams')}>Teams</button>
		</div>
	</div>

	<!-- Footer-->
	<div class="h-1/6 bg-blue-400">
		<div class="p-8 text-5xl font-bold text-white">Footer</div>
	</div>
</div>
