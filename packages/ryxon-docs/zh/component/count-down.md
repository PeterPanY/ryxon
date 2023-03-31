---
title: CountDown
lang: zh
---

# CountDown 倒计时

用于实时展示倒计时数值，支持毫秒精度。

## 基础用法

:::demo `time` 属性表示倒计时总时长，单位为毫秒。

count-down/basic

:::

## 自定义格式

:::demo 通过 `format` 属性设置倒计时文本的内容。

count-down/format

:::

## 毫秒级渲染

:::demo 倒计时默认每秒渲染一次，设置 `millisecond` 属性可以开启毫秒级渲染。

count-down/millisecond

:::

## 自定义样式

:::demo 通过插槽自定义倒计时的样式，`timeData` 对象格式见下方表格。

count-down/time-data

:::

## 手动控制

:::demo 通过 ref 获取到组件实例后，可以调用 `start`、`pause`、`reset` 方法。

count-down/manual

:::

## API

### Props

| 参数        | 说明                 | 类型               | 默认值     |
| ----------- | -------------------- | ------------------ | ---------- |
| time        | 倒计时时长，单位毫秒 | `number \| string` | `0`        |
| format      | 时间格式             | `string`           | `HH:mm:ss` |
| auto-start  | 是否自动开始倒计时   | `boolean`          | `true`     |
| millisecond | 是否开启毫秒级渲染   | `boolean`          | `false`    |

### format 格式

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

### Events

| 事件名 | 说明             | 回调参数                   |
| ------ | ---------------- | -------------------------- |
| finish | 倒计时结束时触发 | -                          |
| change | 倒计时变化时触发 | `currentTime: CurrentTime` |

### Slots

| 名称    | 说明       | 参数                       |
| ------- | ---------- | -------------------------- |
| default | 自定义内容 | _currentTime: CurrentTime_ |

### CurrentTime 格式

| 名称         | 说明                   | 类型     |
| ------------ | ---------------------- | -------- |
| total        | 剩余总时间（单位毫秒） | _number_ |
| days         | 剩余天数               | _number_ |
| hours        | 剩余小时               | _number_ |
| minutes      | 剩余分钟               | _number_ |
| seconds      | 剩余秒数               | _number_ |
| milliseconds | 剩余毫秒               | _number_ |

### 方法

通过 ref 可以获取到 CountDown 实例并调用实例方法，详见[组件实例方法](/zh/guide/advanced-usage.html#组件实例方法)。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| start | 开始倒计时 | - | - |
| pause | 暂停倒计时 | - | - |
| reset | 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时 | - | - |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  CountDownProps,
  CountDownInstance,
  CountDownCurrentTime
} from 'ryxon'
```

`CountDownInstance` 是组件实例的类型，用法如下：

```ts
import { ref } from 'vue'
import type { CountDownInstance } from 'ryxon'

const countDownRef = ref<CountDownInstance>()

countDownRef.value?.start()
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称                       | 默认值                    | 描述 |
| -------------------------- | ------------------------- | ---- |
| --r-count-down-text-color  | `var(--r-text-color)`     | -    |
| --r-count-down-font-size   | `var(--r-font-size-md)`   | -    |
| --r-count-down-line-height | `var(--r-line-height-md)` | -    |

## 常见问题

### 在 iOS 系统上倒计时不生效？

如果你遇到了在 iOS 上倒计时不生效的问题，请确认在创建 Date 对象时没有使用`new Date('2020-01-01')`这样的写法，iOS 不支持以中划线分隔的日期格式，正确写法是`new Date('2020/01/01')`。

对此问题的详细解释：[stackoverflow](https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios)。
