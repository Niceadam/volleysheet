<script lang="ts">
	import { onMount } from 'svelte';
	import { GridApi, createGrid } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-theme-quartz.css';
	import { benchData, courtData, teamColors } from '@/stores.js';

	// Make sure to use onMount and render active-table on load
	let isLoaded = false;
	onMount(async () => {
		await import('ag-grid-community');
		isLoaded = true;
	});

	let gridOptions = {
		rowHeight: 28,
		headerHeight: 0,
		suppressCellFocus: true,
		rowData: {},
		// Column Definitions: Defines the columns to be displayed.
		columnDefs: [
			{ field: 'number', resizable: false, width: 90 },
			{ field: 'name', resizable: false, flex: 1 },
			{ field: 'type', resizable: false, width: 70 }
		]
	};

	export let team: number;
	export let orientation: boolean;

	let benchApi;
	function initBench(node: HTMLElement) {
		gridOptions.rowData = $benchData[team];
	}

	let courtApi;
	function initCourt(node: HTMLElement) {
		gridOptions.rowData = $courtData[team];
		courtApi = createGrid(node, gridOptions);
	}
</script>

{#if isLoaded}
	{#key $courtData}
		<div class="flex h-1/2">
			<div
				class="w-5 text-center font-bold text-white"
				style="writing-mode: tb-rl; background-color: {$teamColors[team].primary};"
				class:order-last={!orientation}
				class:rotate-180={orientation}
			>
				on court
			</div>
			<div class="w-full">
				<div use:initCourt class="ag-theme-quartz" style="height: 100%; width: 100%"></div>
			</div>
		</div>
	{/key}
	{#key $benchData}
		<div class="flex h-1/2">
			<div
				class="w-5 bg-slate-400 text-center font-bold text-white"
				style="writing-mode: tb-rl;"
				class:order-last={!orientation}
				class:rotate-180={orientation}
			>
				on bench
			</div>
			<div class="w-full">
				<div use:initBench class="ag-theme-quartz" style="height: 100%; width: 100%"></div>
			</div>
		</div>
	{/key}
{/if}
