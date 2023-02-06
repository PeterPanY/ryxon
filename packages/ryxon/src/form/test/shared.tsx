import { ref } from 'vue'
import { mount, later } from '../../../test'
import { Form, FormInstance } from '..'
import { Input } from '../../input'
import type { VueWrapper } from '@vue/test-utils'

export async function submitForm(wrapper: VueWrapper<any>) {
  await wrapper.find('form').trigger('submit')
  return later()
}

export function getSimpleRules() {
  return {
    rulesA: [{ required: true, message: 'A failed' }],
    rulesB: [{ required: true, message: 'B failed' }]
  }
}

export function mountSimpleRulesForm(options: any = {}) {
  const formRef = ref<FormInstance>()
  const form = mount({
    render() {
      const onFailed = 'onFailed' in this ? this.onFailed : () => {}
      return (
        <Form ref={formRef} onFailed={onFailed}>
          <Input name="A" rules={this.rulesA} modelValue="" />
          <Input name="B" rules={this.rulesB} modelValue="" />
        </Form>
      )
    },
    data: getSimpleRules,
    ...options
  })

  return {
    form,
    formRef
  }
}
