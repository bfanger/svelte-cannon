<script lang="ts">
  import { World } from "cannon-es";
  import { setContext } from "svelte";
  import { derived } from "svelte/store";
  import { createVec3FromProp, updateVec3FromProp } from "../prop-fns";
  import raf from "../stores/raf";
  import type { Vec3Prop } from "../types";

  export let gravity: Vec3Prop | undefined = undefined;

  const world = new World({ gravity: createVec3FromProp(gravity) });
  $: updateVec3FromProp(world.gravity, gravity);

  let prev: number;
  const timeStep = 1 / 60;
  const step = derived(raf, (ts) => {
    if (!prev) {
      world.step(timeStep);
    } else {
      const dt = (ts - prev) / 1000;
      world.step(timeStep, dt);
    }
    prev = ts;

    return ts;
  });

  setContext("cannon/world", world);
  setContext("cannon/step", step);
</script>

<slot {world} />
