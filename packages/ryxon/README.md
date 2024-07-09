<p align="center">
    <img alt="logo" src="https://ryxon.cn/favicon.ico" width="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Ryxon</h1>

<p align="center">轻量、可靠的 Vue 组件库</p>

<p align="center">
    <img src="https://img.shields.io/npm/v/ryxon?style=flat-square" alt="npm version" />
    <img src="https://img.shields.io/codecov/c/github/ryxon-ui/ryxon/dev.svg?style=flat-square&color=#4fc08d" alt="Coverage Status" />
    <img src="https://img.shields.io/npm/dm/ryxon.svg?style=flat-square&color=#4fc08d" alt="downloads" />
    <img src="https://img.badgesize.io/https://unpkg.com/ryxon/lib/ryxon.min.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
</p>

<p align="center">
  🌈 <a href="https://peterpany.github.io/ryxon/">文档网站（GitHub）</a>
</p>

---

### 介绍

Ryxon 是一个**轻量、可靠的组件库**，于 2023 年开源。

目前 Ryxon 官方只提供了[Vue 3 版本](https://peterpany.github.io/ryxon/)

## 特性

- 🚀 性能极佳，组件平均体积小于 1KB（min+gzip）
- 💪 使用 TypeScript 编写，提供完整的类型定义
- 📖 提供丰富的文档和组件示例
- 🍭 支持 Vue 3
- 🍭 支持主题定制
- 🍭 支持按需引入和 Tree Shaking
- 🍭 支持深色模式
- 🍭 支持 Nuxt 3
- 🍭 支持服务器端渲染
- 🌍 支持国际化

## 安装

在现有项目中使用 Ryxon 时，可以通过 `npm` 进行安装：

```bash
# Vue 3 项目，安装最新版 Ryxon
npm i ryxon
```

当然，你也可以通过 `yarn` 或 `pnpm` 或 `bun` 进行安装：

```bash
# 通过 yarn 安装
yarn add ryxon

# 通过 pnpm 安装
pnpm add ryxon

# 通过 bun 安装
bun add ryxon
```

## 快速上手

```js
import { createApp } from 'vue'
// 1. 引入你需要的组件
import { Button } from 'ryxon'
// 2. 引入组件样式
import 'ryxon/lib/index.css'

const app = createApp()

// 3. 注册你需要的组件
app.use(Button)
```

ryxon 也支持按需引入、CDN 引入等方式，详细说明见 [快速上手](https://peterpany.github.io/ryxon/zh/guide/quickstart.html).

## 浏览器支持

Ryxon 支持现代浏览器以及 Chrome >= 51、iOS >= 10.0（与 Vue 3 一致）。

## 官方生态

由 Ryxon 官方团队维护的项目如下：

| 项目 | 描述 |
| --- | --- |
| [ryxon-icons](https://github.com/PeterPanY/ryxon/tree/master/packages/ryxon-icons) | Ryxon 图标库 |

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
