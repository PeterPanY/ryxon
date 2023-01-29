# Collapse

### Intro

Place a group of content in multiple collapsible panels, click the title of the panel to expand or contract its content.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue';
import { Collapse, CollapseItem } from 'ryxon';

const app = createApp();
app.use(Collapse);
app.use(CollapseItem);
```

## Usage

### Basic Usage

Use `v-model` to control the name of active panels.

```html
<r-collapse v-model="activeNames">
  <r-collapse-item title="Title1" name="1">Content 1</r-collapse-item>
  <r-collapse-item title="Title2" name="2">Content 2</r-collapse-item>
  <r-collapse-item title="Title3" name="3">Content 3</r-collapse-item>
</r-collapse>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const activeNames = ref(['1']);
    return { activeNames };
  },
};
```

### Accordion

In accordion mode, only one panel can be expanded at the same time.

```html
<r-collapse v-model="activeName" accordion>
  <r-collapse-item title="Title1" name="1">Content 1</r-collapse-item>
  <r-collapse-item title="Title2" name="2">Content 2</r-collapse-item>
  <r-collapse-item title="Title3" name="3">Content 3</r-collapse-item>
</r-collapse>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const activeName = ref('1');
    return { activeName };
  },
};
```

### Disabled

Use the `disabled` prop to disable CollapseItem.

```html
<r-collapse v-model="activeNames">
  <r-collapse-item title="Title1" name="1">Content 1</r-collapse-item>
  <r-collapse-item title="Title2" name="2" disabled>
    Content 2
  </r-collapse-item>
  <r-collapse-item title="Title3" name="3" disabled>
    Content 3
  </r-collapse-item>
</r-collapse>
```

### Custom title

```html
<r-collapse v-model="activeNames">
  <r-collapse-item name="1">
    <template #title>
      <div>Title1 <r-icon name="question-o" /></div>
    </template>
    Content 1
  </r-collapse-item>
  <r-collapse-item title="Title2" name="2" icon="shop-o">
    Content 2
  </r-collapse-item>
</r-collapse>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const activeNames = ref(['1']);
    return { activeNames };
  },
};
```

### Toggle All

Using `toggleAll` method to toggle all items.

```html
<r-collapse v-model="activeNames">
  <r-collapse-item title="Title1" name="1">Content 1</r-collapse-item>
  <r-collapse-item title="Title2" name="2">Content 2</r-collapse-item>
  <r-collapse-item title="Title3" name="3">Content 3</r-collapse-item>
</r-collapse>

<r-button type="primary" @click="openAll">Open All</r-button>
<r-button type="primary" @click="toggleAll">Toggle All</r-button>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const activeNames = ref(['1']);
    const collapse = ref(null);

    const openAll = () => {
      collapse.value.toggleAll(true);
    }
    const toggleAll = () => {
      collapse.value.toggleAll();
    },

    return {
      activeNames,
      openAll,
      toggleAll,
      collapse,
    };
  },
};
```

> Tips: The toggleAll method cannot be used in accordion mode.

## API

### Collapse Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Names of current active panels | accordion mode: _number \| string_<br>non-accordion mode: _(number \| string)[]_ | - |
| accordion | Whether to be accordion mode | _boolean_ | `false` |
| border | Whether to show outer border | _boolean_ | `true` |

### Collapse Events

| Event | Description | Arguments |
| --- | --- | --- |
| change | Emitted when switching panel | _activeNames: string \| number \| Array<string \| number>_ |

### CollapseItem Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| name | Name | _number \| string_ | `index` |
| icon | Left Icon | _string_ | - |
| size | Title size, can be set to `large` | _string_ | - |
| title | Title | _number \| string_ | - |
| value | Right text | _number \| string_ | - |
| label | Description below the title | _string_ | - |
| border | Whether to show inner border | _boolean_ | `true` |
| disabled | Whether to disabled collapse | _boolean_ | `false` |
| readonly `v3.0.12` | Whether to be readonly | _boolean_ | `false` |
| is-link | Whether to show link icon | _boolean_ | `true` |
| lazy-render `v3.4.5` | Whether to lazy render util opened | _boolean_ | `true` |
| title-class | Title className | _string_ | - |
| value-class | Value className | _string_ | - |
| label-class | Label className | _string_ | - |

### Collapse Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get Collapse instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| toggleAll `v3.5.3` | Toggle the expanded status of all collapses | _options?: boolean \| object_ | - |

### toggleAll Usage

```js
import { ref } from 'vue';
import type { CollapseInstance } from 'ryxon';

const collapseRef = ref<CollapseInstance>();

// Toggle all
collapseRef.value?.toggleAll();
// Expand all
collapseRef.value?.toggleAll(true);
// UnExpand all
collapseRef.value?.toggleAll(false);

// Toggle all, skip disabled
collapseRef.value?.toggleAll({
  skipDisabled: true,
});
// Expand all, skip disabled
collapseRef.value?.toggleAll({
  expanded: true,
  skipDisabled: true,
});
```

### CollapseItem Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get CollapseItem instance and call instance methods.

| Name   | Description            | Attribute           | Return value |
| ------ | ---------------------- | ------------------- | ------------ |
| toggle | Toggle expanded status | _expanded: boolean_ | -            |

### Types

The component exports the following type definitions:

```ts
import type {
  CollapseProps,
  CollapseItemProps,
  CollapseItemInstance,
  CollapseToggleAllOptions,
} from 'ryxon';
```

`CollapseItemInstance` is the type of component instance:

```ts
import { ref } from 'vue';
import type { CollapseItemInstance } from 'ryxon';

const collapseItemRef = ref<CollapseItemInstance>();

collapseItemRef.value?.toggle();
```

### CollapseItem Slots

| Name           | Description              |
| -------------- | ------------------------ |
| default        | Content                  |
| title          | Custom header title      |
| value          | Custom header value      |
| label `v3.1.1` | Custom header label      |
| icon           | Custom header left icon  |
| right-icon     | Custom header right icon |

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-collapse-item-duration | _var(--r-duration-base)_ | - |
| --r-collapse-item-content-padding | _var(--r-padding-sm) var(--r-padding-md)_ | - |
| --r-collapse-item-content-font-size | _var(--r-font-size-md)_ | - |
| --r-collapse-item-content-line-height | _1.5_ | - |
| --r-collapse-item-content-text-color | _var(--r-text-color-2)_ | - |
| --r-collapse-item-content-background | _var(--r-background-2)_ | - |
| --r-collapse-item-title-disabled-color | _var(--r-text-color-3)_ | - |
