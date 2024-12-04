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
        <span ref="sourceCodeRef" class="op-btn" @click="toggleSourceVisible()"
          >查看源代码</span
        >
      </div>

      <Transition name="r-collapse-transition">
        <div v-show="sourceVisible" class="example-source-wrapper">
          <div class="example-source language-vue" v-html="decodedSource"></div>
        </div>
      </Transition>

      <Transition name="r-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <span>隐藏代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useToggle } from '@vueuse/core'

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

const formatPathDemos = computed(() => {
  const demoObj = {}

  Object.keys(demos || {}).forEach((key) => {
    demoObj[key.replace('../../../examples/', '').replace('.vue', '')] =
      demos[key]
  })

  return demoObj
})

const decodedSource = computed(() => {
  return decodeURIComponent(props.source)
})
const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)

const [sourceVisible, toggleSourceVisible] = useToggle()
const sourceCodeRef = ref<HTMLButtonElement>()

const onSourceVisibleKeydown = (e: KeyboardEvent) => {
  if (['Enter', 'NumpadEnter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
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
