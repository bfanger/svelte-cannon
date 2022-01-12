<script lang="ts">
  import type { Shape, Body } from "cannon-es";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { getCannonContext, setCannonContext } from "../context-fns";
  import { toVec3, toQuaternion } from "../conversion-fns";
  import type { Vec3Like, QuaternionLike } from "../types";

  export let shape: Shape;
  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;

  const context = getCannonContext();

  const { body } = context as { body: Body };
  if (!body) {
    throw new Error("Missing body, shape not nested inside <Body>");
  }
  const store = writable(shape);
  setCannonContext({ ...context, shape: store }); // assume shape is not changed

  $: sync(shape, offset, orientation);
  $: store.set(shape);

  let prev: Shape | undefined;

  function sync(
    _shape: Shape,
    _offset?: Vec3Like,
    _orientation?: QuaternionLike
  ) {
    if (prev) {
      body.removeShape(prev);
    }
    body.addShape(_shape, toVec3(_offset), toQuaternion(_orientation));
    prev = _shape;
  }

  onDestroy(() => {
    body.removeShape(shape);
  });
</script>

<slot />
