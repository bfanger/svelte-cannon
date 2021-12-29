<script lang="ts">
  import type { Shape } from "cannon-es";
  import { onMount } from "svelte";
  import { getBodyContext } from "../context-fns";

  export let shape: Shape;
  const body = getBodyContext();

  onMount(() => {
    body.addShape(shape);
    return () => {
      body.removeShape(shape);
    };
  });
</script>

<slot />
