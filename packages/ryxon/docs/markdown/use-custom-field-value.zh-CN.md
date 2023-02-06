# useCustomInputValue

### 介绍

用于自定义 Form 组件中的表单项。

## 代码演示

### 基本用法

如果需要自定义表单项，可以在 Input 组件的 `input` 插槽中插入你的自定义组件，并在自定义组件内部调用 `useCustomInputValue` 方法。

#### 自定义组件

首先，在你的自定义组件中，调用 `useCustomInputValue` 方法，并传入一个回调函数，这个函数返回值为表单项的值。

```js
// MyComponent.vue
import { ref } from 'vue'
import { useCustomInputValue } from '@ryxon/use'

export default {
  setup() {
    const myValue = ref(0)

    // 此处传入的值会替代 Input 组件内部的 value
    useCustomInputValue(() => myValue.value)

    return { myValue }
  }
}
```

#### 表单

接着，在 Form 组件中嵌入你的自定义组件，当提交表单时，即可获取到自定义表单项的值。

```html
<r-form>
  <!-- 这是一个自定义表单项 -->
  <!-- 当表单提交时，会包括 useCustomInputValue 中传入的值 -->
  <r-input name="my-input" label="自定义表单项">
    <template #input>
      <my-component />
    </template>
  </r-input>
</r-form>
```

## API

### 类型定义

```ts
function useCustomInputValue(customValue: () => unknown): void
```

### 参数

| 参数        | 说明               | 类型            | 默认值 |
| ----------- | ------------------ | --------------- | ------ |
| customValue | 获取表单项值的函数 | _() => unknown_ | -      |
