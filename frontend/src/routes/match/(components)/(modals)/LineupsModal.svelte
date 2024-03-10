<script lang="ts">
  import { court, bench, modal, score, state, type Player } from "../../stores";
  import { getSubOptions } from "../../(lib)";
  import PlayerList from "../PlayerList.svelte";

  let modalNode: HTMLElement;

  let select1: number;
  let select2: number;
  let team1: Player[];
  let team2: Player[];

  modal.subscribe((val) => {
    if (val.type == "lineUps") {
      $modal.type = "none";
      modalNode.showModal();

      team1 = $court[0].filter(
        (player: Player) => !player.libero && !player.doneSub,
      );
      team2 = $court[1].filter(
        (player: Player) => !player.libero && !player.doneSub,
      );

      select1 = 0;
      select2 = 0;
    }
  });

  function getBenchOptions() {}

  $: select1 !== undefined && getBenchOptions();
</script>

<dialog bind:this={modalNode} class="modal">
  {#if select1 !== undefined && select2 !== undefined}
    <div class="modal-box w-2/3 h-4/5 max-w-4xl max-h-3xl">
      <h3 class="font-bold text-lg p-2">Line Ups</h3>

      <div class="grid grid-cols-3 gap-x-4 h-1/2">
        <!-- lineUp select 1 -->
        <div class="flex flex-col border overflow-x-auto">
          <PlayerList players={team1} click bind:select={select1} />
        </div>

        <div>
          <img class="object-fill rotate-90" src="/court.png" alt="court" />
        </div>

        <!-- lineUp select 2 -->
        <div class="flex flex-col border overflow-x-auto">
          <PlayerList players={team2} click bind:select={select2} />
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button
            class="btn btn-neutral"
            on:click={() => {
              $state = "beforeRally";
            }}>Confirm</button
          >
          <button class="btn">Cancel</button>
        </form>
      </div>
    </div>
  {/if}
</dialog>
