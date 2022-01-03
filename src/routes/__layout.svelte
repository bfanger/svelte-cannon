<header><h1><a href="/">💣 svelte-cannon</a></h1></header>
<main>
  <slot />
</main>

<style lang="scss">
  :global(html) {
    font-size: 10px;
    height: 100%;
    color: #333333;
  }
  :global(body) {
    margin: 0;
    font: 1.6rem/1.3 -apple-system, "Segoe UI", sans-serif;
    min-height: 100%;
  }
  :global(a) {
    color: #2563eb;

    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  header {
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h1 {
    margin: 0;
    text-align: center;
    font-size: 3.8rem;
    padding-right: 1em;
    a {
      color: white;
    }
  }
  main {
    position: relative;
    min-height: calc(100vh - 7rem);
  }
</style>
