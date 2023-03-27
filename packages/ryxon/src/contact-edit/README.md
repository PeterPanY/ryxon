# ContactEdit

### Intro

Edit and save the contact information.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { ContactEdit } from 'ryxon'

const app = createApp()
app.use(ContactEdit)
```

## Usage

### Basic Usage

```html
<r-contact-edit
  is-edit
  show-set-default
  :contact-info="editingContact"
  set-default-label="Set as the default contact"
  @save="onSave"
  @delete="onDelete"
/>
```

```js
import { ref } from 'vue'
import { showMessage } from 'ryxon'

export default {
  setup() {
    const editingContact = ref({
      tel: '',
      name: ''
    })
    const onSave = (contactInfo) => showMessage('Save')
    const onDelete = (contactInfo) => showMessage('Delete')
    return {
      onSave,
      onDelete,
      editingContact
    }
  }
}
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| contact-info | Contact Info | _Contact_ | `[]` |
| is-edit | Whether is editing | _boolean_ | `false` |
| is-saving | Whether to show save button loading status | _boolean_ | `false` |
| is-deleting | Whether to show delete button loading status | _boolean_ | `false` |
| tel-validator | The method to validate tel | _(tel: string) => boolean_ | - |
| show-set-default | Whether to show default contact switch | _boolean_ | `false` |
| set-default-label | default contact switch label | _string_ | - |

### Events

| Event  | Description                               | Arguments             |
| ------ | ----------------------------------------- | --------------------- |
| save   | Emitted when the save button is clicked   | content: contact info |
| delete | Emitted when the delete button is clicked | content: contact info |

### Data Structure of Contact

| key  | Description | Type     |
| ---- | ----------- | -------- |
| name | Name        | _string_ |
| tel  | Phone       | _string_ |

### Types

The component exports the following type definitions:

```ts
import type { ContactEditInfo, ContactEditProps } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-contact-edit-padding | _var(--r-padding-md)_ | - |
| --r-contact-edit-inputs-radius | _var(--r-radius-md)_ | - |
| --r-contact-edit-buttons-padding | _var(--r-padding-xl) 0_ | - |
| --r-contact-edit-button-margin-bottom | _var(--r-padding-sm)_ | - |
| --r-contact-edit-button-font-size | _var(--r-font-size-lg)_ | - |
| --r-contact-edit-input-label-width | _4.1em_ | - |
