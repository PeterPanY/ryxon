# NavBar

### Intro

Provide navigation function for the page, often used at the top of the page.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { NavBar } from 'ryxon';

const app = createApp();
app.use(NavBar);
```

## Usage

### Basic Usage

```html
<r-nav-bar title="Title" />
```

### Back

```html
<r-nav-bar
  title="Title"
  left-text="Back"
  left-arrow
  @click-left="onClickLeft"
/>
```

```js
export default {
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
};
```

### Right Button

```html
<r-nav-bar
  title="Title"
  left-text="Back"
  right-text="Button"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

```js
import { showToast } from 'ryxon';

export default {
  setup() {
    const onClickLeft = () => history.back();
    const onClickRight = () => showToast('Button');
    return {
      onClickLeft,
      onClickRight,
    };
  },
};
```

### Use Slot

```html
<r-nav-bar title="Title" left-text="Back" left-arrow>
  <template #right>
    <r-icon name="search" />
  </template>
</r-nav-bar>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | _string_ | `''` |
| left-text | Left Text | _string_ | `''` |
| right-text | Right Text | _string_ | `''` |
| left-arrow | Whether to show left arrow | _boolean_ | `false` |
| border | Whether to show bottom border | _boolean_ | `true` |
| fixed | Whether to fixed top | _boolean_ | `false` |
| placeholder | Whether to generate a placeholder element when fixed | _boolean_ | `false` |
| z-index | Z-index | _number \| string_ | `1` |
| safe-area-inset-top | Whether to enable top safe area adaptation | _boolean_ | `false` |
| clickable | Whether to show click feedback when the left or right content is clicked | _boolean_ | `true` |

### Slots

| Name  | Description               |
| ----- | ------------------------- |
| title | Custom title              |
| left  | Custom left side content  |
| right | Custom right side content |

### Events

| Event       | Description                              | Arguments           |
| ----------- | ---------------------------------------- | ------------------- |
| click-left  | Emitted when the left button is clicked  | _event: MouseEvent_ |
| click-right | Emitted when the right button is clicked | _event: MouseEvent_ |

### Types

The component exports the following type definitions:

```ts
import type { NavBarProps } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                           | Default Value              | Description |
| ------------------------------ | -------------------------- | ----------- |
| --r-nav-bar-height           | _46px_                     | -           |
| --r-nav-bar-background       | _var(--r-background-2)_  | -           |
| --r-nav-bar-arrow-size       | _16px_                     | -           |
| --r-nav-bar-icon-color       | _var(--r-primary-color)_ | -           |
| --r-nav-bar-text-color       | _var(--r-primary-color)_ | -           |
| --r-nav-bar-title-font-size  | _var(--r-font-size-lg)_  | -           |
| --r-nav-bar-title-text-color | _var(--r-text-color)_    | -           |
| --r-nav-bar-z-index          | _1_                        | -           |
