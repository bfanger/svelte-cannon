<script lang="ts">
  import { Body, Shape, Vec3 } from "cannon-es";
  import { onMount, setContext, tick } from "svelte";
  import { getWorldContext } from "../context-fns";
  import type { Vec3Like } from "../types";
  import {
    vec3FromProp,
    syncVec3FromProp,
    quaternionEulerProp,
    syncQuaternionEulerProp,
    isWritable,
  } from "../prop-fns";
  import pairwise from "../stores/pairwise";
  import type { Writable } from "svelte/store";

  const world = getWorldContext();

  export let mass: number | undefined = undefined;
  export let position: Writable<Vec3> | Vec3Like | undefined = undefined;
  export let positionPrecision = 0.0001;
  export let rotation: Writable<Vec3> | Vec3Like | undefined = undefined;
  export let rotationPrecision = 0.0001;
  export let shape: Shape | undefined = undefined;

  export const body = new Body({
    mass,
    position: vec3FromProp(position),
    quaternion: quaternionEulerProp(rotation),
  });
  setContext("cannon/body", body);

  $: if (typeof mass !== "undefined") {
    body.mass = mass;
  }
  $: positionStore = isWritable(position) ? position : undefined;
  $: syncVec3FromProp(body.position, position);
  $: syncStore(body.position, positionStore);
  $: rotationStore = isWritable(rotation) ? rotation : undefined;
  $: syncQuaternionEulerProp(body.quaternion, rotation);

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

  let updating = true;
  const subscriptions = new Map<any, () => void>();
  function syncStore<T extends { copy(v: T): T }>(
    target: T,
    store: Writable<T> | undefined
  ) {
    const unsub = subscriptions.get(target);
    if (unsub) {
      unsub();
      subscriptions.delete(target);
    }
    if (store) {
      subscriptions.set(
        target,
        store.subscribe((value) => {
          if (updating || !value) {
            return;
          }
          target.copy(value);
        })
      );
    }
  }

  const euler = new Vec3();
  function onPostStep() {
    updating = true;
    if (
      positionStore &&
      $positionStore?.almostEquals(body.position, positionPrecision) === false
    ) {
      positionStore.set($positionStore.copy(body.position));
    }
    if (rotationStore && $rotationStore) {
      body.quaternion.toEuler(euler, "YZX");
      if ($rotationStore.almostEquals(euler, rotationPrecision) === false) {
        rotationStore.set($rotationStore.copy(euler));
      }
    }
    tick().then(() => {
      updating = false;
    });
  }

  onMount(() => {
    world.addBody(body);
    world.addEventListener("postStep", onPostStep);
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      world.removeEventListener("postStep", onPostStep);
      world.removeBody(body);
    };
  });
</script>

<slot />
