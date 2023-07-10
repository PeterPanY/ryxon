<template>
  <r-switch v-model="show" />
  <r-skeleton title avatar :row="3" :loading="!show">
    <div class="demo-preview">
      <img
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      />
      <div class="demo-content">
        <h3>内容标题</h3>
        <p>内容副标题</p>
      </div>
    </div>
  </r-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>

<style scoped lang="scss">
.r-switch {
  margin: 0 var(--r-padding-md) var(--r-padding-xs);
}

.demo-preview {
  display: flex;
  padding: 0 var(--r-padding-md);

  .demo-content {
    padding-top: 6px;

    h3 {
      margin: 0;
      font-size: 18px;
      line-height: 20px;
    }

    p {
      margin: 13px 0 0;
      font-size: 14px;
      line-height: 20px;
    }
  }

  img {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    margin-right: var(--r-padding-md);
  }
}
</style>
