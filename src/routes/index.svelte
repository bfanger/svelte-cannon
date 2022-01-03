<h1>💣 svelte-cannon</h1>
<div class="container">
  <p>
    A declarative approach to setting up a
    <a href="https://pmndrs.github.io/cannon-es/">cannon-es</a>
    physics simulation using <a href="https://svelte.dev/">Svelte</a> components.
  </p>
  <a
    href="https://github.com/bfanger/svelte-cannon"
    style="display: flex; align-items: center;"
  >
    <img class="github" src="/github.svg" alt="GitHub" /> bfanger/svelte-cannon.git
  </a>
  <h2>Examples</h2>

  <ul>
    <li>
      <a href="jumpy-box">Jumpy box</a>
      <div class="description">
        A cube, a floor, some events, and maybe even a ball.
      </div>
    </li>
    <li>
      <a href="minimal">Minimal</a>
      <div class="description">
        A ball that keeps falling (the Readme example)
      </div>
    </li>
    <li>
      <a href="spring">Spring</a>
      <div class="description">
        Box hanging on a spring
        <a href="https://pmndrs.github.io/cannon-es/examples/spring">
          <small>original by cannon-es</small>
        </a>
      </div>
    </li>
  </ul>
</div>

<style lang="scss">
  :global(html) {
    font-size: 10px;
  }
  :global(body) {
    margin: 0;
    font: 1.6rem/1.3 -apple-system, "Segoe UI", sans-serif;
  }
  h1 {
    margin: 0;
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    color: white;
    text-align: center;
    padding: 20px;
    margin-bottom: 3.5rem;
    font-size: 3.8rem;
    padding-right: 1em;
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    width: 56rem;
    max-width: 90%;
    font-size: 1.6rem;
  }
  .github {
    margin-right: 0.5rem;
  }
  h2 {
    font-weight: normal;
    font-size: 2.6rem;
    margin-top: 4rem;
    margin-bottom: 1.2rem;
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    margin-bottom: 1rem;
  }
  a {
    color: #2563eb;

    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .description {
    color: #575757;
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;
  }
</style>
