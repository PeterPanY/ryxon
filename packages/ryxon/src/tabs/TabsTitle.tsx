import { computed, defineComponent, type CSSProperties } from 'vue'
import { isDef, truthProp, numericProp } from '@ryxon/utils'
import { createNamespace } from '../utils'
import { Badge } from '../badge'
import { Icon } from '../icon'
import { Close } from '@ryxon/icons'

const [name, bem, , isBem] = createNamespace('tab')

export default defineComponent({
  name,

  props: {
    id: String,
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: numericProp,
    shrink: Boolean,
    isActive: Boolean,
    disabled: Boolean,
    controls: String,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    showZeroBadge: truthProp,
    closable: Boolean,
    parentClosable: Boolean,
    parentEditable: Boolean,
    tabPosition: { type: String, default: 'top' }
  },
  emits: ['tabRemove'],
  setup(props, { slots, emit }) {
    const style = computed(() => {
      const style: CSSProperties = {}
      const { type, color, disabled, isActive, activeColor, inactiveColor } =
        props

      const isCard = type === 'card'

      // card theme color
      if (color && isCard) {
        style.borderColor = color

        if (!disabled) {
          if (isActive) {
            style.backgroundColor = color
          } else {
            style.color = color
          }
        }
      }

      const titleColor = isActive ? activeColor : inactiveColor
      if (titleColor) {
        style.color = titleColor
      }

      return style
    })

    const renderText = () => {
      const Text = (
        <span class={bem('text', { ellipsis: !props.scrollable })}>
          {slots.title ? slots.title() : props.title}
        </span>
      )

      if (props.dot || (isDef(props.badge) && props.badge !== '')) {
        return (
          <Badge
            dot={props.dot}
            content={props.badge}
            showZero={props.showZeroBadge}
          >
            {Text}
          </Badge>
        )
      }

      return Text
    }

    return () => (
      <div
        id={props.id}
        role="tab"
        class={[
          bem([
            props.type,
            {
              grow: props.scrollable && !props.shrink,
              shrink: props.shrink,
              active: props.isActive,
              disabled: props.disabled
            }
          ]),
          isBem(props.tabPosition)
        ]}
        style={style.value}
        tabindex={props.disabled ? undefined : props.isActive ? 0 : -1}
        aria-selected={props.isActive}
        aria-disabled={props.disabled || undefined}
        aria-controls={props.controls}
      >
        {renderText()}
        {!props.disabled &&
          (props.closable || props.parentClosable || props.parentEditable) && (
            <Icon class="is-icon-close" onClick={(ev) => emit('tabRemove', ev)}>
              <Close />
            </Icon>
          )}
      </div>
    )
  }
})
