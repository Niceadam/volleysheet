<script lang="ts">
	import TeamSection from './(components)/TeamSection.svelte';
	import CenterSection from './(components)/CenterSection.svelte';
	import History from './(components)/History.svelte';
	import { onMount } from 'svelte';
	import { initTest, supabase } from './(lib)';
	import { switchSides } from '@/stores';

	onMount(async () => {
		await initTest();
	});
</script>

<div class="flex h-screen justify-center space-x-9 bg-slate-200 pl-6">
	<!-- Left Section -->
	<div class="w-1/4 py-6">
		<TeamSection team={+$switchSides} orientation={false} />
	</div>

	<!-- Mid Section -->
	<div class="w-1/4 px-6 py-6">
		<CenterSection orientation={$switchSides} />
	</div>

	<!-- Right Section -->
	<div class="w-1/4 py-6">
		<TeamSection team={+!$switchSides} orientation={true} />
	</div>

	<div class="w-1/4 py-3">
		<History orientation={$switchSides} />
	</div>
</div>
