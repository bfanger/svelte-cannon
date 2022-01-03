<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { tweened } from "svelte/motion";

  export let x: number;
  export let y: number;
  export let weak = false;
  const color = tweened(new THREE.Color(0x1f1a9d), {
    interpolate(from, to) {
      return (t) => {
        return from.lerp(to, t);
      };
    },
  });
  $: if (weak) {
    color.set(new THREE.Color(0xac0cdf), { duration: 0 }).then(() => {
      color.set(new THREE.Color(0x1f1a9d), { duration: 2000 });
    });
  }

  const position = PE.writableVec3(-x, -y, -0.8);
  const rotation = PE.writableVec3();
</script>

<PE.Body
  mass={0.3}
  bind:position={$position}
  bind:rotation={$rotation}
  type={weak ? CANNON.Body.DYNAMIC : CANNON.Body.KINEMATIC}
>
  <PE.Box size={[0.5, 0.5, 0.8]} />
</PE.Body>

<SC.Mesh
  position={$position.toArray()}
  rotation={$rotation.toArray()}
  geometry={new THREE.BoxGeometry(1, 1, 1.6)}
  material={new THREE.MeshLambertMaterial({
    color: $color,
  })}
  castShadow
  receiveShadow
/>
