<script lang="ts">
  import { Particle } from "cannon-es";
  import type { Snippet } from "svelte";
  import Shape from "../Shape.svelte";
  import type { Vec3Like } from "../../types";

  type Props = {
    offset?: Vec3Like;
    children?: Snippet;
  };
  let { offset, children }: Props = $props();

  const shape = new Particle();
</script>

<Shape {shape} {offset}>
  {@render children?.()}
</Shape>
