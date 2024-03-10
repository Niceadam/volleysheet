<script lang="ts">
  import { teamNames, teamState, state, modal, court, bench } from "../stores";
  import { scorePoint, callTimeOut, liberoOut } from "../(lib)";
  import PlayerList from "./PlayerList.svelte";

  export let team: number;

  const MAX_TIMEOUTS = 2;
  const MAX_SUBS = 6;

  let colors;
  $: colors = {
    main: team == 0 ? "var(--primary)" : "var(--secondary)",
    light: team == 0 ? "var(--primary-light)" : "var(--secondary-light)",
    btn: team == 0 ? "btn-primary" : "btn-secondary",
  };

  function setModal(type: string) {
    $modal = {
      type: type,
      data: { team: team },
    };
  }
</script>

<div class="flex flex-col bg-white shadow-lg">
  <!-- team name -->
  <div
    class="text-center text-lg p-3 font-bold"
    style:border-color={colors.main}
  >
    {$teamNames[team]}
  </div>

  <div class="grow border-t-4" style:border-color={colors.main}>
    {#if $state == "lineUps"}
      <!-- placeholder before line ups -->
      <div
        class="flex h-full justify-center items-center"
        style:background-color={colors.light}
      >
        <img class="h-40 opacity-20" src="/volleyball.png" alt="court" />
      </div>
    {:else}
      <div
        class="flex flex-col border-b-4"
        style:border-color={colors.main}
        style:background-color={colors.light}
      >
        <!-- court players-->
        <PlayerList players={$court[team]} />
      </div>
      <div class="border">
        <!-- bench players-->
        <PlayerList players={$bench[team]} head={false} />
      </div>
    {/if}
  </div>

  <!-- buttons -->
  <div class="grid grid-cols-2 grid-rows-2 gap-2 p-3 border-t grid-flow-col">
    <!-- libero in/out -->
    {#if $teamState.liberoIn[team]}
      <button
        class="btn"
        on:click={() => liberoOut(team)}
        disabled={$state != "beforeRally" || $teamState.doneLibero[team]}
      >
        Libero Out
      </button>
    {:else}
      <button
        class="btn"
        on:click={() => setModal("libero")}
        disabled={$state != "beforeRally" || $teamState.doneLibero[team]}
      >
        Libero In
      </button>
    {/if}

    <div></div>

    <!-- time out -->
    <button
      class="join"
      on:click={() => callTimeOut(team)}
      disabled={$state != "beforeRally" ||
        $teamState.timeOuts[team] == MAX_TIMEOUTS}
    >
      <div
        class="btn w-3/4 join-item"
        class:btn-disabled={$state != "beforeRally" ||
          $teamState.timeOuts[team] == MAX_TIMEOUTS}
      >
        Time Out
      </div>
      <span
        class="btn join-item w-1/4 text-xl pointer-events-none {colors.btn}"
        class:btn-disabled={$state != "beforeRally"}
      >
        {$teamState.timeOuts[team]}
      </span>
    </button>

    <!-- substitution -->
    <button
      class="join"
      on:click={() => setModal("substitution")}
      disabled={$state != "beforeRally" ||
        $teamState.subCount[team] == MAX_SUBS}
    >
      <div
        class="btn w-3/4 join-item"
        class:btn-disabled={$state != "beforeRally" ||
          $teamState.subCount[team] == MAX_SUBS}
      >
        Substitution
      </div>
      <span
        class="btn join-item w-1/4 text-xl pointer-events-none {colors.btn}"
        class:btn-disabled={$state != "beforeRally"}
      >
        {$teamState.subCount[team]}
      </span>
    </button>
  </div>

  <!-- score point -->
  <div class="w-full p-3 border-t">
    <button
      class="btn btn-block !text-sm {colors.btn}"
      disabled={$state != "rally"}
      on:click={() => scorePoint(team)}
    >
      Score Point
    </button>
  </div>
</div>

<style lang="postcss">
  :root {
    --primary: theme(colors.primary.DEFAULT);
    --secondary: theme(colors.secondary.DEFAULT);
    --primary-light: theme(colors.primary.light);
    --secondary-light: theme(colors.secondary.light);
  }
</style>
