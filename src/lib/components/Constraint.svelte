<script lang="ts">
  /**
   * https://pmndrs.github.io/cannon-es/docs/classes/Constraint.html
   */
  import type { Constraint } from "cannon-es";
  import { getCannonContext } from "../context-fns";

  type Props = {
    constraint?: Constraint;
    constraints?: Constraint[];
  };
  let { constraint = undefined, constraints = [] }: Props = $props();

  const ctx = getCannonContext();

  let previous: Constraint[] = [];

  $effect(() => {
    const next = constraint ? [constraint, ...constraints] : constraints;
    previous.forEach((c) => ctx.world.removeConstraint(c));
    next.forEach((c) => ctx.world.addConstraint(c));
    previous = [...next];
    return () => {
      previous.forEach((c) => ctx.world.removeConstraint(c));
    };
  });
</script>
