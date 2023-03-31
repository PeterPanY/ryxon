<template>
  <div class="demo-type">
    <div>
      <r-avatar :icon="UserFilled" />
    </div>
    <div>
      <r-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <div>
      <r-avatar :style="`--r-avatar-bg-color: ${color}`">
        {{ avatarValue }}
      </r-avatar>
      <r-button
        size="small"
        :style="{ marginLeft: '16px', verticalAlign: 'middle' }"
        @click="changeValue"
      >
        改变
      </r-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserFilled } from '@ryxon/icons'

const UserList = ['U', 'Lucy', 'Tom', 'Edward']
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

const avatarValue = ref(UserList[0])
const color = ref(colorList[0])

const changeValue = () => {
  const index = UserList.indexOf(avatarValue.value)
  avatarValue.value =
    index < UserList.length - 1 ? UserList[index + 1] : UserList[0]
  color.value =
    index < colorList.length - 1 ? colorList[index + 1] : colorList[0]
}
</script>

<style scoped>
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>
