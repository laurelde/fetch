<script lang="ts">
  import TextInput from "../components/Inputs/TextInput.svelte";
  import Button from "../components/Buttons/Button.svelte";
  import Select from "../components/Selects/Select.svelte";
  import { getBreeds, getDogIds, getDogProfiles } from "../api/dogData";
  import { logout } from "../api/authentication";
  import { getNext } from "../api/dogData";
  import { parseQueryString } from "../helpers/formatHelper";
  import { onMount } from "svelte";
  import InfoCard from "../components/Cards/InfoCard.svelte";
  import "../styles/layouts.scss";
  import LinkButton from "../components/Buttons/LinkButton.svelte";
  import ToggleButton from "../components/Buttons/ToggleButton.svelte";

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
  let ages = [...Array(21).keys().map(String)];
  let sortField = null;
  let sortDir = "asc";
  let totalNumberOfDogs = null;
  let toggleOptions = [
    {
      id: "breed",
      label: "breed",
    },
    {
      id: "name",
      label: "name",
    },
    {
      id: "age",
      label: "age",
    },
  ];

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
      setDogData(dogIdsResult);
    } catch (e) {
      console.log(`Error getting dog Ids`, e);
    }
  }

  async function setDogData(result) {
    dogIds = result["resultIds"];
    nextLink = result["next"];
    totalNumberOfDogs = result["total"];
    dogProfiles = await getDogProfiles(dogIds);
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

  function updateSort(e) {
    sortField = e.detail.value;
    sortDir = e.detail.sortAsc ? "asc" : "desc";
    search();
  }

  async function nextPage() {
    if (nextLink) {
      let nextResult = await getNext(nextLink);
      setDogData(nextResult);
    } else {
      return;
    }
  }

  async function goToLogin() {
    await logout();
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
  <header>
    <div class="row align-right">
      <LinkButton href="/#/Login" label="Logout" on:click={goToLogin}
      ></LinkButton>
    </div>
  </header>
  <div class="main">
    <h1>Browse</h1>
    <div class="row">
      <div class="row">
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
        {#key toggleOptions}
          <ToggleButton
            {toggleOptions}
            label="Sort"
            on:toggleClicked={updateSort}
          ></ToggleButton>
        {/key}
      </div>
      <Button label="Search" on:click={search} />
    </div>
    {#key totalNumberOfDogs}
      Dogs Found: {totalNumberOfDogs}
    {/key}

    <div />
    {#if totalNumberOfDogs < 1}
      <div class="error-message">
        <h2>
          Sorry, no dogs match the criteria you searched by! Adjust your search
          filters and try again.
        </h2>
      </div>
    {:else}
      <div class="row align-right">
        <Button label="Next Page" on:click={nextPage}></Button>
      </div>
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
      <div class="row align-right">
        <Button label="Next Page" on:click={nextPage}></Button>
      </div>
    {/if}
  </div>
</main>
