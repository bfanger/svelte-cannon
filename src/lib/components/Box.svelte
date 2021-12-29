<script lang="ts">
  import { createVec3FromProp, updateVec3FromProp } from "$lib/prop-fns";

  import type { Vec3Prop } from "$lib/types";

  import { Box } from "cannon-es";
  import Shape from "./Shape.svelte";

  export let size: Vec3Prop;
  const shape = new Box(createVec3FromProp(size));

  $: updateVec3FromProp(shape.halfExtents, size);
</script>

<Shape {shape}>
  <slot />
</Shape>
