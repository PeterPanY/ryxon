---
title: 国际化
lang: zh
---

# 国际化

Ryxon 组件 默认 使用中文，如果你希望使用其他语言，你可以参考下面的方案

## 多语言切换

Ryxon 通过 Locale 组件实现多语言支持，使用 `Locale.use` 方法可以切换当前使用的语言。

```js
import { Locale } from 'ryxon'
// 引入英文语言包
import enUS from 'ryxon/es/locale/lang/en-US'

Locale.use('en', enUS)
```

## 覆盖语言包

通过 `Locale.add` 方法可以实现文案的修改和扩展，示例如下：

```js
import { Locale } from 'ryxon'

const messages = {
  'zh-cn': {
    rPicker: {
      confirm: '关闭' // 将'确认'修改为'关闭'
    }
  }
}

Locale.add(messages)
```

## 日期和时间本地化

我们使用 [Day.js](https://day.js.org/docs/en/i18n/i18n) 库来管理组件的日期和时间，例如 `DatePicker`。 必须在 Day.js 中设置一个适当的区域，以便使国际化充分发挥作用。 您必须分开导入 Day.js 的区域设置。

```js
import 'dayjs/locale/zh-cn'
```

:::tip

语言 key 值需要对应 dayjs，否者时间国际化不起作用

:::

## 语言包

目前支持的语言:

| 语言     | 文件名 | dayjs |
| -------- | ------ | ----- |
| 英语     | en-US  | en    |
| 简体中文 | zh-CN  | zh-cn |

## 获取当前语言

你可以通过 `useCurrentLang` 方法来获取当前使用的语言。

- **类型：**

```ts
function useCurrentLang(): Ref<string>
```

- **示例：**

```ts
import { useCurrentLang } from 'ryxon'

const currentLang = useCurrentLang()

console.log(currentLang.value) // --> 'zh-cn'
```

## 常见问题

### 找不到所需的语言包？

如果上方列表中没有你需要的语言，欢迎给我们提 Pull Request 来增加新的语言包。

### 业务代码如何实现国际化？

可以使用 [vue-i18n](https://github.com/kazupon/vue-i18n) 来实现。

### 以 CDN 形式引入时，如何使用语言包？

目前没有提供 CDN 形式的语言包，可以手动拷贝语言包的内容来使用。

### 语言包中不包含 Sku 组件？

语言包中默认不包含 Sku 业务组件的语言配置，因此如果有 Sku 组件的国际化需求，请自行配置国际化文案。
