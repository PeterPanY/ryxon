import {
  computed,
  defineComponent,
  type PropType,
  type ExtractPropTypes
} from 'vue'

import { createNamespace } from '../utils'

const [name, bem, , isBem] = createNamespace('link')

export const linkProps = {
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', 'default'],
    default: 'default'
  },
  underline: {
    type: String,
    values: ['always', 'never', 'hover'],
    default: 'hover'
  },
  onlyDefault: Boolean,
  disabled: Boolean,
  href: { type: String, default: '' },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | string>,
    default: '_self'
  }
}

export type LinkProps = ExtractPropTypes<typeof linkProps>

export default defineComponent({
  name,

  props: linkProps,

  emits: ['click'],

  setup(props, { emit, slots }) {
    const linkKls = computed(() => [
      bem(),
      bem(props.type),
      isBem('disabled', props.disabled)
    ])

    const linkUnderlineKls = computed(() => [
      bem('underline'),
      isBem('underline', props.underline === 'always'),
      isBem('hover-underline', props.underline === 'hover' && !props.disabled)
    ])

    function handleClick(event: MouseEvent) {
      if (!props.disabled) emit('click', event)
    }

    const linkAttrs = computed(() => ({
      href: props.disabled || !props.href ? undefined : props.href,
      target: props.disabled || !props.href ? undefined : props.target,
      onClick: handleClick
    }))

    return () => {
      if (props.onlyDefault) {
        return (
          <a class={linkKls.value} {...linkAttrs.value}>
            {slots.prefix?.()}
            <span class={linkUnderlineKls.value}>{slots.default?.()}</span>
            {slots.suffix?.()}
          </a>
        )
      }

      return (
        <a
          class={[...linkKls.value, ...linkUnderlineKls.value]}
          {...linkAttrs.value}
        >
          {slots.prefix?.()}
          {slots.default?.()}
          {slots.suffix?.()}
        </a>
      )
    }
  }
})
