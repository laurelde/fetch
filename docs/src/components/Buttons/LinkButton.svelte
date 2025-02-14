<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { MDCRipple } from "@material/ripple";
  import "../../styles/button.scss";

  export let label = "";
  export let disabled = false;
  export let href = "";
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
  <a
    {href}
    class={`fc-button mdc-button mdc-button--touch ${theme}`}
    on:click={onClick}
  >
    <span class="mdc-button__ripple" />
    <span class="mdc-button__touch" />
    <span class="mdc-button__label">{label}</span>
  </a>
</div>
