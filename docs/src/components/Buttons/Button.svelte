<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { MDCRipple } from "@material/ripple";
  import "../../styles/button.scss";

  export let label = "";
  export let disabled = false;
  export let theme = "mdc-button--raised";

  const dispatch = createEventDispatcher();

  function onClick(e) {
    dispatch("click", {
      buttonElement: e.currentTarget,
    });
  }

  onMount(() => {
    const buttonRipple = new MDCRipple(document.querySelector(".mdc-button"));
  });
</script>

<div class="mdc-touch-target-wrapper">
  <button
    class={`fc-button mdc-button mdc-button--touch ${theme}`}
    {disabled}
    on:click={onClick}
  >
    <span class="mdc-button__ripple" />
    <span class="mdc-button__touch" />
    <span class="mdc-button__label">{label}</span>
  </button>
</div>
