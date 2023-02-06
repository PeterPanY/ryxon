<template>
  <div>
    默认主题
    <r-config-provider>
      <r-form>
        <r-input name="slider" label="滑块">
          <template #input>
            <r-slider v-model="slider" />
          </template>
        </r-input>

        <div style="margin: 16px">
          <r-button round block type="primary" native-type="submit">
            提交
          </r-button>
        </div>
      </r-form>
    </r-config-provider>
  </div>

  <div>
    定制主题
    <r-config-provider :theme-vars="themeVars">
      <r-form>
        <r-input name="slider" label="滑块">
          <template #input>
            <r-slider v-model="slider" />
          </template>
        </r-input>

        <div style="margin: 16px">
          <r-button round block type="primary" native-type="submit">
            提交
          </r-button>
        </div>
      </r-form>
    </r-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const slider = ref(50)

const themeVars = {
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackground: '#07c160',
  buttonPrimaryBackground: '#07c160',
  buttonPrimaryBorderColor: '#07c160'
}
</script>

<style scoped></style>
