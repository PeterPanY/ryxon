# Tabbar

### Intro

Used to switch between different pages.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Tabbar, TabbarItem } from 'ryxon';

const app = createApp();
app.use(Tabbar);
app.use(TabbarItem);
```

## Usage

### Basic Usage

```html
<r-tabbar v-model="active">
  <r-tabbar-item icon="home-o">Tab</r-tabbar-item>
  <r-tabbar-item icon="search">Tab</r-tabbar-item>
  <r-tabbar-item icon="friends-o">Tab</r-tabbar-item>
  <r-tabbar-item icon="setting-o">Tab</r-tabbar-item>
</r-tabbar>
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

### Match by name

```html
<r-tabbar v-model="active">
  <r-tabbar-item name="home" icon="home-o">Tab</r-tabbar-item>
  <r-tabbar-item name="search" icon="search">Tab</r-tabbar-item>
  <r-tabbar-item name="friends" icon="friends-o">Tab</r-tabbar-item>
  <r-tabbar-item name="setting" icon="setting-o">Tab</r-tabbar-item>
</r-tabbar>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const active = ref('home');
    return { active };
  },
};
```

### Show Badge

```html
<r-tabbar v-model="active">
  <r-tabbar-item icon="home-o">Tab</r-tabbar-item>
  <r-tabbar-item icon="search" dot>Tab</r-tabbar-item>
  <r-tabbar-item icon="friends-o" badge="5">Tab</r-tabbar-item>
  <r-tabbar-item icon="setting-o" badge="20">Tab</r-tabbar-item>
</r-tabbar>
```

### Custom Icon

Use `icon` slot to custom icon.

```html
<r-tabbar v-model="active">
  <r-tabbar-item badge="3">
    <span>Custom</span>
    <template #icon="props">
      <img :src="props.active ? icon.active : icon.inactive" />
    </template>
  </r-tabbar-item>
  <r-tabbar-item icon="search">Tab</r-tabbar-item>
  <r-tabbar-item icon="setting-o">Tab</r-tabbar-item>
</r-tabbar>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    const icon = {
      active: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/user-active.png',
      inactive:
        'https://fastly.jsdelivr.net/npm/@ryxon/assets/user-inactive.png',
    };
    return {
      icon,
      active,
    };
  },
};
```

### Custom Color

```html
<r-tabbar v-model="active" active-color="#ee0a24">
  <r-tabbar-item icon="home-o">Tab</r-tabbar-item>
  <r-tabbar-item icon="search">Tab</r-tabbar-item>
  <r-tabbar-item icon="friends-o">Tab</r-tabbar-item>
  <r-tabbar-item icon="setting-o">Tab</r-tabbar-item>
</r-tabbar>
```

### Change Event

```html
<r-tabbar v-model="active" @change="onChange">
  <r-tabbar-item icon="home-o">Tab 1</r-tabbar-item>
  <r-tabbar-item icon="search">Tab 2</r-tabbar-item>
  <r-tabbar-item icon="friends-o">Tab 3</r-tabbar-item>
  <r-tabbar-item icon="setting-o">Tab 4</r-tabbar-item>
</r-tabbar>
```

```js
import { ref } from 'vue';
import { showToast } from 'ryxon';

export default {
  setup() {
    const active = ref(0);
    const onChange = (index) => showToast(`Tab ${index}`);
    return {
      icon,
      onChange,
    };
  },
};
```

### Route Mode

```html
<router-view />

<r-tabbar route>
  <r-tabbar-item replace to="/home" icon="home-o">Tab</r-tabbar-item>
  <r-tabbar-item replace to="/search" icon="search">Tab</r-tabbar-item>
</r-tabbar>
```

## API

### Tabbar Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Identifier of current tab | _number \| string_ | `0` |
| fixed | Whether to fixed bottom | _boolean_ | `true` |
| border | Whether to show border | _boolean_ | `true` |
| z-index | Z-index | _number \| string_ | `1` |
| active-color | Color of active tab item | _string_ | `#1989fa` |
| inactive-color | Color of inactive tab item | _string_ | `#7d7e80` |
| route | Whether to enable route mode | _boolean_ | `false` |
| placeholder | Whether to generate a placeholder element when fixed | _boolean_ | `false` |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_ | `false` |
| before-change | Callback function before changing tab, return `false` to prevent change, support return Promise | _(name: number \| string) => boolean \| Promise\<boolean\>_ | - |

### Tabbar Events

| Event  | Description                      | Arguments                  |
| ------ | -------------------------------- | -------------------------- |
| change | Emitted when changing active tab | _active: number \| string_ |

### TabbarItem Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| name | Identifier | _number \| string_ | Item index |
| icon | Icon name | _string_ | - |
| icon-prefix | Icon className prefix | _string_ | `r-icon` |
| dot | Whether to show red dot | _boolean_ | - |
| badge | Content of the badge | _number \| string_ | `''` |
| badge-props `v3.2.8` | Props of Badge, see [Badge - props](#/en-US/badge#props) | _BadgeProps_ | - |
| url | Link | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### TabbarItem Slots

| Name | Description | SlotProps         |
| ---- | ----------- | ----------------- |
| icon | Custom icon | _active: boolean_ |

### Types

The component exports the following type definitions:

```ts
import type { TabbarProps, TabbarItemProps } from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-tabbar-height | _50px_ | - |
| --r-tabbar-z-index | _1_ | - |
| --r-tabbar-background | _var(--r-background-2)_ | - |
| --r-tabbar-item-font-size | _var(--r-font-size-sm)_ | - |
| --r-tabbar-item-text-color | _var(--r-text-color)_ | - |
| --r-tabbar-item-active-color | _var(--r-primary-color)_ | - |
| --r-tabbar-item-active-background | _var(--r-background-2)_ | - |
| --r-tabbar-item-line-height | _1_ | - |
| --r-tabbar-item-icon-size | _22px_ | - |
| --r-tabbar-item-icon-margin-bottom | _var(--r-padding-base)_ | - |