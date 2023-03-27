# PickerGroup

### Intro

Used to combine multiple Picker components, allow users to select multiple value.

The following components can be placed inside PickerGroup:

- [Picker](#/en-US/picker)
- [Area](#/en-US/area)
- [DatePicker](#/en-US/date-picker)
- [TimePicker](#/en-US/time-picker)
- Other custom components based on Picker component

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { PickerGroup } from 'ryxon'

const app = createApp()
app.use(PickerGroup)
```

## Usage

### Select Date Time

Place a `DatePicker` component and a `TimePicker` component in the default slot of the `PickerGroup` to select both a date and a time.

`PickerGroup` will render a unified toolbar, so the child components will not render is's toolbar, and the toolbar props and events need to be set to the `PickerGroup`, such as the `title` prop, `confirm` event, `cancel` event, etc. Other props and events in child components can be used as before.

```html
<r-picker-group
  title="Title"
  :tabs="['Date', 'Time']"
  @confirm="onConfirm"
  @cancel="onCancel"
>
  <r-date-picker
    v-model="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
  />
  <r-time-picker v-model="currentTime" />
</r-picker-group>
```

```js
import { ref } from 'vue'
import { showMessage } from 'ryxon'

export default {
  setup() {
    const currentDate = ref(['2022', '06', '01'])
    const currentTime = ref(['12', '00'])
    const onConfirm = () => {
      showMessage(
        `${currentDate.value.join('/')} ${currentTime.value.join(':')}`
      )
    }
    const onCancel = () => {
      showMessage('cancel')
    }

    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 5, 1),
      currentDate,
      currentTime
    }
  }
}
```

### Next Step Button

In some scenarios, in order to ensure that users can select all Pickers in turn, you can set the `next-step-text` prop of PickerGroup. After setting the `next-step-text` prop, if the user has not switched to the last tab, the button in the upper right corner will become "Next Step", and automatically switch to the next Picker after clicking. When the user switches to the last tab, the button in the upper right corner changes to "Confirm".

```html
<r-picker-group
  title="Title"
  :tabs="['Date', 'Time']"
  next-step-text="Next Step"
  @confirm="onConfirm"
  @cancel="onCancel"
>
  <r-date-picker
    v-model="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
  />
  <r-time-picker v-model="currentTime" />
</r-picker-group>
```

```js
import { ref } from 'vue'
import { showMessage } from 'ryxon'

export default {
  setup() {
    const currentDate = ref(['2022', '06', '01'])
    const currentTime = ref(['12', '00'])
    const onConfirm = () => {
      showMessage(
        `${currentDate.value.join('/')} ${currentTime.value.join(':')}`
      )
    }
    const onCancel = () => {
      showMessage('cancel')
    }

    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 5, 1),
      currentDate,
      currentTime
    }
  }
}
```

### Select Date Range

Place two `DatePicker` components in the default slot of `PickerGroup` to select the time range.

```html
<r-picker-group
  title="Title"
  :tabs="['Start Date', 'End Date']"
  @confirm="onConfirm"
  @cancel="onCancel"
>
  <r-date-picker v-model="startDate" :min-date="minDate" :max-date="maxDate" />
  <r-date-picker v-model="endDate" :min-date="minDate" :max-date="maxDate" />
</r-picker-group>
```

```js
import { ref } from 'vue'
import { showMessage } from 'ryxon'

export default {
  setup() {
    const startDate = ref(['2022', '06', '01'])
    const endDate = ref(['2023', '06', '01'])

    const onConfirm = () => {
      showMessage(`${startDate.value.join('/')} ${endDate.value.join('/')}`)
    }
    const onCancel = () => {
      showMessage('cancel')
    }

    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 5, 1),
      endDate,
      startDate
    }
  }
}
```

### Select Time Range

Place two `TimePicker` components in the default slot of `PickerGroup` to select the time range.

```html
<r-picker-group
  title="Title"
  :tabs="['Start Time', 'End Time']"
  @confirm="onConfirm"
  @cancel="onCancel"
>
  <r-time-picker v-model="startTime" />
  <r-time-picker v-model="endTime" />
</r-picker-group>
```

```js
import { ref } from 'vue'
import { showMessage } from 'ryxon'

export default {
  setup() {
    const startTime = ref(['12', '00'])
    const endTime = ref(['12', '00'])

    const onConfirm = () => {
      showMessage(`${startTime.value.join(':')} ${endTime.value.join(':')}`)
    }
    const onCancel = () => {
      showMessage('cancel')
    }

    return {
      endTime,
      startTime
    }
  }
}
```

## API

### Props

| Attribute               | Description              | Type       | Default   |
| ----------------------- | ------------------------ | ---------- | --------- |
| tabs                    | Titles of tabs           | _string[]_ | `[]`      |
| title                   | Toolbar title            | _string_   | `''`      |
| next-step-text `v4.0.8` | Text of next step button | _string_   | `''`      |
| confirm-button-text     | Text of confirm button   | _string_   | `Confirm` |
| cancel-button-text      | Text of cancel button    | _string_   | `Cancel`  |

### Slots

| Name    | Description                | SlotProps |
| ------- | -------------------------- | --------- |
| toolbar | Custom toolbar content     | -         |
| title   | Custom title               | -         |
| confirm | Custom confirm button text | -         |
| cancel  | Custom cancel button text  | -         |

### Types

The component exports the following type definitions:

```ts
import type { DatePickerProps, DatePickerColumnType } from 'ryxon'
```