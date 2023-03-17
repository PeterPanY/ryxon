import { computed, defineComponent, type ExtractPropTypes } from 'vue'
import {
  mutable,
  isObject,
  numericProp,
  createNamespace,
  makeStringProp,
  definePropType
} from '../utils'
import { useParent } from '@ryxon/use'
import { ROW_KEY } from '../row/Row'

const [name, bem] = createNamespace('col')

export type ColSizeObject = {
  span?: number | string
  offset?: number | string
  pull?: number | string
  push?: number | string
}

export type ColSize = string | number | ColSizeObject

export const colProps = {
  tag: makeStringProp<keyof HTMLElementTagNameMap>('div'),
  span: numericProp,
  offset: numericProp,
  pull: numericProp,
  push: numericProp,
  xs: {
    type: definePropType<ColSize>([String, Number, Object]),
    default: () => mutable({} as const)
  },
  sm: {
    type: definePropType<ColSize>([String, Number, Object]),
    default: () => mutable({} as const)
  },
  md: {
    type: definePropType<ColSize>([String, Number, Object]),
    default: () => mutable({} as const)
  },
  lg: {
    type: definePropType<ColSize>([String, Number, Object]),
    default: () => mutable({} as const)
  },
  xl: {
    type: definePropType<ColSize>([String, Number, Object]),
    default: () => mutable({} as const)
  }
}

export type ColProps = ExtractPropTypes<typeof colProps>

export default defineComponent({
  name,

  props: colProps,

  setup(props, { slots }) {
    const { parent, index } = useParent(ROW_KEY)

    const style = computed(() => {
      if (!parent) {
        return
      }

      const { spaces } = parent

      if (spaces && spaces.value && spaces.value[index.value]) {
        const { left, right } = spaces.value[index.value]
        return {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null
        }
      }
    })

    return () => {
      const { tag } = props

      const classes: any = ['r-col']

      const pos = ['span', 'offset', 'pull', 'push'] as const
      pos.forEach((prop) => {
        const numSize = Number(props[prop])
        if (!isNaN(numSize)) {
          if (prop === 'span') classes.push(bem(`${props[prop]}`))
          else if (numSize > 0) classes.push(bem(`${prop}-${props[prop]}`))
        }
      })

      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      sizes.forEach((size) => {
        const numSize = Number(props[size])
        if (isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== 'span'
                ? bem(`${size}-${prop}-${sizeProp}`)
                : bem(`${size}-${sizeProp}`)
            )
          })
        } else if (!isNaN(numSize)) {
          classes.push(bem(`${size}-${props[size]}`))
        }
      })

      return (
        <tag style={style.value} class={classes}>
          {slots.default?.()}
        </tag>
      )
    }
  }
})
