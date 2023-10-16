<template>
  <r-cell is-link title="Fade" @click="animate('r-fade')" />
  <r-cell is-link title="Slide Up" @click="animate('r-slide-up')" />
  <r-cell is-link title="Slide Down" @click="animate('r-slide-down')" />
  <r-cell is-link title="Slide Left" @click="animate('r-slide-left')" />
  <r-cell is-link title="Slide Right" @click="animate('r-slide-right')" />

  <transition :name="transitionName">
    <div v-show="show" class="demo-animate-block" />
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const transitionName = ref('')

const animate = (newName: string) => {
  show.value = true
  transitionName.value = newName

  setTimeout(() => {
    show.value = false
  }, 500)
}
</script>

<style scoped>
.demo-animate-block {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  background-color: var(--r-primary-color);
  border-radius: 8px;
}
</style>
