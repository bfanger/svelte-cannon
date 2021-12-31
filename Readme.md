# Svelte Cannon

Declarative API using [Svelte](https://svelte.dev/) components to inferface with the [cannon-es](https://pmndrs.github.io/cannon-es/) physics engine.

To minimize runtime overhead you pass in the properties you're interrested in as stores.
These stores only update when the value was significanly changed.

## Usage

This example uses [svelte-cubed](https://svelte-cubed.vercel.app/) to display the objects, but svelte-cannon is renderer engine agnostic.

```svelte
<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "svelte-cannon"; // PE is short for Physics Engine

  const position = PE.writableVec3(0, 4, 0);
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body mass={1} {position}>
    <PE.Sphere radius={1} />
  </PE.Body>
</PE.World>

<SC.Canvas>
  <SC.PerspectiveCamera position={[0, 2, 10]} />
  <SC.Mesh
    position={$position.toArray()}
    geometry={new THREE.SphereGeometry(1)}
  />
</SC.Canvas>
```

## Contributing

### Setup

```sh
yarn install
yarn dev
```

### Linting

```sh
yarn lint  # or  npm run lint
```

### Build

```sh
yarn package  # or  npm run package
```
