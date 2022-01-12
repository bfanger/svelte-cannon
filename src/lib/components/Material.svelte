<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { Material } from "cannon-es";
  import { getCannonContext } from "../context-fns";

  export let friction = -1;
  export let restitution = -1;

  export const material = new Material({ friction, restitution });

  const { body, shape } = getCannonContext();
  if (!body) {
    throw new Error("Missing body, material not nested inside <Body>");
  }

  if (shape) {
    onMount(() => {
      shape.subscribe(($shape) => {
        // eslint-disable-next-line no-param-reassign
        $shape.material = material;
      });
      return () => {
        const $shape = get(shape);
        $shape.material = null;
      };
    });
  } else {
    onMount(() => {
      body.material = material;
      return () => {
        body.material = null;
      };
    });
  }
</script>
