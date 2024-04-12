<script lang="ts">
  import { state, modal, colors, getColor, score, teamState } from "../stores";
  import { endSet, confirmLineUp } from "../(lib)";
  import Timer from "easytimer.js";

  const { serve } = score;
  const { side } = teamState;

  function startTimer(node: HTMLElement) {
    let timer = new Timer();
    timer.start({ countdown: true, startValues: { seconds: 30 } });
    node.innerHTML = timer.getTimeValues().toString(["minutes", "seconds"]);

    timer.addEventListener("secondsUpdated", function (_) {
      node.innerHTML = timer.getTimeValues().toString(["minutes", "seconds"]);
    });
    timer.addEventListener("targetAchieved", function (_) {
      $state = "beforeRally";
    });
  }
</script>

<div class="h-full flex flex-col justify-between">
  <!-- Game States -->
  <div class="text-xl">
    {#if $state == "beforeRally"}
      <button
        class="btn btn-{getColor($serve)}"
        on:click={() => ($state = "rally")}
      >
        Start Rally
      </button>
    {:else if $state == "rally"}
      <button class="btn btn-neutral" on:click={() => ($state = "beforeRally")}>
        Stop Rally
      </button>
    {:else if $state == "timeOut"}
      <div class="space-y-4">
        <div use:startTimer class="btn btn-neutral pointer-events-none"></div>
        <button
          class="btn btn-neutral btn-outline"
          on:click={() => ($state = "beforeRally")}
        >
          End Time Out
        </button>
      </div>
    {:else if $state == "lineUps"}
      <div class="flex mb-2 space-x-2">
        <div class="w-1/2">
          <button
            class="btn btn-primary"
            on:click={() => ($serve = 1 - $serve)}
          >
            Switch Serve
          </button>
        </div>
        <div class="w-1/2">
          <button class="btn btn-secondary" on:click={() => ($side = !$side)}>
            Switch Side
          </button>
        </div>
      </div>
      <button class="btn btn-neutral" on:click={() => confirmLineUp()}>
        Confirm Line Ups
      </button>
    {:else if $state == "endSet"}
      <button class="btn btn-neutral" on:click={endSet}> End Set </button>
    {:else}
      <div></div>
    {/if}
  </div>

  <!-- Injury + Sanction -->
  <div class="grid grid-cols-2 space-x-2">
    <div>
      <button
        class="btn bg-white"
        disabled={$state != "beforeRally"}
        on:click={() => ($modal.type = "injury")}
      >
        Injury
      </button>
    </div>
    <div>
      <button
        class="btn bg-white"
        disabled={$state != "beforeRally"}
        on:click={() => ($modal.type = "sanction")}
      >
        Sanction
      </button>
    </div>
  </div>
</div>

<style lang="postcss">
  .btn {
    @apply btn-block;
    @apply rounded;
    @apply shadow;
  }
</style>
