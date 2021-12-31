<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "$lib/index"; // PE is short for Physics Engine

  const position = PE.writableVec3(0, 4, 0);
</script>

<PE.World gravity={[0, -9.81, 0]}>
  <PE.Body mass={1} {position}>
    <PE.Sphere radius={1} />
  </PE.Body>
</PE.World>

<SC.Canvas>
  <SC.PerspectiveCamera position={[0, 2, 10]} />
  <SC.Mesh
    position={$position.toArray()}
    geometry={new THREE.SphereGeometry(1)}
  />
</SC.Canvas>
