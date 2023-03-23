// @ts-nocheck
import {
  h,
  ref,
  reactive,
  shallowRef,
  defineComponent,
  onBeforeUnmount,
  type PropType,
  type ExtractPropTypes
} from 'vue'

// Utils
import {
  noop,
  pick,
  extend,
  mutable,
  toArray,
  isString,
  isPromise,
  truthProp,
  Interceptor,
  iconPropType,
  getSizeStyle,
  makeArrayProp,
  makeStringProp,
  definePropType,
  makeNumericProp,
  type Numeric,
  type ComponentInstance
} from '../utils'
import {
  t,
  bem,
  name,
  genFileId,
  isOversize,
  filterFiles,
  isImageFile,
  readFileContent
} from './utils'
import { ajaxUpload } from './ajax'

// Composables
import { useCustomInputValue } from '@ryxon/use'
import { useExpose } from '../composables/use-expose'

// Components
import { Icon } from '../icon'
import { CameraFilled } from '@ryxon/icons'
import { showImagePreview, type ImagePreviewOptions } from '../image-preview'
import UploadPreviewItem from './UploadPreviewItem'
import UploadDragger from './upload-dragger.vue'

// Types
import type { ImageFit } from '../image'
import type {
  UploadHooks,
  UploadExpose,
  UploadMaxSize,
  UploadRawFile,
  UploadAfterRead,
  UploadBeforeRead,
  UploadResultType,
  UploadFileListItem,
  UploadRequestHandler,
  UploadRequestOptions
} from './types'

