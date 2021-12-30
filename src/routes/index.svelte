<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "$lib/index";

  const distance = 20;
</script>

<svelte:head>
  <title>Falling dice</title>
  <meta
    name="description"
    content="Declarative implementation of https://pmndrs.github.io/cannon-es/examples/threejs_mousepick"
  />
</svelte:head>
<PE.World gravity={[0, -9.81, 0]}>
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

    <PE.Body rotation={[-Math.PI / 2, 0, 0]} let:rotation>
      <PE.Plane />
      <SC.Mesh
        geometry={new THREE.PlaneBufferGeometry(100, 100, 1, 1)}
        rotation={[rotation.x, rotation.y, rotation.z]}
        material={new THREE.MeshLambertMaterial({ color: 0x777777 })}
        receiveShadow
      />
    </PE.Body>

    <PE.Body mass={5} position={[0, 5, 0]} let:position let:rotation>
      <PE.Box size={[0.5, 0.5, 0.5]} />
      <SC.Mesh
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        geometry={new THREE.BoxGeometry()}
        material={new THREE.MeshPhongMaterial({ color: 0x999999 })}
        castShadow
      />
    </PE.Body>
  </SC.Canvas>
</PE.World>
