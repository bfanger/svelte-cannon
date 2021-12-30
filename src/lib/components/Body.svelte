<script lang="ts">
  import { Body, Quaternion } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { getStepContext, getWorldContext } from "../context-fns";
  import {
    createVec3FromPropStore,
    createQuaternionStore,
    derivedEulerStore,
  } from "../store-fns";
  import type { Vec3Prop } from "../types";
  import {
    createVec3FromProp,
    updateVec3FromProp,
    updateFromEulerProp,
  } from "../prop-fns";

  const world = getWorldContext();
  const step = getStepContext();

  export let mass = 0;
  export let position: Vec3Prop | undefined = undefined;
  export let positionPrecision = 0.001;
  export let rotation: Vec3Prop | undefined = undefined;
  export let rotationPrecision = 0.001;
  export let quaternion: Quaternion | undefined = undefined;

  const body = new Body({ mass, position: createVec3FromProp(position) });
  setContext("cannon/body", body);

  $: body.mass = mass;
  $: updateVec3FromProp(body.position, position);
  $: updateFromEulerProp(body.quaternion, rotation);

  const positionStore = createVec3FromPropStore(body, "position", {
    step,
    precision: positionPrecision,
  });
  $: quaternion && body.quaternion.copy(quaternion);
  const quaternionStore = createQuaternionStore(body, "quaternion", {
    step,
    precision: rotationPrecision,
  });
  const rotationStore = derivedEulerStore(quaternionStore);

  onMount(() => {
    world.addBody(body);
    return () => {
      world.removeBody(body);
    };
  });
</script>

<slot
  {body}
  position={$positionStore}
  rotation={$rotationStore}
  quaternion={$quaternionStore}
/>
