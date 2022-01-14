<script lang="ts">
  import { onDestroy } from "svelte";
  import { LockConstraint, Body, Constraint } from "cannon-es";
  import { derivedBodies, getCannonContext } from "../../context-fns";

  let targets: string[];
  export { targets as for };
  export let maxForce: number | undefined = undefined;

  const { world, idToBody } = getCannonContext();

  let changedTargets: string[] = targets;
  let prev = "";
  $: {
    const serialized = targets.join("\n");
    if (prev !== serialized) {
      prev = serialized;
      changedTargets = targets;
    }
  }

  $: bodies = derivedBodies(idToBody, changedTargets);
  $: $bodies && sync($bodies, { maxForce });

  onDestroy(cleanup);

  const constraints: Constraint[] = [];

  function sync(
    entries: Body[],
    // eslint-disable-next-line no-undef
    options: ConstructorParameters<typeof LockConstraint>[2]
  ) {
    cleanup();
    let previous: Body | undefined;
    for (const body of entries) {
      if (!previous) {
        previous = body;
        // eslint-disable-next-line no-continue
        continue;
      }
      const lock = new LockConstraint(previous, body, options);
      constraints.push(lock);
      world.addConstraint(lock);
      previous = body;
    }
  }

  function cleanup() {
    constraints.forEach((constraint) => {
      world.removeConstraint(constraint);
    });
    constraints.length = 0;
  }
</script>
