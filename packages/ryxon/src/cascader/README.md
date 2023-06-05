# Cascader

### Intro

The cascader component is used for the selection of multi-level data. The typical scene is the selection of provinces and cities.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { Cascader } from 'ryxon'

const app = createApp()
app.use(Cascader)
```

## Usage

### Basic Usage

```html
<r-input
  v-model="inputValue"
  is-link
  readonly
  label="Area"
  placeholder="Select Area"
  @click="show = true"
/>
<r-popup v-model="show" round position="bottom">
  <r-cascader
    v-model="cascaderValue"
    title="Select Area"
    :options="options"
    @close="show = false"
    @finish="onFinish"
  />
</r-popup>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const show = ref(false)
    const inputValue = ref('')
    const cascaderValue = ref('')
    const options = [
      {
        text: 'Zhejiang',
        value: '330000',
        children: [{ text: 'Hangzhou', value: '330100' }]
      },
      {
        text: 'Jiangsu',
        value: '320000',
        children: [{ text: 'Nanjing', value: '320100' }]
      }
    ]
    const onFinish = ({ selectedOptions }) => {
      show.value = false
      inputValue.value = selectedOptions.map((option) => option.text).join('/')
    }

    return {
      show,
      options,
      onFinish,
      inputValue,
      cascaderValue
    }
  }
}
```

### Custom Color

```html
<r-cascader
  v-model="cascaderValue"
  title="Select Area"
  :options="options"
  active-color="#ee0a24"
  @close="show = false"
  @finish="onFinish"
/>
```

### Async Options

```html
<r-input
  v-model="inputValue"
  is-link
  readonly
  label="Area"
  placeholder="Select Area"
  @click="show = true"
/>
<r-popup v-model="show" round position="bottom">
  <r-cascader
    v-model="cascaderValue"
    title="Select Area"
    :options="options"
    @close="show = false"
    @change="onChange"
    @finish="onFinish"
  />
</r-popup>
```

```js
import { ref } from 'vue'
import { closeAllMessage, showMessage } from 'ryxon'

export default {
  setup() {
    const show = ref(false)
    const inputValue = ref('')
    const cascaderValue = ref('')
    const options = ref([
      {
        text: 'Zhejiang',
        value: '330000',
        children: []
      }
    ])
    const onChange = ({ value }) => {
      if (
        value === options.value[0].value &&
        options.value[0].children.length === 0
      ) {
        showMessage('Loading...')
        // mock data request
        setTimeout(() => {
          options.value[0].children = [
            { text: 'Hangzhou', value: '330100' },
            { text: 'Ningbo', value: '330200' }
          ]
          closeAllMessage()
        }, 1000)
      }
    }
    const onFinish = ({ selectedOptions }) => {
      show.value = false
      inputValue.value = selectedOptions.map((option) => option.text).join('/')
    }

    return {
      show,
      options,
      onFinish,
      inputValue,
      cascaderValue
    }
  }
}
```

### Custom Input Names

```html
<r-cascader
  v-model="code"
  title="Select Area"
  :options="options"
  :input-names="inputNames"
/>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const code = ref('')
    const inputNames = {
      text: 'name',
      value: 'code',
      children: 'items'
    }
    const options = [
      {
        name: 'Zhejiang',
        code: '330000',
        items: [{ name: 'Hangzhou', code: '330100' }]
      },
      {
        name: 'Jiangsu',
        code: '320000',
        items: [{ name: 'Nanjing', code: '320100' }]
      }
    ]

    return {
      code,
      options,
      inputNames
    }
  }
}
```

### Custom Content

```html
<r-cascader v-model="code" title="Select Area" :options="options">
  <template #options-top="{ tabIndex }">
    <div class="current-level">Current level is {{ tabIndex + 1 }}</div>
  </template>
</r-cascader>

<style>
  .current-level {
    font-size: 14px;
    padding: 16px 16px 0;
    color: var(--r-gray-6);
  }
</style>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const code = ref('')
    const options = [
      {
        name: 'Zhejiang',
        code: '330000',
        items: [{ name: 'Hangzhou', code: '330100' }]
      },
      {
        name: 'Jiangsu',
        code: '320000',
        items: [{ name: 'Nanjing', code: '320100' }]
      }
    ]

    return {
      code,
      options
    }
  }
}
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Value of selected option | _string \| number_ | - |
| title | Title | _string_ | - |
| options | Options | _CascaderOption[]_ | `[]` |
| placeholder | Placeholder of unselected tab | _string_ | `Select` |
| active-color | Active color | _string_ | `#1989fa` |
| swipeable | Whether to enable gestures to slide left and right | _boolean_ | `true` |
| closeable | Whether to show close icon | _boolean_ | `true` |
| show-header | Whether to show header | _boolean_ | `true` |
| close-icon | Close icon name | _string_ | `cross` |
| field-names | Custom the fields of options | _CascaderFieldNames_ | `{ text: 'text', value: 'value', children: 'children' }` |

### Data Structure of CascaderOption

| Key       | Description               | Type                        |
| --------- | ------------------------- | --------------------------- |
| text      | Option text               | _string_                    |
| value     | Option value              | _string \| number_          |
| color     | Text color                | _string_                    |
| children  | Cascade children          | _CascaderOption[]_          |
| disabled  | Whether to disable option | _boolean_                   |
| className | className for the option  | _string \| Array \| object_ |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| change | Emitted when active option changed | _{ value: string \| number, selectedOptions: CascaderOption[], tabIndex: number }_ |
| finish | Emitted when all options is selected | _{ value: string \| number, selectedOptions: CascaderOption[], tabIndex: number }_ |
| close | Emitted when the close icon is clicked | - |
| click-tab | Emitted when a tab is clicked | _activeTab: number, title: string_ |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| title | Custom title | - |
| option | Custom option text | _{ option: CascaderOption, selected: boolean }_ |
| options-top | Custom the content above the options | _{ tabIndex: number }_ |
| options-bottom | Custom the content below the options | _{ tabIndex: number }_ |

### Types

The component exports the following type definitions:

```ts
import type { CascaderProps, CascaderOption, CascaderInputNames } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name                              | Default Value           | Description |
| --------------------------------- | ----------------------- | ----------- |
| --r-cascader-header-height        | _48px_                  | -           |
| --r-cascader-header-padding       | _0 var(--r-padding-md)_ | -           |
| --r-cascader-title-font-size      | _var(--r-font-size-lg)_ | -           |
| --r-cascader-title-line-height    | _20px_                  | -           |
| --r-cascader-close-icon-size      | _22px_                  | -           |
| --r-cascader-close-icon-color     | _var(--r-gray-5)_       | -           |
| --r-cascader-selected-icon-size   | _18px_                  | -           |
| --r-cascader-tabs-height          | _48px_                  | -           |
| --r-cascader-active-color         | _var(--r-danger-color)_ | -           |
| --r-cascader-options-height       | _384px_                 | -           |
| --r-cascader-tab-color            | _var(--r-text-color)_   | -           |
| --r-cascader-unselected-tab-color | _var(--r-text-color-2)_ | -           |
