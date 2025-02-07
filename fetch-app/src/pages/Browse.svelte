<script lang="ts">
  import TextInput from "../components/Inputs/TextInput.svelte";
  import Button from "../components/Buttons/Button.svelte";
  import Select from "../components/Selects/Select.svelte";
  import { login } from "../api/authentication";
  import { getBreeds, getDogIds, getDogProfiles } from "../api/dogData";
  import { onMount } from "svelte";

  let dogBreeds = [];
  let dogIds = [];
  let dogProfiles = [];
  let nextLink = null;

  // Call to search for dog IDs and then profiles based on current filters
  async function search() {
    try {
      let dogIdsResult = await getDogIds();
      dogIds = dogIdsResult["resultIds"];
      nextLink = dogIdsResult["next"];
      if (dogIds?.length > 0) {
        dogProfiles = await getDogProfiles(dogIds);
      }
    } catch (e) {
      console.log(`Error getting dog Ids`, e);
    }
  }

  onMount(async () => {
    // Populate Dog Breed Dropdown
    try {
      dogBreeds = await getBreeds();
    } catch (e) {
      console.log(`Error getting dog breeds`, e);
      window.location = "/";
    }

    await search();
  });
</script>

<main>
  <h1>Browse</h1>

  <div class="card">
    <Button label="Search" on:click={search} />
    {#key dogBreeds}
      <Select id="dogBreedDropdown" label="Breed" options={dogBreeds} />
    {/key}
  </div>
  <p>Dog IDs: {dogIds}</p>
  {#key dogProfiles}
    <p>Dog Profiles: {dogProfiles.toString()}</p>
  {/key}

  <div />
</main>
