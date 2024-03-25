<script lang="ts">
  function openModal(id) {
    document.getElementById(id).showModal();
  }
</script>

<div class="grid grid-cols-2 space-x-2">
  <div>
    <button class="btn btn-block" on:click={() => openModal("injury_modal")}>
      Injury
    </button>
  </div>
  <div>
    <button class="btn btn-block" on:click={() => openModal("sanction_modal")}>
      Sanction
    </button>
  </div>
</div>

<!-- Injury Modal -->
<dialog id="injury_modal" class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Pick team with Injury</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Team1</button>
        <button class="btn">Team2</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Sanction Modal -->
<dialog id="sanction_modal" class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Pick team with Sanction</p>
    <div class="modal-action">
      <form method="dialog">
        <div class="join join-horizontal">
          <button class="btn join-item btn-primary">Team1</button>
          <button class="btn join-item btn-secondary">Team2</button>
        </div>
      </form>
    </div>
  </div>
</dialog>
