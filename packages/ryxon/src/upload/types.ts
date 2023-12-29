import type { ComponentPublicInstance } from 'vue'
import type { ImageFit } from '../image'
import type { Numeric, Interceptor } from '@ryxon/utils'
import type { UploadProps } from './Upload'
import type { UploadAjaxError } from './ajax'

export type UploadResultType = 'dataUrl' | 'text' | 'file'

export type UploadStatus = '' | 'uploading' | 'done' | 'failed' | 'ready'

export type UploadFileListItem = {
  url?: string
  file?: File
  objectUrl?: string
  content?: string
  isImage?: boolean
  status?: UploadStatus
  percentage?: number
  response?: unknown
  message?: string
  imageFit?: ImageFit
  deletable?: boolean
  previewSize?: Numeric
  beforeDelete?: Interceptor
  uid?: number
}

export type UploadFileListItems = UploadFileListItem[]

export type UploadMaxSize = Numeric | ((file: File) => boolean)

export type UploadBeforeRead = (
  file: File | File[],
  detail: {
    name: Numeric
    index: number
  }
) => boolean | undefined | Promise<File | File[] | undefined>

export type UploadAfterRead = (
  items: UploadFileListItem | UploadFileListItem[],
  detail: {
    name: Numeric
    index: number
  }
) => void

export type UploadExpose = {
  submit: () => void
  chooseFile: () => void
  closeImagePreview: () => void
  abort: (file?: UploadFileListItem) => void
}

export type UploadInstance = ComponentPublicInstance<UploadProps, UploadExpose>

export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, string | Blob | [string | Blob, string]>
  filename: string
  file: File
  headers: Headers | Record<string, string | number | null | undefined>
  onError: (evt: UploadAjaxError) => void
  onProgress: (evt: UploadProgressEvent) => void
  onSuccess: (response: any) => void
  withCredentials: boolean
}

export type UploadRequestHandler = (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown>

export interface UploadRawFile extends File {
  message: string
  status: string
  uid: number
  file: File
}

export type UploadUserFile = Omit<UploadFileListItem, 'status' | 'uid'> &
  Partial<Pick<UploadFileListItem, 'status' | 'uid'>>

export interface UploadHooks {
  onRemove: (
    uploadFileListItem: UploadFileListItem,
    uploadFileListItems: UploadFileListItems
  ) => void
  onChange: (
    uploadFileListItem: UploadFileListItem,
    uploadFileListItems: UploadFileListItems
  ) => void
  onPreview: (uploadFile: UploadFileListItem) => void
  onSuccess: (
    response: any,
    uploadFileListItem: UploadFileListItem,
    uploadFileListItems: UploadFileListItems
  ) => void
  onProgress: (
    evt: UploadProgressEvent,
    uploadFileListItem: UploadFileListItem,
    uploadFileListItems: UploadFileListItems
  ) => void
  onError: (
    error: Error,
    uploadFileListItem: UploadFileListItem,
    uploadFileListItems: UploadFileListItems
  ) => void
}

export type UploadThemeVars = {
  uploadSize?: string
  uploadIconSize?: string
  uploadIconColor?: string
  uploadTextColor?: string
  uploadTextFontSize?: string
  uploadUploadBackground?: string
  uploadUploadActiveColor?: string
  uploadDeleteColor?: string
  uploadDeleteIconSize?: string
  uploadDeleteBackground?: string
  uploadFileBackground?: string
  uploadFileIconSize?: string
  uploadFileIconColor?: string
  uploadFileNamePadding?: string
  uploadFileNameMarginTop?: string
  uploadFileNameFontSize?: string
  uploadFileNameTextColor?: string
  uploadMaskTextColor?: string
  uploadMaskBackground?: string
  uploadMaskIconSize?: string
  uploadMaskMessageFontSize?: string
  uploadMaskMessageLineHeight?: number | string
  uploadLoadingIconSize?: string
  uploadLoadingIconColor?: string
  uploadDisabledOpacity?: number | string
}
