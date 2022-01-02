<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  const distance = 20;
  const boxPosition = PE.writableVec3(0, 5, 0);
  const boxRotation = PE.writableVec3();

  let boxVelocityY = 0;
  let ballPosition = new CANNON.Vec3(2, 2, 0);
  let ballVelocity = CANNON.Vec3.ZERO;

  let color = 0x999999;
  let visible = false;

  function onClick() {
    visible = true;
    ballPosition.set(0.55, 3, 0);
    ballVelocity = CANNON.Vec3.ZERO;
  }

  function onCollide() {
    color = 0x5555ff;
  }
  function onSleep() {
    color = 0x555555;
  }
  function onWakeUp() {
    color = 0x999999;
  }

  setTimeout(() => {
    boxVelocityY = 5;
    color = 0xff5555;
  }, 2000);
</script>

<SC.Canvas
  fog={new THREE.Fog(0x000000, 500, 1000)}
  shadows={THREE.PCFSoftShadowMap}
  outputEncoding={THREE.sRGBEncoding}
  antialias
>
  <PE.World gravity={[0, -9.81, 0]} allowSleep>
    <!-- Ground -->
    <PE.Body rotation={[-Math.PI / 2, 0, 0]}>
      <PE.Plane />
    </PE.Body>
    <SC.Mesh
      geometry={new THREE.PlaneBufferGeometry(100, 100, 1, 1)}
      rotation={[-Math.PI / 2, 0, 0]}
      material={new THREE.MeshLambertMaterial({ color: 0x777777 })}
      receiveShadow
    />

    <!-- Cube -->
    <PE.Body
      mass={5}
      bind:position={$boxPosition}
      bind:rotation={$boxRotation}
      velocity={[0, boxVelocityY, 0]}
      on:collide={onCollide}
      on:sleep={onSleep}
      on:wakeup={onWakeUp}
    >
      <PE.Box size={[0.5, 0.5, 0.5]} />
    </PE.Body>
    <SC.Mesh
      position={$boxPosition.toArray()}
      rotation={$boxRotation.toArray()}
      geometry={new THREE.BoxGeometry()}
      material={new THREE.MeshPhongMaterial({ color })}
      castShadow
    />

    {#if visible}
      <!-- Ball -->
      <PE.Body mass={2} bind:position={ballPosition} velocity={ballVelocity}>
        <PE.Sphere radius={0.2} />
      </PE.Body>
      <SC.Mesh
        position={ballPosition.toArray()}
        geometry={new THREE.SphereBufferGeometry(0.2, 32, 16)}
        material={new THREE.MeshLambertMaterial({ color: 0x52a4ed })}
      />
    {/if}

    <SC.PerspectiveCamera
      position={[0, 2, 10]}
      fov={30}
      near={0.5}
      far={1000}
      target={[0, 2, 0]}
    />
    <SC.AmbientLight color={0x666666} />
    <SC.DirectionalLight
      position={[-distance, distance, distance]}
      intensity={1.2}
      shadow={{
        camera: {
          left: -distance,
          right: distance,
          top: distance,
          bottom: -distance,
          far: 3 * distance,
          near: distance,
        },
        mapSize: [2048, 2048],
      }}
    />
  </PE.World>
</SC.Canvas>

<svelte:head>
  <title>Misc</title>
  <meta
    name="description"
    content="Attempt at recreating https://pmndrs.github.io/cannon-es/examples/threejs_mousepick
    But is missing the interaction https://github.com/Rich-Harris/svelte-cubed/issues/5"
  />
</svelte:head>
<svelte:body on:click={onClick} />
