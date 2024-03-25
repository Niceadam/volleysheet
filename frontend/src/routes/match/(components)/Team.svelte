<script lang="ts">
  import { timeOut } from "../stores.js";

  export let team: number;
  export let flip: boolean;
</script>

<div class="flex flex-col bg-white shadow-lg">
  <div class="text-center text-lg border-b-4 p-3 font-bold border-black">
    Team Name
  </div>

  <div class="grow">
    <div class="flex">
      <div class="">test</div>
      <div class="bg-black">test</div>
    </div>
  </div>

  <!-- Buttons -->
  <div class="grid grid-cols-2 grid-rows-3 gap-2 p-3 border-t grid-flow-col">
    <div class="btn btn-outline">Libero</div>
    <div class="btn btn-outline">Libero Exchange</div>
    <div class="btn btn-outline">Lorem</div>

    <div
      class="btn btn-outline"
      on:click={() => {
        $timeOut = true;
      }}
    >
      Time Out
    </div>
    <div class="btn btn-outline">Substitution</div>
    <div class="btn btn-outline">Challenge</div>
  </div>

  <!-- Score Point -->
  <div class="w-full p-3 border-t">
    <div class="btn btn-lg btn-block btn-secondary text-sm">Score Point</div>
  </div>
</div>
