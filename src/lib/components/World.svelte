<script lang="ts">
  import { World, Vec3 } from "cannon-es";
  import { setContext } from "svelte";
  import { derived } from "svelte/store";
  import raf from "../stores/raf";

  export let gravity = new Vec3();

  const world = new World({ gravity });
  $: world.gravity.copy(gravity);

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
