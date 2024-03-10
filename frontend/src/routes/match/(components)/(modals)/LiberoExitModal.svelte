<script lang="ts">
  import { teamNames, modal, court, bench, type Player } from "../../stores";
  import ExchangeIcon from "./ExchangeIcon.svelte";

  let modalNode: HTMLElement;
  let team: number;
  let libero: Player;
  let playerIn: Player;

  modal.subscribe((val) => {
    if (val.type == "liberoExit") {
      team = $modal.data.team;
      playerIn = $modal.data.playerIn;
      libero = $modal.data.libero;

      modalNode.showModal();
      $modal.type = "none";
    }
  });
</script>

<dialog bind:this={modalNode} class="modal">
  {#if libero && playerIn}
    <div class="modal-box w-1/4 max-w-5xl">
      <h3 class="font-bold text-lg mb-6">Libero Exits the Court</h3>

      <div class="flex flex-col space-y-2 items-center">
        <!-- Player 1 -->
        <div class="flex flex-col border overflow-x-auto w-4/5">
          <table class="table">
            <tbody>
              <tr class="hover:bg-slate-300">
                <th class="text-right">{libero.number}</th>
                <td>{libero.name}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <ExchangeIcon />

        <!-- Player 2 -->
        <div class="flex flex-col border overflow-x-auto w-4/5">
          <table class="table">
            <tbody>
              <tr class="hover:bg-slate-300">
                <th class="text-right">{playerIn.number}</th>
                <td>{playerIn.name}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-primary">Done</button>
        </form>
      </div>
    </div>
  {/if}
</dialog>

<style lang="postcss">
  .btn {
    @apply text-sm;
  }
</style>
