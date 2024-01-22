---
title: isArray
lang: zh
---

# isArray

检查 `value` 是否是 `Array` 类对象。

## 添加版本

1.0.0

## 使用

```html
<script setup>
  import { isArray, noop } from '@ryxon/utils'

  isArray([1, 2, 3])
  // => true

  isArray(document.body.children)
  // => false

  isArray('abc')
  // => false

  isArray(noop)
  // => false
</script>
```

## API

### 参数

| 参数  | 说明       | 类型 | 默认值 |
| ----- | ---------- | ---- | ------ |
| value | 要检查的值 | `-`  | -      |
