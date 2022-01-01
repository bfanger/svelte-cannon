<script lang="ts">
  import { World } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { setCannonContext } from "../context-fns";
  import { forwardEvents } from "../lifecycle-fns";
  import { vec3FromProp, syncVec3FromProp } from "../prop-fns";
  import type { Vec3Like } from "../types";

  export let gravity: Vec3Like | undefined = undefined;
  export let allowSleep = false;

  export const world = new World({
    gravity: vec3FromProp(gravity),
    allowSleep,
  });

  $: syncVec3FromProp(world.gravity, gravity);

  setCannonContext({
    world,
  });
  setContext("cannon/world", world);

  const timeStep = 1 / 60;
  forwardEvents(world, "preStep", "postStep", "addBody", "removeBody");
  interface $$Events {
    preStep: (e: CustomEvent) => void;
    postStep: (e: CustomEvent) => void;
    addBody: (e: CustomEvent) => void;
    removeBody: (e: CustomEvent) => void;
  }

  onMount(() => {
    let raf: number;
    let prev: number;
    function listener() {
      const now = performance.now();
      if (!prev) {
        world.step(timeStep);
      } else {
        const dt = (now - prev) / 1000;
        world.step(timeStep, dt);
      }
      prev = now;
      raf = requestAnimationFrame(listener);
    }
    raf = requestAnimationFrame(listener);

    return () => {
      cancelAnimationFrame(raf);
    };
  });
</script>

<slot />
