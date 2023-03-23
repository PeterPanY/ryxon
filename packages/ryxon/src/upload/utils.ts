import { toArray, createNamespace, isFunction } from '../utils'
import type {
  UploadMaxSize,
  UploadResultType,
  UploadFileListItem
} from './types'

const [name, bem, t] = createNamespace('upload')

export { name, bem, t }

let fileId = 1
export const genFileId = () => Date.now() + fileId++

export function readFileContent(file: File, resultType: UploadResultType) {
  return new Promise<string | void>((resolve) => {
    if (resultType === 'file') {
      resolve()
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      resolve((event.target as FileReader).result as string)
    }

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file)
    } else if (resultType === 'text') {
      reader.readAsText(file)
    }
  })
}

export function isOversize(
  items: UploadFileListItem | UploadFileListItem[],
  maxSize: UploadMaxSize
): boolean {
  return toArray(items).some((item) => {
    if (item.file) {
      if (isFunction(maxSize)) {
        return maxSize(item.file)
      }
      return item.file.size > +maxSize
    }
    return false
  })
}

export function filterFiles(
  items: UploadFileListItem[],
  maxSize: UploadMaxSize
) {
  const valid: UploadFileListItem[] = []
  const invalid: UploadFileListItem[] = []

  items.forEach((item) => {
    if (isOversize(item, maxSize)) {
      invalid.push(item)
    } else {
      valid.push(item)
    }
  })

  return { valid, invalid }
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)/i

export const isImageUrl = (url: string): boolean => IMAGE_REGEXP.test(url)

export function isImageFile(item: UploadFileListItem): boolean {
  // some special urls cannot be recognized
  // user can add `isImage` flag to mark it as an image url
  if (item.isImage) {
    return true
  }

  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0
  }

  if (item.url) {
    return isImageUrl(item.url)
  }

  if (typeof item.content === 'string') {
    return item.content.indexOf('data:image') === 0
  }

  return false
}
