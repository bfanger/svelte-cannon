# Svelte Cannon

Declarative API using [Svelte](https://svelte.dev/) components

## Usage

```svelte
<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "svelte-cannon";
  import * as CANNON from "cannon-es";
</script>

<PE.World gravity={[0, -9.81, 0]}>
<PE.Body
      mass={5}
      position={[0, 5, 0]}
      let:position
    >
      <PE.Box size={[0.5, 0.5, 0.5]} />
      <SC.Mesh
        position={[position.x, position.y, position.z]}
        rotation={toEuler(quaternion)}
        geometry={new THREE.BoxGeometry()}
        material={new THREE.MeshPhongMaterial({ color: 0x999999 })}
        castShadow
      />
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
yarn build  # or  npm run build
```
