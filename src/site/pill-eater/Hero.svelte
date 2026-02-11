<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  export let body: CANNON.Body = undefined as any;
  const position = PE.writableVec3(-7, -5, -1);
  const rotation = PE.writableVec3();
  let velocity = CANNON.Vec3.ZERO;
  const dpad = PE.createDpad();
  const force = new CANNON.Vec3();
  PE.onPreStep(() => {
    force.setZero();
    if ($dpad.up) {
      force.y = 1;
    }
    if ($dpad.down) {
      force.y = -1;
    }
    if ($dpad.left) {
      force.x = 1;
    }
    if ($dpad.right) {
      force.x = -1;
    }
    force.normalize();
    body.applyImpulse(force.scale(20));
  });
</script>

<PE.Body
  bind:body
  mass={50}
  bind:position={$position}
  bind:rotation={$rotation}
  bind:velocity
  linearDamping={0.8}
>
  <PE.Sphere radius={0.4} />
</PE.Body>

<SC.Mesh
  position={$position.toArray()}
  rotation={$rotation.toArray()}
  geometry={new THREE.OctahedronGeometry(0.4, 2)}
  material={new THREE.MeshLambertMaterial({ color: 0xdfd703 })}
  castShadow
/>
