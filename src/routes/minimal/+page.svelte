<script lang="ts">
  import * as PE from "#lib";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import Fab from "../../site/Fab.svelte";

  const position = new PE.Vec3State(0, 4, 0);
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body mass={1} {position}>
    <PE.Sphere radius={1} />
  </PE.Body>
</PE.World>

<SC.Canvas>
  <SC.PerspectiveCamera position={[0, 2, 10]} />
  <SC.Mesh
    position={position.toArray()}
    geometry={new THREE.SphereGeometry(1)}
  />
</SC.Canvas>
<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/minimal/%2Bpage.svelte"
/>
<svelte:head>
  <title>Minimal</title>
  <meta name="description" content="The usage example from the Readme" />
</svelte:head>
