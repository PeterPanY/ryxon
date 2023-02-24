<template>
  <div>
    <r-radio-group v-model="radioGroup1" size="large">
      <r-radio v-for="city in cities" :key="city" :name="city" type="button">
        {{ city }}
      </r-radio>
    </r-radio-group>
  </div>

  <div class="demo-button-style">
    <r-radio-group v-model="radioGroup2">
      <r-radio v-for="city in cities" :key="city" :name="city" type="button">{{
        city
      }}</r-radio>
    </r-radio-group>
  </div>

  <div class="demo-button-style">
    <r-radio-group v-model="radioGroup3" size="small">
      <r-radio
        v-for="city in cities"
        :key="city"
        :name="city"
        type="button"
        :disabled="city === 'Beijing'"
        >{{ city }}</r-radio
      >
    </r-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
const radioGroup1 = ref('Shanghai')
const radioGroup2 = ref('Shanghai')
const radioGroup3 = ref('Shanghai')
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>
