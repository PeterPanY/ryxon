<template>
  <div class="demo-watermark-wrapper">
    <r-watermark :width="150" :full-page="false">
      <template #content>
        <div
          style="background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%)"
        >
          <p style="mix-blend-mode: difference; color: #fff">Ryxon watermark</p>
        </div>
      </template>
    </r-watermark>
  </div>
</template>

<style lang="scss" scoped>
.demo-watermark-wrapper {
  position: relative;
  height: 150px;
  background-color: var(--r-background-2);
  padding: var(--r-padding-md);
}
</style>
