<script lang="ts">
  import {
    teamNames,
    state,
    court,
    bench,
    lineupSelect,
    getColor,
  } from "../stores";
  import PlayerList from "./PlayerList.svelte";
  import TeamActions from "./TeamActions.svelte";

  export let team: number;

  const color = getColor(team);
  let select: number;
</script>

<div class="h-full flex flex-col bg-white shadow-lg">
  <!-- team name -->
  <div class="text-center text-lg p-3 font-bold">
    {$teamNames[team]}
  </div>

  <div class="grow border-t-4" style:border-color="var(--{color})">
    <div
      class="flex flex-col border-b-4"
      style:border-color="var(--{color})"
      style:background-color="var(--{color}-light)"
    >
      {#if $state != "lineUps"}
        <!-- court players-->
        <PlayerList players={$court[team]} />
      {:else}
        <!-- lineup select players-->
        <PlayerList
          players={$bench[team]}
          click
          bind:select
          noliberos
          ondblclick={() => lineupSelect[team].set({ select: select })}
        />
      {/if}
    </div>

    {#if $state != "lineUps"}
      <!-- bench players-->
      <PlayerList players={$bench[team]} head={false} />
    {/if}
  </div>

  <TeamActions {team} />
</div>
