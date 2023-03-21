# Coupon

### Intro

Used for redemption and selection of coupons.

### Install

Register component globally via `app.use`, refer to [Component Registration](#/en-US/advanced-usage#zu-jian-zhu-ce) for more registration ways.

```js
import { createApp } from 'vue'
import { CouponCell, CouponList } from 'ryxon'

const app = createApp()
app.use(CouponCell)
app.use(CouponList)
```

## Usage

### Basic Usage

```html
<!-- Coupon Cell -->
<r-coupon-cell
  :coupons="coupons"
  :chosen-coupon="chosenCoupon"
  @click="showList = true"
/>
<!-- Coupon List -->
<r-popup
  v-model:show="showList"
  round
  position="bottom"
  style="height: 90%; padding-top: 4px;"
>
  <r-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    :disabled-coupons="disabledCoupons"
    @change="onChange"
    @exchange="onExchange"
  />
</r-popup>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const coupon = {
      available: 1,
      originCondition: 0,
      reason: '',
      value: 150,
      name: 'Coupon name',
      startAt: 1489104000,
      endAt: 1514592000,
      valueDesc: '1.5',
      unitDesc: '元'
    }

    const coupons = ref([coupon])
    const showList = ref(false)
    const chosenCoupon = ref(-1)

    const onChange = (index) => {
      showList.value = false
      chosenCoupon.value = index
    }
    const onExchange = (code) => {
      coupons.value.push(coupon)
    }

    return {
      coupons,
      showList,
      onChange,
      onExchange,
      chosenCoupon,
      disabledCoupons: [coupon]
    }
  }
}
```

## API

### CouponCell Props

| Attribute     | Description                  | Type               | Default  |
| ------------- | ---------------------------- | ------------------ | -------- |
| title         | Cell title                   | _string_           | `Coupon` |
| chosen-coupon | Index of chosen coupon       | _number \| string_ | `-1`     |
| coupons       | Coupon list                  | _Coupon[]_         | `[]`     |
| editable      | Cell editable                | _boolean_          | `true`   |
| border        | Whether to show inner border | _boolean_          | `true`   |
| currency      | Currency symbol              | _string_           | `¥`      |

### CouponList Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| v-model | Current exchange code | _string_ | - |
| chosen-coupon | Index of chosen coupon | _number_ | `-1` |
| coupons | Coupon list | _Coupon[]_ | `[]` |
| disabled-coupons | Disabled coupon list | _Coupon[]_ | `[]` |
| enabled-title | Title of coupon list | _string_ | `Available` |
| disabled-title | Title of disabled coupon list | _string_ | `Unavailable` |
| exchange-button-text | Exchange button text | _string_ | `Exchange` |
| exchange-button-loading | Whether to show loading in exchange button | _boolean_ | `false` |
| exchange-button-disabled | Whether to disable exchange button | _boolean_ | `false` |
| exchange-min-length | Min length to enable exchange button | _number_ | `1` |
| displayed-coupon-index | Index of displayed coupon | _number_ | - |
| close-button-text | Close button text | _string_ | `Close` |
| input-placeholder | Input placeholder | _string_ | `Coupon code` |
| currency | Currency symbol | _string_ | `¥` |
| empty-image | Placeholder image when list is empty | _string_ | - |
| show-count | Whether to show coupon count in tab title | _boolean_ | `true` |

### CouponList Events

| Event | Description | Arguments |
| --- | --- | --- |
| change | Emitted when chosen coupon changed | index: index of chosen coupon |
| exchange | Emitted when exchanging coupon | code: exchange code |

### CouponList Slots

| Name                 | Description                     |
| -------------------- | ------------------------------- |
| list-footer          | Coupon list bottom              |
| disabled-list-footer | Unavailable coupons list bottom |

### Data Structure of Coupon

| Key         | Description                         | Type     |
| ----------- | ----------------------------------- | -------- |
| id          | Id                                  | _string_ |
| name        | Name                                | _string_ |
| condition   | Condition                           | _string_ |
| startAt     | Start time (Timestamp, unit second) | _number_ |
| endAt       | End time (Timestamp, unit second)   | _number_ |
| description | Description                         | _string_ |
| reason      | Unavailable reason                  | _string_ |
| value       | Value                               | _number_ |
| valueDesc   | Value Text                          | _string_ |
| unitDesc    | Unit Text                           | _string_ |

### Types

The component exports the following type definitions:

```ts
import type { CouponCellProps, CouponListProps } from 'ryxon'
```

## Theming

### CSS Variables

The component provides the following CSS variables, which can be used to customize styles. Please refer to [ConfigProvider component](#/en-US/config-provider).

| Name | Default Value | Description |
| --- | --- | --- |
| --r-coupon-margin | _0 var(--r-padding-sm) var(--r-padding-sm)_ | - |
| --r-coupon-content-height | _84px_ | - |
| --r-coupon-content-padding | _14px 0_ | - |
| --r-coupon-content-text-color | _var(--r-text-color)_ | - |
| --r-coupon-background | _var(--r-background-2)_ | - |
| --r-coupon-active-background | _var(--r-active-color)_ | - |
| --r-coupon-radius | _var(--r-radius-lg)_ | - |
| --r-coupon-shadow | _0 0 4px rgba(0, 0, 0, 0.1)_ | - |
| --r-coupon-head-width | _96px_ | - |
| --r-coupon-amount-color | _var(--r-danger-color)_ | - |
| --r-coupon-amount-font-size | _30px_ | - |
| --r-coupon-currency-font-size | _40%_ | - |
| --r-coupon-name-font-size | _var(--r-font-size-md)_ | - |
| --r-coupon-disabled-text-color | _var(--r-text-color-2)_ | - |
| --r-coupon-description-padding | _var(--r-padding-xs) var(--r-padding-md)_ | - |
| --r-coupon-description-border-color | _var(--r-border-color)_ | - |
| --r-coupon-checkbox-color | _var(--r-danger-color)_ | - |
| --r-coupon-list-background | _var(--r-background)_ | - |
| --r-coupon-list-input-padding | _5px 0 5px var(--r-padding-md)_ | - |
| --r-coupon-list-exchange-button-height | _32px_ | - |
| --r-coupon-list-close-button-height | _40px_ | - |
| --r-coupon-list-empty-tip-color | _var(--r-text-color-2)_ | - |
| --r-coupon-list-empty-tip-font-size | _var(--r-font-size-md)_ | - |
| --r-coupon-list-empty-tip-line-height | _var(--r-line-height-md)_ | - |
| --r-coupon-cell-selected-text-color | _var(--r-text-color)_ | - |
