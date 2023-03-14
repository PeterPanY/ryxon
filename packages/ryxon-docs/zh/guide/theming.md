---
title: 自定义主题
lang: zh
---

# 自定义主题

## 1. 主题定制

Ryxon 基于 CSS 变量提供了主题定制的能力，可以对组件样式进行统一修改，详见 [ConfigProvider 全局配置](/zh/component/config-provider.html) 组件。

## 2. 覆盖默认样式

如果主题定制不能满足你的需求，也可以通过**自定义样式类**来覆盖默认样式，参考下面的示例：

```html
<template>
  <r-button class="my-button">按钮</r-button>
</template>

<style>
  /** 覆盖 Button 最外层元素的样式 */
  .my-button {
    width: 200px;
  }

  /** 覆盖 Button 内部子元素的样式 */
  .my-button .r-button__text {
    color: red;
  }
</style>
```
