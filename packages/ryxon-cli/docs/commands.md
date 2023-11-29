# Commands

You can add built-in commands to `npm scripts` to use it.

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

Additionally, [npx](https://github.com/npm/npx) can used to be run those commands.

```bash
npx ryxon-cli dev
```

### dev

Start local dev server for browsering components and demo.

### build

Build Vue component library.

Files will be output to `es` and `lib` directory. More details [directory structure](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-cli/docs/directory.md)

Please add the followed config to `package.json` when publish to npm.

```json
// package.json
{
  "main": "lib/index.js",
  "module": "es/index.js",
  "files": ["es", "lib"]
}
```

### build-site

Build documentation website. Files will be output to `site` directory.

### release

Publish to npm. `build` will be automatically execute when run `release`.

### commit-lint

Validate the format of commit message. Need `husky` to do this.

```bash
npx husky add .husky/commit-msg 'npx --no-install ryxon-cli commit-lint $1'
```
