<script lang="ts">
  import {
    state,
    court,
    bench,
    score,
    lineupSelect,
    teamState,
    getColor,
  } from "../stores";
  import PlayerList from "./PlayerList.svelte";

  const { side } = teamState;
  const { serve } = score;
  const colors = ["primary", "secondary"];

  let select = [0, 0];
  let rotation = [
    [4, 5, 3, 1, 0, 2],
    [1, 0, 2, 4, 5, 3],
  ];

  for (let i = 0; i < 2; i++) {
    lineupSelect[i].subscribe((val) => {
      if (val !== null) {
        const benchPlayer = $bench[i][val.select];
        const check = $court[i].indexOf(benchPlayer);
        if (check != -1) {
          $court[i][check] = null;
        }

        $court[i][select[i]] = benchPlayer;
        select[i] = (select[i] + 1) % 6;
      }
    });
  }

  let teams: number[];
  $: teams = [0, 1];
</script>

<div class="relative h-1/4">
  <!-- Court -->
  <img
    class="absolute w-full h-full object-fill"
    src="/court.png"
    alt="court"
  />

  <!-- Volleyball.png -->
  {#if $serve}
    <img class="absolute top-0 right-0 h-8" src="/volleyball.png" alt="court" />
  {:else}
    <img
      class="absolute bottom-0 left-0 h-8"
      src="/volleyball.png"
      alt="court"
    />
  {/if}

  <div class="absolute h-full w-full grid grid-cols-2 px-4 py-3">
    {#each teams as team}
      <div
        class="grid grid-cols-2 place-items-center"
        style:order={(team + +$side) % 2}
      >
        {#each $court[team] as player, i}
          <label
            style:order={rotation[(team + +$side) % 2][i] + 1}
            class="relative btn font-bold text-xl w-12
            {$state == 'lineUps'
              ? 'has-[:checked]:outline outline-2 outline-offset-4 outline-black'
              : 'pointer-events-none'}
            {!player ? 'bg-opacity-40 hover:bg-opacity-20' : ''}
            {player && !player.libero ? 'btn-' + colors[team] : ''}
            {player && player.libero
              ? 'bg-white hover:bg-white text-' + colors[team]
              : 'white'}"
          >
            <!-- Player -->
            <input
              type="radio"
              name="player{team}"
              hidden
              value={i}
              bind:group={select[team]}
            />
            {player ? player.number : ""}

            <!-- Badges -->
            {#if player && player.captain}
              <div class="avatar placeholder -left-1">
                <div class="bg-captain w-5 mr-1 border">C</div>
              </div>
            {/if}
            {#if player && player.sub !== undefined && $state != "lineUps"}
              <div class="avatar placeholder -right-3">
                <div class="bg-sub w-5 mr-1 border">
                  {$bench[team][player.sub].number}
                </div>
              </div>
            {/if}
          </label>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .avatar {
    @apply absolute;
    @apply font-bold;
    @apply text-neutral-content;
    @apply text-xs;
    @apply px-0;
    @apply -top-2;
  }
</style>
