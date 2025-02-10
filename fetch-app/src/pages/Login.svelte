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
    let successfulLogin = false;
    try {
      successfulLogin = await login(name, email);
    } catch {
      console.log(`Login failed for ${name}, ${email}`);
    }

    if (successfulLogin) {
      window.location = "/#/Browse";
    }
  }
</script>

<main id="login">
  <h1>Login</h1>

  <form>
    <div class="card">
      <TextInput id="name" label="Name" on:valueChanged={updateName} />
      <TextInput id="email" label="Email" on:valueChanged={updateEmail} />
    </div>

    <div class="card">
      <Button label="Login" on:click={submitLogin} />
    </div>
  </form>
  <div />
</main>
