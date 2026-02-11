<script lang="ts">
  /**
   * https://pmndrs.github.io/cannon-es/docs/classes/Body.html
   */
  import { Body, Vec3, Quaternion } from "cannon-es";
  import type { BodyType, BodySleepState, Material } from "cannon-es";
  import { onMount } from "svelte";
  import { getCannonContext, setCannonContext } from "../context-fns";
  import type { QuaternionLike, Vec3Like } from "../types";
  import { forwardEvents, onPostStep } from "../lifecycle-fns";
  import { toVec3, toQuaternion, quaternionToEuler } from "../conversion-fns";
  import { syncVec3, syncId, syncQuaternion } from "../sync-fns";

  export let id: string | undefined = undefined;
  export let collisionFilterGroup = 1;
  export let collisionFilterMask = -1;
  export let collisionResponse = true;
  export let position: Vec3Like | undefined = undefined;
  export let velocity: Vec3Like | undefined = undefined;
  export let mass = 0;
  export let material: Material | null = null;
  export let linearDamping = 0.01;
  export let type: BodyType = mass <= 0.0 ? Body.STATIC : Body.DYNAMIC;
  export let allowSleep = true;
  export let sleepSpeedLimit = 0.1;
  export let sleepTimeLimit = 1;
  export let rotation: Vec3Like | undefined = undefined; // Euler
  export let quaternion: QuaternionLike | undefined = undefined;
  export let angularVelocity: Vec3Like | undefined = undefined;
  export let fixedRotation = false;
  export let angularDamping = 0.01;
  export let linearFactor: Vec3Like | undefined = undefined;
  export let angularFactor: Vec3Like | undefined = undefined;
  export let isTrigger = false;
  export let sleepState: BodySleepState | undefined = undefined;

  export const body = new Body({
    collisionFilterGroup,
    collisionFilterMask,
    collisionResponse,
    position: toVec3(position),
    mass,
    velocity: toVec3(velocity),
    material: material ?? undefined,
    linearDamping,
    type,
    allowSleep,
    sleepSpeedLimit,
    sleepTimeLimit,
    quaternion: toQuaternion(rotation ?? quaternion),
    angularVelocity: toVec3(angularVelocity),
    fixedRotation,
    angularDamping,
    linearFactor: toVec3(linearFactor),
    angularFactor: toVec3(angularFactor),
    isTrigger,
  });

  const context = getCannonContext();
  setCannonContext({ ...context, body });

  $: syncId(context, body, id);
  $: body.collisionFilterGroup = collisionFilterGroup;
  $: body.collisionFilterMask = collisionFilterMask;
  $: body.collisionResponse = collisionResponse;
  $: syncVec3(body.position, position);
  $: syncVec3(body.velocity, velocity);
  $: body.material = material;
  $: body.mass = mass;
  $: body.linearDamping = linearDamping;
  $: {
    if (type) {
      body.type = type;
    }
  }
  $: body.allowSleep = allowSleep;
  $: body.sleepSpeedLimit = sleepSpeedLimit;
  $: body.sleepTimeLimit = sleepTimeLimit;
  const skipRotationRef = { skip: false, euler: new Vec3() };
  $: syncQuaternion(body.quaternion, rotation, skipRotationRef);
  $: syncQuaternion(body.quaternion, quaternion);
  $: syncVec3(body.angularVelocity, angularVelocity);
  $: body.fixedRotation = fixedRotation;
  $: body.angularDamping = angularDamping;
  $: syncVec3(body.linearFactor, linearFactor);
  $: syncVec3(body.angularFactor, angularFactor);
  $: body.isTrigger = isTrigger;
  $: if (sleepState !== undefined && sleepState !== body.sleepState) {
    if (sleepState === Body.AWAKE) {
      body.wakeUp();
    }
    if (sleepState === Body.SLEEPING) {
      body.sleep();
    }
  }

  forwardEvents(body, "wakeup", "sleepy", "sleep", "collide");
  function sync() {
    if (position instanceof Vec3) {
      position = body.position;
    }
    if (velocity instanceof Vec3) {
      velocity = body.velocity;
    }
    if (quaternion instanceof Quaternion) {
      quaternion = body.quaternion;
    } else if (rotation instanceof Vec3) {
      quaternionToEuler(body.quaternion, skipRotationRef.euler);
      skipRotationRef.skip = true;
      rotation = skipRotationRef.euler;
    }
    if (angularVelocity instanceof Vec3) {
      angularVelocity = body.angularVelocity;
    }
  }

  onMount(() => {
    context.world.addBody(body);
    if (body.type === Body.STATIC) {
      sync();
    }
    return () => {
      context.world.removeBody(body);
      if (id) {
        context.bodyToId.delete(body);
        context.idToBody.update(($idToBody) => {
          if ($idToBody[id!] === body) {
            delete $idToBody[id!];
          }
          return $idToBody;
        });
      }
    };
  });
  onPostStep(() => {
    if (sleepState !== undefined && sleepState !== body.sleepState) {
      sleepState = body.sleepState;
    }
    if (body.sleepState === Body.SLEEPING || body.type === Body.STATIC) {
      return;
    }
    sync();
  });
</script>

<slot />
