<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import CannonDebugger from "cannon-es-debugger";
  import type { Color, Scene } from "three";
  import { getCannonContext } from "../context-fns";

  export let scene: Scene;
  export let color: string | number | Color = 0x00ff00;
  export let scale = 1;

  const dispatch = createEventDispatcher();

  const { world } = getCannonContext();
  let update: () => void;
  $: {
    if (update) {
      world.removeEventListener("postStep", update);
    }
    if (scene) {
      update = CannonDebugger(scene, world, {
        color,
        scale,
        onInit(body, mesh, shape) {
          dispatch("init", { body, mesh, shape });
        },
        onUpdate(body, mesh, shape) {
          dispatch("update", { body, mesh, shape });
        },
      }).update;
      world.addEventListener("postStep", update);
    }
  }
  onDestroy(() => {
    world.removeEventListener("postStep", update);
  });
</script>
