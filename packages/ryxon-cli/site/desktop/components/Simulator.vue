<template>
  <div :class="['r-doc-simulator', { 'r-doc-simulator-fixed': isFixed }]">
    <iframe ref="iframe" :src="src" :style="simulatorStyle" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'RDocSimulator',

  props: {
    src: String,
  },

  data() {
    return {
      scrollTop: window.scrollY,
      windowHeight: window.innerHeight,
    };
  },

  computed: {
    isFixed() {
      return this.scrollTop > 60;
    },

    simulatorStyle() {
      const height = Math.min(640, this.windowHeight - 90);
      return {
        height: height + 'px',
      };
    },
  },

  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY;
    });
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight;
    });
  },
};
</script>

<style lang="less">
.r-doc-simulator {
  position: absolute;
  top: calc(var(--r-doc-padding) + var(--r-doc-header-top-height));
  right: var(--r-doc-padding);
  z-index: 1;
  box-sizing: border-box;
  width: var(--r-doc-simulator-width);
  min-width: var(--r-doc-simulator-width);
  overflow: hidden;
  background: var(--r-doc-background-2);
  border-radius: var(--r-doc-border-radius);

  @media (max-width: 1100px) {
    right: auto;
    left: 750px;
  }

  @media (min-width: var(--r-doc-row-max-width)) {
    right: 50%;
    margin-right: calc(var(--r-doc-row-max-width) / 2 * -1 + 24px);
  }

  &-fixed {
    position: fixed;
    top: var(--r-doc-padding);
  }

  iframe {
    display: block;
    width: 100%;
  }
}
</style>
