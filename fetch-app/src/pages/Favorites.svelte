<script lang="ts">
  import TextInput from "../components/Inputs/TextInput.svelte";
  import Button from "../components/Buttons/Button.svelte";
  import Select from "../components/Selects/Select.svelte";
  import { getBreeds, getDogIds, getDogProfiles } from "../api/dogData";
  import { logout } from "../api/authentication";
  import { getNext } from "../api/dogData";
  import { getFavorites, setFavorites } from "../helpers/favoritesHelper";
  import { parseQueryString } from "../helpers/formatHelper";
  import { onMount } from "svelte";
  import InfoCard from "../components/Cards/InfoCard.svelte";
  import "../styles/layouts.scss";
  import LinkButton from "../components/Buttons/LinkButton.svelte";
  import ToggleButton from "../components/Buttons/ToggleButton.svelte";
  import Header from "../components/Layout/Header.svelte";

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
  let favoritesList = [];
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
  // async function search() {
  //   try {
  //     let dogIdsResult = await getDogIds(
  //       breed,
  //       zipCode,
  //       ageMin,
  //       ageMax,
  //       size,
  //       0,
  //       sortField,
  //       sortDir
  //     );
  //     setDogData(dogIdsResult);
  //   } catch (e) {
  //     console.log(`Error getting dog Ids`, e);
  //   }
  // }

  async function setDogData(result) {
    totalNumberOfDogs = result.length;
    dogProfiles = await getDogProfiles(result);
  }

  // function updateZipCode(e) {
  //   zipCode = e.detail.value;
  // }

  // function updateBreed(e) {
  //   breed = e.detail.selectedOption;
  // }

  // function updateMinAge(e) {
  //   ageMin = e.detail.selectedOption;
  // }

  // function updateMaxAge(e) {
  //   ageMax = e.detail.selectedOption;
  // }

  async function nextPage() {
    if (nextLink) {
      let nextResult = await getNext(nextLink);
      setDogData(nextResult);
    } else {
      return;
    }
  }

  function updateSort(e) {
    sortField = e.detail.value;
    sortDir = e.detail.sortAsc ? "asc" : "desc";
  }

  function updateFavorites(e) {
    let addFavorite = e.detail.favorite;
    let id = e.detail.id;

    if (addFavorite) {
      favoritesList.push(id);
      setFavorites(favoritesList);
    } else {
      const index = favoritesList.indexOf(id);
      if (index > -1) {
        favoritesList = favoritesList.splice(index, 1);
        setFavorites(favoritesList);
      }
    }
  }

  async function goToLogin() {
    await logout();
  }

  onMount(async () => {
    // Populate Dog Breed Dropdown
    try {
      favoritesList = getFavorites();
      let setData = await setDogData(favoritesList);
    } catch (e) {
      console.log(`Error getting dog breeds`, e);
    }
  });
</script>

<main>
  <Header />
  <div class="core-content">
    <h1 class="row">My Favorite Dogs</h1>
    <div class="browse main">
      <div class="row">
        {#key toggleOptions}
          <ToggleButton
            {toggleOptions}
            label="Sort"
            on:toggleClicked={updateSort}
          ></ToggleButton>
        {/key}
      </div>

      <div />
      {#if totalNumberOfDogs < 1}
        <div class="error-message">
          <h2>
            You haven't favorited any dogs yet! Go back to the Browse page and
            click on a dog to favorite it.
          </h2>
        </div>
      {:else if dogProfiles.length > 0}
        {#if nextLink}
          <div class="row align-right">
            <Button label="Next Page" on:click={nextPage}></Button>
          </div>
        {/if}
        <div class="grid-4-col">
          {#key dogProfiles}
            {#each dogProfiles as dog}
              <InfoCard
                title={dog.name}
                imgSrc={dog.img}
                id={dog.id}
                favorite={favoritesList?.includes(dog.id)}
                on:favorited={updateFavorites}
              >
                <div slot="descriptionSlot">
                  <p>Breed: {dog.breed} ZipCode: {dog.zip_code}</p>
                  <p>Age: {dog.age}</p>
                </div>
              </InfoCard>
            {/each}
          {/key}
        </div>
        {#if nextLink}
          <div class="row align-right">
            <Button label="Next Page" on:click={nextPage}></Button>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</main>
