// @ts-nocheck
import {
  h,
  ref,
  computed,
  watchEffect,
  defineComponent,
  type ExtractPropTypes
} from 'vue'

import {
  clamp,
  mutable,
  isString,
  truthProp,
  iconPropType,
  definePropType,
  makeStringProp,
  makeNumberProp,
  makeNumericProp,
  createNamespace,
  type Numeric
} from '../utils'

import { Icon } from '../icon'
import { Select } from '../select'
import { Option } from '../option'
import { Input } from '../input'

const [, bem, t] = createNamespace('pagination')

type PageItem = {
  text: Numeric
  number: number
  active?: boolean
}

const makePage = (
  number: number,
  text: Numeric,
  active?: boolean
): PageItem => ({ number, text, active })

export type PaginationMode = 'simple' | 'multi'

export type PaginationLayout =
  | 'prev'
  | 'pager'
  | 'next'
  | 'total'
  | 'sizes'
  | 'jumper'

export const paginationProps = {
  mode: makeStringProp<PaginationMode>('multi'),
  prevText: String,
  prevIcon: iconPropType,
  nextText: String,
  nextIcon: iconPropType,
  pageCount: makeNumericProp(0),
  modelValue: makeNumberProp(0),
  totalItems: makeNumericProp(0),
  showPageSize: makeNumericProp(5),
  itemsPerPage: { type: Number, default: 10 },
  forceEllipses: Boolean,
  showPrevButton: truthProp,
  showNextButton: truthProp,
  pageSizes: {
    type: definePropType<number[]>(Array),
    default: () => mutable([10, 20, 30, 40, 50, 100] as const)
  },
  popperClass: { type: String, default: '' },
  layout: {
    type: String,
    default: (['prev', 'pager', 'next'] as PaginationLayout[]).join(', ')
  }
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export default defineComponent({
  name: 'RPagination',
  props: paginationProps,
  emits: ['change', 'update:modelValue', 'update:itemsPerPage', 'size-change'],
  setup(props, { emit, slots }) {
    // 页数计算
    const count = computed(() => {
      const { pageCount, totalItems, itemsPerPage } = props
      const count = +pageCount || Math.ceil(+totalItems / +itemsPerPage)
      return Math.max(1, count)
    })

    const pages = computed(() => {
      const items: PageItem[] = []
      const pageCount = count.value // 总页数
      const showPageSize = +props.showPageSize // 显示的页码个数
      const { modelValue, forceEllipses } = props

      // 默认页面限制
      let startPage = 1
      let endPage = pageCount
      const isMaxSized = showPageSize < pageCount

      // recompute if showPageSize
      if (isMaxSized) {
        // 当前页面显示在可见页面的中间
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1)
        endPage = startPage + showPageSize - 1

        // 如果超出限制，则进行调整
        if (endPage > pageCount) {
          endPage = pageCount
          startPage = endPage - showPageSize + 1
        }
      }

      // 添加页码链接
      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === modelValue)
        items.push(page)
      }

      // 添加链接以在页面集之间移动
      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          const prevPages = makePage(startPage - 1, '...')
          items.unshift(prevPages)
          items.unshift(makePage(1, 1))
        }

        if (endPage < pageCount) {
          const nextPages = makePage(endPage + 1, '...')
          items.push(nextPages)
          items.push(makePage(pageCount, pageCount))
        }
      }

      return items
    })

    // 更新modelValue
    const updateModelValue = (value: number, emitChange?: boolean) => {
      value = clamp(value, 1, count.value)

      if (props.modelValue !== value) {
        emit('update:modelValue', value)

        if (emitChange) {
          emit('change', value)
        }
      }
    }

    // 格式化 modelValue
    watchEffect(() => updateModelValue(props.modelValue))

    // 上一页按钮
    const renderPrevButton = () => {
      const { mode, modelValue, showPrevButton } = props

      if (!showPrevButton) {
        return
      }

      const slot = slots['prev-text']
      const disabled = modelValue === 1

      return (
        <li
          class={[
            bem('item', { disabled, border: mode === 'simple', prev: true }),
            bem('surround')
          ]}
        >
          <button
            type="button"
            disabled={disabled}
            onClick={() => updateModelValue(modelValue - 1, true)}
          >
            {slot ? (
              slot()
            ) : props.prevIcon ? (
              <Icon name={isString(props.prevIcon) ? props.prevIcon : ''}>
                {!isString(props.prevIcon) && h(props.prevIcon)}
              </Icon>
            ) : (
              props.prevText || t('prev')
            )}
          </button>
        </li>
      )
    }

    // 下一页按钮
    const renderNextButton = () => {
      const { mode, modelValue, showNextButton } = props
      const slot = slots['next-text']
      const disabled = modelValue === count.value

      if (!showNextButton) {
        return
      }

      return (
        <li
          class={[
            bem('item', { disabled, border: mode === 'simple', next: true }),
            bem('surround')
          ]}
        >
          <button
            type="button"
            disabled={disabled}
            onClick={() => updateModelValue(modelValue + 1, true)}
          >
            {slot ? (
              slot()
            ) : props.nextIcon ? (
              <Icon name={isString(props.nextIcon) ? props.nextIcon : ''}>
                {!isString(props.nextIcon) && h(props.nextIcon)}
              </Icon>
            ) : (
              props.nextText || t('next')
            )}
          </button>
        </li>
      )
    }

    // 每页多少条显示
    const renderSizes = () => {
      const innerPageSize = ref<number>(props.itemsPerPage!)

      const handleChange = (val: number) => {
        emit('update:itemsPerPage', val)
        emit('size-change', val)
      }

      return (
        <li class={bem('item', { sizes: true })}>
          <Select
            v-model={innerPageSize.value}
            popper-class={props.popperClass}
            onChange={handleChange}
          >
            {props.pageSizes.map((item) => (
              <Option value={item} label={item + t('pagesize')}></Option>
            ))}
          </Select>
        </li>
      )
    }

    // 总数显示
    const renderTotal = () => (
      <li class={bem('item', { total: true })}>
        {t('total', props.totalItems)}
      </li>
    )

    // 简单模式
    const renderDesc = () => (
      <li class={bem('page-desc')}>
        {slots.pageDesc
          ? slots.pageDesc()
          : `${props.modelValue}/${count.value}`}
      </li>
    )

    // 按钮展示
    const renderPages = () =>
      pages.value.map((page) => (
        <li
          class={[
            bem('item', { active: page.active, page: true }),
            bem('surround')
          ]}
        >
          <button
            type="button"
            aria-current={page.active || undefined}
            onClick={() => updateModelValue(page.number, true)}
          >
            {slots.page ? slots.page(page) : page.text}
          </button>
        </li>
      ))

    const renderJumper = () => {
      const handleInputChange = (val: number) => {
        updateModelValue(val, true)
      }

      return (
        <li class={bem('item', { jump: true })}>
          <span class={bem('goto')}>{t('goto')}</span>
          <Input
            model-value={props.modelValue}
            onChange={handleInputChange}
          ></Input>
          <span class={bem('classifier')}>{t('pageClassifier')}</span>
        </li>
      )
    }

    // 将组件布局拆分数组
    const components = props.layout
      .split(',')
      .map((item: string) => item.trim()) as PaginationLayout[]

    // 组件渲染
    const renderComponents = (item: string) => {
      // 上一页
      if (item === 'prev') return renderPrevButton()
      // 中间信息显示
      if (item === 'pager')
        return props.mode === 'simple' ? renderDesc() : renderPages()
      // 下一页
      if (item === 'next') return renderNextButton()
      // 每页数量
      if (item === 'sizes') return renderSizes()
      if (item === 'total') return renderTotal()
      if (item === 'jumper') return renderJumper()
    }

    return () => (
      <nav role="navigation" class={bem()}>
        <ul class={bem('items')}>{components.map(renderComponents)}</ul>
      </nav>
    )
  }
})
