<script lang="ts">
  import { state, modal } from "../stores";
  import { endSet } from "../(lib)";

  import Timer from "easytimer.js";

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

<!-- Game States -->
<div>
  {#if $state == "beforeRally"}
    <button
      class="btn btn-wide btn-neutral"
      on:click={() => ($state = "rally")}
    >
      Start Rally
    </button>
  {:else if $state == "rally"}
    <button
      class="btn btn-wide btn-neutral"
      on:click={() => ($state = "beforeRally")}
    >
      Stop Rally
    </button>
  {:else if $state == "timeOut"}
    <div class="space-y-4">
      <div
        use:startTimer
        class="btn btn-wide btn-neutral pointer-events-none"
      ></div>
      <button
        class="btn btn-wide btn-neutral btn-outline"
        on:click={() => ($state = "beforeRally")}
      >
        End Time Out
      </button>
    </div>
  {:else if $state == "lineUps"}
    <button
      class="btn btn-wide btn-neutral"
      on:click={() => ($modal.type = "lineUps")}
    >
      Set Line Ups
    </button>
  {:else if $state == "endSet"}
    <button class="btn btn-wide btn-neutral" on:click={endSet}>
      End Set
    </button>
  {:else}
    <div></div>
  {/if}
</div>

<!-- Injury + Sanction -->
<div class="grid grid-cols-2 space-x-2">
  <div>
    <button
      class="btn-middle"
      disabled={$state != "beforeRally"}
      on:click={() => ($modal.type = "injury")}
    >
      Injury
    </button>
  </div>
  <div>
    <button
      class="btn-middle"
      disabled={$state != "beforeRally"}
      on:click={() => ($modal.type = "sanction")}
    >
      Sanction
    </button>
  </div>
</div>

<style lang="postcss">
  .btn-middle {
    @apply btn;
    @apply btn-block;
    @apply rounded;
    @apply shadow-lg;
    @apply border-0;
    background-color: white;
  }
</style>
