<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  export let label = "";
  export let toggleOptions = [];
  export let selectedToggleId = "";
  let previousSelectedToggleId = "";
  let sortAsc = true;

  const dispatch = createEventDispatcher();

  async function toggleClicked(event) {
    selectedToggleId = event.currentTarget.getAttribute("id");

    if (previousSelectedToggleId == selectedToggleId) {
      sortAsc = !sortAsc;
    } else {
      sortAsc = true;
    }

    await tick();

    dispatch("toggleClicked", {
      value: selectedToggleId,
      sortAsc: sortAsc,
    });

    previousSelectedToggleId = selectedToggleId;
  }
</script>

<div class="btn__toggle-group">
  <div class="form--label" id="toggleBtnLabel"><h3>{label}</h3></div>
  <div class="btn__toggle-group__group">
    {#each toggleOptions as option, index}
      <div class="mdc-touch-target-wrapper">
        <button
          id={option.id}
          aria-label={`${label}: ${option.label}`}
          class={`fc-button mdc-button  mdc-button--touch mdc-button--large ${option.id == selectedToggleId ? "btn__toggle-group--selected" : ""}  ${option.id == selectedToggleId ? "mdc-button--raised" : "mdc-button--outlined"}`}
          on:click={toggleClicked}
        >
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__touch"></span>
          <span class="mdc-button__label"
            >{option.label}

            <span
              class={`material-symbols-outlined ${sortAsc ? "" : "flipped"} ${option.id == selectedToggleId ? "visible" : ""}`}
            >
              arrow_upward
            </span>
          </span>
        </button>
      </div>
    {/each}
  </div>
</div>
