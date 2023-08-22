<template>
  <r-slide-bar
    class="slide-centered"
    :actions="list"
    :init-blocks="3"
    :block-width="400"
    centered
    @progress="handleProgress"
  >
    <template #default="{ title }">
      {{ title }}
    </template>
  </r-slide-bar>
</template>

<script setup>
const list = [
  { title: 'a' },
  { title: 'b' },
  { title: 'c' },
  { title: 'd' },
  { title: 'e' },
  { title: 'f' },
  { title: 'g' },
  { title: 'h' },
  { title: 'i' }
]

const handleProgress = (activeIndex) => {
  for (let index = 0; index < list.length; index++) {
    const adjoin = {
      'z-index': 8,
      opacity: 1,
      'transition-duration': '300ms'
    }

    if (activeIndex === index) {
      adjoin.transform = 'translateX(-315px) scale(1)'
      adjoin['z-index'] = 10
      list[activeIndex].style = adjoin
    } else if (activeIndex - 1 === index) {
      adjoin.transform = 'translateX(-100px) scale(0.5)'
      list[activeIndex - 1].style = adjoin
    } else if (activeIndex + 1 === index) {
      adjoin.transform = 'translateX(-540px) scale(0.5)'
      list[activeIndex + 1].style = adjoin
    } else {
      adjoin.transform = 'translateX(0px) scale(0)'
      list[index].style = adjoin
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-centered {
  --r-slide-bar-height: 324px;

  :deep(.r-slide-bar__content--centered) {
    li {
      border: 1px solid var(--r-border-color-lighter);
      border-radius: var(--r-radius-md);

      &.active {
        background: var(--r-warning-color);
      }
    }
  }
}
</style>
