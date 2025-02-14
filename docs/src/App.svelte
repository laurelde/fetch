<script lang="ts">
  import Router from "svelte-spa-router";
  import Login from "./pages/Login.svelte";
  import Browse from "./pages/Browse.svelte";
  import Favorites from "./pages/Favorites.svelte";

  const routes = {
    "/login": Login,
    "/browse": Browse,
    "/favorites": Favorites,
    "*": Login,
  };
</script>

<Router {routes} />
