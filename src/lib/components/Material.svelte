<script lang="ts">
  import { onMount } from "svelte";
  import { Material, Body } from "cannon-es";
  import { getCannonContext } from "../context-fns";

  export let friction = -1;
  export let restitution = -1;

  export const material = new Material({ friction, restitution });

  const { body } = getCannonContext() as { body: Body };
  if (!body) {
    throw new Error("Missing body, material not nested inside <Body>");
  }

  onMount(() => {
    body.material = material;
    return () => {
      if (body.material === material) {
        body.material = null;
      }
    };
  });
</script>
