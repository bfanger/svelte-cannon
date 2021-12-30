<script lang="ts">
  import { Body, Quaternion, Shape } from "cannon-es";
  import { onMount, setContext } from "svelte";
  import { getPostStepContext, getWorldContext } from "../context-fns";
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
  import pairwise from "../stores/pairwise";

  const world = getWorldContext();
  const postStep = getPostStepContext();

  export let mass = 0;
  export let position: Vec3Prop | undefined = undefined;
  export let positionPrecision = 0.0001;
  export let rotation: Vec3Prop | undefined = undefined;
  export let rotationPrecision = 0.00001;
  export let quaternion: Quaternion | undefined = undefined;
  export let shape: Shape | undefined = undefined;

  export const body = new Body({
    mass,
    position: createVec3FromProp(position),
  });
  setContext("cannon/body", body);

  $: body.mass = mass;
  $: updateVec3FromProp(body.position, position);
  $: updateFromEulerProp(body.quaternion, rotation);

  const shapeChange = pairwise((next, prev) => {
    if (next === prev) {
      if (next) {
        body.addShape(next);
      }
      return;
    }
    if (prev) {
      body.removeShape(prev);
    }
    if (next) {
      body.addShape(next);
    }
  }, shape);
  $: $shapeChange = shape;

  const positionStore = createVec3FromPropStore(body, "position", {
    postStep,
    precision: positionPrecision,
  });
  $: quaternion && body.quaternion.copy(quaternion);
  const quaternionStore = createQuaternionStore(body, "quaternion", {
    postStep,
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
