<script lang="ts">
  import * as CANNON from "cannon-es";
  import * as PE from "$lib/index";
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import Fab from "../../site/Fab.svelte";

  const boxPosition = PE.writableVec3(0, 5, 0);
  const boxRotation = PE.writableVec3();

  let boxVelocityY = 0;
  let ballPosition = new CANNON.Vec3(2, 2, 0);
  let ballVelocity = CANNON.Vec3.ZERO;

  let color = 0xbababa;
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
    color = 0x2a2a2a;
  }
  function onWakeUp() {
    color = 0xbababa;
  }

  setTimeout(() => {
    boxVelocityY = 5;
    color = 0xff5555;
  }, 2000);
</script>

<PE.World gravity={[0, -9.81, 0]} allowSleep>
  <SC.Canvas
    background={new THREE.Color(0x34756)}
    fog={new THREE.FogExp2(0x34756, 0.05)}
    shadows={THREE.PCFSoftShadowMap}
    outputEncoding={THREE.sRGBEncoding}
    antialias
  >
    <!-- Ground -->
    <PE.Body rotation={[-Math.PI / 2, 0, 0]}>
      <PE.Plane />
    </PE.Body>
    <SC.Mesh
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={new THREE.PlaneBufferGeometry(100, 100, 1, 1)}
      material={new THREE.MeshLambertMaterial({ color: 0x90b5fb })}
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
        material={new THREE.MeshLambertMaterial({ color: 0xa0a0a0 })}
        castShadow
      />
    {/if}

    <SC.PerspectiveCamera
      position={[2, 2, 10]}
      fov={30}
      near={0.5}
      far={1000}
      target={[0, 1.5, 0]}
    />
    <SC.AmbientLight intensity={0.6} />
    <SC.DirectionalLight position={[-4, 8, 9]} intensity={1.2} shadow />
    <SC.OrbitControls maxPolarAngle={Math.PI / 2} target={[0, 1.5, 0]} />
  </SC.Canvas>
</PE.World>

<Fab
  href="https://github.com/bfanger/svelte-cannon/blob/main/src/routes/jumpy-box/%2Bpage.svelte"
/>

<svelte:head>
  <title>Jumpy Box</title>
  <meta
    name="description"
    content="Started with recreating https://pmndrs.github.io/cannon-es/examples/threejs_mousepick
    But made something else because of missing interaction options: https://github.com/Rich-Harris/svelte-cubed/issues/5"
  />
</svelte:head>
<svelte:body on:click={onClick} />
