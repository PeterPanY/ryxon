import {
  Text,
  Comment,
  isVNode,
  Fragment,
  PropType,
  computed,
  CSSProperties,
  createTextVNode,
  defineComponent,
  ExtractPropTypes,
  type VNode,
  type VNodeChild
} from 'vue'
import { extend, isString, definePropType } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { isNumber } from '@vueuse/core'

const [name, bem] = createNamespace('space')

export type SpaceSize = number | string
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'

export const spaceProps = {
  align: String as PropType<SpaceAlign>,
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal'
  },
  size: {
    type: [Number, String, Array] as PropType<
      number | string | [SpaceSize, SpaceSize]
    >,
    default: 8
  },
  wrap: Boolean,
  fill: Boolean,
  fillRatio: { type: Number, default: 100 },
  spacer: {
    type: definePropType<VNodeChild>([Object, String, Number, Array]),
    default: null,
    validator: (val: unknown) => isVNode(val) || isNumber(val) || isString(val)
  }
}

export type SpaceProps = ExtractPropTypes<typeof spaceProps>

function filterEmpty(children: VNode[] = []) {
  const nodes: VNode[] = []
  children.forEach((child) => {
    if (Array.isArray(child)) {
      nodes.push(...child)
    } else if (child.type === Fragment) {
      nodes.push(...filterEmpty(child.children as VNode[]))
    } else {
      nodes.push(child)
    }
  })
  return nodes.filter(
    (c) =>
      !(
        c &&
        (c.type === Comment ||
          (c.type === Fragment && c.children?.length === 0) ||
          (c.type === Text && (c.children as string).trim() === ''))
      )
  )
}

export default defineComponent({
  name,
  props: spaceProps,
  setup(props, { slots }) {
    const mergedAlign = computed(
      () => props.align ?? (props.direction === 'horizontal' ? 'center' : '')
    )

    const getMargin = (size: SpaceSize) => {
      if (typeof size === 'number') {
        return size + 'px'
      }
      return size
    }
    const getMarginStyle = (isLast: boolean): CSSProperties => {
      const style: CSSProperties = {}

      const marginRight = `${getMargin(
        Array.isArray(props.size) ? props.size[0] : props.size
      )}`
      const marginBottom = `${getMargin(
        Array.isArray(props.size) ? props.size[1] : props.size
      )}`

      const fillStyle: CSSProperties = props.fill
        ? { flexGrow: 1, minWidth: `${props.fillRatio}%` }
        : {}

      if (isLast) {
        return props.wrap ? extend({}, { marginBottom }, fillStyle) : {}
      }

      if (props.direction === 'horizontal') {
        style.marginRight = marginRight
      }
      if (props.direction === 'vertical' || props.wrap) {
        style.marginBottom = marginBottom
      }

      return extend({}, style, fillStyle)
    }

    return () => {
      const children = filterEmpty(slots.default?.())
      return (
        <div
          class={[
            bem({
              [props.direction]: props.direction,
              [`align-${mergedAlign.value}`]: mergedAlign.value,
              wrap: props.wrap,
              fill: props.fill
            })
          ]}
        >
          {children.map((c, i) => (
            <>
              <div
                key={`item-${i}`}
                class={`${name}-item`}
                style={getMarginStyle(i === children.length - 1)}
              >
                {c}
              </div>

              {props.spacer && i !== children.length - 1 && (
                <span key={i} style={getMarginStyle(false)}>
                  {isVNode(props.spacer)
                    ? props.spacer
                    : createTextVNode(props.spacer as string, 1)}
                </span>
              )}
            </>
          ))}
        </div>
      )
    }
  }
})
