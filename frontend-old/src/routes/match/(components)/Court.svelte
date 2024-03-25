<script lang="ts">
	import PlayerBox from './PlayerBox.svelte';
	import { serveSide, rotations } from '@/stores';

	export let orientation;

	let teamLeft: number;
	$: teamLeft = orientation ? 1 : 0;
	$: teamRight = 1 - teamLeft;

	let order: number[][];
	$: order = [
		[
			$rotations[teamLeft][4],
			$rotations[teamLeft][3],
			$rotations[teamLeft][5],
			$rotations[teamLeft][2],
			$rotations[teamLeft][0],
			$rotations[teamLeft][1]
		],
		[
			$rotations[teamRight][1],
			$rotations[teamRight][0],
			$rotations[teamRight][2],
			$rotations[teamRight][5],
			$rotations[teamRight][3],
			$rotations[teamRight][4]
		]
	];

	const range6 = [...Array(6).keys()];
</script>

<div class="relative h-full w-full">
	<!-- Court -->
	<div class="absolute">
		<img src="/court.png" alt="court" class="object-fill" />
	</div>

	<!-- Players -->

	{#if orientation ? !$serveSide : $serveSide}
		<img
			src="/volleyball.png"
			alt="Volleyball"
			class="absolute -right-3 -top-2"
			width="40"
			height="40"
		/>
	{:else}
		<img
			src="/volleyball.png"
			alt="Volleyball"
			class="absolute -left-0 bottom-0 order-last"
			width="40"
			height="40"
		/>
	{/if}
</div>
