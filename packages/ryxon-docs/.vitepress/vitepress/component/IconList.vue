<template>
  <div class="demo-icon">
    <div class="demo-icon-item">
      <ul class="demo-icon-list">
        <!-- <li
          v-for="item in list"
          :key="item.name"
          @click="handleClick(item.name)"
        >
          <span class="demo-svg-icon">
            <RIcon :name="item.name" :size="20" />
            <span class="icon-name">{{ item.title }}</span>
          </span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import {  } from '@ryxon/components';
// RMessage\RIcon/ svgs

// const list = Object.keys(svgs).map((key) => {
//   const name = key.replace('./svg/', '').replace('.svg', '');
//   return {
//     name,
//     title: name,
//   };
// });
const handleClick = (name) => {
  var aux = document.createElement('input');
  aux.setAttribute('value', `<r-icon name="${name}" />`);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);

  // RMessage.success('复制成功')
};
</script>

<style lang="scss">
.demo-icon {
  .demo-icon-item {
    margin-top: 24px;
    .demo-icon-title {
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
    }
    .demo-icon-list {
      overflow: hidden;
      list-style: none;
      padding: 0 !important;
      border-top: 1px solid var(--r-border-color);
      border-left: 1px solid var(--r-border-color);
      border-radius: 4px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      > li {
        text-align: center;
        color: var(--r-text-color-regular);
        height: 90px;
        font-size: 13px;
        border-right: 1px solid var(--r-border-color);
        border-bottom: 1px solid var(--r-border-color);
        transition: background-color var(--r-transition-duration);
      }
      .demo-svg-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        cursor: pointer;
        .icon-name {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
