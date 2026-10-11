# Migrating from `writableVec3` to `Vec3State`

`writableVec3` (a Svelte 4-style store wrapper around a `cannon-es` `Vec3`) is
deprecated in favor of the `Vec3State` class, which uses Svelte 5 fine-grained reactivity.

## Example

Before:

```svelte
<script lang="ts">
  import { PE } from "#lib";

  const position = PE.writableVec3(1, 2, 3);
</script>

<PE.Body bind:position={$position} />
```

After:

```svelte
<script lang="ts">
  import { PE } from "#lib";

  const position = new PE.Vec3State(1, 2, 3);
</script>

<PE.Body {position} />
```

## No bind needed

Body will update the x, y, z values inside the Vec3State, which a are reactive $state runes.
