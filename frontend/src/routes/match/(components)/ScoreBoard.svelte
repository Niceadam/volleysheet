<script lang="ts">
  import { score, teamState, getColor } from "../stores";

  const { side } = teamState;
  const { points, sets } = score;
</script>

<!-- Scoreboard -->
<div class="flex rounded-lg bg-slate-100 shadow-xl h-24">
  <div
    class="flex w-1/4 items-center justify-center border-r-4"
    style:border-color="var(--{getColor(+$side)})"
  >
    <div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
      {$sets[+$side]}
    </div>
  </div>
  <div
    class="m-1 flex w-3/4 items-center justify-center bg-slate-100 px-2 font-bold shadow"
  >
    <div class="w-16 rounded bg-white py-4 text-4xl shadow">
      {$points[+$side]}
    </div>
    <div class="p-2 text-xs">Set {$sets[0] + $sets[1] + 1}</div>
    <div class="w-16 rounded bg-white py-4 text-4xl shadow">
      {$points[+!$side]}
    </div>
  </div>
  <div
    class="flex w-1/4 items-center justify-center border-l-4"
    style:border-color="var(--{getColor(+!$side)})"
  >
    <div class="text-md rounded bg-white p-2 px-3 font-bold shadow">
      {$sets[+!$side]}
    </div>
  </div>
</div>
