import { defineComponent, type ExtractPropTypes } from 'vue'

// Utils
// import { createNamespace } from '../utils'

// Components
import Picker from './common/picker.vue'

// const [name] = createNamespace('time-picker-pc')

export const timePickerPcProps = {}

export type TimePickerPcProps = ExtractPropTypes<typeof timePickerPcProps>

export default defineComponent({
  name: 'RTimePickerPc',
  props: timePickerPcProps,
  emits: [],
  setup() {
    return () => <Picker></Picker>
  }
})
