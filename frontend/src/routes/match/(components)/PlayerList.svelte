<script lang="ts">
  import { type Player } from "../stores";

  export let players: Player[];

  export let head: boolean = true;
  export let click: boolean = false;
  export let badge: boolean = true;
  export let select: number = 0;
  export let noliberos: boolean = false;
  export let ondblclick: Function = () => {};

  const inputId = crypto.randomUUID();

  function initSelect(node) {
    click ? node.querySelector("input").click() : null;
  }
</script>

<div class="grow border overflow-auto">
  <table class="w-full table border-b select-none">
    {#if head}
      <thead>
        <tr class="h-10">
          <th></th>
          <th>Name</th>
        </tr>
      </thead>
    {/if}
    <tbody use:initSelect>
      {#if players}
        {#each players as player, i}
          {#if (noliberos && !player.libero) || !noliberos}
            <tr
              class="h-10"
              class:has-[:checked]:bg-slate-300={click}
              class:hover:bg-slate-300={click}
              on:dblclick={() => (click ? ondblclick() : null)}
              on:click={(e) =>
                click
                  ? e.target.parentNode.querySelector("input").click()
                  : null}
            >
              <input
                type="radio"
                name={inputId}
                value={i}
                hidden
                bind:group={select}
              />
              <th class="text-right w-12">{player.number}</th>
              <td>{player.name}</td>
              {#if badge}
                <td class="w-20 text-right">
                  <div
                    class="avatar font-bold text-neutral-content text-xs text-right px-0 space-x-1 placeholder"
                  >
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
          {/if}
        {/each}
      {/if}
    </tbody>
  </table>
</div>
