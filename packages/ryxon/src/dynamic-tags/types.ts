export type OnCreate = (
  label: string
) => { label: string; value: string } | string

export interface DynamicTagsOption {
  label: string
  value: string
}

export type DynamicTagsExpose = {
  activate: () => void
  deactivate: () => void
  submit: (externalValue?: string) => void
}

export type DynamicTagsThemeVars = {
  dynamicTagsHeight?: string
  dynamicTagsInputWidth?: string
}
