<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "$lib/index";
  import { writableVec3 } from "$lib/store-fns";

  const distance = 20;
  const boxPosition = writableVec3(0, 5, 0);
  const boxRotation = writableVec3(0, 0, 0);
  const boxVelocity = writableVec3();

  setTimeout(() => {
    $boxVelocity.y = 6;
  }, 2000);
</script>

<svelte:head>
  <title>Falling dice</title>
  <meta
    name="description"
    content="Declarative implementation of https://pmndrs.github.io/cannon-es/examples/threejs_mousepick"
  />
</svelte:head>
<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body mass={0} rotation={[-Math.PI / 2, 0, 0]}>
    <PE.Plane />
  </PE.Body>
  <PE.Body
    mass={5}
    position={boxPosition}
    rotation={boxRotation}
    velocity={boxVelocity}
  >
    <PE.Box size={[0.5, 0.5, 0.5]} />
  </PE.Body>
</PE.World>

<SC.Canvas
  fog={new THREE.Fog(0x000000, 500, 1000)}
  shadows={THREE.PCFSoftShadowMap}
  outputEncoding={THREE.sRGBEncoding}
  antialias
>
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
  <!-- Ground -->
  <SC.Mesh
    geometry={new THREE.PlaneBufferGeometry(100, 100, 1, 1)}
    rotation={[-Math.PI / 2, 0, 0]}
    material={new THREE.MeshLambertMaterial({ color: 0x777777 })}
    receiveShadow
  />

  <!-- Cube -->
  <SC.Mesh
    position={$boxPosition.toArray()}
    rotation={$boxRotation.toArray()}
    geometry={new THREE.BoxGeometry()}
    material={new THREE.MeshPhongMaterial({ color: 0x999999 })}
    castShadow
  />
  {#if false}
    <!-- Marker -->
    <SC.Mesh
      geometry={new THREE.SphereBufferGeometry(0.2, 8, 8)}
      material={new THREE.MeshLambertMaterial({ color: 0xff0000 })}
    />

    <!-- Movement plane -->
    <SC.Mesh
      geometry={new THREE.PlaneBufferGeometry(100, 100)}
      material={new THREE.MeshLambertMaterial({
        color: 0x777777,
        wireframe: true,
      })}
    />
  {/if}
</SC.Canvas>
