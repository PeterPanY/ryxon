import { componentSizes, type ComponentSize } from './size'

export const isValidComponentSize = (val: string): val is ComponentSize | '' =>
  ['', ...componentSizes].includes(val)
