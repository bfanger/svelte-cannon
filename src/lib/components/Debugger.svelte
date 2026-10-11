<script lang="ts">
  import CannonDebugger from "cannon-es-debugger";
  import type { Body, Shape } from "cannon-es";
  import type { Color, Mesh, Scene } from "three";
  import { getCannonContext } from "../context-fns";

  type DebugEvent = {
    body: Body;
    mesh: Mesh;
    shape: Shape;
  };

  type Props = {
    scene: Scene;
    color?: string | number | Color;
    scale?: number;
    init?: (event: DebugEvent) => void;
    update?: (event: DebugEvent) => void;
  };
  let {
    scene,
    color = 0x00ff00,
    scale = 1,
    init = undefined,
    update = undefined,
  }: Props = $props();

  const ctx = getCannonContext();

  let listener: (() => void) | undefined;
  $effect(() => {
    if (listener) {
      ctx.world.removeEventListener("postStep", listener);
    }
    if (scene) {
      listener = CannonDebugger(scene, ctx.world, {
        color,
        scale,
        onInit(body, mesh, shape) {
          init?.({ body, mesh, shape });
        },
        onUpdate(body, mesh, shape) {
          update?.({ body, mesh, shape });
        },
      }).update;
      ctx.world.addEventListener("postStep", listener);
    }
    return () => {
      if (listener) {
        ctx.world.removeEventListener("postStep", listener);
      }
    };
  });
</script>
