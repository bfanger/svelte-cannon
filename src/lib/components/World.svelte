<script lang="ts">
  import { World } from "cannon-es";
  import type { Broadphase, Solver } from "cannon-es";
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { setCannonContext } from "../context-fns";
  import { forwardEvents } from "../lifecycle-fns";
  import { toVec3 } from "../conversion-fns";
  import { syncVec3 } from "../sync-fns";
  import type { Vec3Like } from "../types";

  export let gravity: Vec3Like | undefined = undefined;
  export let allowSleep = false;
  export let broadphase: Broadphase | undefined = undefined;
  export let solver: Solver | undefined = undefined;
  export let quatNormalizeFast = false;
  export let quatNormalizeSkip = 0;

  export const world = new World({
    gravity: toVec3(gravity),
    allowSleep,
    broadphase,
    solver,
    quatNormalizeFast,
    quatNormalizeSkip,
  });
  const dispatch = createEventDispatcher();

  $: syncVec3(world.gravity, gravity);
  $: world.allowSleep = allowSleep;
  $: broadphase && (world.broadphase = broadphase);
  $: solver && (world.solver = solver);
  $: world.quatNormalizeFast = quatNormalizeFast;
  $: world.quatNormalizeSkip = quatNormalizeSkip;

  setCannonContext({
    world,
    bodyToId: new Map(),
    idToBody: writable({}),
  });
  setContext("cannon/world", world);

  interface $$Events {
    addBody: (e: CustomEvent) => void;
    removeBody: (e: CustomEvent) => void;
    preStep: (e: CustomEvent) => void;
    postStep: (e: CustomEvent) => void;
  }
  forwardEvents(world, "addBody", "removeBody");

  onMount(() => {
    const timeStep = 1 / 60;
    let raf: number;
    let prev: number;
    function listener() {
      const now = performance.now();
      dispatch("preStep");
      if (!prev) {
        world.step(timeStep);
      } else {
        const dt = (now - prev) / 1000;
        world.step(timeStep, dt);
      }
      dispatch("postStep");
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
