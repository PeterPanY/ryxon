import { AddressEdit, AddressEditInstance } from '..'
import { areaList } from '../../area/demo/area-simple'
import { mount, later, trigger } from '../../../test'
import { submitForm } from '../../form/test/shared'

const defaultAddressInfo = {
  name: '测试',
  tel: '13000000000',
  province: '北京市',
  city: '北京市',
  county: '朝阳区',
  addressDetail: 'address detail',
  areaCode: '110101',
  isDefault: true
}

const createComponent = (addressInfo = {}) => {
  const wrapper = mount(AddressEdit, {
    props: {
      areaList,
      addressInfo: {
        ...defaultAddressInfo,
        ...addressInfo
      },
      showSetDefault: true
    }
  })

  const inputs = wrapper.findAll('.r-input')
  return {
    vm: wrapper.vm,
    inputs,
    wrapper
  }
}

test('should render AddressEdit correctly', () => {
  expect(mount(AddressEdit).html()).toMatchSnapshot()
})

test('should render AddressEdit with props correctly', () => {
  const wrapper = mount(AddressEdit, {
    props: {
      areaList,
      addressInfo: defaultAddressInfo,
      showSetDefault: true,
      showSearchResult: true
    }
  })

  expect(wrapper.html()).toMatchSnapshot()
})

test('should allow to custom validator with validator prop', async () => {
  const wrapper = mount(AddressEdit, {
    props: {
      areaList,
      validator: (key: string, value: string) => `foo ${key}${value}`
    }
  })

  await submitForm(wrapper)
  expect(wrapper.find('.r-input__error-message').html()).toMatchSnapshot()
})

test('should valid name and render error message correctly', async () => {
  const { inputs, wrapper } = createComponent({
    name: ''
  })

  await submitForm(wrapper)
  expect(inputs[0].html()).toMatchSnapshot()
})

test('should valid tel and render error message correctly', async () => {
  const { inputs, wrapper } = createComponent({
    tel: ''
  })

  await submitForm(wrapper)
  expect(inputs[1].html()).toMatchSnapshot()
})

test('should valid area code and render error message correctly', async () => {
  const { inputs, wrapper } = createComponent({
    areaCode: ''
  })

  await submitForm(wrapper)
  expect(inputs[2].html()).toMatchSnapshot()
})

test('should valid address detail and render error message correctly', async () => {
  const { inputs, wrapper } = createComponent({
    addressDetail: ''
  })

  await submitForm(wrapper)
  await later()
  expect(inputs[3].html()).toMatchSnapshot()
})

test('should emit changeDetail event after changing address detail', () => {
  const wrapper = mount(AddressEdit)
  const input = wrapper.findAll('.r-input__control')[3]

  ;(input.element as HTMLInputElement).value = '123'
  input.trigger('input')
  expect(wrapper.emitted('changeDetail')).toEqual([['123']])
})

test('should show search result after focusing to address detail', async () => {
  const wrapper = mount(AddressEdit, {
    props: {
      showSearchResult: true,
      searchResult: [
        { name: 'name1', address: 'address1' },
        { name: 'name2' },
        { address: 'address2' }
      ]
    }
  })

  const inputControl = wrapper.findAll('.r-input__control')[3]
  const input = inputControl.element as HTMLInputElement
  await inputControl.trigger('focus')

  const items = wrapper.findAll('.r-icon-location-o')
  ;(items[0].element.parentNode as HTMLElement).click()
  await later()
  expect(input.value).toEqual('address1 name1')
  ;(items[1].element.parentNode as HTMLElement).click()
  await later()
  expect(input.value).toEqual('name2')
  ;(items[2].element.parentNode as HTMLElement).click()
  await later()
  expect(input.value).toEqual('address2')
})

test('should emit delete event after clicking the delete button', async () => {
  const wrapper = mount(AddressEdit, {
    props: {
      showDelete: true
    }
  })

  const deleteButton = wrapper.findAll('.r-button')[1]
  await deleteButton.trigger('click')
  expect(wrapper.emitted('delete')).toBeTruthy()
})

test('should update address detail after calling the setAddressDetail method', async () => {
  const { vm, wrapper } = createComponent()
  const textarea = wrapper.find('.r-address-edit-detail').find('textarea')

  expect(textarea.element.value).toEqual('address detail')
  ;(vm as AddressEditInstance).setAddressDetail('test')
  await later()
  expect(textarea.element.value).toEqual('test')
})

test('should emit clickArea event after clicking the area input', () => {
  const wrapper = mount(AddressEdit, {
    props: {
      disableArea: true
    }
  })

  const input = wrapper.findAll('.r-input')[2]
  input.trigger('click')
  expect(wrapper.emitted('clickArea')).toHaveLength(1)
})

test('should limit tel maxlength when using tel-maxlength prop', () => {
  const wrapper = mount(AddressEdit, {
    props: {
      telMaxlength: 4
    }
  })

  const telInput = wrapper.find('input[type="tel"]')
  const inputEl = telInput.element as HTMLInputElement
  inputEl.value = '123456'
  trigger(telInput, 'input')

  expect(inputEl.value).toEqual('1234')
})