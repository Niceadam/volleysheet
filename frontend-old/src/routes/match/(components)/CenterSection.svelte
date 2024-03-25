<script lang="ts">
	import Court from './Court.svelte';
	import CenterButtons from './CenterButtons.svelte';
	import ScoreBoard from './ScoreBoard.svelte';

	export let orientation: boolean;
</script>

<div class="flex h-full w-full flex-col items-center justify-between text-center">
	<div class="h-1/5">
		<ScoreBoard {orientation} />
	</div>

	<div class="h-1/4 w-full">
		<Court {orientation} />
	</div>

	<div class="h-1/3 w-full">
		<CenterButtons />
	</div>
</div>
