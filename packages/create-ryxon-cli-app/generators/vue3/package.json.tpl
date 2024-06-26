{
  "name": "<%= name %>",
  "version": "1.0.0",
  "description": "",
  "main": "lib/<%= name %>.js",
  "module": "es/index.js",
  "style": "lib/index.css",
  "typings": "lib/index.d.ts",
  "files": [
    "lib",
    "es"
  ],
  "scripts": {
    "dev": "ryxon-cli dev",
    "lint": "ryxon-cli lint",
    "build": "ryxon-cli build",
    "build:site": "ryxon-cli build-site",
    "release:site": "pnpm build:site && npx gh-pages -d site-dist"
  },
  "author": "",
  "nano-staged": {
    "*.md": "prettier --write",
    "*.{ts,tsx,js,vue,less,scss}": "prettier --write",
    "*.{ts,tsx,js,vue}": "eslint --fix"
  },
  "peerDependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@ryxon/cli": "^1.0.0",
    "vue": "^3.4.26",
    "sass": "^1.54.5"
  },
  "eslintConfig": {
    "root": true,
    "extends": [
      "@ryxon"
    ]
  },
  "prettier": {
    "singleQuote": true
  },
  "browserslist": [
    "Chrome >= 51",
    "iOS >= 10"
  ]
}
