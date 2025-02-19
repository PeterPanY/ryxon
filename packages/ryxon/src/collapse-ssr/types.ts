export interface CollapseSsrItem {
  name?: string | number
  icon?: string
  title?: string | number
  value?: string | number
  label?: string | number
  border?: boolean
  isLink?: boolean
  disabled?: boolean
  readonly?: boolean
  lazyRender?: boolean
  titleClass?: string
  valueClass?: string
  labelClass?: string
  clickable?: boolean
  content?: string | string[] | object | object[]
  [key: string]: any
}
