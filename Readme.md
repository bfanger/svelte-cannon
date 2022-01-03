# Svelte Cannon

Use [Svelte](https://svelte.dev/) components to build a [cannon-es](https://pmndrs.github.io/cannon-es/) physics simulation.

## Installation

```sh
npm install svelte-cannon   # or   yarn add svelte-cannon
```

## Usage

This example uses [svelte-cubed](https://svelte-cubed.vercel.app/) to display the objects, but svelte-cannon is renderer engine agnostic.

```svelte
<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "svelte-cannon";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  let position = new CANNON.Vec3(0, 4, 0);
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body mass={1} bind:position>
    <PE.Sphere radius={1} />
  </PE.Body>
</PE.World>

<SC.Canvas>
  <SC.PerspectiveCamera position={[0, 2, 10]} />
  <SC.Mesh
    position={[position.x, position.y, position.z]}
    geometry={new THREE.SphereGeometry(1)}
  />
</SC.Canvas>
```

Using the import `* as PE` is helpfull to avoid naming conflicts, [three](https://threejs.org/docs/#api/en/math/Sphere), [cannon-es](https://pmndrs.github.io/cannon-es/docs/classes/Sphere.html) and [svelte-cannon](./src/lib/components/Sphere.svelte) all export a `Sphere` for example.
_(PE is short for **P**hysics **E**ngine)_

Generally you'd want the nest the `PE.World` inside the `SC.Canvas`, because that allows subcomponents to create both the physics engine and the render engine components.

## Shorthand notations

Allowed values for setting a 3D vector are:

- `[1, 2, 3]`
- `new CANNON.Vec3(1, 2, 3)`
- `new THREE.Vector3(1, 2, 3)`
- `{x: 1, y: 2, z: 3}`

This allows for reusing existing variables and reduces boilerplate.

## Two way binding caveats

1. `bind:property=` for 3D vectors only works when an `CANNON.Vec3` object is passed.

This restriction allows svelte-cannon to detect with properties you're interested in.
Due to the nature of physics engines a lot of properties could change every on frame, recalculating the `velocity` of the ground plane would be wasteful.

2. When the body is awake `bind:property=` will trigger updates, but the value might not have changed.

Syncing position the THREE.Mesh is a fast operation.
`$: mesh.position.copy(position);` ( CANNON.Vec3 is compatible with THREE.Vector3 )
Creating shadow values, recalculating and checking and for changes would be overhead.

## Imprecise stores

`writableVec3` creates store, but when you're setting the value with a CANNON.Vec3 that has roughly the same value it won't trigger an update.

```svelte
<script>
  import * as PE from "svelte-cannon";
  import * as SC from "svelte-cubed";

  const position = PE.writableVec3(0, 4, 0);
  position.precision = 0.001; // 1mm (default)
</script>

<PE.Body bind:position={$position} />
<SC.Mesh position={$position.toArray()} />
```

This allows you to prevent resending values to the renderer that haven't changed.

From an usage perspective it acts as a `writable(new Vec3(0, 4, 0))` but also allows shorthand notations:

- `position.set(1, 2, 3)`
- `position.set(new CANNON.Vec3(1, 2, 3))`
- `$position = new CANNON.Vec3(1, 2, 3)`
- `$position = new THREE.Vector3(1, 2, 3)`
- `$position = {x: 1, y: 2, z: 3}`
- `$position = [1, 2, 3]`
- `$position.x = 1; $position.x = 2; $position.x = 3;`

## Forces and Contraints

As bodies can have multiple constrains and forces can affect multiple bodies it doesn't translate well to a component hierachy. HTML also has this problem with `<input>`s and `<label>`s, svelte-cannon approach is based on the `id=` and `for=` solution:

```svelte
<PE.Body id="anchor" position={[0, 3, 0]} />
<PE.Body id="ball" mass={1} bind:position>...</PE.Body>

<PE.Spring forA="anchor" forB="ball" stiffness={50} />
```

Note: These id's not related the numerical id's of the cannon-es Bodies.

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
