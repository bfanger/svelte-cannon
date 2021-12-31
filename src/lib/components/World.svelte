<script lang="ts">
  import { World, Body } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { setCannonContext } from "../context-fns";
  import { forwardEvents } from "../lifecycle-fns";
  import { vec3FromProp, syncVec3FromProp } from "../prop-fns";
  import type { Vec3Like } from "../types";

  export let gravity: Vec3Like | undefined = undefined;
  export const world = new World({ gravity: vec3FromProp(gravity) });

  setCannonContext({
    world,
    addBody(body: Body) {
      world.addBody(body);
    },
    removeBody(body: Body) {
      world.removeBody(body);
    },
  });
  setContext("cannon/world", world);

  $: syncVec3FromProp(world.gravity, gravity);

  const timeStep = 1 / 60;
  forwardEvents(world, "addBody", "removeBody", "preStep", "postStep");

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
