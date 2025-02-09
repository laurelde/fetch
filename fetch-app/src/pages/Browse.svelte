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
  let breed = "";
  let zipCode = "";
  let ageMin = 0;
  let ageMax = 20;
  let size = "";
  let ages = [...Array(20).keys()];
  let sortField = null;
  let sortDir = "asc";

  // Call to search for dog IDs and then profiles based on current filters
  async function search() {
    try {
      let dogIdsResult = await getDogIds(
        breed,
        zipCode,
        ageMin,
        ageMax,
        size,
        0,
        sortField,
        sortDir
      );
      dogIds = dogIdsResult["resultIds"];
      nextLink = dogIdsResult["next"];
      if (dogIds?.length > 0) {
        dogProfiles = await getDogProfiles(dogIds);
      }
    } catch (e) {
      console.log(`Error getting dog Ids`, e);
    }
  }

  function updateZipCode(e) {
    zipCode = e.detail.value;
  }

  function updateBreed(e) {
    breed = e.detail.selectedOption;
  }

  function updateMinAge(e) {
    ageMin = e.detail.selectedOption;
  }

  function updateMaxAge(e) {
    ageMax = e.detail.selectedOption;
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
    {#key dogBreeds}
      <Select
        id="dogBreedDropdown"
        label="Breed"
        options={dogBreeds}
        on:valueChanged={updateBreed}
      />
    {/key}

    <TextInput
      id="zipCodeInput"
      label="Zip Code"
      on:valueChanged={updateZipCode}
    />
    {#key ageMin}
      <Select
        id="ageMinDropdown"
        label="Minimum Age"
        options={ages}
        on:valueChanged={updateMinAge}
      />
    {/key}
    {#key ageMax}
      <Select
        id="ageMaxDropdown"
        label="Maxiumum Age"
        options={ages}
        on:valueChanged={updateMaxAge}
      />
    {/key}

    <Button label="Search" on:click={search} />
  </div>
  <p>Dog IDs: {dogIds}</p>
  {#key dogProfiles}
    <p>Dog Profiles: {dogProfiles.toString()}</p>
  {/key}

  <div />
</main>
