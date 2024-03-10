<script lang="ts">
  import { modal, teamNames } from "../../stores";

  modal.subscribe((val) => {
    switch (val) {
      case "injury":
        $modal = "none";
        document.getElementById("injury_modal").showModal();
        break;
      case "sanction":
        $modal = "none";
        document.getElementById("sanction_modal").showModal();
        break;
    }
  });
</script>

<!-- Injury Modal -->
<dialog id="injury_modal" class="modal">
  <div class="modal-box w-1/4">
    <h3 class="font-bold text-lg">Injury</h3>
    <p class="pt-2">Pick team with Injury</p>
    <div class="modal-action justify-center">
      <form method="dialog">
        <div class="join join-horizontal">
          <button class="btn join-item btn-primary">{$teamNames[0]}</button>
          <button class="btn join-item btn-secondary">{$teamNames[1]}</button>
        </div>
      </form>
    </div>
  </div>
</dialog>

<!-- Sanction Modal -->
<dialog id="sanction_modal" class="modal">
  <div class="modal-box w-1/4">
    <h3 class="font-bold text-lg">Sanction</h3>
    <p class="pt-2">Pick team to Sanction</p>
    <div class="modal-action justify-center">
      <form method="dialog">
        <div class="join join-horizontal">
          <button class="btn join-item btn-primary">{$teamNames[0]}</button>
          <button class="btn join-item btn-secondary">{$teamNames[1]}</button>
        </div>
      </form>
    </div>
  </div>
</dialog>

<style lang="postcss">
  .btn {
    @apply text-sm;
  }
</style>
