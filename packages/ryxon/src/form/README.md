# Form

### Intro

Used for data entry and verification, and supports input boxes, radio buttons, check boxes, file uploads and other types. Should be used with [Input](#/en-US/input) component.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { Form, Input, CellGroup } from 'ryxon'

const app = createApp()
app.use(Form)
app.use(Input)
app.use(CellGroup)
```

## Usage

### Basic Usage

```html
<r-form @submit="onSubmit">
  <r-cell-group inset>
    <r-input
      v-model="username"
      name="Username"
      label="Username"
      placeholder="Username"
      :rules="[{ required: true, message: 'Username is required' }]"
    />
    <r-input
      v-model="password"
      type="password"
      name="Password"
      label="Password"
      placeholder="Password"
      :rules="[{ required: true, message: 'Password is required' }]"
    />
  </r-cell-group>
  <div style="margin: 16px;">
    <r-button round block type="primary" native-type="submit">
      Submit
    </r-button>
  </div>
</r-form>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const onSubmit = (values) => {
      console.log('submit', values)
    }

    return {
      username,
      password,
      onSubmit
    }
  }
}
```

### Validate Rules

```html
<r-form @failed="onFailed">
  <r-cell-group inset>
    <r-input
      v-model="value1"
      name="pattern"
      placeholder="Use pattern"
      :rules="[{ pattern, message: 'Error message' }]"
    />
    <r-input
      v-model="value2"
      name="validator"
      placeholder="Use validator"
      :rules="[{ validator, message: 'Error message' }]"
    />
    <r-input
      v-model="value3"
      name="validatorMessage"
      placeholder="Use validator to return message"
      :rules="[{ validator: validatorMessage }]"
    />
    <r-input
      v-model="value4"
      name="asyncValidator"
      placeholder="Use async validator"
      :rules="[{ validator: asyncValidator, message: 'Error message' }]"
    />
  </r-cell-group>
  <div style="margin: 16px;">
    <r-button round block type="primary" native-type="submit">
      Submit
    </r-button>
  </div>
</r-form>
```

```js
import { ref } from 'vue'
import { closeAllMessage, showMessage } from 'ryxon'

export default {
  setup() {
    const value1 = ref('')
    const value2 = ref('')
    const value3 = ref('abc')
    const value4 = ref('')
    const pattern = /\d{6}/

    const validator = (val) => /1\d{10}/.test(val)

    const validatorMessage = (val) => `${val} is invalid`

    const asyncValidator = (val) =>
      new Promise((resolve) => {
        showMessage('Validating...')

        setTimeout(() => {
          closeAllMessage()
          resolve(val === '1234')
        }, 1000)
      })

    const onFailed = (errorInfo) => {
      console.log('failed', errorInfo)
    }

    return {
      value1,
      value2,
      value3,
      value4,
      pattern,
      onFailed,
      validator,
      asyncValidator,
      validatorMessage
    }
  }
}
```

### Input Type - Switch

```html
<r-input name="switch" label="Switch">
  <template #input>
    <r-switch v-model="checked" />
  </template>
</r-input>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const checked = ref(false)
    return { checked }
  }
}
```

### Input Type - Checkbox

```html
<r-input name="checkbox" label="Checkbox">
  <template #input>
    <r-checkbox v-model="checked" shape="square" />
  </template>
</r-input>
<r-input name="checkboxGroup" label="CheckboxGroup">
  <template #input>
    <r-checkbox-group v-model="groupChecked" direction="horizontal">
      <r-checkbox name="1" shape="square">Checkbox 1</r-checkbox>
      <r-checkbox name="2" shape="square">Checkbox 2</r-checkbox>
    </r-checkbox-group>
  </template>
</r-input>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const checked = ref(false)
    const groupChecked = ref([])
    return {
      checked,
      groupChecked
    }
  }
}
```

### Input Type - Radio

```html
<r-input name="radio" label="Radio">
  <template #input>
    <r-radio-group v-model="checked" direction="horizontal">
      <r-radio name="1">Radio 1</r-radio>
      <r-radio name="2">Radio 2</r-radio>
    </r-radio-group>
  </template>
</r-input>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const checked = ref('1')
    return { checked }
  }
}
```

### Input Type - InputNumber

```html
<r-input name="inputNumber" label="InputNumber">
  <template #input>
    <r-Input-number v-model="value" />
  </template>
</r-input>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(1)
    return { value }
  }
}
```

### Input Type - Rate

```html
<r-input name="rate" label="Rate">
  <template #input>
    <r-rate v-model="value" />
  </template>
</r-input>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(3)
    return { value }
  }
}
```

### Input Type - Slider

```html
<r-input name="slider" label="Slider">
  <template #input>
    <r-slider v-model="value" />
  </template>
</r-input>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(50)
    return { value }
  }
}
```

### Input Type - Upload

```html
<r-input name="upload" label="Upload">
  <template #input>
    <r-upload v-model="value" />
  </template>
</r-input>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const value = ref([
      { url: 'https://fastly.jsdelivr.net/npm/@ryxon/assets/leaf.jpeg' }
    ])
    return { value }
  }
}
```

### Input Type - Picker

```html
<r-input
  v-model="result"
  is-link
  readonly
  name="picker"
  label="Picker"
  placeholder="Select city"
  @click="showPicker = true"
/>
<r-popup v-model:show="showPicker" position="bottom">
  <r-picker
    :columns="columns"
    @confirm="onConfirm"
    @cancel="showPicker = false"
  />
