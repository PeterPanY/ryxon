<template>
  <div class="demo-progress">
    <r-progress :text-inside="true" :stroke-width="26" :percentage="70" />
    <r-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    />
    <r-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    />
    <r-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="danger"
    />
  </div>
</template>

<style scoped>
.demo-progress .r-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
