import type { InjectionKey, Ref } from 'vue'

interface SelectGroupContext {
  disabled: boolean
}

export interface QueryChangeCtx {
  query: string
}

export interface SelectOptionProxy {
  value: string | number | Record<string, string>
  label: string | number
  created: boolean
  disabled: boolean
  currentLabel: string
  itemSelected: boolean
  isDisabled: boolean
  // eslint-disable-next-line no-use-before-define
  select: SelectContext
  hoverItem: () => void
  visible: boolean
  hover: boolean
  selectOptionClick: () => void
}

export interface SelectContext {
  props: {
    multiple?: boolean
    multipleLimit?: number
    valueKey?: string
    modelValue?: string | number | unknown | unknown[]
    popperClass?: string
    remote?: boolean
    fitInputWidth?: boolean
  }
  queryChange: Ref<QueryChangeCtx>
  groupQueryChange: Ref<string>
  selectWrapper: HTMLElement
  cachedOptions: Map<any, any>
  hoverIndex: number
  optionsCount: number
  filteredOptionsCount: number
  options: Map<any, any>
  optionsArray: any[]
  selected: any | any[]
  setSelected(): void
  onOptionCreate(vm: SelectOptionProxy): void
  onOptionDestroy(key: number | string | Record<string, any>): void
  handleOptionSelect(vm: unknown, byClick: boolean): void
}

// 对于单个构建共享注入密钥，我们必须将“Symbol”设置为字符串
export const selectGroupKey =
  'RSelectGroup' as unknown as InjectionKey<SelectGroupContext>

export const selectKey = 'RSelect' as unknown as InjectionKey<SelectContext>
