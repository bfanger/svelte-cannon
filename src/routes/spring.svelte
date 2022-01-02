<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "$lib/index";

  let position = new CANNON.Vec3(1, -2, 0);
  let rotation = CANNON.Vec3.ZERO;
</script>

<SC.Canvas>
  <PE.World gravity={[0, -9.81, 0]}>
    <PE.Spring
      forA="anchor"
      forB="box"
      localAnchorB={[-1, 1, 0]}
      restLength={0}
      stiffness={50}
    />

    <PE.Body id="anchor">
      <PE.Sphere radius={0.1} />
    </PE.Body>
    <SC.Mesh geometry={new THREE.SphereGeometry(0.1)} />

    <PE.Body id="box" mass={5} bind:position bind:rotation>
      <PE.Box size={[1, 1, 0.3]} />
    </PE.Body>
    <SC.Mesh
      rotation={rotation.toArray()}
      position={position.toArray()}
      geometry={new THREE.BoxGeometry(1, 1, 0.3)}
    />
  </PE.World>

  <SC.PerspectiveCamera fov={24} near={5} far={2000} position={[0, 10, 15]} />
</SC.Canvas>

<svelte:head>
  <title>Spring</title>
  <meta
    name="description"
    content="Implementation of https://pmndrs.github.io/cannon-es/examples/spring"
  />
</svelte:head>
