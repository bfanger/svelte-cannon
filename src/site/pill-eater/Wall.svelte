<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "#lib";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { Tween } from "svelte/motion";
  import { untrack } from "svelte";

  type Props = {
    x: number;
    y: number;
    weak?: boolean;
  };
  let { x, y, weak = false }: Props = $props();

  const color = new Tween(new THREE.Color(0x1f1a9d), {
    interpolate(from, to) {
      return (t) => {
        return from.lerp(to, t).clone();
      };
    },
  });
  $effect(() => {
    if (weak) {
      void color
        .set(new THREE.Color(0xac0cdf), { duration: 0 })
        .then(() => color.set(new THREE.Color(0x1f1a9d), { duration: 2000 }));
    }
  });

  const position = untrack(() => new PE.Vec3State(-x, -y, -0.8));
  const rotation = new PE.Vec3State();
</script>

<PE.Body
  mass={0.3}
  {position}
  {rotation}
  type={weak ? CANNON.Body.DYNAMIC : CANNON.Body.KINEMATIC}
>
  <PE.Box size={[0.5, 0.5, 0.8]} />
</PE.Body>

<SC.Mesh
  position={position.toArray()}
  rotation={rotation.toArray()}
  geometry={new THREE.BoxGeometry(1, 1, 1.6)}
  material={new THREE.MeshLambertMaterial({
    color: color.current,
  })}
  castShadow
  receiveShadow
/>
