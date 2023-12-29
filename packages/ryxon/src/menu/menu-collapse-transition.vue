<template>
  <transition mode="out-in" v-bind="listeners">
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addClass, hasClass, removeClass } from '@ryxon/utils'
import { createNamespace } from '../utils'
import type { BaseTransitionProps, TransitionProps } from 'vue'

export default defineComponent({
  name: 'RMenuCollapseTransition',
  setup() {
    const [, bem] = createNamespace('menu')

    const listeners = {
      // eslint-disable-next-line no-return-assign
      onBeforeEnter: (el) => (el.style.opacity = '0.2'),
      onEnter(el, done) {
        addClass(el, `r-opacity-transition`)
        el.style.opacity = '1'
        done()
      },

      onAfterEnter(el) {
        removeClass(el, `r-opacity-transition`)
        el.style.opacity = ''
      },

      onBeforeLeave(el) {
        if (!el.dataset) {
          ;(el as any).dataset = {}
        }

        if (hasClass(el, bem('collapse'))) {
          removeClass(el, bem('collapse'))
          el.dataset.oldOverflow = el.style.overflow
          el.dataset.scrollWidth = el.clientWidth.toString()
          addClass(el, bem('collapse'))
        } else {
          addClass(el, bem('collapse'))
          el.dataset.oldOverflow = el.style.overflow
          el.dataset.scrollWidth = el.clientWidth.toString()
          removeClass(el, bem('collapse'))
        }

        el.style.width = `${el.scrollWidth}px`
        el.style.overflow = 'hidden'
      },

      onLeave(el: HTMLElement) {
        addClass(el, 'horizontal-collapse-transition')
        el.style.width = `${el.dataset.scrollWidth}px`
      }
    } as BaseTransitionProps<HTMLElement> as TransitionProps

    return {
      listeners
    }
  }
})
</script>

<style scoped></style>
