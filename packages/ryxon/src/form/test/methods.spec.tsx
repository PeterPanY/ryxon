import { ref } from 'vue'
import { mount, later, mockScrollIntoView } from '../../../test'
import { mountSimpleRulesForm, getSimpleRules } from './shared'
import { Form, FormInstance } from '..'
import { Input } from '../../input'

test('should emit submit event after calling the submit method', async () => {
  const onSubmit = jest.fn()
  const form = ref<FormInstance>()
  mount({
    render() {
      return (
        <Form ref={form} onSubmit={onSubmit}>
          <Input name="A" modelValue="bar" />
        </Form>
      )
    }
  })

  form.value?.submit()
  await later()
  expect(onSubmit).toHaveBeenCalledWith({ A: 'bar' })
})

test('validate method - validate all inputs', async () => {
  const { formRef } = mountSimpleRulesForm()
  try {
    await formRef.value?.validate()
  } catch (err) {
    expect(err).toEqual([
      { message: 'A failed', name: 'A' },
      { message: 'B failed', name: 'B' }
    ])
  }
})

test('validate method - validate one input and failed', async () => {
  const { formRef } = mountSimpleRulesForm()
  try {
    await formRef.value?.validate('A')
  } catch (err) {
    expect(err).toEqual({ message: 'A failed', name: 'A' })
  }
})

test('validate method - validate one input and passed', () => {
  const formRef = ref<FormInstance>()
  mount({
    render() {
      return (
        <Form ref={formRef}>
          <Input name="A" rules={this.rulesA} modelValue="123" />
          <Input name="B" rules={this.rulesB} modelValue="" />
        </Form>
      )
    },
    data: getSimpleRules
  })

  expect(async () => formRef.value?.validate('A')).not.toThrowError()
})

test('validate method - validate two inputs and failed', async () => {
  const formRef = ref<FormInstance>()
  mount({
    render() {
      return (
        <Form ref={formRef}>
          <Input name="A" rules={this.rulesA} modelValue="123" />
          <Input name="B" rules={this.rulesB} modelValue="" />
        </Form>
      )
    },
    data: getSimpleRules
  })

  try {
    await formRef.value?.validate(['A', 'B'])
  } catch (err) {
    expect(err).toEqual([{ message: 'B failed', name: 'B' }])
  }
})

test('validate method - unexist name', (done) => {
  const { formRef } = mountSimpleRulesForm()
  formRef.value?.validate('unexist').catch(done)
})

test('resetValidation method - reset all inputs', async () => {
  const { form, formRef } = mountSimpleRulesForm()
  try {
    await formRef.value?.validate()
  } catch (err) {
    formRef.value?.resetValidation()
    await later()
    const errors = form.findAll('.r-input__error-message')
    expect(errors).toHaveLength(0)
  }
})

test('resetValidation method - reset two inputs', async () => {
  const { form, formRef } = mountSimpleRulesForm()

  try {
    await formRef.value?.validate()
  } catch (err) {
    formRef.value?.resetValidation(['A', 'B'])
    await later()
    const errors = form.findAll('.r-input__error-message')
    expect(errors).toHaveLength(0)
  }
})

test('resetValidation method - reset one input', async () => {
  const { form, formRef } = mountSimpleRulesForm()

  try {
    await formRef.value?.validate()
  } catch (err) {
    formRef.value?.resetValidation('A')
    await later()
    expect(form.findAll('.r-input__error-message')).toHaveLength(1)

    formRef.value?.resetValidation('B')
    await later()
    expect(form.findAll('.r-input__error-message')).toHaveLength(0)
  }
})

test('scrollToInput method', () => {
  const fn = mockScrollIntoView()
  const { formRef } = mountSimpleRulesForm()

  formRef.value?.scrollToInput('unknown')
  expect(fn).toHaveBeenCalledTimes(0)

  formRef.value?.scrollToInput('A')
  expect(fn).toHaveBeenCalledTimes(1)
})

test('getValues method should return all current values', () => {
  const formRef = ref<FormInstance>()
  mount({
    render() {
      return (
        <Form ref={formRef}>
          <Input name="A" modelValue="123" />
          <Input name="B" modelValue="456" />
        </Form>
      )
    }
  })

  expect(formRef.value?.getValues()).toEqual({ A: '123', B: '456' })
})

test('getValidationStatus method should the status of all inputs', async () => {
  const formRef = ref<FormInstance>()
  const rules = getSimpleRules()
  mount({
    render() {
      return (
        <Form ref={formRef}>
          <Input name="A" rules={rules.rulesA} modelValue="123" />
          <Input name="B" rules={rules.rulesB} modelValue="456" />
        </Form>
      )
    }
  })

  expect(formRef.value?.getValidationStatus()).toEqual({
    A: 'unvalidated',
    B: 'unvalidated'
  })

  await formRef.value?.validate()

  expect(formRef.value?.getValidationStatus()).toEqual({
    A: 'passed',
    B: 'passed'
  })

  formRef.value?.resetValidation()

  expect(formRef.value?.getValidationStatus()).toEqual({
    A: 'unvalidated',
    B: 'unvalidated'
  })
})
