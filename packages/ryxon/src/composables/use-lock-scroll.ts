import { Ref, watch, onScopeDispose } from 'vue'
import { isClient } from '@vueuse/core'
import {
  getStyle,
  hasClass,
  addClass,
  removeClass,
  getScrollBarWidth
} from '@ryxon/utils'

export function useLockScroll(
  // rootRef: HTMLElement | Ref<HTMLElement | undefined>,
  trigger: Ref<boolean>
) {
  const hiddenCls = 'r-popup-parent--hidden'

  if (!isClient || hasClass(document.body, hiddenCls)) {
    return
  }

  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyWidth = '0'

  const cleanup = () => {
    setTimeout(() => {
      removeClass(document?.body, hiddenCls)
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth
      }
    }, 200)
  }
  watch(trigger, (val) => {
    if (!val) {
      cleanup()
      return
    }

    withoutHiddenClass = !hasClass(document.body, hiddenCls)
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width
    }
    scrollBarWidth = getScrollBarWidth('r')
    const bodyHasOverflow =
      document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = getStyle(document.body, 'overflowY')
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    }
    addClass(document.body, hiddenCls)
  })

  // 当前组件的作用域被销毁时被调用
  onScopeDispose(() => cleanup())
}
