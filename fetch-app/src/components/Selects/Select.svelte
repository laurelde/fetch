<script lang="ts">
  import { MDCSelect } from "@material/select";
  import { onMount, createEventDispatcher } from "svelte";
  import "../../styles/select.scss";

  export let options = [];
  export let label = "";
  export let id = "";
  export let selectedId = null;

  const dispatch = createEventDispatcher();

  function valueChanged(id) {
    dispatch("valueChanged", {
      selectedOption: id,
    });
  }

  onMount(() => {
    const select = new MDCSelect(document.querySelector(`#${id}.mdc-select`));

    select.listen("MDCSelect:change", (e) => {
      selectedId = e.detail.value;
      valueChanged(selectedId);
    });
  });
</script>

<div class="mdc-select mdc-select--outlined">
  <div class="mdc-select__anchor" aria-labelledby={label}>
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading" />
      <span class="mdc-notched-outline__notch">
        <span id={label} class="mdc-floating-label">Label</span>
      </span>
      <span class="mdc-notched-outline__trailing" />
    </span>
    <span class="mdc-select__selected-text-container">
      <span id="demo-selected-text" class="mdc-select__selected-text" />
    </span>
    <span class="mdc-select__dropdown-icon">
      <svg
        class="mdc-select__dropdown-icon-graphic"
        viewBox="7 10 10 5"
        focusable="false">
        <polygon
          class="mdc-select__dropdown-icon-inactive"
          stroke="none"
          fill-rule="evenodd"
          points="7 10 12 15 17 10" />
        <polygon
          class="mdc-select__dropdown-icon-active"
          stroke="none"
          fill-rule="evenodd"
          points="7 15 12 10 17 15" />
      </svg>
    </span>
  </div>

  <!-- Other elements from the select remain. -->
  <div
    class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
    ...
  </div>
</div>
