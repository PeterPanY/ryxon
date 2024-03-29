import {
  h,
  ref,
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'

// Utils
import { isString, truthProp, numericProp, getZIndexStyle } from '@ryxon/utils'
import {
  iconPropType,
  BORDER_BOTTOM,
  createNamespace,
  HAPTICS_FEEDBACK
} from '../utils'

// Composables
import { usePlaceholder } from '../composables/use-placeholder'

// Components
import { Icon } from '../icon'
import { ArrowLeft } from '@ryxon/icons'

const [name, bem] = createNamespace('nav-bar')

export const navBarProps = {
  icon: { type: iconPropType, default: ArrowLeft },
  title: String,
  fixed: Boolean,
  zIndex: numericProp,
  border: truthProp,
  leftText: String,
  rightText: String,
  leftDisabled: Boolean,
  rightDisabled: Boolean,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean,
  clickable: truthProp
}

export type NavBarProps = ExtractPropTypes<typeof navBarProps>

export default defineComponent({
  name,

  props: navBarProps,

  emits: ['clickLeft', 'clickRight'],

  setup(props, { emit, slots }) {
    const navBarRef = ref<HTMLElement>()
    const renderPlaceholder = usePlaceholder(navBarRef, bem)

    const onClickLeft = (event: MouseEvent) => {
      if (!props.leftDisabled) {
        emit('clickLeft', event)
      }
    }
    const onClickRight = (event: MouseEvent) => {
      if (!props.rightDisabled) {
        emit('clickRight', event)
      }
    }

    const renderLeft = () => {
      if (slots.left) {
        return slots.left()
      }

      return [
        props.leftArrow && (
          <Icon
            class={bem('arrow')}
            name={isString(props.icon) ? props.icon : ''}
          >
            {props.icon && !isString(props.icon) ? h(props.icon) : ''}
          </Icon>
        ),
        props.leftText && <span class={bem('text')}>{props.leftText}</span>
      ]
    }

    const renderRight = () => {
      if (slots.right) {
        return slots.right()
      }

      return <span class={bem('text')}>{props.rightText}</span>
    }

    const renderNavBar = () => {
      const { title, fixed, border, zIndex } = props
      const style: CSSProperties = getZIndexStyle(zIndex)

      const hasLeft = props.leftArrow || props.leftText || slots.left
      const hasRight = props.rightText || slots.right

      return (
        <div
          ref={navBarRef}
          style={style}
          class={[
            bem({ fixed }),
            {
              [BORDER_BOTTOM]: border,
              'r-safe-area-top': props.safeAreaInsetTop
            }
          ]}
        >
          <div class={bem('content')}>
            {hasLeft && (
              <div
                class={[
                  bem('left', { disabled: props.leftDisabled }),
                  props.clickable && !props.leftDisabled ? HAPTICS_FEEDBACK : ''
                ]}
                onClick={onClickLeft}
              >
                {renderLeft()}
              </div>
            )}
            <div class={[bem('title'), 'r-ellipsis']}>
              {slots.title ? slots.title() : title}
            </div>
            {hasRight && (
              <div
                class={[
                  bem('right', { disabled: props.rightDisabled }),
                  props.clickable && !props.rightDisabled
                    ? HAPTICS_FEEDBACK
                    : ''
                ]}
                onClick={onClickRight}
              >
                {renderRight()}
              </div>
            )}
          </div>
        </div>
      )
    }

    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar)
      }
      return renderNavBar()
    }
  }
})
