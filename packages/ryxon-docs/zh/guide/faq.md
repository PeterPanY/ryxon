---
title: 常见问题
lang: zh
---

# 常见问题

## 在 HTML 中无法正确渲染组件？

在 HTML 中使用 Ryxon 组件时，你可能会碰到部分示例代码无法正确渲染的情况，比如下面的用法：

```html
<r-cell-group>
  <r-cell title="单元格" value="内容" />
  <r-cell title="单元格" value="内容" />
</r-cell-group>
```

这是因为 HTML 并不支持自闭合的自定义元素，也就是说 `<r-cell />` 这样的语法是不被识别的，使用完整的闭合标签可以避免这个问题：

```html
<r-cell-group>
  <r-cell title="单元格" value="内容"></r-cell>
  <r-cell title="单元格" value="内容"></r-cell>
</r-cell-group>
```

在单文件组件、字符串模板和 JSX 中可以使用自闭合的自定义元素，因此不会出现这个问题。

## 在 iOS 上点击组件时，无法触发点击反馈效果？

这是因为 iOS Safari 默认不会触发 `:active` 伪类，解决方法是在 `body` 标签上添加一个空的 `ontouchstart` 属性：

```html
<body ontouchstart="">
  ...
</body>
```

参考链接：[stackoverflow - :active pseudo-class doesn't work in mobile safari](https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari/33681490#33681490)

## 是否支持在 uni-app 中使用？

Ryxon 所有组件都是基于 Vue 框架实现的，没有针对 uni-app 进行适配，因此不保证各个组件在 uni-app 下的可用性。

如果你在 uni-app 中使用 Ryxon 遇到问题，建议向 uni-app 进行反馈。

## 如何进行移动端响应式适配？

参见[浏览器适配](/zh/guide/advanced-usage.html#viewport-布局)。
