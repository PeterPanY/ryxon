<p align="center">
    <img alt="logo" src="https://fastly.jsdelivr.net/npm/@ryxon/assets/logo.png" width="120" style="margin-bottom: 10px;">
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
  🔥 <a href="https://ryxon-contrib.gitee.io/ryxon">文档网站（国内）</a>
  &nbsp;
  🌈 <a href="https://ryxon-ui.github.io/ryxon">文档网站（GitHub）</a>
</p>

---

### 介绍

Ryxon 是一个**轻量、可靠的组件库**，于 2023 年开源。

目前 Ryxon 官方提供了[Vue 3 版本](https://ryxon-contrib.gitee.io/ryxon)

## 特性

- 🚀 性能极佳，组件平均体积小于 1KB（min+gzip）
- 🚀 70+ 个高质量组件，覆盖主流场景
- 🚀 零外部依赖，不依赖三方 npm 包
- 💪 使用 TypeScript 编写，提供完整的类型定义
- 💪 单元测试覆盖率超过 90%，提供稳定性保障
- 📖 提供丰富的中英文文档和组件示例
- 📖 提供 Sketch 和 Axure 设计资源
- 🍭 支持 Vue 2、Vue 3 和微信小程序
- 🍭 支持主题定制，内置 700+ 个主题变量
- 🍭 支持按需引入和 Tree Shaking
- 🍭 支持无障碍访问（持续改进中）
- 🍭 支持深色模式
- 🍭 支持 Nuxt 3
- 🍭 支持服务器端渲染
- 🌍 支持国际化，内置 30+ 种语言包

## 安装

在现有项目中使用 Ryxon 时，可以通过 `npm` 进行安装：

```bash
# Vue 3 项目，安装最新版 Ryxon
npm i ryxon
```

当然，你也可以通过 `yarn` 或 `pnpm` 进行安装：

```bash
# 通过 yarn 安装
yarn add ryxon

# 通过 pnpm 安装
pnpm add ryxon
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

ryxon 也支持按需引入、CDN 引入等方式，详细说明见 [快速上手](https://ryxon-contrib.gitee.io/ryxon#/zh/quickstart).

## 在 Cloud IDE 中预览

[https://idegithub.com/youzan/ryxon](https://idegithub.com/youzan/ryxon)

## 浏览器支持

Ryxon 支持现代浏览器以及 Chrome >= 51、iOS >= 10.0（与 Vue 3 一致）。

## 官方生态

由 Ryxon 官方团队维护的项目如下：

| 项目 | 描述 |
| --- | --- |
| [ryxon-cli](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-cli) | 开箱即用的组件库搭建工具 |
| [ryxon-icons](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-icons) | Ryxon 图标库 |
| [ryxon-touch-emulator](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-touch-emulator) | 在桌面端使用 Ryxon 的辅助库 |

## 社区生态

由社区维护的项目如下，欢迎补充：

| 项目 | 描述 |
| --- | --- |
| [ryxon-theme](https://github.com/Aisen60/ryxon-theme) | Ryxon 在线主题预览工具 |
| [sfc-playground-ryxon](https://github.com/zhixiaoqiang/sfc-playground-ryxon) | Ryxon Playground. 当前仅支持 Ryxon 3.0 以上 |

## 链接

- [详细文档](https://ryxon-contrib.gitee.io/ryxon)
- [更新日志](https://ryxon-contrib.gitee.io/ryxon#/zh/changelog)
- [码云镜像仓库](https://gitee.com/ryxon-contrib/ryxon)
- [Discussions 讨论区](https://github.com/PeterPanY/ryxon/discussions)

## 核心团队

以下是 Ryxon 和 Ryxon Weapp 的核心贡献者们：

## 贡献者们

感谢以下小伙伴们为 Ryxon 发展做出的贡献：

## 贡献指南

使用过程中发现任何问题都可以提 [Issue](https://github.com/PeterPanY/ryxon/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://github.com/PeterPanY/ryxon/pulls)。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
