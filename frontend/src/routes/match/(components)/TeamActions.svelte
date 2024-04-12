<script lang="ts">
  import { teamState, state, modal, getColor } from "../stores";
  import { scorePoint, callTimeOut, liberoOut } from "../(lib)";

  export let team: number;

  const { liberoIn, doneLibero, timeOuts, subCount } = teamState;
  const color = getColor(team);

  const MAX_TIMEOUTS = 2;
  const MAX_SUBS = 6;

  function setModal(type: string) {
    $modal = { type: type, data: { team: team } };
  }
</script>

<!-- buttons -->
<div class="grid grid-cols-2 grid-rows-2 gap-2 p-3 border-t grid-flow-col">
  <!-- libero in/out -->
  {#if $liberoIn[team]}
    <button
      class="btn"
      on:click={() => liberoOut(team)}
      disabled={$state != "beforeRally" || $doneLibero[team]}
    >
      Libero Out
    </button>
  {:else}
    <button
      class="btn"
      on:click={() => setModal("libero")}
      disabled={$state != "beforeRally" || $doneLibero[team]}
    >
      Libero In
    </button>
  {/if}

  <div></div>

  <!-- time out -->
  <button
    class="join"
    on:click={() => callTimeOut(team)}
    disabled={$state != "beforeRally" || $timeOuts[team] == MAX_TIMEOUTS}
  >
    <div
      class="btn w-3/4 join-item"
      class:btn-disabled={$state != "beforeRally" ||
        $timeOuts[team] == MAX_TIMEOUTS}
    >
      Time Out
    </div>
    <span
      class="btn join-item w-1/4 text-xl pointer-events-none btn-{color}"
      class:btn-disabled={$state != "beforeRally"}
    >
      {$timeOuts[team]}
    </span>
  </button>

  <!-- substitution -->
  <button
    class="join"
    on:click={() => setModal("substitution")}
    disabled={$state != "beforeRally" || $subCount[team] == MAX_SUBS}
  >
    <div
      class="btn w-3/4 join-item"
      class:btn-disabled={$state != "beforeRally" ||
        $subCount[team] == MAX_SUBS}
    >
      Substitution
    </div>
    <span
      class="btn join-item w-1/4 text-xl pointer-events-none btn-{color}"
      class:btn-disabled={$state != "beforeRally"}
    >
      {$subCount[team]}
    </span>
  </button>
</div>

<!-- score point -->
<div class="w-full p-3 border-t">
  <button
    class="btn btn-block !text-sm btn-{color}"
    disabled={$state != "rally"}
    on:click={() => scorePoint(team)}
  >
    Score Point
  </button>
</div>
