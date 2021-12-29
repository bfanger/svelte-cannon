<script lang="ts">
  import { Box } from "cannon-es";
  import type { Vec3 } from "math/Vec3";
  import Shape from "./Shape.svelte";

  export let size: Vec3;
  const shape = new Box(size);

  $: shape.halfExtents.copy(size);
</script>

<Shape {shape}>
  <slot />
</Shape>
