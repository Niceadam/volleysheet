<script lang="ts">
  import { sets, score } from "../stores.js";

  export let flip: boolean;
</script>

<!-- Scoreboard -->
<div class="flex rounded-lg bg-slate-100 shadow-xl">
  <div
    class="flex w-1/4 items-center justify-center border-r-4"
    style="border-color: red;"
  >
    <div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
      {$sets[+!flip]}
    </div>
  </div>
  <div
    class="m-1 flex w-3/4 items-center justify-center bg-slate-100 bg-white px-2 font-bold shadow"
  >
    <div
      class="w-16 rounded bg-white py-4 text-4xl shadow"
      class:order-last={flip}
    >
      {$score[0]}
    </div>
    <div class="p-2 text-xs">Set {$sets[0] + $sets[1] + 1}</div>
    <div
      class="w-16 rounded bg-white py-4 text-4xl shadow"
      class:order-first={flip}
    >
      {$score[1]}
    </div>
  </div>
  <div
    class="flex w-1/4 items-center justify-center border-l-4"
    style="border-color: red;"
  >
    <div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
      {$sets[+flip]}
    </div>
  </div>
</div>

<!-- New -->
<div class="grid grid-cols-5 rounded-lg bg-slate-100 shadow-xl font-bold h-24">
  <div class="col-span-1 border-r-4 border-red-600 bg-white">
    <div class="m-2">0</div>
  </div>
  <div class="col-span-3">test</div>
  <div class="col-span-1 border-l-4 border-red-600">0</div>
</div>
