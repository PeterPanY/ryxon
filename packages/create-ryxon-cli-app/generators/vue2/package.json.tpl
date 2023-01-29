{
  "name": "<%= name %>",
  "version": "1.0.0",
  "description": "",
  "main": "lib/<%= name %>.js",
  "style": "lib/index.css",
  "files": [
    "lib",
    "es"
  ],
  "scripts": {
    "dev": "ryxon-cli dev",
    "test": "ryxon-cli test",
    "lint": "ryxon-cli lint",
    "build": "ryxon-cli build",
    "release": "ryxon-cli release",
    "test:coverage": "open test/coverage/index.html",
    "build-site": "ryxon-cli build-site && npx gh-pages -d site-dist"
  },
  "author": "",
  "husky": {
    "hooks": {
      "pre-commit": "nano-staged",
      "commit-msg": "ryxon-cli commit-lint"
    }
  },
  "nano-staged": {
    "*.{ts,tsx,js,jsx,vue}": "eslint --fix"
  },
  "peerDependencies": {
    "vue": "^2.6.11",
    "vue-template-compiler": "^2.6.11"
  },
  "devDependencies": {
    "@ryxon/cli": "^2.0.0",
    "vue": "^2.6.11",
    "vue-template-compiler": "^2.6.11"
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
    "Android >= 4.0",
    "iOS >= 8"
  ]
}
