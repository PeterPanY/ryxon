# ActionBar

### Intro

Used to provide convenient interaction for page-related operations.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'ryxon';

const app = createApp();
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
```

## Usage

### Basic Usage

```html
<r-action-bar>
  <r-action-bar-icon icon="chat-o" text="Icon1" @click="onClickIcon" />
  <r-action-bar-icon icon="cart-o" text="Icon2" @click="onClickIcon" />
  <r-action-bar-icon icon="shop-o" text="Icon3" @click="onClickIcon" />
  <r-action-bar-button type="danger" text="Button" @click="onClickButton" />
</r-action-bar>
```

```js
import { showToast } from 'ryxon';

export default {
  setup() {
    const onClickIcon = () => showToast('Click Icon');
    const onClickButton = () => showToast('Click Button');
    return {
      onClickIcon,
      onClickButton,
    };
  },
};
```

### Icon Badge

Use `badge` prop to show badge in icon.

```html
<r-action-bar>
  <r-action-bar-icon icon="chat-o" text="Icon1" dot />
  <r-action-bar-icon icon="cart-o" text="Icon2" badge="5" />
  <r-action-bar-icon icon="shop-o" text="Icon3" badge="12" />
  <r-action-bar-button type="warning" text="Button" />
  <r-action-bar-button type="danger" text="Button" />
</r-action-bar>
```

### Custom Icon Color

```html
<r-action-bar>
  <r-action-bar-icon icon="chat-o" text="Icon1" color="#ee0a24" />
  <r-action-bar-icon icon="cart-o" text="Icon2" />
  <r-action-bar-icon icon="star" text="Collected" color="#ff5000" />
  <r-action-bar-button type="warning" text="Button" />
  <r-action-bar-button type="danger" text="Button" />
</r-action-bar>
```

### Custom Button Color

```html
<r-action-bar>
  <r-action-bar-icon icon="chat-o" text="Icon1" />
  <r-action-bar-icon icon="shop-o" text="Icon2" />
  <r-action-bar-button color="#be99ff" type="warning" text="Button" />
  <r-action-bar-button color="#7232dd" type="danger" text="Button" />
</r-action-bar>
```

## API

### ActionBar Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | _boolean_ | `true` |
| placeholder `v3.5.1` | Whether to generate a placeholder element | _boolean_ | `false` |

### ActionBarIcon Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| text | Button text | _string_ | - |
| icon | Icon | _string_ | - |
| color | Icon color | _string_ | `#323233` |
| icon-class | Icon class name | _string \| Array \| object_ | `''` |
| icon-prefix `v3.0.17` | Icon className prefix | _string_ | `r-icon` |
| dot | Whether to show red dot | _boolean_ | - |
| badge | Content of the badge | _number \| string_ | - |
| badge-props `v3.2.8` | Props of Badge, see [Badge - props](#/en-US/badge#props) | _BadgeProps_ | - |
| url | Link URL | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### ActionBarButton Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| text | Button text | _string_ | - |
| type | Button type, Can be set to `primary` `info` `warning` `danger` | _string_ | `default` |
| color | Button color, support linear-gradient | _string_ | - |
| icon | Left Icon | _string_ | - |
| disabled | Whether to disable button | _boolean_ | `false` |
| loading | Whether to show loading status | _boolean_ | `false` |
| url | Link | _string_ | - |
| to | Target route of the link, same as to of vue-router | _string \| object_ | - |
| replace | If true, the navigation will not leave a history record | _boolean_ | `false` |

### ActionBarIcon Slots

| Name    | Description |
| ------- | ----------- |
| default | Text        |
| icon    | Custom icon |

### ActionBarButton Slots

| Name    | Description    |
| ------- | -------------- |
| default | Button content |

### Types

The component exports the following type definitions:

```ts
import type {
  ActionBarProps,
  ActionBarIconProps,
  ActionBarButtonProps,
} from 'ryxon';
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-action-bar-background | _var(--r-background-2)_ | - |
| --r-action-bar-height | _50px_ | - |
| --r-action-bar-icon-width | _48px_ | - |
| --r-action-bar-icon-height | _100%_ | - |
| --r-action-bar-icon-color | _var(--r-text-color)_ | - |
| --r-action-bar-icon-size | _18px_ | - |
| --r-action-bar-icon-font-size | _var(--r-font-size-xs)_ | - |
| --r-action-bar-icon-active-color | _var(--r-active-color)_ | - |
| --r-action-bar-icon-text-color | _var(--r-text-color)_ | - |
| --r-action-bar-icon-background | _var(--r-background-2)_ | - |
| --r-action-bar-button-height | _40px_ | - |
| --r-action-bar-button-warning-color | _var(--r-gradient-orange)_ | - |
| --r-action-bar-button-danger-color | _var(--r-gradient-red)_ | - |
