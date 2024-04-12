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
  import { teamState } from "./stores";

  const { side } = teamState;

  let initPromise = initMatch();
</script>

<div class="h-screen grid grid-cols-4 bg-slate-200 text-center">
  {#await initPromise}
    <!-- Skeleton -->
    <div class="col-span-4 flex justify-center items-center">
      <h1 class="font-bold text-3xl mr-3">Starting Match</h1>
      <span class="loading loading-bars loading-lg"></span>
    </div>
  {:then}
    <div class="col-span-3 grid grid-cols-3 px-4 py-6 gap-4">
      <!-- Team 1 -->
      <div class:order-last={$side}>
        <Team team={0} />
      </div>

      <div class="flex flex-col justify-between">
        <!-- Score Board -->
        <!-- Court -->
        <!-- Buttons-->
        <ScoreBoard />
        <Court />
        <div class="h-1/3">
          <Actions />
        </div>
      </div>

      <!-- Team 2 -->
      <div class:order-first={$side}>
        <Team team={1} />
      </div>
    </div>

    <LiberoExitModal />
    <SubModal />
    <SubModal liberoModal />
    <ExceptionModal />

    <!-- History -->
    <History />
  {/await}
</div>
