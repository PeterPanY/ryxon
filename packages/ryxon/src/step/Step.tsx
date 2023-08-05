import { h, defineComponent, type ExtractPropTypes } from 'vue'

// Utils
import { BORDER, isString, iconPropType, createNamespace } from '../utils'
import { STEPS_KEY } from '../steps/Steps'

// Composables
import { useParent } from '@ryxon/use'

// Components
import { Icon } from '../icon'

const [name, bem] = createNamespace('step')

export const stepProps = {
  activeIcon: iconPropType,
  finishIcon: iconPropType,
  inactiveIcon: iconPropType
}

export type StepProps = ExtractPropTypes<typeof stepProps>

export default defineComponent({
  name,
  props: stepProps,
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

      const activeItemIcon = props.activeIcon || activeIcon
      const inactiveItemIcon = props.inactiveIcon || inactiveIcon
      const finishItemIcon = props.finishIcon || finishIcon

      if (isActive()) {
        if (slots['active-icon']) {
          return slots['active-icon']()
        }

        return (
          <Icon
            class={[bem('icon', 'active'), activeItemIcon ? '' : bem('circle')]}
            name={isString(activeItemIcon) ? activeItemIcon : ''}
            classPrefix={iconPrefix}
          >
            {activeItemIcon && !isString(activeItemIcon) && h(activeItemIcon)}
          </Icon>
        )
      }

      if (getStatus() === 'finish') {
        if (slots['finish-icon']) {
          return slots['finish-icon']()
        }

        return (
          <Icon
            class={[bem('icon', 'finish'), finishItemIcon ? '' : bem('circle')]}
            name={isString(finishItemIcon) ? finishItemIcon : ''}
            classPrefix={iconPrefix}
          >
            {finishItemIcon && !isString(finishItemIcon) && h(finishItemIcon)}
          </Icon>
        )
      }

      if (slots['inactive-icon']) {
        return slots['inactive-icon']()
      }

      if (inactiveItemIcon) {
        return (
          <Icon
            class={bem('icon')}
            name={isString(inactiveItemIcon) ? inactiveItemIcon : ''}
            classPrefix={iconPrefix}
          >
            {inactiveItemIcon &&
              !isString(inactiveItemIcon) &&
              h(inactiveItemIcon)}
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
          <div
            class={bem('title', { active: isActive() })}
            onClick={onClickStep}
          >
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
