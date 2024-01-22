---
title: noop
lang: zh
---

# noop

空函数

## 添加版本

1.0.0

## 使用

```html
<script setup>
  import { noop } from '@ryxon/utils'

  defineProps({
    modelValue: { type: Function, default: noop }
  })
</script>
```
