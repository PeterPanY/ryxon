<template>
  <r-popover
    v-model:visible="showPopover"
    :placement="currentPlacement"
    width="auto"
  >
    <div>啊！</div>
    <template #reference>
      <div class="demo-popover-refer" />
    </template>
  </r-popover>

  <div>
    <r-button @click="onPlacementChange('top')">top</r-button>
    <r-button @click="onPlacementChange('top-start')">top-start</r-button>
    <r-button @click="onPlacementChange('top-end')">top-end</r-button>
    <r-button @click="onPlacementChange('left')">left</r-button>
    <r-button @click="onPlacementChange('left-start')">left-start</r-button>
    <r-button @click="onPlacementChange('left-end')">left-end</r-button>
    <r-button @click="onPlacementChange('right')">right</r-button>
    <r-button @click="onPlacementChange('right-start')">right-start</r-button>
    <r-button @click="onPlacementChange('right-end')">right-end</r-button>
    <r-button @click="onPlacementChange('bottom')">bottom</r-button>
    <r-button @click="onPlacementChange('bottom-start')">bottom-start</r-button>
    <r-button @click="onPlacementChange('bottom-end')">bottom-end</r-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PopoverPlacement } from '@ryxon/components'

const currentPlacement = ref<PopoverPlacement>('top')
const showPopover = ref(false)

const onPlacementChange = (value: PopoverPlacement) => {
  setTimeout(() => {
    currentPlacement.value = value
    showPopover.value = true
  })
}
</script>

<style lang="less" scoped>
.demo-popover {
  &-refer {
    width: 60px;
    height: 60px;
    background-color: var(--r-blue);
    border-radius: 8px;
  }

  .r-popover__wrapper {
    margin-left: var(--r-padding-md);
  }

  .r-input {
    width: auto;
    margin: 0 12px;
    overflow: hidden;
    border-radius: 8px;
  }

  &-box {
    display: flex;
    justify-content: center;
    margin: 110px 0;

    .r-popover__wrapper {
      margin-left: 0;
    }
  }
}
</style>
