<script lang="ts">
  import { LockConstraint } from "cannon-es";
  import type { Body } from "cannon-es";
  import { bodiesByIds, getCannonContext } from "../../context-fns";
  import Constraint from "../Constraint.svelte";

  type Props = {
    for: string[];
    maxForce?: number;
  };
  let { for: targets, maxForce = 1e6 }: Props = $props();
  const ctx = getCannonContext();

  let bodies = $derived(bodiesByIds(ctx.idToBody, targets));
  let constraints = $derived.by(() => {
    if (!bodies) {
      return [];
    }
    const lockConstraints: LockConstraint[] = [];
    let previous: Body | undefined;
    for (const body of bodies) {
      if (previous) {
        lockConstraints.push(new LockConstraint(previous, body, { maxForce }));
      }
      previous = body;
    }
    return lockConstraints;
  });
</script>

<Constraint {constraints} />
