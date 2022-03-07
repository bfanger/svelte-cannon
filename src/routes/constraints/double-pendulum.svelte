<script lang="ts">
  // https://www.kiwico.com/us/store/dp/glowing-pendulum-project-kit/2012
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import Fab from "../../site/Fab.svelte";
  import DebugCanvas from "../../site/ThreeRenderer.svelte";
  import Debugger from "$lib/debugger";
  import type { Scene } from "three";

  let firstPosition = new CANNON.Vec3(1, 1, 0);
  let secondPosition = new CANNON.Vec3(1, 2, 0);
  let scene: Scene;
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.DistanceConstraint for={["anchor", "first", "second"]} distance={1} />
  <PE.Body id="anchor" mass={0} position={[0, 1, 0]} />
  <PE.Body
    id="first"
    mass={1}
    linearDamping={0.08}
    bind:position={firstPosition}
  >
    <PE.Sphere radius={0.2} />
  </PE.Body>
  <PE.Body
    id="second"
    mass={1}
    linearDamping={0.08}
    bind:position={secondPosition}
  >
    <PE.Sphere radius={0.2} />
  </PE.Body>
  <Debugger {scene} />
  <DebugCanvas bind:scene />
</PE.World>

<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/debugger.svelte"
/>
<svelte:head>
  <title>Double pendulum - cannon-es DistanceContraint</title>
  <meta
    name="description"
    content="Double pendulum an example of the DistanceContraint, inspired by KiwiCo Glowing Pendulum"
  />
</svelte:head>
