<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <!-- <Example :file="path" :demo="formatPathDemos[path]" /> -->
      <div class="example-showcase">
        <component :is="formatPathDemos[path]" v-if="formatPathDemos[path]" />
      </div>

      <div class="example-divider"></div>

      <div class="op-btns">
        <span class="op-btn" @click="toggleSourceVisible()">查看源代码</span>
      </div>

      <div v-show="sourceVisible"></div>

      <Transition name="r-collapse-transition">
        <div v-show="sourceVisible" class="example-source-wrapper">
          <div class="example-source language-vue" v-html="decodedSource"></div>
        </div>
      </Transition>

      <Transition name="r-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          @click="toggleSourceVisible()"
        >
          <span>隐藏代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
const demos = import.meta.glob('../../../examples/**/*.vue', {
  eager: true,
  import: 'default'
})

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const n = 'button/basic'

const formatPathDemos = computed(() => {
  const demoObj = {}

  Object.keys(demos || {}).forEach((key) => {
    demoObj[key.replace('../../../examples/', '').replace('.vue', '')] =
      demos[key]
  })

  return demoObj
})

const sourceVisible = ref(false)

const decodedSource = computed(() => {
  return decodeURIComponent(props.source)
})
const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)

function toggleSourceVisible() {
  sourceVisible.value = !sourceVisible.value
}
</script>

<style lang="scss">
.example-showcase {
  padding: 0.8rem;
  margin: 0.5px;
  > .r-icon {
    margin-right: 16px;
    font-size: 26px;
  }
}
.example {
  border: 1px solid var(--border-color);
  border-radius: 3px;
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;
  }
  .example-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--r-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: var(--r-white);

    &:hover {
      color: var(--r-primary-color);
    }
  }
  .example-source-wrapper {
    .example-source.language-vue {
      margin: 0 !important;
      border-radius: 0;
    }
  }
}

.example-divider {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0px 0;
  border-top: 1px solid var(--border-color);
}
</style>
