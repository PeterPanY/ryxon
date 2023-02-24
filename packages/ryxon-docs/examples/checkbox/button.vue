<template>
  <div>
    <r-checkbox-group v-model="checkboxGroup1" size="large">
      <r-checkbox v-for="city in cities" :key="city" :name="city" type="button">
        {{ city }}
      </r-checkbox>
    </r-checkbox-group>
  </div>

  <div class="demo-button-style">
    <r-checkbox-group v-model="checkboxGroup2">
      <r-checkbox
        v-for="city in cities"
        :key="city"
        :name="city"
        type="button"
        >{{ city }}</r-checkbox
      >
    </r-checkbox-group>
  </div>

  <div class="demo-button-style">
    <r-checkbox-group v-model="checkboxGroup3" size="small">
      <r-checkbox
        v-for="city in cities"
        :key="city"
        :name="city"
        type="button"
        :disabled="city === 'Beijing'"
        >{{ city }}</r-checkbox
      >
    </r-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
const checkboxGroup1 = ref(['Shanghai'])
const checkboxGroup2 = ref(['Shanghai'])
const checkboxGroup3 = ref(['Shanghai'])
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>
