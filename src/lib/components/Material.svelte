<script lang="ts">
  import { untrack } from "svelte";
  import { Material } from "cannon-es";
  import { getCannonContext } from "../context-fns";

  type Props = {
    material?: Material;
    friction?: number;
    restitution?: number;
  };
  let {
    material = $bindable(),
    friction = -1,
    restitution = -1,
  }: Props = $props();

  material ??= untrack(() => new Material({ friction, restitution }));

  $effect(() => {
    material.friction = friction;
    material.restitution = restitution;
  });

  const ctx = getCannonContext();
  const body = ctx.body;
  if (!body) {
    throw new Error("Missing body, material not nested inside <Body>");
  }

  $effect(() => {
    const shape = ctx.shape;
    if (shape) {
      shape.material = material;
      return () => {
        shape.material = null;
      };
    }
    body.material = material;
    return () => {
      body.material = null;
    };
  });
</script>
