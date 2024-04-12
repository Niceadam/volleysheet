<script lang="ts">
  import { court, bench, modal, score } from "../../stores";
  import type { Player } from "../../stores";
  import PlayerList from "../PlayerList.svelte";
  import ExchangeIcon from "./ExchangeIcon.svelte";
  import {
    getBenchSubOptions,
    getCourtSubOptions,
    callSubs,
  } from "../../(lib)";

  const { serve } = score;

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
      team = val.data.team;

      courtSelect = 0;
      benchSelect = 0;
      courtOptions = getCourtSubOptions(team, liberoModal);
      modalNode.showModal();
    }
  });

  function getBenchOptions() {
    benchOptions = getBenchSubOptions(
      courtOptions[courtSelect],
      team,
      liberoModal,
    );
  }

  $: courtSelect !== undefined &&
    courtOptions !== undefined &&
    getBenchOptions();
</script>

<dialog bind:this={modalNode} class="modal">
  {#if courtSelect !== undefined && benchSelect !== undefined}
    <div class="modal-box w-1/3 max-w-4xl max-h-3xl">
      <h3 class="font-bold text-lg p-2">
        {#if liberoModal}
          Libero
        {:else}
          Substitution
        {/if}
      </h3>

      <div class="flex space-x-4">
        <!-- Court Player Selection -->
        <div class="w-1/2 flex">
          <PlayerList players={courtOptions} click bind:select={courtSelect} />
        </div>

        <ExchangeIcon />

        <!-- Bench Player Selection -->
        <div class="w-1/2 flex">
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
