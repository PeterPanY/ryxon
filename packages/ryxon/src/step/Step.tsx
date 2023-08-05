import { h, defineComponent } from 'vue'

// Utils
import { BORDER, isString, createNamespace } from '../utils'
import { STEPS_KEY } from '../steps/Steps'

// Composables
import { useParent } from '@ryxon/use'

// Components
import { Icon } from '../icon'

const [name, bem] = createNamespace('step')

export default defineComponent({
  name,
  setup(props, { slots }) {
    const { parent, index } = useParent(STEPS_KEY)

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Ryxon] <Step> must be a child component of <Steps>.')
      }
      return
    }

    const parentProps = parent.props

    const getStatus = () => {
      const active = +parentProps.active
      if (index.value < active) {
        return 'finish'
      }
      return index.value === active ? 'process' : 'waiting'
    }

    const isActive = () => getStatus() === 'process'

    const onClickStep = () => parent.onClickStep(index.value)

    const renderCircle = () => {
      const { iconPrefix, finishIcon, activeIcon, inactiveIcon } = parentProps

      if (isActive()) {
        if (slots['active-icon']) {
          return slots['active-icon']()
        }

        return (
          <Icon
            class={[activeIcon ? '' : bem('circle')]}
            name={isString(activeIcon) ? activeIcon : ''}
            classPrefix={iconPrefix}
          >
            {activeIcon && !isString(activeIcon) && h(activeIcon)}
          </Icon>
        )
      }

      if (getStatus() === 'finish') {
        if (slots['finish-icon']) {
          return slots['finish-icon']()
        }

        return (
          <Icon
            class={[bem('icon', 'finish'), finishIcon ? '' : bem('circle')]}
            name={isString(finishIcon) ? finishIcon : ''}
            classPrefix={iconPrefix}
          >
            {finishIcon && !isString(finishIcon) && h(finishIcon)}
          </Icon>
        )
      }

      if (slots['inactive-icon']) {
        return slots['inactive-icon']()
      }

      if (inactiveIcon) {
        return (
          <Icon
            class={bem('icon')}
            name={isString(inactiveIcon) ? inactiveIcon : ''}
            classPrefix={iconPrefix}
          >
            {inactiveIcon && !isString(inactiveIcon) && h(inactiveIcon)}
          </Icon>
        )
      }

      return <i class={bem('circle')} />
    }

    const renderLine = () => {
      if (parent.slots['interval']) {
        return <div class={bem('interval')}>{parent.slots['interval']()}</div>
      }
      return <div class={bem('line')}> </div>
    }

    return () => {
      const status = getStatus()

      return (
        <div
          class={[BORDER, bem([parentProps.direction, { [status]: status }])]}
        >
          <div class={bem('title')} onClick={onClickStep}>
            {slots.default?.()}
          </div>
          <div class={bem('circle-container')} onClick={onClickStep}>
            {renderCircle()}
          </div>
          {renderLine()}
        </div>
      )
    }
  }
})
