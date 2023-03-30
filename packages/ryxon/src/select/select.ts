import {
  iconPropType,
  makeStringProp,
  ComponentSize,
  isValidComponentSize
} from '../utils'
import { SelectTheme, SelectPlacement } from './types'
import { ArrowDown, CircleClose } from '@ryxon/icons'
import type { PropType, TeleportProps, ExtractPropTypes } from 'vue'
import type { TagType } from '../tag'

// select传值
export const selectProps = {
  id: String,
  // 选中项绑定值
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined
  },
  multiple: Boolean, // 是否多选
  disabled: Boolean, // 是否禁用
  valueKey: { type: String, default: 'value' }, // 作为 value 唯一标识的键名，绑定值为对象类型时必填
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default',
    validator: isValidComponentSize
  },
  clearable: Boolean, // 是否可以清空选项
  collapseTags: Boolean, // 多选时是否将选中值按文字的形式展示
  collapseTagsTooltip: { type: Boolean, default: false }, // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
  multipleLimit: { type: Number, default: 0 }, // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
  name: String, // Select 输入框的原生 name 属性
  theme: makeStringProp<SelectTheme>('light'),
  autocomplete: { type: String, default: 'off' }, // Select 输入框的原生 autocomplete 属性
  placeholder: String, // 占位符
  filterable: Boolean, // Select 组件是否可筛选
  allowCreate: Boolean, // 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。
  filterMethod: Function, // 自定义筛选方法
  remote: Boolean, // 其中的选项是否从服务器远程加载
  remoteMethod: Function, // 自定义远程搜索方法
  remoteShowSuffix: { type: Boolean, default: false }, // 远程搜索方法显示后缀图标
  loading: Boolean, // 是否正在从远程获取数据
  loadingText: String, // 从服务器加载内容时显示的文本
  noMatchText: String, // 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置
  noDataText: String, // 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容
  popperClass: { type: String, default: '' }, // 选择器下拉菜单的自定义类名
  reserveKeyword: { type: Boolean, default: true },
  defaultFirstOption: Boolean, // 是否在输入框按下回车时，选择第一个匹配项。 需配合 filterable 或 remote 使用
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body'
  },
  automaticDropdown: Boolean, // 对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单
  clearIcon: { type: iconPropType, default: CircleClose }, // 自定义清除图标
  fitInputWidth: { type: Boolean, default: false }, // 下拉框的宽度是否与输入框相同
  suffixIcon: { type: iconPropType, default: ArrowDown }, // 自定义后缀图标组件
  suffixTransition: { type: Boolean, default: true }, // 下拉菜单显示/消失时后缀图标的动画
  tagType: makeStringProp<TagType>('info'),
  placement: makeStringProp<SelectPlacement>('bottom')
}

// Select传参数据类型
export type SelectProps = ExtractPropTypes<typeof selectProps>
