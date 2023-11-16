import type {
  InjectionKey,
  TeleportProps,
  CSSProperties,
  ExtractPropTypes
} from 'vue'
import type { loadingBarProps } from './LoadingBar'

export interface LoadingBarInst {
  start: () => void
  error: () => void
  finish: () => void
}

export type LoadingBarOptions = {
  teleport?: TeleportProps['to'] | boolean
  containerStyle: string | CSSProperties
  loadingBarStyle: {
    loading?: string | CSSProperties
    error?: string | CSSProperties
  }
}

export type LoadingBarProviderInst = LoadingBarInst
export type LoadingBarApiInjection = LoadingBarInst

type RemoveReadonly<T> = {
  -readonly [key in keyof T]: T[key]
}

export type ExtractPublicPropTypes<T> = Omit<
  Partial<RemoveReadonly<ExtractPropTypes<T>>>,
  Extract<keyof T, `internal${string}`>
>

export type LoadingBarProviderProps = ExtractPublicPropTypes<
  typeof loadingBarProps
>

export type LoadingBarProviderSetupProps = ExtractPropTypes<
  typeof loadingBarProps
>

export const loadingBarProviderInjectionKey: InjectionKey<{
  props: LoadingBarProviderSetupProps
}> = Symbol('r-loading-bar')

export const loadingBarApiInjectionKey: InjectionKey<LoadingBarApiInjection> =
  Symbol('r-loading-bar-api')

export type LoadingBarThemeVars = {
  loadingBarHeight?: string
  loadingBarColorLoading?: string
  loadingBarColorError?: string
}
