# ConfigProvider

### Intro

Used to configure Ryxon components globally, providing dark mode, theme customization and other capabilities.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { ConfigProvider } from 'ryxon';

const app = createApp();
app.use(ConfigProvider);
```

## Dark Mode

### Enable Dark Mode

Enabling dark mode by setting the `theme` prop of the ConfigProvider component to `dark`.

In takes effect globally, making all Ryxon components on the page dark.

```html
<r-config-provider theme="dark">...</r-config-provider>
```

The theme prop will not change the text-color or background-color of the page, you can set it manually like this:

```css
.r-theme-dark body {
  text-color: #f5f5f5;
  background-color: black;
}
```

> Tips: The theme prop will not change the background color of the page, you need to set it manually.

### Switch Theme

Switching between light and dark theme by dynamically setting the `theme` property.

```html
<r-config-provider :theme="theme">...</r-config-provider>
```

```js
export default {
  setup() {
    const theme = ref('light');

    setTimeout(() => {
      theme.value = 'dark';
    }, 1000);

    return { theme };
  },
};
```

## Custom Theme

### Intro

Ryxon organize component styles through [CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties), you can custom themes by overriding these CSS Variables.

#### Demo

Looking at the style of the Button component, you can see that the following variables exist on the `.r-button--primary` class:

```css
.r-button--primary {
  color: var(--r-button-primary-color);
  background-color: var(--r-button-primary-background);
}
```

The default values of these variables are defined on the `:root` node:

```css
:root {
  --r-white: #fff;
  --r-blue: #1989fa;
  --r-button-primary-color: var(--r-white);
  --r-button-primary-background: var(--r-primary-color);
}
```

### Custom CSS Variables

#### Override by CSS

You can directly override these CSS variables in the code, and the style of the Button component will change accordingly:

```css
/* the Primary Button will turn red */
:root:root {
  --r-button-primary-background: red;
}
```

> Note: Why write two duplicate `:root`?
>
> Since the theme variables in ryxon are also declared under `:root`, in some cases they cannot be successfully overwritten due to priority issues. Through `:root:root` you can explicitly make the content you write a higher priority to ensure the successful coverage of the theme variables.

#### Override by ConfigProvider

The `ConfigProvider` component provides the ability to override CSS variables. You need to wrap a `ConfigProvider` component at the root node and configure some CSS variables through the `theme-vars` property.

```html
<r-config-provider :theme-vars="themeVars">
  <r-form>
    <r-field name="rate" label="Rate">
      <template #input>
        <r-rate v-model="rate" />
      </template>
    </r-field>
    <r-field name="slider" label="Slider">
      <template #input>
        <r-slider v-model="slider" />
      </template>
    </r-field>
    <div style="margin: 16px">
      <r-button round block type="primary" native-type="submit">
        Submit
      </r-button>
    </div>
  </r-form>
</r-config-provider>
```

```js
import { ref, reactive } from 'vue';

export default {
  setup() {
    const rate = ref(4);
    const slider = ref(50);

    // ThemeVars will be converted to the corresponding CSS variable
    // For example, sliderBarHeight will be converted to `--r-slider-bar-height`
    const themeVars = reactive({
      rateIconFullColor: '#07c160',
      sliderBarHeight: '4px',
      sliderButtonWidth: '20px',
      sliderButtonHeight: '20px',
      sliderActiveBackground: '#07c160',
      buttonPrimaryBackground: '#07c160',
      buttonPrimaryBorderColor: '#07c160',
    });

    return {
      rate,
      slider,
      themeVars,
    };
  },
};
```

> Tips: ConfigProvider only affects its child components.

#### Use In TypeScript

Using `ConfigProviderThemeVars` type to get code intellisense.

```ts
import type { ConfigProviderThemeVars } from 'ryxon';

const themeVars: ConfigProviderThemeVars = {
  sliderBarHeight: '4px',
};
```

### Combining dark mode with CSS variables

If you need to define CSS variables for dark mode or light mode separately, you can use the `theme-vars-dark` and `theme-vars-light` props.

- `theme-vars-dark`: define CSS variables that only take effect in dark mode, will override the variables defined in `theme-vars`.
- `theme-vars-light`: define CSS variables that only take effect in light mode, will override the variables defined in `theme-vars`.

#### Example

Take the `buttonPrimaryBackground` variable below as an example, the value will be `blue` in dark mode, and `green` in light mode.

```html
<r-config-provider
  :theme-vars="themeVars"
  :theme-vars-dark="themeVarsDark"
  :theme-vars-light="themeVarsLight"
