# Svelte Cannon

Declarative API using [Svelte](https://svelte.dev/) components to inferface with the [cannon-es](https://pmndrs.github.io/cannon-es/) physics engine.

## Installation

```sh
npm install svelte-cannon   # or   yarn add svelte-cannon
```

## Usage

This example uses [svelte-cubed](https://svelte-cubed.vercel.app/) to display the objects, but svelte-cannon is renderer engine agnostic.

```svelte
<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "svelte-cannon";

  const position = PE.writableVec3(0, 4, 0);
</script>

<PE.World gravity={[0, -9.81, 0]} allowSleep>
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

Using the import `* as PE` is helpfull to avoid naming conflicts, [three](https://threejs.org/docs/#api/en/math/Sphere), [cannon-es](https://pmndrs.github.io/cannon-es/docs/classes/Sphere.html) and [svelte-cannon](./src/lib/components/Sphere.svelte) all export a `Sphere` for example.
_(PE is short for **P**hysics **E**ngine)_

Generally you'd want the nest the `PE.World` inside the `SC.Canvas` that allows subcomponents to use both the physics and the render engine.

### Data flow (Connected Stores)

Props are considered unidirectional, used to set values into the physics engine.
For getting values out of the physics engine, instead of two-way binding svelte-cannon uses special stores:

```js
const position = PE.writableVec3(0, 4, 0);
```

From an usage perspective the `position` acts as a `writable(new Vec3(0, 4, 0))`

This approach allows svelte-cannon to:

- Only sync and calculate the properties you're interested in
- Only emit changes when the value changed. (default precision is 0.001 == 1mm)
- Detect the change direction:
  - Setting the value updates the state of physics engine
  - After the physics calculation, updates the value
- Use short notations `position={[0, 1, 0]}` for writeonly state

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
