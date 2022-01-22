<script lang="ts">
  import { Plane, Material } from "cannon-es";
  import Shape from "../Shape.svelte";
  import type { Vec3Like, QuaternionLike } from "../../types";

  export let offset: Vec3Like | undefined = undefined;
  export let orientation: QuaternionLike | undefined = undefined;
  export let material: Material | undefined = undefined;

  const shape = new Plane();
</script>

<Shape {shape} {offset} {orientation} {material}>
  <slot />
</Shape>
