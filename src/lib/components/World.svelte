<script lang="ts">
  import { World } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { vec3FromProp, syncVec3FromProp } from "../prop-fns";
  import raf from "../stores/raf";
  import type { Vec3Like } from "../types";

  export let gravity: Vec3Like | undefined = undefined;
  export const world = new World({ gravity: vec3FromProp(gravity) });

  setContext("cannon/world", world);

  $: syncVec3FromProp(world.gravity, gravity);

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

<slot />
