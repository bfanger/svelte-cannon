<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "$lib/index";
  import * as CANNON from "cannon-es";

  const distance = 20;
</script>

<svelte:head>
  <title>Dice 3D</title>
</svelte:head>

<SC.Canvas>
  <SC.PerspectiveCamera position={[0, 2, 10]} />
  <SC.OrbitControls enableZoom={false} />
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
  <PE.World gravity={new CANNON.Vec3(0, -9.81, 0)}>
    <PE.Body euler={new CANNON.Vec3(-Math.PI / 2, 0, 0)}>
      <PE.Plane />
      <SC.Mesh
        geometry={new THREE.PlaneBufferGeometry(100, 100, 1, 1)}
        rotation={[-Math.PI / 2, 0, 0]}
        material={new THREE.MeshLambertMaterial({ color: 0x777777 })}
        receiveShadow
      />
    </PE.Body>

    <PE.Body mass={5} position={new CANNON.Vec3(0, 5, 0)} let:position>
      <PE.Box size={new CANNON.Vec3(0.5, 0.5, 0.5)} />
      <SC.Mesh
        position={[position.x, position.y, position.z]}
        geometry={new THREE.BoxGeometry()}
        material={new THREE.MeshPhongMaterial({ color: 0x999999 })}
        castShadow
      />
    </PE.Body>
  </PE.World>
</SC.Canvas>
<slot />
