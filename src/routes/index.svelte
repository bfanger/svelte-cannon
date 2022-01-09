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
      <a href="jumpy-box">Jumpy Box</a>
      <div class="description">
        A cube, a floor, some events, and maybe even a ball.
      </div>
    </li>
    <li>
      <a href="pill-eater">Pill Eater</a>
      <div class="description">
        Top down game where the yellow hero hunts for power pills.
      </div>
    </li>
    <li>
      <a href="spring">Spring</a>
      <div class="description">
        Box hanging on a spring
        <a href="https://pmndrs.github.io/cannon-es/examples/spring">
          original by cannon-es
        </a>
      </div>
    </li>
    <li>
      <a href="minimal">Minimal</a>
      <div class="description">
        A ball that keeps falling (the Readme example)
      </div>
    </li>
    <li>
      <a href="debugger">Debugger</a>
      <div class="description">
        Using the cannon-es-debugger, depends on additional packages:<br />
        <a href="https://github.com/pmndrsnd /cannon-es-debugger">
          cannon-es-debugger
        </a>
        and <a href="https://threejs.org">threejs</a>
      </div>
    </li>
  </ul>
</div>

<style lang="scss">
  :global(html) {
    font-size: 10px;
  }

  .container {
    margin-left: auto;
    margin-right: auto;
    padding-top: 3.5rem;
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
  .description {
    font-size: 1.4rem;
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;
  }
</style>
