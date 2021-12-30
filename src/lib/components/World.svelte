<script lang="ts">
  import { World } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { createVec3FromProp, updateVec3FromProp } from "../prop-fns";
  import { fromEvent } from "../store-fns";
  import raf from "../stores/raf";
  import type { Vec3Prop } from "../types";

  export let gravity: Vec3Prop | undefined = undefined;
  export const world = new World({ gravity: createVec3FromProp(gravity) });
  const postStep = fromEvent(world, "postStep");

  setContext("cannon/world", world);
  setContext("cannon/postStep", postStep);

  $: updateVec3FromProp(world.gravity, gravity);

  onMount(() => {
    let prev: number;
    const timeStep = 1 / 60;
    return raf.subscribe((ts) => {
      if (!prev) {
        world.step(timeStep);
      } else {
        const dt = (ts - prev) / 1000;
        world.step(timeStep, dt);
      }
      prev = ts;
    });
  });
</script>

<slot {world} />