export const uploadProps = {
  modelValue: makeArrayProp<UploadFileListItem>(),
  name: makeNumericProp(''),
  accept: makeStringProp('image/*'),
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  maxCount: makeNumericProp(Infinity),
  imageFit: makeStringProp<ImageFit>('cover'),
  resultType: makeStringProp<UploadResultType>('dataUrl'),
  uploadIcon: { type: iconPropType, default: CameraFilled },
  uploadText: String,
  uploadingText: { type: String, default: t('uploading') },
  failedText: { type: String, default: t('failed') },
  deletable: truthProp,
  afterRead: Function as PropType<UploadAfterRead>,
  showUpload: truthProp,
  beforeRead: Function as PropType<UploadBeforeRead>,
  beforeDelete: Function as PropType<Interceptor>,
  previewSize: [Number, String, Array] as PropType<
    Numeric | [Numeric, Numeric]
  >,
  previewImage: truthProp,
  previewOptions: Object as PropType<Partial<ImagePreviewOptions>>,
  previewFullImage: truthProp,
  maxSize: {
    type: [Number, String, Function] as PropType<UploadMaxSize>,
    default: Infinity
  },
  drag: { type: Boolean, default: false },
  autoUpload: { type: Boolean, default: true },
  action: { type: String, default: '#' },
  httpRequest: {
    type: definePropType<UploadRequestHandler>(Function),
    default: ajaxUpload
  },
  headers: { type: definePropType<Headers | Record<string, any>>(Object) },
  method: { type: String, default: 'post' },
  data: { type: Object, default: () => mutable({} as const) },
  withCredentials: Boolean,
  beforeUpload: {
    type: definePropType<UploadHooks['beforeUpload']>(Function),
    default: noop
  },
  onRemove: {
    type: definePropType<UploadHooks['onRemove']>(Function),
    default: noop
  },
  onProgress: {
    type: definePropType<UploadHooks['onProgress']>(Function),
    default: noop
  },
  onSuccess: {
    type: definePropType<UploadHooks['onSuccess']>(Function),
    default: noop
  },
  onError: {
    type: definePropType<UploadHooks['onError']>(Function),
    default: noop
  }
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export default defineComponent({
  name,

  props: uploadProps,

  emits: [
    'delete',
    'oversize',
    'clickUpload',
    'closePreview',
    'clickPreview',
    'update:modelValue'
  ],

  setup(props, { emit, slots }) {
    const inputRef = ref()
    const urls: string[] = []

    const getDetail = (index = props.modelValue.length) => ({
      name: props.name,
      index
    })

    const resetInput = () => {
      if (inputRef.value) {
        inputRef.value.value = ''
      }
    }

    const requests = shallowRef<
      Record<string, XMLHttpRequest | Promise<unknown>>
    >({})

    // 上传文件
    const doUpload = (rawFile: UploadRawFile) => {
      const {
        headers,
        data,
        method,
        withCredentials,
        name: filename,
        action,
        onProgress,
        onSuccess,
        onError,
        httpRequest
      } = props

      const { uid } = rawFile

      rawFile.status = 'uploading'

      const options: UploadRequestOptions = {
        headers: headers || {},
        withCredentials,
        file: rawFile.file,
        data,
        method,
        filename,
        action,
        onProgress: (evt) => {
          onProgress(evt, rawFile)
        },
        onSuccess: (res) => {
          rawFile.status = 'done'
          onSuccess(res, rawFile)
          delete requests.value[uid]
        },
        onError: (err) => {
          rawFile.status = 'failed'
          onError(err, rawFile)
          delete requests.value[uid]
        }
      }

      const request = httpRequest(options)

      requests.value[uid] = request

      if (request instanceof Promise) {
        request.then(options.onSuccess, options.onError)
      }
    }

    // 删除文件
    const deleteFile = (item: UploadFileListItem, index: number) => {
      const fileList = props.modelValue.slice(0)
      fileList.splice(index, 1)

      emit('update:modelValue', fileList)
      emit('delete', item, getDetail(index))
    }

    // 文件上传前处理
    const upload = async (rawFile: UploadRawFile) => {
      inputRef.value!.value = ''

      if (!props.beforeUpload) {
        return doUpload(rawFile)
      }

      let hookResult: Exclude<
        ReturnType<UploadHooks['beforeUpload']>,
        Promise<any>
      >

      try {
        hookResult = await props.beforeUpload(rawFile)
      } catch {
        hookResult = false
      }

      if (hookResult === false) {
        const index = props.modelValue.findIndex(
          (item) => item.uid === rawFile.uid
        )

        deleteFile(rawFile, index)
        props.onRemove(rawFile)
        return
      }

      const file = rawFile

      if (hookResult instanceof Blob) {
        if (hookResult instanceof File) {
          file.file = hookResult
        } else {
          file.file = new File([hookResult], rawFile.name, {
            type: rawFile.type
          })
        }
      }

      doUpload(Object.assign(file, { uid: rawFile.uid }))
    }

    const onAfterRead = (items: UploadFileListItem | UploadFileListItem[]) => {
      resetInput()

      if (isOversize(items, props.maxSize)) {
        if (Array.isArray(items)) {
          const result = filterFiles(items, props.maxSize)
          items = result.valid
          emit('oversize', result.invalid, getDetail())

          if (!items.length) {
            return
          }
        } else {
          emit('oversize', items, getDetail())
          return
        }
      }
      items = reactive(items)
      emit('update:modelValue', [...props.modelValue, ...toArray(items)])

      if (props.afterRead) {
        props.afterRead(items, getDetail())
      }

      // 判断是否开启自动上传
      if (props.autoUpload) {
        for (const file of toArray(items)) {
          const rawFile = file
          rawFile.uid = genFileId()

          upload(rawFile)
        }
      }
    }

    const readFile = (files: File | File[]) => {
      const { maxCount, modelValue, resultType } = props

      if (Array.isArray(files)) {
        const remainCount = +maxCount - modelValue.length

        if (files.length > remainCount) {
          files = files.slice(0, remainCount)
        }

        Promise.all(
          files.map((file) => readFileContent(file, resultType))
        ).then((contents) => {
          const fileList = (files as File[]).map((file, index) => {
            const result: UploadFileListItem = {
              file,
              status: 'ready',
              uid: genFileId()
            }

            if (contents[index]) {
              result.content = contents[index] as string
            }

            return result
          })

          onAfterRead(fileList)
        })
      } else {
        readFileContent(files, resultType).then((content) => {
          const result: UploadFileListItem = {
            file: files as File,
            status: 'ready',
            uid: genFileId()
          }

          if (content) {
            result.content = content
          }

          onAfterRead(result)
        })
      }
    }

    const onChange = (event: Event) => {
      const { files } = event.target as HTMLInputElement

      if (props.disabled || !files || !files.length) {
        return
      }

      const file =
        files.length === 1 ? files[0] : ([].slice.call(files) as File[])

      if (props.beforeRead) {
        const response = props.beforeRead(file, getDetail())

        if (!response) {
          resetInput()
          return
        }

        if (isPromise(response)) {
          response
            .then((data) => {
              if (data) {
                readFile(data)
              } else {
                readFile(file)
              }
            })
            .catch(resetInput)
          return
        }
      }

      readFile(file)
    }

    let imagePreview: ComponentInstance | undefined

    const onClosePreview = () => emit('closePreview')

    const previewImage = (item: UploadFileListItem) => {
      if (props.previewFullImage) {
        const imageFiles = props.modelValue.filter(isImageFile)
        const images = imageFiles
          .map((item) => {
            if (item.file && !item.url && item.status !== 'failed') {
              item.url = URL.createObjectURL(item.file)
              urls.push(item.url)
            }
            return item.url
          })
          .filter(Boolean) as string[]

        imagePreview = showImagePreview(
          extend(
            {
              images,
              startPosition: imageFiles.indexOf(item),
              onClose: onClosePreview,
              closeable: true
            },
            props.previewOptions
          )
        )
      }
    }

    const closeImagePreview = () => {
      if (imagePreview) {
        imagePreview.close()
      }
    }

    const renderPreviewItem = (item: UploadFileListItem, index: number) => {
      const needPickData = [
        'imageFit',
        'deletable',
        'previewSize',
        'beforeDelete'
      ] as const

      const previewData = extend(
        pick(props, needPickData),
        pick(item, needPickData, true)
      )

      return (
        <UploadPreviewItem
          v-slots={pick(slots, ['preview-cover', 'preview-delete'])}
          item={item}
          index={index}
          uploadingText={props.uploadingText}
          failedText={props.failedText}
          onClick={() => emit('clickPreview', item, getDetail(index))}
          onDelete={() => deleteFile(item, index)}
          onPreview={() => previewImage(item)}
          {...pick(props, ['name', 'lazyLoad'])}
          {...previewData}
        />
      )
    }

    const renderPreviewList = () => {
      if (props.previewImage) {
        return props.modelValue.map(renderPreviewItem)
      }
    }

    const chooseFile = () => {
      if (inputRef.value && !props.disabled) {
        inputRef.value.click()
      }
    }

    const onClickUpload = (event: MouseEvent) => {
      chooseFile()
      emit('clickUpload', event)
    }

    const renderUpload = () => {
      if (props.modelValue.length >= +props.maxCount) {
        return
      }

      const Input = props.readonly ? null : (
        <input
          ref={inputRef}
          type="file"
          class={bem('input')}
          accept={props.accept}
          capture={props.capture as unknown as boolean}
          multiple={props.multiple}
          disabled={props.disabled}
          onChange={onChange}
        />
      )

      if (slots.default || props.drag) {
        const uploadFiles = (files: File[]) => {
          readFile(files)
        }

        return (
          <div class={bem('input-wrapper')} onClick={onClickUpload}>
            {props.drag ? (
              <UploadDragger
                disabled={props.disabled}
                accept={props.accept}
                onFile={uploadFiles}
              >
                {slots.default?.()}
              </UploadDragger>
            ) : (
              slots.default?.()
            )}
            {Input}
          </div>
        )
      }

      if (props.drag) {
        return
      }

      return (
        <div
          v-show={props.showUpload}
          class={bem('upload', { readonly: props.readonly })}
          style={getSizeStyle(props.previewSize)}
          onClick={onClickUpload}
        >
          <Icon
            name={isString(props.uploadIcon) ? props.uploadIcon : ''}
            class={bem('upload-icon')}
          >
            {!isString(props.uploadIcon) && h(props.uploadIcon)}
          </Icon>
          {props.uploadText && (
            <span class={bem('upload-text')}>{props.uploadText}</span>
          )}
          {Input}
        </div>
      )
    }

    onBeforeUnmount(() => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    })

    // 手动上传
    const submit = () => {
      props.modelValue
        .filter(({ status }) => status === 'ready')
        .forEach((item) => upload(item))
    }

    useExpose<UploadExpose>({
      submit,
      chooseFile,
      closeImagePreview
    })
    useCustomInputValue(() => props.modelValue)

    return () => (
      <div class={bem()}>
        <div class={bem('wrapper', { disabled: props.disabled })}>
          {renderPreviewList()}
          {renderUpload()}
        </div>
      </div>
    )
  }
})