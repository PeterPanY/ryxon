<template>
  <r-steps :active="active" direction="vertical">
    <r-step>
      <h3>【城市】物流状态1</h3>
      <p>2016-07-12 12:40</p>
    </r-step>
    <r-step>
      <h3>【城市】物流状态2</h3>
      <p>2016-07-11 10:00</p>
    </r-step>
    <r-step>
      <h3>快件已发货</h3>
      <p>2016-07-10 09:30</p>
    </r-step>
  </r-steps>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(2)
</script>
