<template>
  <!-- 不指定单位，默认为 px -->
  <r-empty image-size="100" description="描述文字" />
  <!-- 指定单位，支持 rem, vh, vw -->
  <r-empty image-size="10rem" description="描述文字" />
  <!-- 设置为数组格式 -->
  <r-empty :image-size="[60, 40]" description="描述文字" />
</template>
