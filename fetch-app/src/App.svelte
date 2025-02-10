<script lang="ts">
  import Router from "svelte-spa-router";
  import Login from "./pages/Login.svelte";
  import Browse from "./pages/Browse.svelte";
  import Match from "./pages/Match.svelte";
  import Favorites from "./pages/Favorites.svelte";

  const routes = {
    "/login": Login,
    "/browse": Browse,
    "/match": Match,
    "/favorites": Favorites,
    "*": Login,
  };
</script>

<Router {routes} />
