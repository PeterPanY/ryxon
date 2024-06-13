import { truthProp, unknownProp, Interceptor, numericProp } from '@ryxon/utils'
import type { PropType, CSSProperties, TeleportProps } from 'vue'

export const popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: numericProp,
  // whether to show overlay
  overlay: truthProp,
  // transition duration
  duration: numericProp,
  // teleport
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  // prevent body scroll
  lockScroll: truthProp,
  // whether to lazy render
  lazyRender: truthProp,
  // callback function before close
  beforeClose: Function as PropType<Interceptor>,
  // overlay custom style
  overlayStyle: Object as PropType<CSSProperties>,
  // overlay custom class name
  overlayClass: unknownProp,
  popperClass: unknownProp,
  popperStyle: Object as PropType<CSSProperties>,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: truthProp,
  // 关闭时销毁对话框中的元素
  destroyOnClose: Boolean
}

export type PopupSharedPropKeys = Array<keyof typeof popupSharedProps>

export const popupSharedPropKeys = Object.keys(
  popupSharedProps
) as PopupSharedPropKeys