</r-popup>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const result = ref('')
    const showPicker = ref(false)
    const columns = [
      { text: 'Delaware', value: 'Delaware' },
      { text: 'Florida', value: 'Florida' },
      { text: 'Georqia', value: 'Georqia' },
      { text: 'Indiana', value: 'Indiana' },
      { text: 'Maine', value: 'Maine' }
    ]

    const onConfirm = ({ selectedOptions }) => {
      result.value = selectedOptions[0]?.text
      showPicker.value = false
    }

    return {
      result,
      columns,
      onConfirm,
      showPicker
    }
  }
}
```

### Input Type - DatePicker

```html
<r-input
  v-model="result"
  is-link
  readonly
  name="datePicker"
  label="Date Picker"
  placeholder="Select date"
  @click="showPicker = true"
/>
<r-popup v-model:show="showPicker" position="bottom">
  <r-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
</r-popup>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const result = ref('')
    const showPicker = ref(false)
    const onConfirm = ({ selectedValues }) => {
      result.value = selectedValues.join('/')
      showPicker.value = false
    }

    return {
      result,
      onConfirm,
      showPicker
    }
  }
}
```

### Input Type - Area

```html
<r-input
  v-model="result"
  is-link
  readonly
  name="area"
  label="Area Picker"
  placeholder="Select area"
  @click="showArea = true"
/>
<r-popup v-model:show="showArea" position="bottom">
  <r-area
    :area-list="areaList"
    @confirm="onConfirm"
    @cancel="showArea = false"
  />
</r-popup>
```

```js
import { ref } from 'vue'
import { areaList } from '@ryxon/area-data'

export default {
  setup() {
    const result = ref('')
    const showArea = ref(false)
    const onConfirm = ({ selectedOptions }) => {
      showArea.value = false
      result.value = selectedOptions.map((item) => item.text).join('/')
    }

    return {
      result,
      areaList,
      showArea,
      onConfirm
    }
  }
}
```

### Input Type - Calendar

```html
<r-input
  v-model="result"
  is-link
  readonly
  name="calendar"
  label="Calendar"
  placeholder="Select date"
  @click="showCalendar = true"
/>
<r-calendar v-model:show="showCalendar" @confirm="onConfirm" />
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const result = ref('')
    const showCalendar = ref(false)
    const onConfirm = (date) => {
      result.value = `${date.getMonth() + 1}/${date.getDate()}`
      showCalendar.value = false
    }

    return {
      result,
      onConfirm,
      showCalendar
    }
  }
}
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| label-width | Input label width | _number \| string_ | `6.2em` |
| label-align | Input label align, can be set to `center` `right` `top` | _string_ | `left` |
| input-align | Input input align, can be set to `center` `right` | _string_ | `left` |
| error-message-align | Error message align, can be set to `center` `right` | _string_ | `left` |
| validate-trigger | When to validate the form, can be set to `onChange`、`onSubmit`, supports using array to set multiple values | _string \| string[]_ | `onBlur` |
| colon | Whether to display colon after label | _boolean_ | `false` |
| disabled | Whether to disable form | _boolean_ | `false` |
| readonly | Whether to be readonly | _boolean_ | `false` |
| validate-first | Whether to stop the validation when a rule fails | _boolean_ | `false` |
| scroll-to-error | Whether to scroll to the error input when validation failed | _boolean_ | `false` |
| show-error | Whether to highlight input when validation failed | _boolean_ | `false` |
| show-error-message | Whether to show error message when validation failed | _boolean_ | `true` |
| submit-on-enter | Whether to submit form on enter | _boolean_ | `true` |

### Data Structure of Rule

| Key | Description | Type |
| --- | --- | --- |
| required | Whether to be a required input, the value is not allowed to be empty (empty string, empty array, `false`, `undefined`, `null`) | _boolean_ |
| message | Error message, can be a function to dynamically return message content | _string \| (value, rule) => string_ |
| validator | Custom validator, can return a Promise to validate dynamically | _(value, rule) => boolean \| string \| Promise_ |
| pattern | Regexp pattern, if the regexp cannot match, means that the validation fails | _RegExp_ |
| trigger | When to validate the form, priority is higher than the `validate-trigger` of the Form component, can be set to `onChange`, `onBlur`, `onSubmit` | _string \| string[]_ |
| formatter | Format value before validate | _(value, rule) => any_ |
| validateEmpty | Controls whether the `validator` and `pattern` options to verify empty values, the default value is `true`, you can set to `false` to disable this behavior | _boolean_ |

### validate-trigger

| Value    | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| onSubmit | Trigger validation after submitting form                         |
| onBlur   | Trigger validation after submitting form or blurring input       |
| onChange | Trigger validation after submitting form or changing input value |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| submit | Emitted after submitting the form and validation passed | _values: object_ |
| failed | Emitted after submitting the form and validation failed | _errorInfo: { values: object, errors: object[] }_ |

### Methods

Use [ref](https://v3.vuejs.org/guide/component-template-refs.html) to get Form instance and call instance methods.

| Name | Description | Attribute | Return value |
| --- | --- | --- | --- |
| submit | Submit form | - | - |
| getValues | Get current form values | - | _Record<string, unknown>_ |
| validate | Validate form | _name?: string \| string[]_ | _Promise\<void\>_ |
| resetValidation | Reset validation | _name?: string \| string[]_ | - |
| getValidationStatus | Get validation status of all inputs，status can be `passed`、`failed`、`unvalidated` | - | _Record\<string, InputValidationStatus\>_ |
| scrollToInput | Scroll to input | _name: string, alignToTop: boolean_ | - |

### Types

The component exports the following type definitions:

```ts
import type { FormProps, FormInstance } from 'ryxon'
```

`FormInstance` is the type of component instance:

```ts
import { ref } from 'vue'
import type { FormInstance } from 'ryxon'

const formRef = ref<FormInstance>()

formRef.value?.submit()
```

### Slots

| Name    | Description  |
| ------- | ------------ |
| default | Form content |
