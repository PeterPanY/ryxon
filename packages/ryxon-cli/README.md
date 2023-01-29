# Ryxon CLI

Ryxon CLI is a tool for building vue component library. You can quickly build a full-featured Vue component library with ryxon-cli.

🇨🇳 <a href="./README.zh-CN.md">查看中文版介绍</a>

---

### Features

- Provides rich commands covering the complete process from development to deploy
- Based on conventional directory structure. Generate elegant document website and component examples automatically.
- ESlint built-in.
- Support Tree Shaking/Theme Customization/Import on Demand

### Quickstart

To create a Ryxon CLI project, run:

```bash
yarn create ryxon-cli-app
```

### Install Manually

```shell
# via npm
npm i @ryxon/cli -D

# via yarn
yarn add @ryxon/cli -D

# via pnpm
pnpm add @ryxon/cli -D
```

Please add the followed config to `package.json` file.

```json
{
  "scripts": {
    "dev": "ryxon-cli dev",
    "test": "ryxon-cli test",
    "lint": "ryxon-cli lint",
    "build": "ryxon-cli build",
    "prepare": "husky install",
    "release": "ryxon-cli release",
    "build-site": "ryxon-cli build-site"
  },
  "nano-staged": {
    "*.md": "prettier --write",
    "*.{ts,tsx,js,vue,less,scss}": "prettier --write",
    "*.{ts,tsx,js,vue}": "eslint --fix"
  },
  "eslintConfig": {
    "root": true,
    "extends": ["@ryxon"]
  },
  "prettier": {
    "singleQuote": true
  },
  "browserslist": ["Chrome >= 51", "iOS >= 10"]
}
```

## More Details

- [cli](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-cli/docs/commands.md)
- [config](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-cli/docs/config.md)
- [directory structure](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-cli/docs/directory.md)
- [CHANGELOG](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-cli/changelog.md)
