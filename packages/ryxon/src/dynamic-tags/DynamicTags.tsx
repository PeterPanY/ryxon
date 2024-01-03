import {
  ref,
  computed,
  nextTick,
  defineComponent,
  type PropType,
  type VNodeChild,
  type CSSProperties,
  type ExtractPropTypes
} from 'vue'
import { useVModel } from '@vueuse/core'
import { extend } from '@ryxon/utils'
import { iconPropType, createNamespace } from '../utils'
import { useCustomInputValue } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

import { Plus } from '@ryxon/icons'
import { Space } from '../space'
import { Tag, TagProps } from '../tag'
import { Button } from '../button'
import { Input, InputProps } from '../input'
import type { OnCreate, DynamicTagsExpose, DynamicTagsOption } from './types'

const [name, bem] = createNamespace('dynamic-tags')

export const dynamicTagsProps = {
  modelValue: {
    type: Array as PropType<Array<string | DynamicTagsOption>>,
    default: () => []
  },
  max: Number as PropType<number>,
  tagClass: String,
  tagStyle: [String, Object] as PropType<string | CSSProperties>,
  tagProps: Object as PropType<TagProps>,
  renderTag: Function as PropType<
    | ((tag: string, index: number) => VNodeChild)
    | ((tag: DynamicTagsOption, index: number) => VNodeChild)
  >,
  disabled: Boolean,
  icon: { type: iconPropType, default: Plus },
  inputClass: String,
  inputStyle: [String, Object] as PropType<string | CSSProperties>,
  inputProps: Object as PropType<InputProps>,
  create: {
    type: Function as PropType<OnCreate>,
    default: (label: string) => label
  }
}

export type DynamicTagsProps = ExtractPropTypes<typeof dynamicTagsProps>

export default defineComponent({
  name,

  props: dynamicTagsProps,
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const mergedValue = useVModel(props, 'modelValue', emit)

    function doChange(value: Array<string | DynamicTagsOption>): void {
      emit('update:modelValue', value)
    }
    useCustomInputValue(() => props.modelValue)

    function handleCloseClick(index: number): void {
      const tags = mergedValue.value.slice(0)
      tags.splice(index, 1)
      doChange(tags)
    }

    const showInput = ref(false)
    const inputInstRef = ref<HTMLElement>()

    function handleAddClick(): void {
      showInput.value = true
      void nextTick(() => {
        inputInstRef.value?.focus()
      })
    }

    const triggerDisabled = computed(() => {
      return (
        props.disabled || (!!props.max && mergedValue.value.length >= props.max)
      )
    })

    const inputValue = ref('')
    function handleInputConfirm(externalValue?: string): void {
      const nextValue = externalValue ?? inputValue.value
      if (nextValue) {
        const tags = mergedValue.value.slice(0)
        tags.push(props.create(nextValue))
        doChange(tags)
      }
      showInput.value = false
      inputValue.value = ''
    }

    function handleInputKeyDown(e: KeyboardEvent): void {
      switch (e.key) {
        case 'Enter':
          handleInputConfirm()
      }
    }

    function handleInputBlur(): void {
      handleInputConfirm()
    }

    useExpose<DynamicTagsExpose>({
      activate: handleAddClick,
      deactivate: handleInputBlur,
      submit: handleInputConfirm
    })

    return () => (
      <Space class={bem()}>
        {mergedValue.value
          .map((tag, index) => {
            return props.renderTag ? (
              props.renderTag(tag as string & DynamicTagsOption, index)
            ) : (
              <Tag
                key={index}
                class={props.tagClass}
                style={props.tagStyle}
                {...extend({ closeable: true }, props.tagProps)}
                onClose={() => {
                  handleCloseClick(index)
                }}
              >
                {{ default: () => (typeof tag === 'string' ? tag : tag.label) }}
              </Tag>
            )
          })
          .concat(
            showInput.value ? (
              slots.input ? (
                slots.input()
              ) : (
                <Input
                  ref={inputInstRef}
                  modelValue={inputValue.value}
                  onUpdate:modelValue={(v) => {
                    inputValue.value = v
                  }}
                  style={props.inputStyle}
                  class={props.inputClass}
                  {...props.inputProps}
                  onKeydown={handleInputKeyDown}
                  onBlur={handleInputBlur}
                ></Input>
              )
            ) : slots.trigger ? (
              slots.trigger({ disabled: triggerDisabled.value })
            ) : (
              <Button
                disabled={triggerDisabled.value}
                icon={props.icon}
                onClick={handleAddClick}
              ></Button>
            )
          )}
      </Space>
    )
  }
})
