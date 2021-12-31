<script lang="ts">
  import type { Shape, Vec3, Quaternion, Body } from "cannon-es";
  import { onMount } from "svelte";
  import { getCannonContext } from "../context-fns";

  export let shape: Shape;
  export let offset: Vec3 | undefined = undefined;
  export let orientation: Quaternion | undefined = undefined;

  const { body } = getCannonContext() as { body: Body };
  if (!body) {
    throw new Error("Missing body , not nested inside <Body>");
  }

  onMount(() => {
    body.addShape(shape, offset, orientation);
    return () => {
      body.removeShape(shape);
    };
  });
</script>

<slot />
