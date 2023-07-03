# IndexBar

### Intro

Used for indexed sorting display and quick positioning of lists.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { IndexBar } from 'ryxon'

const app = createApp()
app.use(IndexBar)
app.use(IndexAnchor)
```

## Usage

### Basic Usage

```html
<r-index-bar>
  <r-index-anchor index="A" />
  <r-cell title="Text" />
  <r-cell title="Text" />
  <r-cell title="Text" />

  <r-index-anchor index="B" />
  <r-cell title="Text" />
  <r-cell title="Text" />
  <r-cell title="Text" />

  ...
</r-index-bar>
```

### Custom Index List

```html
<r-index-bar :index-list="indexList">
  <r-index-anchor index="1">Title 1</r-index-anchor>
  <r-cell title="Text" />
  <r-cell title="Text" />
  <r-cell title="Text" />

  <r-index-anchor index="2">Title 2</r-index-anchor>
  <r-cell title="Text" />
  <r-cell title="Text" />
  <r-cell title="Text" />

  ...
</r-index-bar>
```

```js
export default {
  setup() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
```

## API

### IndexBar Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| index-list | Index List | _(string \| number)[]_ | `A-Z` |
| z-index | z-index | _number \| string_ | `1` |
| sticky | Whether to enable anchor sticky top | _boolean_ | `true` |
| sticky-offset-top | Anchor offset top when sticky | _number_ | `0` |
| highlight-color | Index character highlight color | _string_ | `#1989fa` |
| teleport | Specifies a target element where IndexBar will be mounted | _string \| Element_ | - |

### IndexAnchor Props

| Attribute | Description | Type               | Default |
| --------- | ----------- | ------------------ | ------- |
| index     | Index       | _number \| string_ | -       |

### IndexBar Events

| Event  | Description                       | Arguments                 |
| ------ | --------------------------------- | ------------------------- |
| select | Emitted when an index is selected | _index: number \| string_ |
| change | Emitted when active index changed | _index: number \| string_ |

### IndexBar Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get IndexBar instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| scrollTo | scroll to target element | _index: number \| string_ | - |

### Types

The component exports the following type definitions:

```ts
import type { IndexBarProps, IndexAnchorProps, IndexBarInstance } from 'ryxon'
```

`IndexBarInstance` is the type of component instance:

```ts
import { ref } from 'vue'
import type { IndexBarInstance } from 'ryxon'

const indexBarRef = ref<IndexBarInstance>()

indexBarRef.value?.scrollTo('B')
```

### IndexAnchor Slots

| Name    | Description                           |
| ------- | ------------------------------------- |
| default | Anchor content, show index by default |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                               | Default Value             | Description |
| ---------------------------------- | ------------------------- | ----------- |
| --r-index-bar-sidebar-z-index      | _2_                       | -           |
| --r-index-bar-index-font-size      | _var(--r-font-size-xs)_   | -           |
| --r-index-bar-index-line-height    | _var(--r-line-height-xs)_ | -           |
| --r-index-bar-index-active-color   | _var(--r-primary-color)_  | -           |
| --r-index-anchor-z-index           | _1_                       | -           |
| --r-index-anchor-padding           | _0 var(--r-padding-md)_   | -           |
| --r-index-anchor-text-color        | _var(--r-text-color)_     | -           |
| --r-index-anchor-font-weight       | _var(--r-font-bold)_      | -           |
| --r-index-anchor-font-size         | _var(--r-font-size-md)_   | -           |
| --r-index-anchor-line-height       | _32px_                    | -           |
| --r-index-anchor-background        | _transparent_             | -           |
| --r-index-anchor-sticky-text-color | _var(--r-primary-color)_  | -           |
| --r-index-anchor-sticky-background | _var(--r-background-2)_   | -           |
