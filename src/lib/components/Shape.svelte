<script lang="ts">
  import type { Shape, Vec3, Quaternion } from "cannon-es";
  import { onMount } from "svelte";
  import { getBodyContext } from "../context-fns";

  export let shape: Shape;
  export let offset: Vec3 | undefined = undefined;
  export let orientation: Quaternion | undefined = undefined;

  const body = getBodyContext();

  onMount(() => {
    body.addShape(shape, offset, orientation);
    return () => {
      body.removeShape(shape);
    };
  });
</script>

<slot />
