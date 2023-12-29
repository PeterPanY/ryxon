import { unref } from 'vue'
import { isNumber } from '@vueuse/core'
import { buildProps } from '@ryxon/utils'
import { useTimeout } from './use-timeout'

import type { ExtractPropTypes, ToRefs } from 'vue'

export const useDelayedToggleProps = buildProps({
  showAfter: { type: Number, default: 0 }, // 出现延迟，以毫秒为单位
  hideAfter: { type: Number, default: 200 }, // 消失延迟，以毫秒为单位
  autoClose: { type: Number, default: 0 } // 自动消失，以毫秒为单位
} as const)

export type UseDelayedToggleProps = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<ExtractPropTypes<typeof useDelayedToggleProps>>

// 使用延迟切换
export const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}: UseDelayedToggleProps) => {
  const { registerTimeout } = useTimeout()

  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout()

  const onOpen = (event?: Event) => {
    registerTimeout(() => {
      open(event)

      const _autoClose = unref(autoClose)
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event)
        }, _autoClose)
      }
    }, unref(showAfter))
  }

  const onClose = (event?: Event) => {
    cancelTimeoutForAutoClose()

    registerTimeout(() => {
      close(event)
    }, unref(hideAfter))
  }

  return {
    onOpen,
    onClose
  }
}
