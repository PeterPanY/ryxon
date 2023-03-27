<template>
  <r-form @failed="onFailed">
    <!-- 通过 pattern 进行正则校验 -->
    <r-input
      v-model="value1"
      label="正则校验"
      name="pattern"
      placeholder="正则校验"
      :rules="[{ pattern, message: '请输入六位数字' }]"
    />

    <!-- 通过 validator 进行函数校验 -->
    <r-input
      v-model="value2"
      label="函数校验"
      name="validator"
      placeholder="函数校验"
      :rules="[{ validator, message: '请输入正确内容' }]"
    />

    <!-- 通过 validator 返回错误提示 -->
    <r-input
      v-model="value3"
      label="校验函数"
      name="validatorMessage"
      placeholder="校验函数返回错误提示"
      :rules="[{ validator: validatorMessage }]"
    />

    <!-- 通过 validator 进行异步函数校验 -->
    <r-input
      v-model="value4"
      label="异步校验"
      name="asyncValidator"
      placeholder="异步函数校验"
      :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
    />

    <div style="margin: 16px">
      <r-button round block type="primary" native-type="submit">
        提交
      </r-button>
    </div>
  </r-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showMessage } from '@ryxon/components'

const value1 = ref('')
const pattern = /\d{6}/

const value2 = ref('')
// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val) => /1\d{10}/.test(val)

const value3 = ref('')
// 校验函数可以直接返回一段错误提示
const validatorMessage = (val) => `${val} 不合法，请重新输入`

const value4 = ref('')
// 校验函数可以返回 Promise，实现异步校验
const asyncValidator = (val) =>
  new Promise((resolve) => {
    const message = showMessage({
      type: 'loading',
      message: '验证中...',
      duration: 0
    })
    setTimeout(() => {
      message.close()
      resolve(val === '1234')
    }, 1000)
  })

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo)
}
</script>
