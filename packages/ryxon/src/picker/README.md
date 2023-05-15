# Picker

### Intro

The picker component is usually used with [Popup](#/en-US/popup) Component.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { Picker } from 'ryxon'

const app = createApp()
app.use(Picker)
```

## Usage

### Basic Usage

```html
<r-picker
  title="Title"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
  @change="onChange"
/>
```

```js
import { showMessage } from 'ryxon'

export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' }
    ]
    const onConfirm = ({ selectedValues }) => {
      showMessage(`Value: ${selectedValues.join(',')}`)
    }
    const onChange = ({ selectedValues }) => {
      showMessage(`Value: ${selectedValues.join(',')}`)
    }
    const onCancel = () => showMessage('Cancel')

    return {
      columns,
      onChange,
      onCancel,
      onConfirm
    }
  }
}
```

### With Popup

```html
<r-input
  v-model="inputValue"
  is-link
  readonly
  label="City"
  placeholder="Choose City"
  @click="showPicker = true"
/>
<r-popup v-model:show="showPicker" round position="bottom">
  <r-picker
    title="Title"
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</r-popup>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' }
    ]
    const inputValue = ref('')
    const showPicker = ref(false)

    const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false
      inputValue.value = selectedOptions[0].text
    }

    return {
      columns,
      onConfirm,
      inputValue,
      showPicker
    }
  }
}
```

### v-model

Using `v-model` to bind selected values.

```html
<r-picker v-model="selectedValues" title="Title" :columns="columns" />
```

```js
import { showMessage } from 'ryxon'

export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' }
    ]
    const selectedValues = ref(['Wenzhou'])

    return {
      columns,
      selectedValues
    }
  }
}
```

### Multiple Columns

```html
<r-picker title="Title" :columns="columns" />
```

```js
export default {
  setup() {
    const columns = [
      [
        { text: 'Monday', value: 'Monday' },
        { text: 'Tuesday', value: 'Tuesday' },
        { text: 'Wednesday', value: 'Wednesday' },
        { text: 'Thursday', value: 'Thursday' },
        { text: 'Friday', value: 'Friday' }
      ],
      [
        { text: 'Morning', value: 'Morning' },
        { text: 'Afternoon', value: 'Afternoon' },
        { text: 'Evening', value: 'Evening' }
      ]
    ]

    return { columns }
  }
}
```

### Cascade

```html
<r-picker title="Title" :columns="columns" />
```

```js
export default {
  setup() {
    const columns = [
      {
        text: 'Zhejiang',
        value: 'Zhejiang',
        children: [
          {
            text: 'Hangzhou',
            value: 'Hangzhou',
            children: [
              { text: 'Xihu', value: 'Xihu' },
              { text: 'Yuhang', value: 'Yuhang' }
            ]
          },
          {
            text: 'Wenzhou',
            value: 'Wenzhou',
            children: [
              { text: 'Lucheng', value: 'Lucheng' },
              { text: 'Ouhai', value: 'Ouhai' }
            ]
          }
        ]
      },
      {
        text: 'Fujian',
        value: 'Fujian',
        children: [
          {
            text: 'Fuzhou',
            value: 'Fuzhou',
            children: [
              { text: 'Gulou', value: 'Gulou' },
              { text: 'Taijiang', value: 'Taijiang' }
            ]
          },
          {
            text: 'Xiamen',
            value: 'Xiamen',
            children: [
              { text: 'Siming', value: 'Siming' },
              { text: 'Haicang', value: 'Haicang' }
            ]
          }
        ]
      }
    ]

    return { columns }
  }
}
```

### Disable option

```html
<r-picker :columns="columns" />
```

```js
export default {
  setup() {
    const columns = [
      { text: 'Delaware', value: 'Delaware', disabled: true },
      { text: 'Florida', value: 'Florida' },
      { text: 'Wenzhou', value: 'Wenzhou' }
    ]
    return { columns }
  }
}
```

### Loading

When Picker columns data is acquired asynchronously, use `loading` prop to show loading prompt.

```html
<r-picker title="Title" :columns="columns" :loading="loading" />
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const columns = ref([])
    const loading = ref(true)

    setTimeout(() => {
      columns.value = [{ text: 'Option', value: 'option' }]
      loading.value = false
    }, 1000)

    return { columns, loading }
  }
}
```

### Custom Columns Input

```html
<r-picker
  :title="Title"
  :columns="columns"
  :columns-input-names="customInputName"
