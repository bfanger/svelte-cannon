<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import * as PE from "$lib/index";
</script>

<SC.Canvas>
  <PE.World gravity={[0, -9.81, 0]}>
    <SC.PerspectiveCamera position={[0, 2, 10]} />
    <PE.Body mass={1} position={[0, 5, 0]} let:position let:rotation>
      <PE.Sphere radius={1} />
      <SC.Mesh
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        geometry={new THREE.SphereGeometry(1)}
      />
    </PE.Body>
  </PE.World>
</SC.Canvas>
