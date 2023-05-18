---
title: deepmerge
lang: zh
---

# 深度合并

一种深度合并功能，可根据您的输入自动推断返回类型，而不会改变源对象。

对象和数组将被合并，但数字和字符串等值将被覆盖。

所有合并/覆盖都按照您为函数提供的参数的顺序进行。

## 使用

```js
import merge from 'ryxon/lib/utils/deepmerge'

const obj1 = {
  a: { a: 1 }
}

const obj2 = {
  b: { a: 2, b: 2 }
}

const obj3 = {
  a: { b: 3 },
  b: { b: 3, c: 3 },
  c: 3
}

const result = merge(obj1, obj2, obj3)

// 结果数据
// {
//   a: { a: 1, b: 3 },
//   b: { a: 2, b: 3, c: 3 },
//   c: 3
// }
```

## 选项

如果您想提供更改合并行为的选项，您可以使用以下.withOptions 方法：

```js
import merge from 'ryxon/lib/utils/deepmerge'

const obj1 = { array: ['A'] }

const obj2 = { array: ['B'] }

const result = merge.withOptions({ mergeArrays: false }, obj1, obj2)

// 结果数据
// { "array": ["B"] }
```
