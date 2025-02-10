<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let label = "";
  export let toggleOptions = [];
  export let selectedToggleId = "";
  let previousSelectedToggleId = "";
  let sortAsc = true;

  const dispatch = createEventDispatcher();

  function toggleClicked(event) {
    selectedToggleId = event.currentTarget.getAttribute("id");

    if (previousSelectedToggleId == selectedToggleId) {
      sortAsc = !sortAsc;
    } else {
      sortAsc = true;
    }

    dispatch("toggleClicked", {
      value: selectedToggleId,
      sortAsc: sortAsc,
    });

    previousSelectedToggleId = selectedToggleId;
  }
</script>

<div class="btn__toggle-group">
  <div class="form--label" id="toggleBtnLabel">{label}</div>
  <div class="btn__toggle-group__group">
    {#each toggleOptions as option, index}
      <div class="mdc-touch-target-wrapper">
        <button
          id={option.id}
          aria-label={`${label}: ${option.label}`}
          class={`mdc-button mdc-button--raised mdc-button--touch mdc-button--large ${option.id == selectedToggleId ? "btn__toggle-group--selected" : ""}`}
          on:click={toggleClicked}
        >
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__touch"></span>
          <span class="mdc-button__label"
            >{option.label}

            {#if option.id == selectedToggleId}
              <span
                class={`material-symbols-outlined ${sortAsc ? "" : "flipped"}`}
              >
                arrow_upward
              </span>
            {/if}
          </span>
        </button>
      </div>
    {/each}
  </div>
</div>
