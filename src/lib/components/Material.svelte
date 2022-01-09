<script lang="ts">
  import { onMount } from "svelte";
  import { Material } from "cannon-es";
  import { getCannonContext } from "../context-fns";

  export let friction = -1;
  export let restitution = -1;

  export const material = new Material({ friction, restitution });

  const { body, shape } = getCannonContext();
  if (!body) {
    throw new Error("Missing body, material not nested inside <Body>");
  }

  onMount(() => {
    const target = shape || body;
    target.material = material;
    return () => {
      if (target.material === material) {
        target.material = null;
      }
    };
  });
</script>
