<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { MDCRipple } from "@material/ripple";
  import "../../styles/card.scss";

  export let title = "";
  export let imgSrc = null;
  export let id = null;

  const dispatch = createEventDispatcher();

  function favorited(e) {
    dispatch("favorited", {
      id: id,
    });
  }

  onMount(() => {
    const selector = ".mdc-button, .mdc-icon-button, .mdc-card__primary-action";
    const ripples = [].map.call(
      document.querySelectorAll(selector),
      function (el) {
        return new MDCRipple(el);
      }
    );
  });
</script>

<div class="mdc-card mdc-card--outlined">
  <div class="mdc-card__primary-action">
    <div class="mdc-card__media mdc-card__media--square">
      <div class="mdc-card__media-content">
        <img class="mdc-card__img" src={imgSrc} />
      </div>
    </div>
    <div><h3>{title}</h3></div>
    <slot name="descriptionSlot"></slot>
    <div class="mdc-card__ripple"></div>
  </div>
  <div class="mdc-card__actions">
    <div class="mdc-card__action-icons">
      <button
        class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
        title="Share">share</button
      >
      <button
        class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
        title="More options"
        on:click={favorited}>more_vert</button
      >
    </div>
  </div>
</div>
