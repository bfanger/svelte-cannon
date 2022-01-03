<script lang="ts">
  export let href: string;
</script>

<a class="fab" {href} title="View source">view source code</a>

<style lang="scss">
  .fab {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    background: white url(/source.svg) 50% 50% no-repeat;
    background-size: 50% 50%;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    text-indent: -9999px;
    opacity: 0.3;
    transition: opacity 0.4s;
    &:hover {
      opacity: 1;
    }
  }
</style>