/>
```

```js
export default {
  setup() {
    const columns = [
      {
        cityName: 'Zhejiang',
        cities: [
          {
            cityName: 'Hangzhou',
            cities: [{ cityName: 'Xihu' }, { cityName: 'Yuhang' }]
          },
          {
            cityName: 'Wenzhou',
            cities: [{ cityName: 'Lucheng' }, { cityName: 'Ouhai' }]
          }
        ]
      },
      {
        cityName: 'Fujian',
        cities: [
          {
            cityName: 'Fuzhou',
            cities: [{ cityName: 'Gulou' }, { cityName: 'Taijiang' }]
          },
          {
            cityName: 'Xiamen',
            cities: [{ cityName: 'Siming' }, { cityName: 'Haicang' }]
          }
        ]
      }
    ]

    const customInputName = {
      text: 'cityName',
      value: 'cityName',
      children: 'cities'
    }

    return {
      columns,
      customInputName
    }
  }
}
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| columns | Columns data | _PickerOption[] \| PickerOption[][]_ | `[]` |
| columns-input-names | custom columns input | _object_ | `{ text: 'text', value: 'value', children: 'children' }` |
| title | Toolbar title | _string_ | - |
| confirm-button-text | Text of confirm button | _string_ | `Confirm` |
| cancel-button-text | Text of cancel button | _string_ | `Cancel` |
| toolbar-position | Toolbar position, cat be set to `bottom` | _string_ | `top` |
| loading | Whether to show loading prompt | _boolean_ | `false` |
| show-toolbar | Whether to show toolbar | _boolean_ | `true` |
| allow-html | Whether to allow HTML in option text | _boolean_ | `false` |
| option-height | Option height, supports `px` `vw` `vh` `rem` unit, default `px` | _number \| string_ | `44` |
| visible-option-num | Count of visible columns | _number \| string_ | `6` |
| swipe-duration | Duration of the momentum animation, unit `ms` | _number \| string_ | `1000` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| confirm | Emitted when the confirm button is clicked | _{ selectedValues, selectedOptions, selectedIndexes }_ |
| cancel | Emitted when the cancel button is clicked | _{ selectedValues, selectedOptions, selectedIndexes }_ |
| change | Emitted when current selected option is changed | _{ selectedValues, selectedOptions,selectedIndexes, columnIndex }_ |
| click-option | Emitted when an option is clicked | _{ currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex }_ |
| scroll-into `v4.2.1` | Emitted when an option is scrolled into the middle selection area by clicking or dragging | _{ currentOption, columnIndex }_ |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| toolbar | Custom toolbar content | - |
| title | Custom title | - |
| confirm | Custom confirm button text | - |
| cancel | Custom cancel button text | - |
| option | Custom option content | _option: PickerOption, index: number_ |
| columns-top | Custom content above columns | - |
| columns-bottom | Custom content below columns | - |

### Data Structure of PickerOption

| Key       | Description               | Type                        |
| --------- | ------------------------- | --------------------------- |
| text      | Text                      | _string \| number_          |
| value     | Value of option           | _string \| number_          |
| disabled  | Whether to disable option | _boolean_                   |
| children  | Cascade children options  | _PickerOption[]_            |
| className | ClassName for this option | _string \| Array \| object_ |

### Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get Picker instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| confirm | Stop scrolling and emit confirm event | - | - |
| getSelectedOptions | Get current selected options | - | _(PickerOption \| undefined)[]_ |

### Types

The component exports the following type definitions:

```ts
import type {
  PickerProps,
  PickerColumn,
  PickerOption,
  PickerInstance,
  PickerInputNames,
  PickerToolbarPosition,
  PickerCancelEventParams,
  PickerChangeEventParams,
  PickerConfirmEventParams
} from 'ryxon'
```

`PickerInstance` is the type of component instance:

```ts
import { ref } from 'vue'
import type { PickerInstance } from 'ryxon'

const pickerRef = ref<PickerInstance>()

pickerRef.value?.confirm()
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-picker-background | _var(--r-background-2)_ | - |
| --r-picker-toolbar-height | _44px_ | - |
| --r-picker-title-font-size | _var(--r-font-size-lg)_ | - |
| --r-picker-title-line-height | _var(--r-line-height-md)_ | - |
| --r-picker-action-padding | _0 var(--r-padding-md)_ | - |
| --r-picker-action-font-size | _var(--r-font-size-md)_ | - |
| --r-picker-confirm-action-color | _var(--r-primary-color)_ | - |
| --r-picker-cancel-action-color | _var(--r-text-color-2)_ | - |
| --r-picker-option-padding | _0 var(--r-padding-base)_ | - |
| --r-picker-option-font-size | _var(--r-font-size-lg)_ | - |
| --r-picker-option-text-color | _var(--r-text-color)_ | - |
| --r-picker-option-disabled-opacity | _0.3_ | - |
| --r-picker-mask-color | _linear-gradient_ | - |
| --r-picker-loading-icon-color | _var(--r-primary-color)_ | - |
| --r-picker-loading-mask-color | _rgba(255, 255, 255, 0.9)_ | - |
