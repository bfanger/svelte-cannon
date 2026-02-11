<script lang="ts">
  // Real wolrd Inspiration: https://www.kiwico.com/us/store/dp/glowing-pendulum-project-kit/2012

  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import Fab from "../../../site/Fab.svelte";
  import { onMount } from "svelte";

  const linearDamping = 0.06;

  let jointPosition = new CANNON.Vec3(1, -0.5, 0);
  let penPosition = new CANNON.Vec3(1, -1.5, 0);
  let trailsCanvas: HTMLCanvasElement;
  let sticksCanvas: HTMLCanvasElement;
  let magnet: false | { x: number; y: number } = false;

  let onPostStep: () => void | undefined;

  function scale(value: number) {
    return value * 250 + 512;
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

      if (!magnet) {
        ctx.beginPath();
        ctx.moveTo(scale(previous.x), scale(previous.y));
        const hue = (Date.now() - start) / 8;
        ctx.strokeStyle = `hsl(${hue},100%,70%)`;
        ctx.lineTo(scale(penPosition.x), scale(penPosition.y));
        ctx.stroke();
      }
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

      if (magnet) {
        overlayCtx.beginPath();
        overlayCtx.lineWidth = 1.5;
        overlayCtx.strokeStyle = "#8f8f8f";
        overlayCtx.moveTo(scale(penPosition.x), scale(penPosition.y));
        overlayCtx.lineTo(scale(magnet.x), scale(magnet.y));
        overlayCtx.stroke();
      }
    };
  });

  function onDown(e: MouseEvent | TouchEvent) {
    magnet = eventToPoint(e);
  }
  function onUp() {
    magnet = false;
  }
  function onMove(e: MouseEvent | TouchEvent) {
    const mouseEvent = e as MouseEvent;
    const touchEvent = e as TouchEvent;
    if (mouseEvent.buttons || touchEvent.touches) {
      magnet = eventToPoint(e);
    } else {
      magnet = false;
    }
  }

  function eventToPoint(e: MouseEvent | TouchEvent) {
    const bounds = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const offset = { x: 0, y: 0 };
    const factor = { x: 1, y: 1 };
    const client = { x: 0, y: 0 };
    const mouseEvent = e as MouseEvent;
    if (mouseEvent.clientX) {
      client.x = mouseEvent.clientX;
      client.y = mouseEvent.clientY;
    } else {
      const touchEvent = e as TouchEvent;
      client.x = touchEvent.touches[0].clientX;
      client.y = touchEvent.touches[0].clientY;
    }

    if (bounds.width > bounds.height) {
      offset.x = (bounds.width - bounds.height) / 2;
      factor.x = bounds.width / bounds.height;
    } else {
      offset.y = (bounds.height - bounds.width) / 2;
      factor.y = bounds.height / bounds.width;
    }
    const relative = {
      x: ((client.x - bounds.left - offset.x) / bounds.width) * factor.x - 0.5,
      y: ((client.y - bounds.top - offset.y) / bounds.height) * factor.y - 0.5,
    };

    return {
      x: relative.x * 4,
      y: relative.y * 4,
    };
  }
</script>

<canvas bind:this={trailsCanvas} width="1024" height="1024"></canvas>
<canvas
  bind:this={sticksCanvas}
  width="1024"
  height="1024"
  class:magnet
  on:mousedown|preventDefault={onDown}
  on:mousemove={onMove}
  on:mouseup={onUp}
  on:touchstart|preventDefault={onDown}
  on:touchmove={onMove}
  on:touchend={onUp}
></canvas>
<PE.World gravity={[0, 9.81, 0]} on:postStep={onPostStep}>
  <PE.DistanceConstraint for={["anchor", "joint", "pen"]} distance={1} />
  <PE.Body id="anchor" mass={0} position={[0, -0.5, 0]} />
  <PE.Body id="joint" mass={1} {linearDamping} bind:position={jointPosition}>
    <PE.Sphere radius={0.2} />
  </PE.Body>
  <PE.Body id="pen" mass={1} {linearDamping} bind:position={penPosition}>
    <PE.Sphere radius={0.2} />
  </PE.Body>

  {#if magnet}
    <PE.Body id="magnet" mass={0} position={[magnet.x, magnet.y, 0]} />

    <PE.DistanceConstraint for={["pen", "magnet"]} distance={0} maxForce={5} />
  {/if}
</PE.World>

<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/constraints/double-pendulum/%2Bpage.svelte"
/>
<svelte:head>
  <title>Double pendulum - Simulated using cannon-es DistanceConstraint</title>
  <meta
    name="description"
    content="Double pendulum an example of the DistanceConstraint, inspired by KiwiCo Glowing Pendulum"
  />
</svelte:head>

<style>
  canvas {
    cursor: grab;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    object-fit: contain;
  }

  .magnet {
    cursor: grabbing;
  }
</style>
