# Coupon 优惠券选择器

### 介绍

用于优惠券的兑换和选择。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue'
import { CouponCell, CouponList } from 'ryxon'

const app = createApp()
app.use(CouponCell)
app.use(CouponList)
```

## 代码演示

### 基础用法

```html
<!-- 优惠券单元格 -->
<r-coupon-cell
  :coupons="coupons"
  :chosen-coupon="chosenCoupon"
  @click="showList = true"
/>
<!-- 优惠券列表 -->
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
      condition: '无门槛\n最多优惠12元',
      reason: '',
      value: 150,
      name: '优惠券名称',
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

| 参数          | 说明                 | 类型               | 默认值   |
| ------------- | -------------------- | ------------------ | -------- |
| title         | 单元格标题           | _string_           | `优惠券` |
| chosen-coupon | 当前选中优惠券的索引 | _number \| string_ | `-1`     |
| coupons       | 可用优惠券列表       | _Coupon[]_         | `[]`     |
| editable      | 能否切换优惠券       | _boolean_          | `true`   |
| border        | 是否显示内边框       | _boolean_          | `true`   |
| currency      | 货币符号             | _string_           | `¥`      |

### CouponList Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:code | 当前输入的兑换码 | _string_ | - |
| chosen-coupon | 当前选中优惠券的索引 | _number_ | `-1` |
| coupons | 可用优惠券列表 | _Coupon[]_ | `[]` |
| disabled-coupons | 不可用优惠券列表 | _Coupon[]_ | `[]` |
| enabled-title | 可用优惠券列表标题 | _string_ | `可使用优惠券` |
| disabled-title | 不可用优惠券列表标题 | _string_ | `不可使用优惠券` |
| exchange-button-text | 兑换按钮文字 | _string_ | `兑换` |
| exchange-button-loading | 是否显示兑换按钮加载动画 | _boolean_ | `false` |
| exchange-button-disabled | 是否禁用兑换按钮 | _boolean_ | `false` |
| exchange-min-length | 兑换码最小长度 | _number_ | `1` |
| displayed-coupon-index | 滚动至特定优惠券位置 | _number_ | - |
| show-close-button | 是否显示列表底部按钮 | _boolean_ | `true` |
| close-button-text | 列表底部按钮文字 | _string_ | `不使用优惠` |
| input-placeholder | 输入框文字提示 | _string_ | `请输入优惠码` |
| show-exchange-bar | 是否展示兑换栏 | _boolean_ | `true` |
| currency | 货币符号 | _string_ | `¥` |
| empty-image | 列表为空时的占位图 | _string_ | - |
| show-count | 是否展示可用 / 不可用数量 | _boolean_ | `true` |

### CouponList Events

| 事件名   | 说明           | 回调参数                |
| -------- | -------------- | ----------------------- |
| change   | 优惠券切换回调 | index, 选中优惠券的索引 |
| exchange | 兑换优惠券回调 | code, 兑换码            |

### CouponList Slots

| 名称                           | 说明                 |
| ------------------------------ | -------------------- |
| list-footer `v3.0.18`          | 优惠券列表底部       |
| disabled-list-footer `v3.0.18` | 不可用优惠券列表底部 |

### Coupon 数据结构

| 键名        | 说明                            | 类型     |
| ----------- | ------------------------------- | -------- |
| id          | 优惠券 id                       | _string_ |
| name        | 优惠券名称                      | _string_ |
| condition   | 满减条件                        | _string_ |
| startAt     | 卡有效开始时间 (时间戳, 单位秒) | _number_ |
| endAt       | 卡失效日期 (时间戳, 单位秒)     | _number_ |
| description | 描述信息，优惠券可用时展示      | _string_ |
| reason      | 不可用原因，优惠券不可用时展示  | _string_ |
| value       | 折扣券优惠金额，单位分          | _number_ |
| valueDesc   | 折扣券优惠金额文案              | _string_ |
| unitDesc    | 单位文案                        | _string_ |

### 类型定义

组件导出以下类型定义：

```ts
import type { CouponCellProps, CouponListProps } from 'ryxon'
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/zh/component/config-provider.html)。

| 名称 | 默认值 | 描述 |
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