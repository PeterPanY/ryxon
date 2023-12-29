<template>
  <div
    :class="[bem('dragger'), isbem('dragover', dragover)]"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { isArray } from '@ryxon/utils'
import { createNamespace } from '../utils'

export default defineComponent({
  name: 'RUploadDrag',
  props: {
    accept: String,
    disabled: { type: Boolean, default: false }
  },
  emits: {
    file: (file: File[]) => isArray(file)
  },
  setup(props, { emit }) {
    const [, bem, , isbem] = createNamespace('upload')

    const dragover = ref(false)

    const onDrop = (e: DragEvent) => {
      if (props.disabled) return
      dragover.value = false

      const files = Array.from(e.dataTransfer!.files)
      const { accept } = props
      if (!accept) {
        emit('file', files)
        return
      }

      const filesFiltered = files.filter((file) => {
        const { type, name } = file
        const extension = name.includes('.') ? `.${name.split('.').pop()}` : ''
        const baseType = type.replace(/\/.*$/, '')
        return accept
          .split(',')
          .map((type) => type.trim())
          .filter((type) => type)
          .some((acceptedType) => {
            if (acceptedType.startsWith('.')) {
              return extension === acceptedType
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '')
            }
            if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
              return type === acceptedType
            }
            return false
          })
      })

      emit('file', filesFiltered)
    }

    const onDragover = () => {
      if (!props.disabled) dragover.value = true
    }

    return { bem, isbem, dragover, onDrop, onDragover }
  }
})
</script>
