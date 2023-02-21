import { inject, defineComponent } from 'vue'

// Utils
import { createNamespace } from '../../utils'
import { basicCellProps } from '../props/basic-cell'
import { ROOT_PICKER_INJECTION_KEY } from '../DatePicker'

const [, bem] = createNamespace('date-table-cell')

export default defineComponent({
  name: 'RDatePickerCell',
  props: basicCellProps,
  setup(props) {
    const { slots } = inject(ROOT_PICKER_INJECTION_KEY)!

    return () => {
      const { cell } = props
      if (slots.default) {
        const list = slots
          .default(cell)
          .filter(
            (item) =>
              item.patchFlag !== -2 &&
              item.type.toString() !== 'Symbol(Comment)'
          )
        if (list.length) {
          return list
        }
      }

      return (
        <div class={bem()}>
          <span class={bem('text')}>{cell?.text}</span>
        </div>
      )
    }
  }
})
