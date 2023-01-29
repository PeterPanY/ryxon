# Quickstart

## Install

### npm

Using `npm` to install:

```bash
# install latest Ryxon for Vue 3 project
npm i ryxon
```

Using `yarn` or `pnpm`:

```bash
# with yarn
yarn add ryxon

# with pnpm
pnpm add ryxon
```

### CDN

The easiest way to use Ryxon is to include a CDN link in the HTML file, after which you can access all components via the global variable `ryxon`.

```html
<!-- import style -->
<link
  rel="stylesheet"
  href="https://fastly.jsdelivr.net/npm/ryxon@4/lib/index.css"
/>

<!-- import script -->
<script src="https://fastly.jsdelivr.net/npm/vue@3"></script>
<script src="https://fastly.jsdelivr.net/npm/ryxon@4/lib/ryxon.min.js"></script>

<script>
  // Render the Button component
  const app = Vue.createApp({
    template: `<r-button>Button</r-button>`,
  });
  app.use(ryxon);

  // Register Lazyload directive
  app.use(ryxon.Lazyload);

  // Call function component
  ryxon.showToast('Message');

  app.mount('#app');
</script>
```

#### Free CDN

You can use Ryxon through these free CDN services:

- [jsdelivr](https://www.jsdelivr.com/package/npm/ryxon)
- [cdnjs](https://cdnjs.com/libraries/ryxon)
- [unpkg](https://unpkg.com/)

Note: Free CDN is generally used for making prototypes or personal projects. It is not recommended to use free CDN in production environment.

For enterprise developers, we recommend:

- install with npm, use build tools to bundle it
- download the scripts, host it on your own server

### CLI

We recommend to use [Vue CLI](https://cli.vuejs.org/) to create a new project.

```bash
# Install Vue CLI
npm install -g @vue/cli

# Create a project
vue create hello-world

# Open GUI
vue ui
```

![](https://fastly.jsdelivr.net/npm/@ryxon/assets/vue-cli-demo-201809030812.png)

In the GUI, click on 'Dependencies' -> `Install Dependencies` and add `ryxon` to the dependencies.

## Usage

### Basic Usage

The basic usage of Ryxon components;

```js
import { createApp } from 'vue';
// 1. Import the components you need
import { Button } from 'ryxon';
// 2. Import the components style
import 'ryxon/lib/index.css';

const app = createApp();

// 3. Register the components you need
app.use(Button);
```

> Tip: Ryxon supports Tree Shaking by default, so you don't need to configure any plugins, the unused JS code will be removed by Tree Shaking, but CSS styles cannot be optimized by it.

### Import on demand

If you are using vite, webpack or vue-cli, you can use [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components), this plugin can help you to auto importing components and reduce CSS file size.

#### 1. Install Plugin

```bash
# with npm
npm i unplugin-vue-components -D

# with yarn
yarn add unplugin-vue-components -D

# with pnpm
pnpm add unplugin-vue-components -D
```

#### 2. Configure Plugin

For `vite` based project，configure the plugin in the `vite.config.js` file:

```js
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
```

For `vue-cli` based project，configure the plugin in the `vue.config.js` file:

```js
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
};
```

For `webpack` based project，configure the plugin in the `webpack.config.js` file:

```js
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  plugins: [
    ComponentsPlugin({
      resolvers: [VantResolver()],
    }),
  ],
};
```

#### 3. Using Components

Then you can using components from Ryxon in the template, the `unplugin-vue-components` will automatically import the corresponding Ryxon components.

```html
<template>
  <r-button type="primary" />
</template>
```

#### 4. Style of Function Components

Some components of Ryxon are provided as function, including `Toast`, `Dialog`, `Notify` and `ImagePreview`. When using function components, `unplugin-vue-components` can not auto import the component style, so we need to import style manually.

```js
// Toast
import { showToast } from 'ryxon';
import 'ryxon/es/toast/style';

// Dialog
import { showDialog } from 'ryxon';
import 'ryxon/es/dialog/style';

// Notify
import { showNotify } from 'ryxon';
import 'ryxon/es/notify/style';

// ImagePreview
import { showImagePreview } from 'ryxon';
import 'ryxon/es/image-preview/style';
```

> Tip: "Full Import" and "On-demand Import" should not be used at the same time, otherwise it will lead to problems such as code duplication and style overrides.

#### Tips

- "Full Import" and "On-demand Import" should not be used at the same time, otherwise it will lead to problems such as code duplication and style overrides.
- unplugin-vue-components is not officially maintained by Ryxon. If you encounter issues when using this plugin, please feedback to [antfu/unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) repository.

## With Frameworks

### Use Ryxon in Nuxt 3

When using Ryxon in Nuxt 3, you should add `/ryxon/` to the `build.transpile`:

```ts
import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  experimental: {
    externalVue: true,
  },
});
```

Reference:

- [nuxt/framework#6761](https://github.com/nuxt/framework/issues/6761)
- [nuxt/framework#4084](https://github.com/nuxt/framework/issues/4084)
