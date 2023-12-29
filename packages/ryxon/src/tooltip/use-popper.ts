import { computed, onBeforeUnmount, shallowRef, unref } from 'vue'
import { createPopper } from '@popperjs/core'
import { isUndefined } from '@ryxon/utils'
import type { Ref } from 'vue'
import type {
  Options,
  Modifier,
  Instance,
  VirtualElement
} from '@popperjs/core'
import type { TooltipProps } from '../tooltip'

type ElementType = HTMLElement | undefined
type ReferenceElement = ElementType | VirtualElement
export type PartialOptions = Partial<Options>

function genModifiers(options: TooltipProps) {
  const { offset, gpuAcceleration, fallbackPlacements } = options
  return [
    {
      name: 'offset',
      options: {
        offset
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: 'computeStyles',
      options: {
        // adaptive: false,
        gpuAcceleration
      }
    }
  ]
}

function deriveExtraModifiers(
  options: any,
  modifiers: TooltipProps['popperOptions']['modifiers']
) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...(modifiers ?? [])]
  }
}

export const eventListenerModifier = computed(() => {
  return (visible: boolean) => {
    return {
      name: 'eventListeners',
      enabled: visible
    } as Modifier<'eventListeners', any>
  }
})

const DEFAULT_ARROW_OFFSET = 0
export const arrowModifier = computed(() => {
  return (arrowRef: any, arrowOffset: number) => {
    const arrowEl = unref(arrowRef)
    const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET
    // 修饰符类型似乎需要“phase”和“fn”，但在其文件中，他们没有具体说明。
    // Refer to https://popper.js.org/docs/v2/modifiers/arrow/
    return {
      name: 'arrow',
      enabled: !isUndefined(arrowEl),
      options: {
        element: arrowEl,
        padding: offset
      }
    } as any
  }
})

// 获取Tooltip的配置信息
export const buildPopperOptions = (
  props: TooltipProps,
  modifiers: Modifier<any, any>[] = []
) => {
  const { placement, strategy, popperOptions } = props
  const options = {
    placement,
    strategy,
    // eslint-disable-next-line no-restricted-syntax
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers]
  }

  deriveExtraModifiers(options, popperOptions?.modifiers)
  return options
}

export const usePopper = () => {
  const instanceRef = shallowRef<Instance | undefined>()

  const destroy = () => {
    if (!instanceRef.value) return

    instanceRef.value.destroy()
    instanceRef.value = undefined
  }

  // 创建Popper实例
  const createPopperInstance = (
    wrapperRef: Ref<ReferenceElement>,
    contentRef: Ref<ElementType>,
    options: Options
  ) => {
    destroy()

    if (wrapperRef.value && contentRef.value) {
      instanceRef.value = createPopper(
        wrapperRef.value,
        contentRef.value,
        options
      )

      return instanceRef.value
    }
    return null
  }

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    update: () => unref(instanceRef)?.update(),
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    instanceRef: computed(() => unref(instanceRef)),
    createPopperInstance
  }
}
