<script lang="ts">
  /**
   * https://pmndrs.github.io/cannon-es/docs/classes/Body.html
   */
  import { Body, Vec3, Quaternion } from "cannon-es";
  import type { BodyType, BodySleepState, Material } from "cannon-es";
  import { onMount, untrack } from "svelte";
  import type { Snippet } from "svelte";
  import { getCannonContext, setCannonContext } from "../context-fns";
  import type { QuaternionLike, Vec3Like } from "../types";
  import { onPostStep, listenTo } from "../lifecycle-fns";
  import { toVec3, toQuaternion, quaternionToEuler } from "../conversion-fns";
  import { syncVec3, syncId, syncQuaternion } from "../sync-fns";
  import Vec3State from "#lib/Vec3State.svelte.ts";

  type Props = {
    body?: Body;
    id?: string;
    collisionFilterGroup?: number;
    collisionFilterMask?: number;
    collisionResponse?: boolean;
    position?: Vec3Like;
    velocity?: Vec3Like;
    mass?: number;
    material?: Material | null;
    linearDamping?: number;
    type?: BodyType;
    allowSleep?: boolean;
    sleepSpeedLimit?: number;
    sleepTimeLimit?: number;
    rotation?: Vec3Like; // Euler
    quaternion?: QuaternionLike;
    angularVelocity?: Vec3Like;
    fixedRotation?: boolean;
    angularDamping?: number;
    linearFactor?: Vec3Like;
    angularFactor?: Vec3Like;
    isTrigger?: boolean;
    sleepState?: BodySleepState;
    children?: Snippet;
    onwakeup?: (event: any) => void;
    onsleepy?: (event: any) => void;
    onsleep?: (event: any) => void;
    oncollide?: (event: any) => void;
  };
  let {
    // eslint-disable-next-line no-useless-assignment
    body: bodyProp = $bindable(),
    id = undefined,
    collisionFilterGroup = 1,
    collisionFilterMask = -1,
    collisionResponse = true,
    position = $bindable(),
    velocity = $bindable(),
    mass = 0,
    material = null,
    linearDamping = 0.01,
    type = mass <= 0.0 ? Body.STATIC : Body.DYNAMIC,
    allowSleep = true,
    sleepSpeedLimit = 0.1,
    sleepTimeLimit = 1,
    rotation = $bindable(), // Euler
    quaternion = undefined,
    angularVelocity = undefined,
    fixedRotation = false,
    angularDamping = 0.01,
    linearFactor = undefined,
    angularFactor = undefined,
    isTrigger = false,
    sleepState = undefined,
    children = undefined,
    onwakeup = undefined,
    onsleepy = undefined,
    onsleep = undefined,
    oncollide = undefined,
  }: Props = $props();

  const body = untrack(
    () =>
      new Body({
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
      }),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-useless-assignment
  bodyProp = body;

  const context = getCannonContext();
  setCannonContext({ ...context, body });

  $effect(() => {
    syncId(context, body, id);
  });

  $effect.pre(() => {
    if (position instanceof Vec3State) {
      position._toPhysics(body.position);
    } else {
      syncVec3(body.position, position);
    }
  });
  $effect(() => {
    if (velocity instanceof Vec3State) {
      velocity._toPhysics(body.velocity);
    } else {
      syncVec3(body.velocity, velocity);
    }
  });
  $effect(() => {
    body.collisionFilterGroup = collisionFilterGroup;
    body.collisionFilterMask = collisionFilterMask;
    body.collisionResponse = collisionResponse;
  });
  $effect(() => {
    body.material = material;
  });
  $effect(() => {
    body.mass = mass;
    body.linearDamping = linearDamping;
  });
  $effect(() => {
    if (type) {
      body.type = type;
    }
  });
  $effect(() => {
    body.allowSleep = allowSleep;
    body.sleepSpeedLimit = sleepSpeedLimit;
    body.sleepTimeLimit = sleepTimeLimit;
  });
  const skipRotationRef = { skip: false, euler: new Vec3() };
  $effect(() => {
    if (rotation instanceof Vec3State) {
      rotation._toPhysics({
        set: (x, y, z) => body.quaternion.setFromEuler(x, y, z, "XYZ"),
      });
    } else {
      syncQuaternion(body.quaternion, rotation, skipRotationRef);
    }
  });
  $effect(() => {
    syncQuaternion(body.quaternion, quaternion);
  });
  $effect(() => {
    syncVec3(body.angularVelocity, angularVelocity);
  });
  $effect(() => {
    body.fixedRotation = fixedRotation;
  });
  $effect(() => {
    body.angularDamping = angularDamping;
  });
  $effect(() => {
    syncVec3(body.linearFactor, linearFactor);
  });
  $effect(() => {
    syncVec3(body.angularFactor, angularFactor);
  });
  $effect(() => {
    body.isTrigger = isTrigger;
  });
  $effect(() => {
    if (sleepState !== undefined && sleepState !== body.sleepState) {
      if (sleepState === Body.AWAKE) {
        body.wakeUp();
      }
      if (sleepState === Body.SLEEPING) {
        body.sleep();
      }
    }
  });

  $effect(() => listenTo(body, "wakeup", onwakeup));
  $effect(() => listenTo(body, "sleepy", onsleepy));
  $effect(() => listenTo(body, "sleep", onsleep));
  $effect(() => listenTo(body, "collide", oncollide));

  function sync() {
    if (position instanceof Vec3State) {
      position._fromPhysics(body.position);
    } else if (position instanceof Vec3) {
      position = body.position;
    }
    if (velocity instanceof Vec3State) {
      velocity._fromPhysics(body.velocity);
    } else if (velocity instanceof Vec3) {
      velocity = body.velocity;
    }
    if (quaternion instanceof Quaternion) {
      quaternion = body.quaternion;
    } else if (rotation instanceof Vec3State) {
      quaternionToEuler(body.quaternion, skipRotationRef.euler);
      skipRotationRef.skip = true;
      rotation._fromPhysics(skipRotationRef.euler);
    } else if (rotation instanceof Vec3) {
      quaternionToEuler(body.quaternion, skipRotationRef.euler);
      skipRotationRef.skip = true;
      rotation = skipRotationRef.euler;
    }
    if (angularVelocity instanceof Vec3State) {
      angularVelocity._fromPhysics(body.angularVelocity);
    } else if (angularVelocity instanceof Vec3) {
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
        if (context.idToBody.get(id) === body) {
          context.idToBody.delete(id);
        }
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

{@render children?.()}
