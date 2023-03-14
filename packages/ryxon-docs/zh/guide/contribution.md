---
title: 开发指南
lang: zh
---

# 开发指南

## 本地开发

在进行本地开发前，请先确保你的开发环境中安装了 [Node.js >= 14.19.0](https://nodejs.org)。

按照下面的步骤操作，即可在本地开发 Ryxon 组件。

```bash
# 克隆仓库
git clone git@github.com:PeterPanY/ryxon.git

# 启用 pnpm 包管理器
corepack enable

# 如果无法使用 corepack，你也可以手动安装 pnpm
npm install -g pnpm@7

# 安装依赖
pnpm i

# 进入开发模式，浏览器访问 localhost
pnpm dev
```

仓库的不同分支对应不同的 Ryxon 版本，请切换到对应分支进行开发：

- master 分支对应 Ryxon 版本，适用于 Vue 3

## 镜像仓库

如果 GitHub 克隆速度较慢，你也可以直接克隆 Ryxon 在 gitee 上的[镜像仓库](https://gitee.com/peterpy0921/ryxon)：

```bash
git clone git@gitee.com:peterpy0921/ryxon.git
```

镜像仓库仅用于加快国内的访问速度，请勿在镜像仓库中提 issue 和 Pull Request。

## 目录结构

Ryxon 采用 monorepo 进行代码管理，所有子包在 `packages` 目录下:

```
root
└─ packages
   ├─ ryxon        # 组件库
   ├─ ryxon-cli    # 脚手架
   ├─ ryxon-icons  # 图标库
   ├─ ryxon-use    # Composition API
   └─ ....        # 其他周边 npm 包
```

其中，`ryxon` 目录为组件库的核心代码：

```
ryxon
├─ src              # 组件源代码
├─ test             # 单测工具类
└─ ryxon.config.mjs  # 文档网站配置
```

`src` 目录包含各个组件的源码，每个文件夹对应一个组件：

```
src
└─ button
   ├─ test             # 单元测试
   ├─ Component.tsx    # 组件
   ├─ index.ts         # 组件入口
   ├─ index.less       # 样式
   ├─ var.less         # 样式变量
```

## 代码规范

在编写代码时，请注意：

- 确保代码可以通过仓库的 ESLint 校验。
- 确保代码格式是规范的，使用 prettier 进行代码格式化。
- 确保没有使用超出兼容性范围的 API，比如 `async/await`。

## Issue 规范

- 遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
- 提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。
