<script lang="ts">
  import Router from "svelte-spa-router";
  import Login from "./pages/Login.svelte";
  import Browse from "./pages/Browse.svelte";
  import Match from "./pages/Match.svelte";

  const routes = {
    "/login": Login,
    "/browse": Browse,
    "/match": Match,
    "*": Login,
  };
</script>

<Router {routes} />
