# useCustomInputValue

### Intro

Used to custom Input value.

## Usage

### Basic Usage

If you want to custom Form items, you can insert your component into the `input` slot of the Input component, and call the `useCustomInputValue` method inside your custom component.

#### MyComponent

```js
// MyComponent.vue
import { ref } from 'vue'
import { useCustomInputValue } from '@ryxon/use'

export default {
  setup() {
    const myValue = ref(0)

    useCustomInputValue(() => myValue.value)

    return { myValue }
  }
}
```

#### Form

```html
<r-form>
  <r-input name="my-input" label="Custom Input">
    <template #input>
      <my-component />
    </template>
  </r-input>
</r-form>
```

## API

### Type Declarations

```ts
function useCustomInputValue(customValue: () => unknown): void
```

### Params

| Name        | Description                 | Type            | Default Value |
| ----------- | --------------------------- | --------------- | ------------- |
| customValue | Function to get input value | _() => unknown_ | -             |
