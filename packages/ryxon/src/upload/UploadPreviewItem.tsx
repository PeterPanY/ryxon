import { ref, defineComponent, type PropType } from 'vue'

// Utils
import { t, bem, isImageFile } from './utils'
import {
  extend,
  numericProp,
  getSizeStyle,
  callInterceptor,
  makeRequiredProp,
  type Numeric,
  type Interceptor
} from '../utils'

// Components
import { Icon } from '../icon'
import { Check, CircleClose, Close, Document } from '@ryxon/icons'
import { Image, ImageFit } from '../image'
import { Loading } from '../loading'

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
    failedText: String
  },

  emits: ['delete', 'preview'],

  setup(props, { emit, slots }) {
    const renderMask = () => {
      const { status } = props.item

      if (status === 'uploading' || status === 'failed') {
        const MaskIcon =
          status === 'failed' ? (
            <Icon class={bem('mask-icon')}>
              <CircleClose></CircleClose>
            </Icon>
          ) : (
            <Loading class={bem('loading')} />
          )

        const message =
          status === 'uploading' ? props.uploadingText : props.failedText

        return (
          <div class={bem('mask')}>
            {MaskIcon}
            {message && <div class={bem('mask-message')}>{message}</div>}
          </div>
        )
      }
    }

    const onDelete = (event: MouseEvent) => {
      const { name, item, index, beforeDelete } = props
      event.stopPropagation()
      callInterceptor(beforeDelete, {
        args: [item, { name, index }],
        done: () => emit('delete')
      })
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
            onClick={onDelete}
            onMouseenter={handleMouseenter}
            onMouseleave={handleMouseleave}
          >
            {slot ? (
              slot()
            ) : (
              <Icon class={bem('preview-delete-icon')}>
                {props.item.status === 'done' && isDone.value ? (
                  <Check></Check>
                ) : (
                  <Close></Close>
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
      const { item, lazyLoad, imageFit, previewSize } = props

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
          <Icon class={bem('file-icon')}>
            <Document></Document>
          </Icon>
          <div class={[bem('file-name'), 'r-ellipsis']}>
            {item.file ? item.file.name : item.url}
          </div>
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
