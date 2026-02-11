<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<svelte:head>
  <title>svelte-cannon</title>
</svelte:head>

<header>
  <h1><a href={resolve("/")}>💣 svelte-cannon</a></h1>
</header>
<main>
  <slot />
</main>

<style>
  :global(html) {
    height: 100%;
    font-size: 10px;
    color: #333;
  }

  :global(body) {
    min-height: 100%;
    margin: 0;
    font:
      1.6rem/1.3 -apple-system,
      "Segoe UI",
      sans-serif;
  }

  :global(a) {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 7rem;

    background: linear-gradient(to right, #06cdd4, #8a55ec);
  }

  h1 {
    margin: 0;
    padding-right: 1em;
    font-size: 3.8rem;
    text-align: center;

    a {
      color: white;
    }
  }

  main {
    position: relative;
    min-height: calc(100vh - 7rem);
  }
</style>
