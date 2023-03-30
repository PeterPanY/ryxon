import type { ExtractPropTypes } from 'vue'

// 传值
export const optionProps = {
  value: { required: true, type: [String, Number, Boolean, Object] },
  label: [String, Number],
  created: Boolean,
  disabled: { type: Boolean, default: false }
}

// 传参数据类型
export type OptionProps = ExtractPropTypes<typeof optionProps>
