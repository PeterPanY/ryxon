# 命令

Ryxon CLI 中内置了一系列的命令，可以将命令添加到 npm scripts 中进行使用。

```json
// package.json
{
  "scripts": {
    "dev": "ryxon-cli dev",
    "test": "ryxon-cli test",
    "lint": "ryxon-cli lint",
    "release": "ryxon-cli release",
    "build-site": "ryxon-cli build-site"
  }
}
```

也可以通过 npm 自带的 [npx](https://github.com/npm/npx) 直接执行某个命令：

```bash
npx ryxon-cli dev
```

### dev

运行本地开发环境。

运行 dev 命令时，Ryxon CLI 会通过启动一个本地服务器，用于在开发过程中对文档和示例进行预览。

### build

构建组件库。

运行 build 命令会在 `es` 和 `lib` 目录下生成可用于生产环境的组件代码，详见 [目录结构](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-cli/docs/directory.zh-CN.md)。

发布 npm 时，请将以下配置加入到 `package.json` 中，使 npm 包能被正确识别:

```json
// package.json
{
  "main": "lib/index.js",
  "module": "es/index.js",
  "files": ["es", "lib"]
}
```

### build-site

构建文档站点，在 `site` 目录生成可用于生产环境的文档站点代码。

### release

发布组件库，发布前会自动执行 build 命令，并按照流程发布 npm 包。

### commit-lint

校验 commit message 的格式是否符合规范，需要配合 `husky` 在提交 commit 时触发。
