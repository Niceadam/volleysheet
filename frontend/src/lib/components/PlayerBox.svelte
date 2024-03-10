<script>
	import { benchData, courtData, subCount } from '@/stores.js';
	import { CoreSub } from '../wailsjs/go/main/App';
	import { main } from '../wailsjs/go/models';

	export let idx;
	export let number = 0;
	export let team = 0;

	export let libero = false;
	export let captain = false;

	// Substitution
	async function onDrop(e) {
		e.preventDefault();
		var jsonData = e.dataTransfer.getData('application/json');
		var data = JSON.parse(jsonData);

		// Subsitute only on right side of court
		if (data['team'] != team) {
			return;
		}

		let ok = confirm('Substitute player out ' + number + ' for player ' + data['number'] + '?');
		if (ok) {
			let subReturn = new main.SubReturn();
			subReturn = await CoreSub(team, data['number'], number);

			if (subReturn.err.length == 0) {
				const outInd = $courtData[team].findIndex(function (i) {
					i.number == number;
				});
				const inInd = $benchData[team].findIndex(function (i) {
					i.number == data['number'];
				});

				let tmp = $courtData[team][outInd];
				$courtData[team][outInd] = $benchData[team][inInd];
				$benchData[team][inInd] = tmp;

				number = data['number'];
				libero = data['type'].includes('🇱');
				captain = data['type'].includes('🇨');

				if (!subReturn.liberoSub) {
					$subCount[team] += 1;
				}
			} else {
				confirm(subReturn.err);
			}
		}
	}

	function onDragOver(e) {
		var dragSupported = e.dataTransfer.types.length;
		if (dragSupported) {
			e.dataTransfer.dropEffect = 'move';
		}
		e.preventDefault();
		return;
	}
</script>

<div
	id={idx}
	class="mr-[2px] flex items-center justify-center font-bold hover:bg-amber-400"
	on:drop={(e) => onDrop(e)}
	on:dragover={(e) => onDragOver(e)}
>
	<div
		class="relative flex aspect-square w-11 items-center justify-center rounded-2xl border-2 border-sky-700 text-xl"
		class:text-sky-700={libero}
		class:bg-slate-100={libero}
		class:border-sky-700={!libero}
		class:bg-sky-600={!libero}
		class:text-white={!libero}
	>
		<span class="inline-block align-middle">{number}</span>
		{#if captain}
			<span class="absolute -bottom-2 -left-2">
				<img src="/c-letter.svg" alt="c-letter" width="20" />
			</span>
		{/if}
		{#if libero}
			<span class="absolute -bottom-2 -right-2">
				<img src="/l-letter.svg" alt="c-letter" width="20" />
			</span>
		{/if}
	</div>
</div>
