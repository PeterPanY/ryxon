# Advanced Usage

### Intro

Through this chapter, you can learn about some advanced usages of Ryxon.

## Component Usage

### Component Registration

Ryxon supports multiple ways to register components:

#### Global Registration

```js
import { Button } from 'ryxon';
import { createApp } from 'vue';

const app = createApp();

// Method 1. via app.use
app.use(Button);

// Method 2. Register via app.component
app.component(Button.name, Button);
```

#### Local Registration

```js
import { Button } from 'ryxon';

export default {
  components: {
    [Button.name]: Button,
  },
};
```

> For more information, please refer to [Vue.js - Component Registration](https://v3.vuejs.org/guide/component-registration.html#component-registration)。

#### \<script setup\>

Ryxon components can be used directly in `<script setup>` without component registration.

```xml
<script setup>
  import { Button } from 'ryxon';
</script>

<template>
  <Button />
</template>
```

#### JSX/TSX

Ryxon components can be used directly in JSX and TSX without component registration.

```jsx
import { Button } from 'ryxon';

export default {
  render() {
    return <Button />;
  },
};
```

## Browser adaptation

### Viewport Units

Ryxon uses `px` unit by default，you can use tools such as [postcss--px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) to transform `px` unit to viewport units (vw, vh, vmin, vmax).

#### PostCSS Config

PostCSS config example:

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};
```

### Rem Unit

You can use tools such as `postcss-pxtorem` to transform `px` unit to `rem` unit.

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
- [lib-flexible](https://github.com/amfe/lib-flexible)

#### PostCSS Config

PostCSS config example:

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```

### Custom rootValue

If the size of the design draft is 750 or other sizes, you can adjust the `rootValue` to:

```js
// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem version >= 5.0.0
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('ryxon') !== -1 ? 37.5 : 75;
      },
      propList: ['*'],
    },
  },
};
```

### Adapt to PC Browsers

Ryxon is a mobile-first component library, if you want to use Ryxon in PC browsers, you can use the [@ryxon/touch-emulator](https://github.com/PeterPanY/ryxon/tree/main/packages/ryxon-touch-emulator) module. This module will automatically convert the mouse events of the PC browser into the touch events of the mobile browser.

```bash
# Install
npm i @ryxon/touch-emulator -S
```

```js
// Just import this module, then Ryxon works in PC browser
import '@ryxon/touch-emulator';
```
