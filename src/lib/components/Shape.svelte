<script lang="ts">
  import type { Shape, Body, Material } from "cannon-es";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { getCannonContext, setCannonContext } from "../context-fns";
  import { toVec3, toQuaternion } from "../conversion-fns";
  import type { Vec3Like, QuaternionLike } from "../types";

  export let shape: Shape;
  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;
  export let material: Material | undefined = undefined;

  const context = getCannonContext();

  const { body } = context as { body: Body };
  if (!body) {
    throw new Error("Missing body, shape not nested inside <Body>");
  }
  const store = writable(shape);
  setCannonContext({ ...context, shape: store });
  $: syncMaterial(material);
  $: sync(shape, offset, orientation);
  $: store.set(shape);

  let prevMaterial: Material | undefined;
  function syncMaterial(_material: Material | undefined) {
    if (prevMaterial !== _material) {
      shape.material = _material ?? null;
    }
    prevMaterial = _material;
  }

  let prevShape: Shape | undefined;
  function sync(
    _shape: Shape,
    _offset?: Vec3Like,
    _orientation?: QuaternionLike,
  ) {
    if (prevShape) {
      body.removeShape(prevShape);
    }
    body.addShape(_shape, toVec3(_offset), toQuaternion(_orientation));
    prevShape = _shape;
  }

  onDestroy(() => {
    body.removeShape(shape);
  });
</script>

<slot />
