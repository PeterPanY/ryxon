// @ts-nocheck
import { watch } from 'vue'
import { useVModel } from '@vueuse/core'
import { isNil } from '@ryxon/utils'
import { genFileId } from './utils'
import type { UploadProps } from './Upload'
import type {
  UploadStatus,
  UploadRawFile,
  UploadFileListItem,
  UploadFileListItems
} from './types'

const SCOPE = 'RUpload'

const revokeObjectURL = (file: UploadFileListItem) => {
  if (file.url?.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }
}

export const useHandlers = (
  props: UploadProps,
  abort: {
    (file?: UploadFileListItem | undefined): void
    (arg0: UploadFileListItem): void
  },
  ctx: any
) => {
  const uploadFiles = useVModel(
    props as Omit<UploadProps, 'modelValue'> & {
      modelValue: UploadFileListItems
    },
    'modelValue',
    undefined,
    { passive: true }
  )

  const getFile = (rawFile: UploadRawFile) =>
    uploadFiles.value.find((file) => file.uid === rawFile.uid)

  // 清空已上传的文件列表
  function clearFiles(
    /** @default ['ready', 'uploading', 'done', 'failed'] */
    states: UploadStatus[] = ['', 'ready', 'uploading', 'done', 'failed']
  ) {
    uploadFiles.value = uploadFiles.value.filter(
      (row) => !states.includes(row.status || '')
    )
  }

  const handleError = (err, rawFile) => {
    const file = getFile(rawFile)

    if (!file) return

    file.status = 'failed'
    props.onError(err, file, uploadFiles.value)
    props.onChange(file, uploadFiles.value)
  }

  const handleProgress = (evt, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    props.onProgress(evt, file, uploadFiles.value)
    file.status = 'uploading'
    file.percentage = Math.round(evt.percent)
  }

  const handleSuccess = (response, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    file.status = 'done'
    file.response = response
    props.onSuccess(response, file, uploadFiles.value)
    props.onChange(file, uploadFiles.value)
  }

  const handleStart = (file) => {
    if (isNil(file.uid)) file.uid = genFileId()
    uploadFiles.value = [...uploadFiles.value, file]
    props.onChange(file, uploadFiles.value)
  }

  const handleRemove = async (file, detail): Promise<void> => {
    const uploadFile = file instanceof File ? getFile(file) : file
    if (!uploadFile) console.error(SCOPE, 'file to be removed not found')

    const doRemove = (file: UploadFileListItem) => {
      abort(file)
      const fileList = uploadFiles.value
      fileList.splice(fileList.indexOf(file), 1)
      props.onRemove(file, fileList)
      revokeObjectURL(file)
    }

    doRemove(uploadFile)
    ctx.emit('delete', uploadFile, detail)
  }

  watch(
    uploadFiles,
    (files) => {
      for (const file of files) {
        file.uid ||= genFileId()
        file.status ||= 'done'
      }
    },
    { immediate: true, deep: true }
  )

  return {
    /** @description two-way binding ref from props `fileList` */
    uploadFiles,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove
  }
}
