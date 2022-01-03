<script lang="ts">
  import type { Shape, Body } from "cannon-es";
  import { onMount } from "svelte";
  import { getCannonContext } from "../context-fns";
  import { toVec3, toQuaternion } from "../conversion-fns";
  import type { Vec3Like, QuaternionLike } from "../types";

  export let shape: Shape;
  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;

  const { body } = getCannonContext() as { body: Body };
  if (!body) {
    throw new Error("Missing body, shape not nested inside <Body>");
  }

  onMount(() => {
    body.addShape(shape, toVec3(offset), toQuaternion(orientation));
    return () => {
      body.removeShape(shape);
    };
  });
</script>

<slot />
