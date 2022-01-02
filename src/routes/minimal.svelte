<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
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

<svelte:head>
  <title>Minimal</title>
  <meta name="description" content="The usage example for in the Readme" />
</svelte:head>
