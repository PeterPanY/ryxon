# Tab

### Intro

Used to switch between different content areas.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Tab, Tabs } from 'ryxon';

const app = createApp();
app.use(Tab);
app.use(Tabs);
```

## Usage

### Basic Usage

The first tab is active by default, you can set `v-model:active` to active specified tab.

```html
<r-tabs v-model:active="active">
  <r-tab v-for="index in 4" :title="'tab' + index">
    content of tab {{ index }}
  </r-tab>
</r-tabs>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
};
```

### Match By Name

```html
<r-tabs v-model:active="activeName">
  <r-tab title="tab 1" name="a">content of tab 1</r-tab>
  <r-tab title="tab 2" name="b">content of tab 2</r-tab>
  <r-tab title="tab 3" name="c">content of tab 3</r-tab>
</r-tabs>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const activeName = ref('a');
    return { activeName };
  },
};
```

### Swipe Tabs

By default more than 5 tabs, you can scroll through the tabs. You can set `swipe-threshold` attribute to customize threshold number.

```html
<r-tabs v-model:active="active">
  <r-tab v-for="index in 8" :title="'tab' + index">
    content of tab {{ index }}
  </r-tab>
</r-tabs>
```

### Disabled Tab

Use `disabled` prop to disable a tab.

```html
<r-tabs v-model:active="active">
  <r-tab v-for="index in 3" :title="'tab' + index" :disabled="index === 2">
    content of tab {{ index }}
  </r-tab>
</r-tabs>
```

### Card Style

Tabs styled as cards.

```html
<r-tabs v-model:active="active" type="card">
  <r-tab v-for="index in 3" :title="'tab' + index">
    content of tab {{ index }}
  </r-tab>
</r-tabs>
```

### Click Tab Event

```html
<r-tabs v-model:active="active" @click-tab="onClickTab">
  <r-tab v-for="index in 2" :title="'tab' + index">
    content of tab {{ index }}
  </r-tab>
</r-tabs>
```

```js
import { showToast } from 'ryxon';

export default {
  setup() {
    const onClickTab = ({ title }) => showToast(title);
    return {
      onClickTab,
    };
  },
};
```

### Sticky

In sticky mode, the tab nav will be fixed to top when scroll to top.

```html
<r-tabs v-model:active="active" sticky>
  <r-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </r-tab>
</r-tabs>
```

### Shrink

In shrink mode, the tabs will be shrinked to the left.

```html
<r-tabs v-model:active="active" shrink>
  <r-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </r-tab>
</r-tabs>
```

### Custom title

Use title slot to custom tab title.

```html
<r-tabs v-model:active="active">
  <r-tab v-for="index in 2">
    <template #title> <r-icon name="more-o" />tab </template>
    content {{ index }}
  </r-tab>
</r-tabs>
```

### Switch Animation

Use `animated` props to change tabs with animation.

```html
<r-tabs v-model:active="active" animated>
  <r-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </r-tab>
</r-tabs>
```

### Swipeable

In swipeable mode, you can switch tabs with swipe gesture in the content.

```html
<r-tabs v-model:active="active" swipeable>
  <r-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </r-tab>
</r-tabs>
```

### Scrollspy

In scrollspy mode, the list of content will be tiled.

```html
<r-tabs v-model:active="active" scrollspy sticky>
  <r-tab v-for="index in 8" :title="'tab ' + index">
    content {{ index }}
  </r-tab>
</r-tabs>
```

### Before Change

```html
<r-tabs v-model:active="active" :before-change="beforeChange">
  <r-tab v-for="index in 4" :title="'tab ' + index">
    content {{ index }}
  </r-tab>
