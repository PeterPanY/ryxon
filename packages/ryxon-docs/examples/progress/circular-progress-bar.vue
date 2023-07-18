<template>
  <div class="demo-progress">
    <r-progress type="circle" :percentage="0" :width="115" />
    <r-progress type="circle" :percentage="25" :width="115" />
    <r-progress type="circle" :percentage="100" status="success" :width="115" />
    <r-progress type="circle" :percentage="70" status="warning" :width="115" />
    <r-progress type="circle" :percentage="50" status="danger" :width="115" />
  </div>
</template>
<style scoped>
.demo-progress .r-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .r-progress--circle {
  margin-right: 15px;
}
</style>
