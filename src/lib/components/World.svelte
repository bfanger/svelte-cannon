<script lang="ts">
  import { World } from "cannon-es";
  import type { Body, Broadphase, Solver } from "cannon-es";
  import { onMount, setContext, untrack } from "svelte";
  import { setCannonContext } from "../context-fns";
  import { listenTo } from "../lifecycle-fns";
  import { toVec3 } from "../conversion-fns";
  import { syncVec3 } from "../sync-fns";
  import type { Vec3Like } from "../types";
  import type { Snippet } from "svelte";
  import { SvelteMap } from "svelte/reactivity";

  type Props = {
    gravity?: Vec3Like;
    allowSleep?: boolean;
    broadphase?: Broadphase;
    solver?: Solver;
    quatNormalizeFast?: boolean;
    quatNormalizeSkip?: number;
    preStep?: () => void;
    postStep?: () => void;
    bodyAdded?: (event: { body: Body | null }) => void;
    bodyRemoved?: (event: { body: Body | null }) => void;
    children?: Snippet;
  };
  let {
    gravity = undefined,
    allowSleep = false,
    broadphase = undefined,
    solver = undefined,
    quatNormalizeFast = false,
    quatNormalizeSkip = 0,
    preStep = undefined,
    postStep = undefined,
    bodyAdded: addBody = undefined,
    bodyRemoved: removeBody = undefined,
    children = undefined,
  }: Props = $props();

  export const world = untrack(
    () =>
      new World({
        gravity: toVec3(gravity),
        allowSleep,
        broadphase,
        solver,
        quatNormalizeFast,
        quatNormalizeSkip,
      }),
  );
  $effect(() => {
    syncVec3(world.gravity, gravity);
  });
  $effect(() => {
    world.allowSleep = allowSleep;
    if (broadphase) {
      world.broadphase = broadphase;
    }
    if (solver) {
      world.solver = solver;
    }
    world.quatNormalizeFast = quatNormalizeFast;
    world.quatNormalizeSkip = quatNormalizeSkip;
  });

  setCannonContext({
    world,
    bodyToId: new Map(),
    idToBody: new SvelteMap<string, Body>(),
  });
  setContext("cannon/world", world);

  $effect(() => {
    return listenTo(world, "addBody", addBody);
  });
  $effect(() => {
    return listenTo(world, "removeBody", removeBody);
  });

  onMount(() => {
    const timeStep = 1 / 60;
    let raf: number;
    let prev: number;
    function listener() {
      const now = performance.now();
      preStep?.();
      if (!prev) {
        world.step(timeStep);
      } else {
        const dt = (now - prev) / 1000;
        world.step(timeStep, dt);
      }
      postStep?.();
      prev = now;
      raf = requestAnimationFrame(listener);
    }
    raf = requestAnimationFrame(listener);

    return () => {
      cancelAnimationFrame(raf);
    };
  });
</script>

{@render children?.()}
