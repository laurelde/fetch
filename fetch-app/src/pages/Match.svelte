<script lang="ts">
  import TextInput from "../components/Inputs/TextInput.svelte";
  import Button from "../components/Buttons/Button.svelte";
  import Select from "../components/Selects/Select.svelte";
  import { login } from "../api/authentication";
  import { getBreeds } from "../api/dogData";

  let name = "";
  let email = "";

  function updateName(e) {
    name = e.detail.value;
  }

  function updateEmail(e) {
    email = e.detail.value;
  }

  async function submitLogin() {
    console.log(`Name: ${name}, Email: ${email}`);
    try {
      await login(name, email);
    } catch {
      console.log(`Login failed for ${name}, ${email}`);
    }
  }

  async function getDogBreeds() {
    console.log(`Getting Dog Breeds`);
    let breeds = null;
    try {
      breeds = await getBreeds();
    } catch {
      console.log(`Get Breeds failed`);
    }
  }
</script>

<main>
  <h1>Match</h1>

  <div class="card">
    <TextInput id="name" label="Name" on:valueChanged={updateName} />
    <TextInput id="email" label="Email" on:valueChanged={updateEmail} />
  </div>

  <div class="card">
    <Button label="Register" on:click={submitLogin} />
    <Button label="Get Breeds" on:click={getDogBreeds} />
  </div>

  <div />
</main>
