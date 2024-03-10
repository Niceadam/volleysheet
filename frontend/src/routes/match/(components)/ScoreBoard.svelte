<script lang="ts">
  import { score } from "../stores";

  let points: number[];
  let sets: number[];

  $: points = $score.points;
  $: sets = $score.sets;
</script>

<!-- Scoreboard -->
<div class="flex rounded-lg bg-slate-100 shadow-xl h-24">
  <div class="flex w-1/4 items-center justify-center border-r-4 border-primary">
    <div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
      {sets[0]}
    </div>
  </div>
  <div
    class="m-1 flex w-3/4 items-center justify-center bg-slate-100 bg-white px-2 font-bold shadow"
  >
    <div class="w-16 rounded bg-white py-4 text-4xl shadow">
      {points[0]}
    </div>
    <div class="p-2 text-xs">Set {sets[0] + sets[1] + 1}</div>
    <div class="w-16 rounded bg-white py-4 text-4xl shadow">
      {points[1]}
    </div>
  </div>
  <div
    class="flex w-1/4 items-center justify-center border-l-4 border-secondary"
  >
    <div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
      {sets[1]}
    </div>
  </div>
</div>
