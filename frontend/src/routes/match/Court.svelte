<script lang="ts">
	import PlayerBox from '$lib/components/PlayerBox.svelte';
	import { serveSide, rotations, switchSides } from '@/stores';

	let teamLeft: number;
	$: teamLeft = $switchSides ? 1 : 0;

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
			$rotations[1 - teamLeft][1],
			$rotations[1 - teamLeft][0],
			$rotations[1 - teamLeft][2],
			$rotations[1 - teamLeft][5],
			$rotations[1 - teamLeft][3],
			$rotations[1 - teamLeft][4]
		]
	];

	const range6 = [...Array(6).keys()];
</script>

<div class="relative h-full bg-sky-600 p-2 shadow-xl">
	<div class="relative grid h-full grid-cols-4 bg-amber-500">
		<!-- Players -->
		<div class="absolute left-0 top-0 inline-block grid h-full w-full grid-cols-2 align-middle">
			<!-- Team 1 -->
			<div class="grid grid-cols-2">
				{#each range6 as i}
					<PlayerBox idx="p0-{i}" number={order[0][i]} team={teamLeft} />
				{/each}
			</div>
			<!-- Team 2 -->
			<div class="grid grid-cols-2">
				{#each range6 as i}
					<PlayerBox idx="p1-[i]" number={order[1][i]} team={1 - teamLeft} />
				{/each}
			</div>
		</div>

		<!-- Court -->
		<div class="border-r-2 border-white"></div>
		<div class="border-r-2 border-dashed border-black"></div>
		<div class="border-r-2 border-white"></div>
		<div></div>
	</div>

	{#if $switchSides ? !$serveSide : $serveSide}
		<img
			src="/volleyball.png"
			alt="Volleyball"
			class="absolute -right-5 -top-2"
			width="45"
			height="45"
		/>
	{:else}
		<img
			src="/volleyball.png"
			alt="Volleyball"
			class="absolute -left-5 bottom-0 order-last"
			width="45"
			height="45"
		/>
	{/if}
</div>
