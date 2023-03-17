---
title: Style
lang: zh
---

# Style 内置样式

Ryxon 中默认包含了一些常用样式，可以直接通过 className 的方式使用。

## 文字省略

当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```html
<!-- 最多显示一行 -->
<div class="r-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</div>

<!-- 最多显示两行 -->
<div class="r-multi-ellipsis--l2">
  这是一段最多显示两行的文字，多余的内容会被省略
</div>

<!-- 最多显示三行 -->
<div class="r-multi-ellipsis--l3">
  这是一段最多显示三行的文字，多余的内容会被省略
</div>
```

## 1px 边框

为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```html
<!-- 上边框 -->
<div class="r-hairline--top"></div>

<!-- 下边框 -->
<div class="r-hairline--bottom"></div>

<!-- 左边框 -->
<div class="r-hairline--left"></div>

<!-- 右边框 -->
<div class="r-hairline--right"></div>

<!-- 上下边框 -->
<div class="r-hairline--top-bottom"></div>

<!-- 全边框 -->
<div class="r-hairline--surround"></div>
```

## 动画

:::demo 可以通过 `transition` 组件使用内置的动画类。

style/transition

:::

## 清除浮动

清除元素在 float 布局下的浮动，

```html
<div class="r-clearfix"></div>
```

## 安全区

为元素添加安全区适配。

```html
<!-- 顶部安全区 -->
<div class="r-safe-area-top"></div>

<!-- 底部安全区 -->
<div class="r-safe-area-bottom"></div>
```

## 触碰反馈

为元素添加触碰反馈效果，触碰后，元素的透明度会降低。通常用于按钮等可点击的元素上。

```html
<div class="r-haptics-feedback"></div>
```
