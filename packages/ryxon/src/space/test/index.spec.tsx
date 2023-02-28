import { mount } from '../../../test'
import { Space } from '..'
import { Button } from '../../button'

test('should render space', async () => {
  const wrapper = mount({
    render() {
      return (
        <Space>
          <Button>按钮</Button>
          <Button>按钮</Button>
          <Button>按钮</Button>
        </Space>
      )
    }
  })
  const items = wrapper.findAll('.r-space-item')
  expect(items[0].style.marginRight).toBe('8px')
  expect(items[1].style.marginRight).toBe('8px')
  expect(items[2].style.marginRight).toBe('')
})

test('should render vertical', async () => {
  const wrapper = mount({
    render() {
      return (
        <Space direction="vertical" fill>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
        </Space>
      )
    }
  })
  const space = wrapper.find('.r-space')
  const items = wrapper.findAll('.r-space-item')
  expect(space.classes()).toContain('r-space--vertical')
  expect(items[0].style.marginBottom).toBe('8px')
  expect(items[1].style.marginBottom).toBe('8px')
  expect(items[2].style.marginBottom).toBe('')
})

test('should render size 20px', async () => {
  const wrapper = mount({
    render() {
      return (
        <Space size="20px">
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
        </Space>
      )
    }
  })
  const items = wrapper.findAll('.r-space-item')
  expect(items[0].style.marginRight).toBe('20px')
  expect(items[1].style.marginRight).toBe('20px')
  expect(items[2].style.marginRight).toBe('')
})

test('should render align start', async () => {
  const wrapper = mount({
    render() {
      return (
        <Space align="start">
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
        </Space>
      )
    }
  })
  const space = wrapper.find('.r-space')
  expect(space.classes()).toContain('r-space--align-start')
})

test('should render wrap', async () => {
  const wrapper = mount({
    render() {
      return (
        <Space wrap>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="primary">按钮</Button>
        </Space>
      )
    }
  })
  const space = wrapper.find('.r-space')
  expect(space.classes()).toContain('r-space--wrap')
})
