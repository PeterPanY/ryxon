# NoticeBar

### Intro

Used to display a group of message notifications in a continuons loop.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { NoticeBar } from 'ryxon'

const app = createApp()
app.use(NoticeBar)
```

## Usage

### Basic Usage

```html
<r-notice-bar
  text="Technology is the common soul of the people who developed it."
  left-icon="volume-o"
/>
```

### Scrollable

```html
<!-- Enable scroll when text is short -->
<r-notice-bar scrollable text="Short Content" />

<!-- Disable scroll when text is long -->
<r-notice-bar
  :scrollable="false"
  text="Technology is the common soul of the people who developed it."
/>
```

### Wrapable

```html
<r-notice-bar wrapable :scrollable="false">
  Technology is the common soul of the people who developed it.
</r-notice-bar>
```

### Mode

```html
<r-notice-bar mode="closeable">Short Content</r-notice-bar>

<r-notice-bar mode="link">Short Content</r-notice-bar>
```

### Custom Style

```html
<r-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
  Short Content
</r-notice-bar>
```

### Vertical Scroll

```html
<r-notice-bar left-icon="volume-o" :scrollable="false">
  <r-swipe
    vertical
    class="notice-swipe"
    :autoplay="3000"
    :touchable="false"
    indicator-position="none"
  >
    <r-swipe-item>Content 1</r-swipe-item>
    <r-swipe-item>Content 2</r-swipe-item>
    <r-swipe-item>Content 3</r-swipe-item>
  </r-swipe>
</r-notice-bar>

<style>
  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| mode | Mode, can be set to `closeable` `link` | _string_ | `''` |
| text | Notice text content | _string_ | `''` |
| color | Text color | _string_ | `#ed6a0c` |
| background | Background color | _string_ | `#fffbe8` |
| left-icon | Left Icon | _string_ | - |
| delay | Animation delay (s) | _number \| string_ | `1` |
| speed | Scroll speed (px/s) | _number \| string_ | `60` |
| scrollable | Whether to scroll content | _boolean_ | - |
| wrapable | Whether to enable text wrap | _boolean_ | `false` |

### Events

| Event  | Description                        | Arguments           |
| ------ | ---------------------------------- | ------------------- |
| click  | Emitted when NoticeBar is clicked  | _event: MouseEvent_ |
| close  | Emitted when NoticeBar is closed   | _event: MouseEvent_ |
| replay | Emitted when NoticeBar is replayed | -                   |

### Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get NoticeBar instance and call instance methods.

| Name  | Description     | Attribute | Return value |
| ----- | --------------- | --------- | ------------ |
| reset | Reset NoticeBar | -         | -            |

### Types

The component exports the following type definitions:

```ts
import type { NoticeBarMode, NoticeBarProps, NoticeBarInstance } from 'ryxon'
```

`NoticeBarInstance` is the type of component instance:

```ts
import { ref } from 'vue'
import type { NoticeBarInstance } from 'ryxon'

const noticeBarRef = ref<NoticeBarInstance>()

noticeBarRef.value?.reset()
```

### Slots

| Name       | Description         |
| ---------- | ------------------- |
| default    | Notice text content |
| left-icon  | Custom left icon    |
| right-icon | Custom right icon   |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-notice-bar-height | _40px_ | - |
| --r-notice-bar-padding | _0 var(--r-padding-md)_ | - |
| --r-notice-bar-wrapable-padding | _var(--r-padding-xs) var(--r-padding-md)_ | - |
| --r-notice-bar-text-color | _var(--r-orange-dark)_ | - |
| --r-notice-bar-font-size | _var(--r-font-size-md)_ | - |
| --r-notice-bar-line-height | _24px_ | - |
| --r-notice-bar-background | _var(--r-orange-light)_ | - |
| --r-notice-bar-icon-size | _16px_ | - |
| --r-notice-bar-icon-min-width | _24px_ | - |
