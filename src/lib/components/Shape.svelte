<script lang="ts">
  import type { Shape, Body, Material } from "cannon-es";
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import { getCannonContext, setCannonContext } from "../context-fns";
  import { toVec3, toQuaternion } from "../conversion-fns";
  import type { Vec3Like, QuaternionLike } from "../types";

  type Props = {
    shape: Shape;
    offset?: Vec3Like;
    orientation?: QuaternionLike;
    material?: Material;
    children?: Snippet;
  };
  let {
    shape,
    offset = undefined,
    orientation = undefined,
    material = undefined,
    children = undefined,
  }: Props = $props();

  const context = getCannonContext();

  const { body } = context as { body: Body };
  if (!body) {
    throw new Error("Missing body, shape not nested inside <Body>");
  }
  setCannonContext({
    ...context,
    get shape() {
      return shape;
    },
  });
  $effect(() => {
    syncMaterial(material);
  });

  let prevMaterial: Material | undefined;
  function syncMaterial(_material: Material | undefined) {
    if (prevMaterial !== _material) {
      shape.material = _material ?? null;
    }
    prevMaterial = _material;
  }

  let prevShape: Shape | undefined;
  $effect(() => {
    if (prevShape) {
      body.removeShape(prevShape);
    }
    body.addShape(shape, toVec3(offset), toQuaternion(orientation));
    prevShape = shape;
  });

  onMount(() => {
    return () => {
      body.removeShape(shape);
    };
  });
</script>

{@render children?.()}
