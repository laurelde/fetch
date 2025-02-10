<script lang="ts">
  import TextInput from "../components/Inputs/TextInput.svelte";
  import Button from "../components/Buttons/Button.svelte";
  import Select from "../components/Selects/Select.svelte";
  import { login } from "../api/authentication";
  import { getBreeds } from "../api/dogData";
  import { prevent_default } from "svelte/internal";

  let name = "";
  let email = "";

  function updateName(e) {
    name = e.detail.value;
  }

  function updateEmail(e) {
    email = e.detail.value;
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      submitLogin();
    }
  });

  async function submitLogin() {
    console.log(`Name: ${name}, Email: ${email}`);
    let successfulLogin = false;
    try {
      let loginFunc = login(name, email).then((response) => {
        window.location.href = "/#/Browse";
        successfulLogin = true;
      });
    } catch {
      console.log(`Login failed for ${name}, ${email}`);
    }
  }
</script>

<main id="login">
  <h1>Login</h1>
  <form on:submit={submitLogin}>
    <div class="card">
      <TextInput id="name" label="Name" on:valueChanged={updateName} />
      <TextInput id="email" label="Email" on:valueChanged={updateEmail} />
    </div>

    <div class="card">
      <Button label="Login" />
    </div>
  </form>
  <div />
</main>
