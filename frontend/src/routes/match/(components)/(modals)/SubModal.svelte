<script lang="ts">
  import { court, bench, modal, score } from "../../stores";
  import type { Player } from "../../stores";
  import PlayerList from "../PlayerList.svelte";
  import ExchangeIcon from "./ExchangeIcon.svelte";
  import { getSubOptions, callSubs } from "../../(lib)";

  let modalNode: HTMLElement;
  let team: number = 0;

  export let liberoModal: boolean = false;

  let courtSelect: number;
  let benchSelect: number;
  let benchOptions: Player[];
  let courtOptions: Player[];

  modal.subscribe((val) => {
    let type = liberoModal ? "libero" : "substitution";
    if (val.type == type) {
      $modal.type = "none";
      modalNode.showModal();
      team = val.data.team;

      if (liberoModal) {
        // Allow libero sub only in backrow
        courtOptions = $court[team].slice(4, 6);
        if ($score.serve != team) {
          // Libero cannot serve
          courtOptions.push($court[team][0]);
        }
      } else {
        courtOptions = $court[team].filter(
          (player: Player) => !player.libero && !player.doneSub,
        );
      }

      courtSelect = 0;
      benchSelect = 0;
    }
  });

  function getBenchOptions() {
    if (liberoModal) {
      benchOptions = $bench[team].filter((player: Player) => player.libero);
    } else {
      benchOptions = getSubOptions(courtOptions[courtSelect], team);
    }
  }

  $: courtSelect !== undefined && getBenchOptions();
</script>

<dialog bind:this={modalNode} class="modal">
  {#if courtSelect !== undefined && benchSelect !== undefined}
    <div class="modal-box w-2/3 max-w-4xl max-h-3xl">
      {#if liberoModal}
        <h3 class="font-bold text-lg p-2">Libero</h3>
      {:else}
        <h3 class="font-bold text-lg p-2">Substitution</h3>
      {/if}

      <div class="flex space-x-4">
        <!-- Court Player Selection -->
        <div class="flex flex-col border overflow-x-auto w-1/2">
          <PlayerList players={courtOptions} click bind:select={courtSelect} />
        </div>

        <ExchangeIcon />

        <!-- Bench Player Selection -->
        <div class="flex flex-col border overflow-x-auto w-1/2">
          <PlayerList players={benchOptions} click bind:select={benchSelect} />
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button
            class="btn btn-neutral"
            on:click={() =>
              callSubs(
                team,
                courtOptions[courtSelect],
                benchOptions[benchSelect],
              )}>Confirm</button
          >
          <button class="btn">Cancel</button>
        </form>
      </div>
    </div>
  {/if}
</dialog>
