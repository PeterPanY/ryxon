import { ref, defineComponent, type PropType } from 'vue'

// Utils
import { t, bem, isImageFile } from './utils'
import {
  extend,
  numericProp,
  getSizeStyle,
  makeRequiredProp,
  type Numeric,
  type Interceptor
} from '@ryxon/utils'

// Components
import { Icon } from '../icon'
import {
  Close,
  Check,
  Upload,
  Refresh,
  Document,
  CircleClose
} from '@ryxon/icons'
import { Image, ImageFit } from '../image'
import { Loading } from '../loading'
import { Space } from '../space'

// Types
import type { UploadFileListItem } from './types'

export default defineComponent({
  props: {
    name: numericProp,
    item: makeRequiredProp<PropType<UploadFileListItem>>(Object),
    index: Number,
    imageFit: String as PropType<ImageFit>,
    lazyLoad: Boolean,
    deletable: Boolean,
    previewSize: [Number, String, Array] as PropType<
      Numeric | [Numeric, Numeric]
    >,
    beforeDelete: Function as PropType<Interceptor>,
    uploadingText: String,
    failedText: String,
    showFailedTool: Boolean
  },

  emits: ['delete', 'preview', 'reupload', 'reselection'],

  setup(props, { emit, slots }) {
    const renderMask = () => {
      const { status, file } = props.item

      if (status === 'uploading' || status === 'failed') {
        console.log(props.showFailedTool)

        const MaskIcon =
          status === 'failed' ? (
            props.showFailedTool ? (
              <Space class={bem('mask-failed')}>
                {file && (
                  <Icon
                    class={bem('mask-icon')}
                    onClick={(event) => emit('reupload', event)}
                  >
                    <Upload />
                  </Icon>
                )}
                <Icon
                  class={bem('mask-icon')}
                  onClick={(event) => emit('reselection', event)}
                >
                  <Refresh />
                </Icon>
              </Space>
            ) : (
              <Icon class={bem('mask-icon')}>
                <CircleClose></CircleClose>
              </Icon>
            )
          ) : (
            <Loading class={bem('loading')} />
          )

        const message =
          status === 'uploading' ? props.uploadingText : props.failedText

        return (
          <div class={bem('mask')}>
            {(status === 'uploading' ||
              (status === 'failed' && !props.showFailedTool)) &&
              MaskIcon}
            {message && <div class={bem('mask-message')}>{message}</div>}
            {status === 'failed' && props.showFailedTool && MaskIcon}
          </div>
        )
      }
    }

    const onPreview = () => emit('preview')

    const isDone = ref(true)

    const handleMouseenter = () => {
      isDone.value = false
    }
    const handleMouseleave = () => {
      isDone.value = true
    }

    const renderDeleteIcon = () => {
      if (props.deletable && props.item.status !== 'uploading') {
        const slot = slots['preview-delete']

        return (
          <div
            role="button"
            class={bem('preview-delete', {
              shadow: !slot,
              done: props.item.status === 'done' && isDone.value
            })}
            tabindex={0}
            aria-label={t('delete')}
            onClick={(event) => emit('delete', event)}
            onMouseenter={handleMouseenter}
            onMouseleave={handleMouseleave}
          >
            {slot ? (
              slot()
            ) : (
              <Icon class={bem('preview-delete-icon')}>
                {props.item.status === 'done' && isDone.value ? (
                  <Check />
                ) : (
                  <Close />
                )}
              </Icon>
            )}
          </div>
        )
      }
    }

    const renderCover = () => {
      if (slots['preview-cover']) {
        const { index, item } = props
        return (
          <div class={bem('preview-cover')}>
            {slots['preview-cover'](extend({ index }, item))}
          </div>
        )
      }
    }

    const renderPreview = () => {
      const { item, index, lazyLoad, imageFit, previewSize } = props

      if (isImageFile(item)) {
        return (
          <Image
            v-slots={{ default: renderCover }}
            fit={imageFit}
            src={item.objectUrl || item.content || item.url}
            class={bem('preview-image')}
            width={Array.isArray(previewSize) ? previewSize[0] : previewSize}
            height={Array.isArray(previewSize) ? previewSize[1] : previewSize}
            lazyLoad={lazyLoad}
            onClick={onPreview}
          />
        )
      }

      return (
        <div class={bem('file')} style={getSizeStyle(props.previewSize)}>
          {slots['preview-file'] ? (
            slots['preview-file'](extend({ index }, item))
          ) : (
            <>
              <Icon class={bem('file-icon')}>
                <Document />
              </Icon>
              <div class={[bem('file-name'), 'r-ellipsis']}>
                {item.file ? item.file.name : item.url}
              </div>
            </>
          )}

          {renderCover()}
        </div>
      )
    }

    return () => (
      <div class={bem('preview')}>
        {renderPreview()}
        {renderMask()}
        {renderDeleteIcon()}
      </div>
    )
  }
})
