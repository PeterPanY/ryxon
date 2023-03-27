# Collapse 折叠面板

### 介绍

将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue'
import { Collapse, CollapseItem } from 'ryxon'

const app = createApp()
app.use(Collapse)
app.use(CollapseItem)
```

## 代码演示

### 基础用法

通过 `v-model` 控制展开的面板列表，`activeNames` 为数组格式。

```html
<r-collapse v-model="activeNames">
  <r-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行。
  </r-collapse-item>
  <r-collapse-item title="标题2" name="2">
    技术无非就是那些开发它的人的共同灵魂。
  </r-collapse-item>
  <r-collapse-item title="标题3" name="3">
    在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
  </r-collapse-item>
</r-collapse>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const activeNames = ref(['1'])
    return { activeNames }
  }
}
```

### 手风琴

通过 `accordion` 可以设置为手风琴模式，最多展开一个面板，此时 `activeName` 为字符串格式。

```html
<r-collapse v-model="activeName" accordion>
  <r-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行。
  </r-collapse-item>
  <r-collapse-item title="标题2" name="2">
    技术无非就是那些开发它的人的共同灵魂。
  </r-collapse-item>
  <r-collapse-item title="标题3" name="3">
    在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
  </r-collapse-item>
</r-collapse>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const activeName = ref('1')
    return { activeName }
  }
}
```

### 禁用状态

通过 `disabled` 属性来禁用单个面板。

```html
<r-collapse v-model="activeNames">
  <r-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行。
  </r-collapse-item>
  <r-collapse-item title="标题2" name="2" disabled>
    技术无非就是那些开发它的人的共同灵魂。
  </r-collapse-item>
  <r-collapse-item title="标题3" name="3" disabled>
    在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
  </r-collapse-item>
</r-collapse>
```

### 自定义标题内容

通过 `title` 插槽可以自定义标题栏的内容。

```html
<r-collapse v-model="activeNames">
  <r-collapse-item name="1">
    <template #title>
      <div>标题1 <r-icon name="question-o" /></div>
    </template>
    代码是写出来给人看的，附带能在机器上运行。
  </r-collapse-item>
  <r-collapse-item title="标题2" name="2" icon="shop-o">
    技术无非就是那些开发它的人的共同灵魂。
  </r-collapse-item>
</r-collapse>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const activeNames = ref(['1'])
    return { activeNames }
  }
}
```

### 全部展开与全部切换

通过 `Collapse` 实例上的 `toggleAll` 方法可以实现全部展开与全部切换。

```html
<r-collapse v-model="activeNames">
  <r-collapse-item title="标题1" name="1">
    代码是写出来给人看的，附带能在机器上运行。
  </r-collapse-item>
  <r-collapse-item title="标题2" name="2">
    技术无非就是那些开发它的人的共同灵魂。
  </r-collapse-item>
  <r-collapse-item title="标题3" name="3">
    在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
  </r-collapse-item>
</r-collapse>

<r-button type="primary" @click="openAll">全部展开</r-button>
<r-button type="primary" @click="toggleAll">全部切换</r-button>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const activeNames = ref(['1']);
    const collapse = ref(null);

    const openAll = () => {
      collapse.value.toggleAll(true);
    }
    const toggleAll = () => {
      collapse.value.toggleAll();
    },

    return {
      activeNames,
      openAll,
      toggleAll,
      collapse,
    };
  },
};
```

> Tips: 手风琴模式下无法使用 toggleAll 方法。

## API

### Collapse Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前展开面板的 name | 手风琴模式：_number \| string_<br>非手风琴模式：_(number \| string)[]_ | - |
| accordion | 是否开启手风琴模式 | _boolean_ | `false` |
| border | 是否显示外边框 | _boolean_ | `true` |

### Collapse Events

| 事件名 | 说明           | 回调参数                                 |
| ------ | -------------- | ---------------------------------------- |
| change | 切换面板时触发 | activeNames: 类型与 v-model 绑定的值一致 |

### CollapseItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 唯一标识符，默认为索引值 | _number \| string_ | `index` |
| icon | 标题栏左侧图标名称或图片链接，等同于 Icon 组件的 [name 属性](/zh/component/icon.html#api) | _string_ | - |
| size | 标题栏大小，可选值为 `large` | _string_ | - |
| title | 标题栏左侧内容 | _number \| string_ | - |
| value | 标题栏右侧内容 | _number \| string_ | - |
| label | 标题栏描述信息 | _number \| string_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| is-link | 是否展示标题栏右侧箭头并开启点击反馈 | _boolean_ | `true` |
| disabled | 是否禁用面板 | _boolean_ | `false` |
| readonly | 是否为只读状态，只读状态下无法操作面板 | _boolean_ | `false` |
| lazy-render | 是否在首次展开时才渲染面板内容 | _boolean_ | `true` |
| title-class | 左侧标题额外类名 | _string_ | - |
| value-class | 右侧内容额外类名 | _string_ | - |
| label-class | 描述信息额外类名 | _string_ | - |

### Collapse 方法

通过 ref 可以获取到 CollapseItem 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggleAll | 切换所有面板展开状态，传 `true` 为全部展开，`false` 为全部收起，不传参为全部切换 | _options?: boolean \| object_ | - |

### toggleAll 方法示例

```js
import { ref } from 'vue';
import type { CollapseInstance } from 'ryxon';

const collapseRef = ref<CollapseInstance>();

// 全部切换
collapseRef.value?.toggleAll();
// 全部展开
collapseRef.value?.toggleAll(true);
// 全部收起
collapseRef.value?.toggleAll(false);

// 全部全部切换，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  skipDisabled: true,
});
// 全部选中，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  expanded: true,
  skipDisabled: true,
});
```

### CollapseItem 方法

通过 ref 可以获取到 CollapseItem 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggle | 切换面板展开状态，传 `true` 为展开，`false` 为收起，不传参为切换 | _expand?: boolean_ | - |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  CollapseProps,
  CollapseItemProps,
  CollapseItemInstance,
  CollapseToggleAllOptions
} from 'ryxon'
```

`CollapseItemInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { CollapseItemInstance } from 'ryxon'

const collapseItemRef = ref<CollapseItemInstance>()

collapseItemRef.value?.toggle()
```

### CollapseItem Slots

| 名称       | 说明                 |
| ---------- | -------------------- |
| default    | 面板内容             |
| title      | 自定义标题栏左侧内容 |
| value      | 自定义标题栏右侧内容 |
| label      | 自定义标题栏描述信息 |
| icon       | 自定义标题栏左侧图标 |
| right-icon | 自定义标题栏右侧图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --r-collapse-item-duration | _var(--r-duration-base)_ | - |
| --r-collapse-item-content-padding | _var(--r-padding-sm) var(--r-padding-md)_ | - |
| --r-collapse-item-content-font-size | _var(--r-font-size-md)_ | - |
| --r-collapse-item-content-line-height | _1.5_ | - |
| --r-collapse-item-content-text-color | _var(--r-text-color-2)_ | - |
| --r-collapse-item-content-background | _var(--r-background-2)_ | - |
| --r-collapse-item-title-disabled-color | _var(--r-text-color-3)_ | - |