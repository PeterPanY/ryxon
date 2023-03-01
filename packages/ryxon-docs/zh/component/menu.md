---
title: Menu
lang: zh
---

# Menu 菜单

为网站提供导航功能的菜单。

## 顶栏

:::demo 导航菜单默认为垂直模式，通过将 `mode` 属性设置为 `horizontal` 来使导航菜单变更为水平模式。 另外，在菜单中通过 `sub-menu` 组件可以生成二级菜单。 Menu 还提供了 `background-color`、`text-color` 和 `active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

menu/basic

:::

## 左右

:::demo 您可以将菜单项放置在左边或右边。

menu/left-and-right

:::

## 侧栏

:::demo 通过 `r-menu-item-group` 组件可以实现菜单进行分组，分组名可以通过 `title` 属性直接设定，也可以通过具名 `slot` 来设定。

menu/vertical

:::

## Collapse 折叠面板

:::demo 垂直导航菜单可以被折叠

menu/collapse

:::
