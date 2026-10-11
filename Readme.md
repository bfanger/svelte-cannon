# Svelte Cannon

Use [Svelte](https://svelte.dev/) components to build a [cannon-es](https://pmndrs.github.io/cannon-es/) physics simulation.

In 2022 Scott Tolinski, from Syntax.fm made a [Svelte 3D tutorial series](https://levelup.video/tutorials/svelte-3d) , which contains a svelte-cubed chapter.

## Not in active development

For a more actively maintained project that also provides 3D physics for Svelte, Check out [Threlte and Rapier](https://threlte.xyz/docs/reference/rapier/getting-started/)

## Installation

```sh
npm install svelte-cannon
```

## Usage

The examples use the deprecated [svelte-cubed](https://svelte-cubed.vercel.app/) for displaying the 3D objects, but svelte-cannon is renderer engine agnostic.

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

Generally you'd want the nest the `SC.Canvas` inside the `PE.World`, because that allows subcomponents to create both the physics engine and the render engine components.

## Shorthand notations

Allowed values for setting a 3D vector are:

- `[1, 2, 3]`
- `new CANNON.Vec3(1, 2, 3)`
- `new THREE.Vector3(1, 2, 3)`
- `{x: 1, y: 2, z: 3}`

This allows for reusing existing variables and reduces boilerplate.

## Two way binding caveats

1. `bind:property=` for 3D vectors only works when a `CANNON.Vec3` object is passed.

This restriction allows svelte-cannon to detect which properties you're interested in.
Due to the nature of physics engines a lot of properties could change every on frame, recalculating the `velocity` of the ground plane would be wasteful.

2. When the body is awake `bind:property=` will trigger updates, but the value might not have changed.

Syncing position the THREE.Mesh is a fast operation.
`$effect(() => mesh.position.copy(position));` ( Vec3State is compatible with THREE.Vector3 )
Creating shadow values, recalculating and checking for changes would be overhead.

## Imprecise Vec3State

`Vec3State` is a reactive 3D vector, when a physics simulation state is roughly the same as the current state (within `precision`) it won't trigger an update.

```svelte
<script>
  import * as PE from "svelte-cannon";
  import * as SC from "svelte-cubed";

  const position = new PE.Vec3State(0, 4, 0);
  position.precision = 0.001; // 1mm (default)
</script>

<PE.Body {position} />
<SC.Mesh position={position.toArray()} />
```

This allows you to prevent resending values to the renderer that haven't changed meaningfully.

The `x`, `y` and `z` properties are reactive `$state` values, so you can read and set them directly:

- `position.set(1, 2, 3)`
- `position.x = 1; position.y = 2; position.z = 3;`
- `position.toArray()` → `[1, 2, 3]`

## Forces and Constraints

As bodies can have multiple constrains and forces can affect multiple bodies it doesn't translate well to a component hierarchy. HTML also has this problem with `<input>`s and `<label>`s, svelte-cannon approach is based on the `id=` and `for=` solution:

```svelte
<PE.Body id="anchor" position={[0, 3, 0]} />
<PE.Body id="ball" mass={1} bind:position>...</PE.Body>

<PE.Spring forA="anchor" forB="ball" stiffness={50} />
```

Note: These id's not related the numerical id's of the cannon-es Bodies.

## Contributing

### Setup

```sh
pnpm install
pnpm run dev
```

### Linting

```sh
pnpm lint
```

### Build

```sh
pnpm run package
```
