<template>
  <r-switch v-model="value1" :active-icon="Check" :inactive-icon="Close" />
  <br />
  <r-switch
    v-model="value2"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="Check"
    :inactive-icon="Close"
  />
  <br />

  <r-switch v-model="value3" style="margin-left: 24px">
    <template #node>
      <div class="icon-wrapper">
        <r-icon>
          <component :is="value3 ? Check : Close"></component>
        </r-icon>
      </div>
    </template>
  </r-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, Close } from '@ryxon/icons'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
</script>

<style scoped>
.icon-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 18px;
}

.icon-wrapper .r-icon {
  margin-top: 4px;
}
</style>
