<script lang="ts">
  import Team from "./(components)/Team.svelte";
  import ScoreBoard from "./(components)/ScoreBoard.svelte";
  import Injury from "./(components)/Injury.svelte";
</script>

<div class="h-screen grid grid-cols-4 bg-slate-200 text-center">
  <div class="col-span-3 grid grid-cols-3 px-4 py-6 space-x-4">
    <!-- Team 1 -->
    <Team team={0} flip={false} />

    <!-- Center -->
    <div class="flex flex-col justify-between">
      <ScoreBoard flip={false} />

      <!-- Court -->

      <!-- Main Buttons-->
      <div class="btn">Start Rally</div>

      <!-- Bottom Buttons-->
      <Injury />
    </div>

    <!-- Team 2 -->
    <Team team={1} flip={true} />
  </div>

  <!-- History -->
  <div class="pt-2">
    <div class="h-full">History</div>
  </div>
</div>

<style>
  div {
    border: 1px solid;
  }
</style>
