<script lang="ts">
  import * as PE from "#lib";
  import Fab from "../../site/Fab.svelte";
  import ThreeRenderer from "../../site/ThreeRenderer.svelte";
  import Debugger from "#lib/debugger.js";
  import type { Scene } from "three";

  const position = new PE.Vec3State(0, 4, 0);
  let scene = $state<Scene>()!;
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body mass={1} {position} angularVelocity={[0, 1, 0]} angularDamping={0.3}>
    <PE.Sphere radius={1} />
  </PE.Body>
  <PE.Body position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <PE.Plane />
  </PE.Body>
  <Debugger {scene} />
  <ThreeRenderer bind:scene />
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
