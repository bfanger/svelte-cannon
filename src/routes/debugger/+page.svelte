<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import Fab from "../../site/Fab.svelte";
  import DebugCanvas from "../../site/ThreeRenderer.svelte";
  import Debugger from "$lib/debugger";
  import type { Scene } from "three";

  let position = new CANNON.Vec3(0, 4, 0);
  let scene: Scene;
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body
    mass={1}
    bind:position
    angularVelocity={[0, 1, 0]}
    angularDamping={0.3}
  >
    <PE.Sphere radius={1} />
  </PE.Body>
  <PE.Body position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <PE.Plane />
  </PE.Body>
  <Debugger {scene} />
  <DebugCanvas bind:scene />
</PE.World>

<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/debugger/%2Bpage.svelte"
/>
<svelte:head>
  <title>Debugger (cannon-es-debugger)</title>
  <meta
    name="description"
    content="Example on enabling the debugger in svelte-cannon (Uses cannon-es-debugger & three.js)"
  />
</svelte:head>
