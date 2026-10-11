<script lang="ts">
  import { DistanceConstraint } from "cannon-es";
  import type { Body } from "cannon-es";
  import { bodiesByIds, getCannonContext } from "../../context-fns";
  import Constraint from "../Constraint.svelte";

  type Props = {
    for: string[];
    distance?: number;
    maxForce?: number;
  };
  let { for: targets, distance, maxForce = 1e6 }: Props = $props();
  const ctx = getCannonContext();

  let bodies = $derived(bodiesByIds(ctx.idToBody, targets));
  let constraints = $derived.by(() => {
    if (!bodies) {
      return [];
    }
    const distanceConstraints: DistanceConstraint[] = [];
    let previous: Body | undefined;
    for (const body of bodies) {
      if (previous) {
        distanceConstraints.push(
          new DistanceConstraint(previous, body, distance, maxForce),
        );
      }
      previous = body;
    }
    return distanceConstraints;
  });
</script>

<Constraint {constraints} />
