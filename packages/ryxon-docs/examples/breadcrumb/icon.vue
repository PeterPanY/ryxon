<template>
  <r-breadcrumb :separator-icon="ArrowRight">
    <r-breadcrumb-item :to="{ path: '/' }">homepage</r-breadcrumb-item>
    <r-breadcrumb-item>promotion management</r-breadcrumb-item>
    <r-breadcrumb-item>promotion list</r-breadcrumb-item>
    <r-breadcrumb-item>promotion detail</r-breadcrumb-item>
  </r-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@ryxon/icons'
</script>
