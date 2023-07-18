export type ProgressColor = { color: string; percentage: number }
export type ProgressFn = (percentage: number) => string

export type ProgressThemeVars = {
  progressLineHeight?: string
  progressLineBackground?: string
  progressLineRadius?: string
  progressTextFontSize?: string
  progressTextColor?: string
  progressTextMarginLeft?: string
  progressInnerFontSize?: string
  progressInnerMargin?: string
}