>
  ...
</r-config-provider>
```

```js
import { ref, reactive } from 'vue';

export default {
  setup() {
    const themeVars = reactive({ buttonPrimaryBackground: 'red' });
    const themeVarsDark = reactive({ buttonPrimaryBackground: 'blue' });
    const themeVarsLight = reactive({ buttonPrimaryBackground: 'green' });

    return {
      themeVars,
      themeVarsDark,
      themeVarsLight,
    };
  },
};
```

## Variables

### Basic Variables

CSS variables in Ryxon are divided into **basic variables** and **component variables**. Component variables will inherit the basic variables. After modifying the basic variables, all related components will be affected.

#### Modify Basic Variables

- The basic variables can only be modified through the `:root` selector.
- The component variables can be modified through the `:root` selector and `ConfigProvider` component.

You can also use the `.r-theme-light` and `.r-theme-dark` class selector to modify basic or component variables in light or dark mode individually.

#### Variables List

There are all **Basic Variables** below, for component CSS Variables, please refer to the documentation of each component.

```less
// Color Palette
--r-black: #000;
--r-white: #fff;
--r-gray-1: #f7f8fa;
--r-gray-2: #f2f3f5;
--r-gray-3: #ebedf0;
--r-gray-4: #dcdee0;
--r-gray-5: #c8c9cc;
--r-gray-6: #969799;
--r-gray-7: #646566;
--r-gray-8: #323233;
--r-red: #ee0a24;
--r-blue: #1989fa;
--r-orange: #ff976a;
--r-orange-dark: #ed6a0c;
--r-orange-light: #fffbe8;
--r-green: #07c160;

// Gradient Colors
--r-gradient-red: linear-gradient(to right, #ff6034, #ee0a24);
--r-gradient-orange: linear-gradient(to right, #ffd01e, #ff8917);

// Component Colors
--r-primary-color: var(--r-blue);
--r-success-color: var(--r-green);
--r-danger-color: var(--r-red);
--r-warning-color: var(--r-orange);
--r-text-color: var(--r-gray-8);
--r-text-color-2: var(--r-gray-6);
--r-text-color-3: var(--r-gray-5);
--r-link-color: #576b95;
--r-active-color: var(--r-gray-2);
--r-active-opacity: 0.6;
--r-disabled-opacity: 0.5;
--r-background: var(--r-gray-1);
--r-background-2: var(--r-white);

// Padding
--r-padding-base: 4px;
--r-padding-xs: 8px;
--r-padding-sm: 12px;
--r-padding-md: 16px;
--r-padding-lg: 24px;
--r-padding-xl: 32px;

// Font
--r-font-size-xs: 10px;
--r-font-size-sm: 12px;
--r-font-size-md: 14px;
--r-font-size-lg: 16px;
--r-font-bold: 600;
--r-line-height-xs: 14px;
--r-line-height-sm: 18px;
--r-line-height-md: 20px;
--r-line-height-lg: 22px;
--r-base-font: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
  Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
  sans-serif;
--r-price-font: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;

// Animation
--r-duration-base: 0.3s;
--r-duration-fast: 0.2s;
--r-ease-out: ease-out;
--r-ease-in: ease-in;

// Border
--r-border-color: var(--r-gray-3);
--r-border-width: 1px;
--r-radius-sm: 2px;
--r-radius-md: 4px;
--r-radius-lg: 8px;
--r-radius-max: 999px;
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| theme | Theme mode, can be set to `dark` | _ConfigProviderTheme_ | `light` |
| theme-vars | Theme variables | _object_ | - |
| theme-vars-dark | Theme variables that work in dark mode，will override `theme-vars` | _object_ | - |
| theme-vars-light | Theme variables that work in light mode, will override `theme-vars` | _object_ | - |
| z-index `v3.6.0` | Set the z-index of all popup components, this property takes effect globally | _number_ | `2000` |
| tag `v3.1.2` | HTML Tag of root element | _string_ | `div` |
| icon-prefix `v3.1.3` | Icon className prefix | _string_ | `r-icon` |

### Types

The component exports the following type definitions:

```ts
import type {
  ConfigProviderProps,
  ConfigProviderTheme,
  ConfigProviderThemeVars,
} from 'ryxon';
```
