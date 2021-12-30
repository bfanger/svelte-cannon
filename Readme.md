# Svelte Cannon

Declarative API using [Svelte](https://svelte.dev/) components to inferface with the [cannon-es](https://pmndrs.github.io/cannon-es/) physics engine.

## Usage

This example uses [svelte-cubed](https://svelte-cubed.vercel.app/) to display the objects, but svelte-cannon is renderer engine agnostic.

```svelte
<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "svelte-cannon"; // PE is short for Physics Engine
</script>

<SC.Canvas>
  <PE.World gravity={[0, -9.81, 0]}>
    <SC.PerspectiveCamera position={[0, 2, 10]} />
    <PE.Body mass={1} position={[0, 5, 0]} let:position let:rotation>
      <PE.Sphere radius={1} />
      <SC.Mesh
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        geometry={new THREE.SphereGeometry(1)}
      />
    </PE.Body>
  </PE.World>
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
