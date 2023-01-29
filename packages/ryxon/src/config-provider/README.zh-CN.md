# ConfigProvider 全局配置

### 介绍

用于全局配置 Ryxon 组件，提供深色模式、主题定制等能力。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { ConfigProvider } from 'ryxon';

const app = createApp();
app.use(ConfigProvider);
```

## 深色模式

### 开启深色模式

将 ConfigProvider 组件的 `theme` 属性设置为 `dark`，可以开启深色模式。

深色模式会全局生效，使页面上的所有 Ryxon 组件变为深色风格。

```html
<r-config-provider theme="dark">...</r-config-provider>
```

值得注意的是，开启 Ryxon 的深色模式只会影响 Ryxon 组件的 UI，并不会影响全局的文字颜色或背景颜色，你可以参考以下 CSS 来设置一些全局样式：

```css
.r-theme-dark body {
  text-color: #f5f5f5;
  background-color: black;
}
```

### 动态切换

通过动态设置 `theme` 属性，可以在浅色风格和深色风格之间进行切换。

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

## 定制主题

### 介绍

Ryxon 组件通过丰富的 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 来组织样式，通过覆盖这些 CSS 变量，可以实现**定制主题、动态切换主题**等效果。

#### 示例

以 Button 组件为例，查看组件的样式，可以看到 `.r-button--primary` 类名上存在以下变量：

```css
.r-button--primary {
  color: var(--r-button-primary-color);
  background-color: var(--r-button-primary-background);
}
```

这些变量的默认值被定义在 `:root` 节点上，HTML 里的所有子节点都可以访问到这些变量：

```css
:root {
  --r-white: #fff;
  --r-blue: #1989fa;
  --r-button-primary-color: var(--r-white);
  --r-button-primary-background: var(--r-primary-color);
}
```

### 自定义 CSS 变量

#### 通过 CSS 覆盖

你可以直接在代码中覆盖这些 CSS 变量，Button 组件的样式会随之发生改变：

```css
/* 添加这段样式后，Primary Button 会变成红色 */
:root:root {
  --r-button-primary-background: red;
}
```

> 注意：为什么要写两个重复的 `:root`？
>
> 由于 ryxon 中的主题变量也是在 `:root` 下声明的，所以在有些情况下会由于优先级的问题无法成功覆盖。通过 `:root:root` 可以显式地让你所写内容的优先级更高一些，从而确保主题变量的成功覆盖。

#### 通过 ConfigProvider 覆盖

`ConfigProvider` 组件提供了覆盖 CSS 变量的能力，你需要在根节点包裹一个 `ConfigProvider` 组件，并通过 `theme-vars` 属性来配置一些主题变量。

```html
<r-config-provider :theme-vars="themeVars">
  <r-form>
    <r-field name="rate" label="评分">
      <template #input>
        <r-rate v-model="rate" />
      </template>
    </r-field>
    <r-field name="slider" label="滑块">
      <template #input>
        <r-slider v-model="slider" />
      </template>
    </r-field>
    <div style="margin: 16px">
      <r-button round block type="primary" native-type="submit">
        提交
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

    // themeVars 内的值会被转换成对应 CSS 变量
    // 比如 sliderBarHeight 会转换成 `--r-slider-bar-height`
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

> 注意：ConfigProvider 仅影响它的子组件的样式，不影响全局 root 节点。

#### 在 TypeScript 中使用

在 TypeScript 中定义 themeVars 时，建议使用 Ryxon 提供的 `ConfigProviderThemeVars` 类型，可以提供完善的类型提示：

```ts
import type { ConfigProviderThemeVars } from 'ryxon';

const themeVars: ConfigProviderThemeVars = {
  sliderBarHeight: '4px',
};
```

### 结合深色模式与 CSS 变量

如果需要单独定义深色模式或浅色模式下的 CSS 变量，可以使用 `theme-vars-dark` 和 `theme-vars-light` 属性。

- `theme-vars-dark`: 仅在深色模式下生效的 CSS 变量，优先级高于 `theme-vars` 中定义的变量。
- `theme-vars-light`: 仅在浅色模式下生效的 CSS 变量，优先级高于 `theme-vars` 中定义的变量。

#### 示例

以下方的 `buttonPrimaryBackground` 变量为例, 在深色模式下的值为 `blue`，在浅色模式下的值为 `green`。

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

## 主题变量

### 基础变量

Ryxon 中的 CSS 变量分为 **基础变量** 和 **组件变量**。组件变量会继承基础变量，因此在修改基础变量后，会影响所有相关的组件。

#### 修改变量

由于 CSS 变量继承机制的原因，两者的修改方式有一定差异：

- 基础变量只能通过 `:root 选择器` 修改，不能通过 `ConfigProvider 组件` 修改。
- 组件变量可以通过 `:root 选择器` 和 `ConfigProvider 组件` 修改。

你也可以使用 `.r-theme-light` 和 `.r-theme-dark` 这两个类名选择器来单独修改浅色或深色模式下的基础变量和组件变量。

#### 变量列表

下面是所有的基础变量：

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

你可以在各个组件文档底部的表格中查看组件变量。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 主题风格，设置为 `dark` 来开启深色模式，全局生效 | _ConfigProviderTheme_ | `light` |
| theme-vars | 自定义主题变量，局部生效 | _object_ | - |
| theme-vars-dark | 仅在深色模式下生效的主题变量，优先级高于 `theme-vars` | _object_ | - |
| theme-vars-light | 仅在浅色模式下生效的主题变量，优先级高于 `theme-vars` | _object_ | - |
| tag `v3.1.2` | 根节点对应的 HTML 标签名 | _string_ | `div` |
| z-index `v3.6.0` | 设置所有弹窗类组件的 z-index，该属性对全局生效 | _number_ | `2000` |
| icon-prefix `v3.1.3` | 所有图标的类名前缀，等同于 Icon 组件的 [class-prefix 属性](#/zh-CN/icon#props) | _string_ | `r-icon` |

### 类型定义

组件导出以下类型定义：

```ts
import type {
  ConfigProviderProps,
  ConfigProviderTheme,
  ConfigProviderThemeVars,
} from 'ryxon';
```