</r-tabs>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    const beforeChange = (index) => {
      // prevent change
      if (index === 1) {
        return false;
      }

      // async
      return new Promise((resolve) => {
        resolve(index !== 3);
      });
    };

    return {
      active,
      beforeChange,
    };
  },
};
```

## API

### Tabs Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:active | Index of active tab | _number \| string_ | `0` |
| type | Can be set to `line` `card` | _string_ | `line` |
| color | Tab color | _string_ | `#1989fa` |
| background | Background color | _string_ | `white` |
| duration | Toggle tab's animation time | _number \| string_ | `0.3` |
| line-width | Width of tab line | _number \| string_ | `40px` |
| line-height | Height of tab line | _number \| string_ | `3px` |
| animated | Whether to change tabs with animation | _boolean_ | `false` |
| border | Whether to show border when `type="line"` | _boolean_ | `false` |
| ellipsis | Whether to ellipsis too long title | _boolean_ | `true` |
| sticky | Whether to use sticky mode | _boolean_ | `false` |
| shrink `v3.2.8` | Whether to shrink the the tabs to the left | _boolean_ | `false` |
| swipeable | Whether to enable gestures to slide left and right | _boolean_ | `false` |
| lazy-render | Whether to enable tab content lazy render | _boolean_ | `true` |
| scrollspy | Whether to use scrollspy mode | _boolean_ | `false` |
| offset-top | Sticky offset top , supports `px` `vw` `vh` `rem` unit, default `px` | _number \| string_ | `0` |
| swipe-threshold | Set swipe tabs threshold | _number \| string_ | `5` |
| title-active-color | Title active color | _string_ | - |
| title-inactive-color | Title inactive color | _string_ | - |
| before-change | Callback function before changing tabs, return `false` to prevent change, support return Promise | _(name: number \| string) => boolean \| Promise\<boolean\>_ | - |

### Tab Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | _string_ | - |
| disabled | Whether to disable tab | _boolean_ | `false` |
| dot | Whether to show red dot on the title | _boolean_ | `false` |
| badge | Content of the badge on the title | _number \| string_ | - |
| name | Identifier | _number \| string_ | Index of tab |
| url | Link | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |
| title-style | Custom title style | _string \| Array \| object_ | - |
| title-class | Custom title class name | _string \| Array \| object_ | - |
| show-zero-badge `v3.2.2` | Whether to show badge when the value is zero | _boolean_ | `true` |

### Tabs Events

| Event | Description | Arguments |
| --- | --- | --- |
| click-tab `v3.1.4` | Emitted when a tab is clicked | _{ name: string \| number, title: string, event: MouseEvent, disabled: boolean }_ |
| change | Emitted when active tab changed | _name: string \| number, title: string_ |
| rendered | Emitted when content first rendered in lazy-render mode | _name: string \| number, title: string_ |
| scroll | Emitted when tab scrolling in sticky mode | _{ scrollTop: number, isFixed: boolean }_ |

### Tabs Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get Tabs instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| resize | Resize Tabs when container element resized or visibility changed | - | - |
| scrollTo | Go to specified tab in scrollspy mode | _name: string \| number_ | - |

### Types

The component exports the following type definitions:

```ts
import type { TabProps, TabsType, TabsProps, TabsInstance } from 'ryxon';
```

`TabsInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { TabsInstance } from 'ryxon';

const tabsRef = ref<TabsInstance>();

tabsRef.value?.scrollTo(0);
```

### Tabs Slots

| Name                | Description               |
| ------------------- | ------------------------- |
| nav-left            | Custom nav left content   |
| nav-right           | Custom nav right content  |
| nav-bottom `v3.1.1` | Custom nav bottom content |

### Tab Slots

| Name    | Description      |
| ------- | ---------------- |
| default | Content of tab   |
| title   | Custom tab title |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                          | Default Value               | Description |
| ----------------------------- | --------------------------- | ----------- |
| --r-tab-text-color          | _var(--r-gray-7)_         | -           |
| --r-tab-active-text-color   | _var(--r-text-color)_     | -           |
| --r-tab-disabled-text-color | _var(--r-text-color-3)_   | -           |
| --r-tab-font-size           | _var(--r-font-size-md)_   | -           |
| --r-tab-line-height         | _var(--r-line-height-md)_ | -           |
| --r-tabs-default-color      | _var(--r-primary-color)_  | -           |
| --r-tabs-line-height        | _44px_                      | -           |
| --r-tabs-card-height        | _30px_                      | -           |
| --r-tabs-nav-background     | _var(--r-background-2)_   | -           |
| --r-tabs-bottom-bar-width   | _40px_                      | -           |
| --r-tabs-bottom-bar-height  | _3px_                       | -           |
| --r-tabs-bottom-bar-color   | _var(--r-primary-color)_  | -           |
