---
title: extend
lang: zh
---

# extend

主要用于对象合并，将源对象中的属性复制到目标对象中，他将返回目标对象。会改变`target`传参对象

## 添加版本

1.0.0

## 使用

```html
<script setup>
  import { extend } from '@ryxon/utils'

  var target = { name: '带你飞' }
  var source = { age: 18 }
  var result = extend(target, source)
  console.log(result, target === result) // {name: '带你飞', age: 18} true
</script>
```

## API

### 参数

| 参数      | 说明     | 类型          | 默认值 |
| --------- | -------- | ------------- | ------ |
| target    | 目标对象 | `Object`      | -      |
| [sources] | 来源对象 | `(...Object)` | -      |
