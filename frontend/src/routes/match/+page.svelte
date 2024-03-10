<script lang="ts">
  import Team from "./(components)/Team.svelte";
  import ScoreBoard from "./(components)/ScoreBoard.svelte";
  import Court from "./(components)/Court.svelte";
  import History from "./(components)/History.svelte";
  import Actions from "./(components)/Actions.svelte";

  import { initMatch } from "./(lib)";
  import SubModal from "./(components)/(modals)/SubModal.svelte";
  import ExceptionModal from "./(components)/(modals)/ExceptionModal.svelte";
  import LiberoExitModal from "./(components)/(modals)/LiberoExitModal.svelte";
  import LineupsModal from "./(components)/(modals)/LineupsModal.svelte";

  let initPromise = initMatch();

  const flip = false;
</script>

<div class="h-screen grid grid-cols-4 bg-slate-200 text-center">
  {#await initPromise}
    <!-- Skeleton -->
    <div class="col-span-3 flex justify-center items-center">
      <h1 class="font-bold text-3xl mr-3">Starting Match</h1>
      <span class="loading loading-bars loading-lg"></span>
    </div>
    <div class="skeleton"></div>
  {:then}
    <div class="col-span-3 grid grid-cols-3 px-4 py-6 space-x-4">
      <!-- Team 1 -->
      <Team team={0} />

      <div class="flex flex-col justify-between">
        <!-- Score Board -->
        <!-- Court -->
        <!-- Buttons-->
        <ScoreBoard />
        <Court {flip} />
        <Actions />
      </div>

      <!-- Team 2 -->
      <Team team={1} />
    </div>

    <LiberoExitModal />
    <SubModal />
    <SubModal liberoModal />
    <LineupsModal />
    <ExceptionModal />

    <!-- History -->
    <History />
  {/await}
</div>
