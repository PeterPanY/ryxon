import { defineComponent, getCurrentInstance, nextTick } from 'vue'
import { Option } from '../option'

const component = defineComponent({
  extends: Option,
  setup(props, ctx) {
    const result = (Option.setup as NonNullable<any>)(props, ctx)

    // use methods.selectOptionClick
    delete result.selectOptionClick

    const vm = (getCurrentInstance() as NonNullable<any>).proxy

    // `r-option`将在卸载前删除缓存，
    // This is normal for flat arrays `<r-select><r-option v-for="3"></r-select>`,
    // 因为相同的节点键不会创建差异节点，但在树数据中，不同级别的相同键会创建不同的节点，
    // 因此“nextTick”中“r-option”的销毁将慢于新“r-option”的创建，
    // 后者将删除新节点，此处恢复已删除的节点。
    nextTick(() => {
      if (!result.select.cachedOptions.get(vm.value)) {
        result.select.onOptionCreate(vm)
      }
    })

    return result
  },
  methods: {
    selectOptionClick() {
      // $el.parentElement => r-tree__node-content
      this.$el.parentElement.click()
    }
  }
})

export default component
