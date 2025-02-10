<script lang="ts">
  import TextInput from "../components/Inputs/TextInput.svelte";
  import Button from "../components/Buttons/Button.svelte";
  import Select from "../components/Selects/Select.svelte";
  import { getBreeds, getDogIds, getDogProfiles } from "../api/dogData";
  import { parseQueryString } from "../helpers/formatHelper";
  import { onMount } from "svelte";
  import InfoCard from "../components/Cards/InfoCard.svelte";
  import "../styles/layouts.scss";
  import LinkButton from "../components/Buttons/LinkButton.svelte";

  let dogBreeds = [];
  let dogIds = [];
  let dogProfiles = [];
  let nextLink = null;
  let breed = "";
  let zipCode = "";
  let ageMin = 0;
  let ageMax = 20;
  let size = "";
  let from = "";
  let ages = [...Array(20).keys().map(String)];
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

  function nextPage() {
    if (nextLink) {
      let nextLinkParams = parseQueryString(nextLink);
      size = nextLinkParams["size"] ? nextLinkParams["size"] : null;
      from = nextLinkParams["from"] ? nextLinkParams["from"] : null;
    } else {
      size = "";
      from = "";
    }
    search();
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
    {#key ages}
      <Select
        id="ageMinDropdown"
        label="Minimum Age"
        options={ages}
        on:valueChanged={updateMinAge}
      />
    {/key}
    {#key ages}
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
  <Button label="Next Page" on:click={nextPage}></Button>
  <div class="grid-4-col">
    {#key dogProfiles}
      {#each dogProfiles as dog}
        <InfoCard title={dog.name} imgSrc={dog.img} id={dog.id}>
          <div slot="descriptionSlot">
            <p>Breed: {dog.breed} ZipCode: {dog.zip_code}</p>
            <p>Age: {dog.age}</p>
          </div>
        </InfoCard>
      {/each}
    {/key}
  </div>
</main>
