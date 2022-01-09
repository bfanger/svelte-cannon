<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import Fab from "../site/Fab.svelte";

  let position = new CANNON.Vec3(0, 4, 0);
  let rotation = new CANNON.Vec3(0, 0, 0);
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body mass={1} bind:position bind:rotation>
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
<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/minimal.svelte"
/>
<svelte:head>
  <title>Minimal</title>
  <meta name="description" content="The usage example for in the Readme" />
</svelte:head>
