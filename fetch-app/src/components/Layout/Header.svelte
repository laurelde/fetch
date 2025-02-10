<script>
  import LinkButton from "../Buttons/LinkButton.svelte";
  import { logout } from "../../api/authentication";
</script>

<header>
  <div class="row align-right">
    <LinkButton href="/#/Browse" label="Browse Dogs"></LinkButton>
    <LinkButton href="/#/Favorites" label="My Favorites"></LinkButton>
    <LinkButton href="/#/Login" label="Logout" on:click={logout}></LinkButton>
  </div>
</header>
