<template>
  <r-tree-select-pc v-model="value" lazy :load="load" :props="props" />
  <br />
  show lazy load label:
  <r-tree-select-pc
    v-model="value2"
    lazy
    :load="load"
    :props="props"
    :cache-data="cacheData"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref()
const value2 = ref(5)

const cacheData = [{ value: 5, label: 'lazy load node5' }]

const props = {
  label: 'label',
  children: 'children',
  isLeaf: 'isLeaf'
}

let id = 0

const load = (node, resolve) => {
  if (node.isLeaf) return resolve([])

  setTimeout(() => {
    resolve([
      { value: ++id, label: `lazy load node${id}` },
      { value: ++id, label: `lazy load node${id}`, isLeaf: true }
    ])
  }, 400)
}
</script>
