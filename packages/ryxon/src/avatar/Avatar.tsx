import {
  h,
  ref,
  watch,
  computed,
  defineComponent,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { addUnit, isNumber, isString, componentSizes } from '@ryxon/utils'
import { cssVarBlock, iconPropType, createNamespace } from '../utils'
import type { ImageFit } from '../image'

// Components
import { Icon } from '../icon'

const [name, bem] = createNamespace('avatar')

export const avatarProps = {
  size: {
    type: [Number, String],
    values: componentSizes,
    default: ''
  },
  shape: { type: String, values: ['circle', 'square'], default: 'circle' },
  icon: { type: iconPropType },
  src: { type: String, default: '' },
  alt: String,
  srcSet: String,
  fit: { type: String as PropType<ImageFit>, default: 'cover' }
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export default defineComponent({
  name,
  props: avatarProps,
  emits: ['error'],
  setup(props, { emit, slots }) {
    const hasLoadError = ref(false)

    const avatarClass = computed(() => {
      const { size, icon, shape } = props
      const classList = [bem()]
      if (isString(size)) classList.push(bem(size))
      if (icon) classList.push(bem('icon'))
      if (shape) classList.push(bem(shape))
      return classList
    })

    const sizeStyle = computed(() => {
      const { size } = props
      return isNumber(size)
        ? (cssVarBlock('avatar', {
            size: addUnit(size) || ''
          }) as CSSProperties)
        : undefined
    })

    const fitStyle = computed<CSSProperties>(() => ({
      objectFit: props.fit
    }))

    // 如果src已更改，则需要将hasLoadError重置为false
    watch(
      () => props.src,
      () => {
        hasLoadError.value = false
      }
    )

    function handleError(e: Event) {
      hasLoadError.value = true
      emit('error', e)
    }

    return () => (
      <span class={avatarClass.value} style={sizeStyle.value}>
        {(props.src || props.srcSet) && !hasLoadError.value ? (
          <img
            src={props.src}
            alt={props.alt}
            srcset={props.srcSet}
            style={fitStyle.value}
            onError={handleError}
          />
        ) : props.icon ? (
          <Icon name={isString(props.icon) ? props.icon : ''}>
            {!isString(props.icon) && h(props.icon)}
          </Icon>
        ) : (
          slots.default?.()
        )}
      </span>
    )
  }
})
