<script lang="ts">
  // Real wolrd Inspiration: https://www.kiwico.com/us/store/dp/glowing-pendulum-project-kit/2012

  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import Fab from "../../site/Fab.svelte";
  import { onMount } from "svelte";

  const linearDamping = 0.06;

  let jointPosition = new CANNON.Vec3(1, -0.5, 0);
  let penPosition = new CANNON.Vec3(1, -1.5, 0);
  let trailsCanvas: HTMLCanvasElement;
  let sticksCanvas: HTMLCanvasElement;
  let onPostStep: () => void | undefined;

  function scale(value: number) {
    return value * 256 + 512;
  }
  onMount(() => {
    const overlayCtx = sticksCanvas.getContext("2d");
    const ctx = trailsCanvas.getContext("2d");
    if (!ctx || !overlayCtx) {
      throw new Error("No 2D context available");
    }

    overlayCtx.lineCap = "round";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";

    const start = Date.now();
    const previous = penPosition.clone();
    onPostStep = () => {
      if (!ctx) {
        return;
      }
      // Pulsating eraser strength to prevent ghosting, but still getting long trails
      const eraserStrength =
        (Math.sin((Date.now() - start) / 10) + 1) / 15 + 0.05;
      ctx.fillStyle = `rgba(255,255,255,${eraserStrength})`;
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.beginPath();
      ctx.moveTo(scale(previous.x), scale(previous.y));
      const hue = (Date.now() - start) / 8;
      ctx.strokeStyle = `hsl(${hue},100%,70%)`;
      ctx.lineTo(scale(penPosition.x), scale(penPosition.y));
      ctx.stroke();
      previous.copy(penPosition);

      overlayCtx.clearRect(0, 0, 1024, 1024);
      overlayCtx.beginPath();
      overlayCtx.lineWidth = 8;
      overlayCtx.strokeStyle = "#ff9c26";
      overlayCtx.moveTo(scale(0), scale(-0.5));
      overlayCtx.lineTo(scale(jointPosition.x), scale(jointPosition.y));
      overlayCtx.stroke();
      overlayCtx.beginPath();
      overlayCtx.lineWidth = 12;
      overlayCtx.strokeStyle = "#ffc548";
      overlayCtx.moveTo(scale(jointPosition.x), scale(jointPosition.y));
      overlayCtx.lineTo(scale(penPosition.x), scale(penPosition.y));
      overlayCtx.stroke();
    };
  });
</script>

<canvas bind:this={trailsCanvas} width="1024" height="1024" />
<canvas bind:this={sticksCanvas} width="1024" height="1024" />
<PE.World gravity={[0, 9.81, 0]} on:postStep={onPostStep}>
  <PE.DistanceConstraint for={["anchor", "joint", "pen"]} distance={1} />
  <PE.Body id="anchor" mass={0} position={[0, -0.5, 0]} />
  <PE.Body id="joint" mass={1} {linearDamping} bind:position={jointPosition}>
    <PE.Sphere radius={0.2} />
  </PE.Body>
  <PE.Body id="pen" mass={1} {linearDamping} bind:position={penPosition}>
    <PE.Sphere radius={0.2} />
  </PE.Body>
</PE.World>

<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/constraints/double-pendulum.svelte"
/>
<svelte:head>
  <title>Double pendulum - Simulated using cannon-es DistanceContraint</title>
  <meta
    name="description"
    content="Double pendulum an example of the DistanceContraint, inspired by KiwiCo Glowing Pendulum"
  />
</svelte:head>

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
