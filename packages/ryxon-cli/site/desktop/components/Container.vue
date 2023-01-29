<template>
  <div
    class="r-doc-container r-doc-row"
    :class="{ 'r-doc-container--with-simulator': hasSimulator }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RDocContainer',

  props: {
    hasSimulator: Boolean,
  },
};
</script>

<style lang="less">
.r-doc-container {
  box-sizing: border-box;
  padding-left: var(--r-doc-nav-width);
  overflow: hidden;

  &--with-simulator {
    padding-right: calc(
      var(--r-doc-simulator-width) + var(--r-doc-padding)
    );

    @media (max-width: 1100px) {
      padding-right: calc(var(--r-doc-simulator-width) - 8px);
    }
  }
}
</style>
