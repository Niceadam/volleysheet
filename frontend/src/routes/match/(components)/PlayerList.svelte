<script lang="ts">
  import { type Player } from "../stores";

  export let players: Player[];
  export let head: boolean = true;
  export let click: boolean = false;
  export let badge: boolean = true;
  export let select: number = 0;

  let tbody: HTMLElement;

  let selectedClass = "bg-slate-300";
  function selectPlayer(e, idx) {
    if (click) {
      const selected = tbody.getElementsByClassName(selectedClass);
      if (selected.length > 0) {
        selected[0].classList.remove(selectedClass);
      }

      e.currentTarget.classList.add(selectedClass);
      select = idx;
    }
  }

  function initSelect(node) {
    if (click) {
      tbody = node;
      let firstRow = tbody.getElementsByTagName("tr")[0];
      if (firstRow) {
        selectPlayer({ currentTarget: firstRow }, 0);
      }
    }
  }
</script>

{#if players}
  <table class="table overflow-auto">
    {#if head}
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
        </tr>
      </thead>
    {/if}
    <tbody use:initSelect>
      {#each players as player, idx}
        <tr
          class:hover:bg-slate-300={click}
          on:click={(e) => selectPlayer(e, idx)}
        >
          <th class="text-right w-12">{player.number}</th>
          <td>{player.name}</td>
          {#if badge}
            <td class="w-24 text-right">
              <div class="avatar placeholder">
                {#if player.libero}
                  <div class="bg-libero w-5">L</div>
                {/if}
                {#if player.captain}
                  <div class="bg-captain w-5">C</div>
                {/if}
              </div>
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style lang="postcss">
  .avatar {
    @apply font-bold;
    @apply text-neutral-content;
    @apply text-xs;
    @apply text-right;
    @apply px-0;
    @apply space-x-1;
  }
</style>
