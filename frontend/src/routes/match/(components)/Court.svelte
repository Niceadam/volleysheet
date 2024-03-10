<script lang="ts">
  import { state, court, bench, score, type Player } from "../stores";

  export let flip: boolean = false;

  let offsetLine: Player[][] = [[], []];
  function offsetLineup() {
    // Display rotation in correct layout on court grid
    if ($court[0].length > 0) {
      let l = $court[0];
      offsetLine[0] = [l[4], l[3], l[5], l[2], l[0], l[1]];

      l = $court[1];
      offsetLine[1] = [l[1], l[0], l[2], l[5], l[3], l[4]];
    }
  }

  $: $court, offsetLineup();
</script>

<div class="relative h-1/4">
  <!-- Court -->
  <img
    class="absolute w-full h-full object-fill"
    src="/court.png"
    alt="court"
  />

  <!-- Volleyball.png -->
  {#if $score.serve || flip}
    <img class="absolute top-0 right-0 h-8" src="/volleyball.png" alt="court" />
  {:else}
    <img
      class="absolute bottom-0 left-0 h-8"
      src="/volleyball.png"
      alt="court"
    />
  {/if}

  <div class="absolute h-full w-full grid grid-cols-2 px-4 py-3">
    {#each { length: 2 } as _, team}
      <div class="grid grid-cols-2">
        {#if $state == "lineUps"}
          <!-- Empty Players -->
          {#each { length: 6 } as _}
            <div class="relative flex justify-center items-center">
              <div class="btn bg-opacity-40"></div>
            </div>
          {/each}
        {:else}
          <!-- Players -->
          {#each offsetLine[team] as player}
            <div class="relative flex justify-center items-center">
              {#if player.captain}
                <div class="avatar placeholder left-2">
                  <div class="bg-captain w-5 mr-1 border">C</div>
                </div>
              {/if}

              {#if player.sub !== undefined}
                <div class="avatar placeholder right-1">
                  <div class="bg-sub w-5 mr-1 border">
                    {$bench[0][player.sub].number}
                  </div>
                </div>
              {/if}

              <div
                class="btn"
                class:btn-primary={!player.libero}
                class:btn-secondary={!player.libero && team}
                class:btn-libero-primary={player.libero}
                class:btn-libero-secondary={player.libero && team}
              >
                {player.number}
              </div>
            </div>
          {/each}
        {/if}
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .btn {
    @apply pointer-events-none;
    @apply disabled:bg-neutral;
    @apply disabled:text-slate-400;
    @apply font-bold;
    @apply text-lg;
    @apply w-12;
  }

  .btn-libero {
    @apply btn;
    @apply border-4;
    @apply bg-white;
  }

  .btn-libero-primary {
    @apply btn-libero;
    @apply border-primary;
    @apply text-primary;
  }

  .btn-libero-secondary {
    @apply btn-libero;
    @apply border-secondary;
    @apply text-secondary;
  }

  .avatar {
    @apply absolute;
    @apply font-bold;
    @apply text-neutral-content;
    @apply text-xs;
    @apply px-0;
    @apply font-bold;
    @apply top-0;
  }
</style>
