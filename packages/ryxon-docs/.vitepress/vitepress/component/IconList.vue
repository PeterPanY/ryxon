<template>
  <div class="demo-icon-switch">
    <span>复制SVG内容</span>
    <r-switch v-model="copyIcon" size="20px" />
    <span>复制图标代码</span>
  </div>
  <div v-for="item in categories" :key="item.name" class="demo-icon-item">
    <div class="demo-icon-title">{{ item.name }}</div>
    <ul class="demo-icon-list">
      <li
        v-for="component in item.icons"
        :key="component.name"
        :ref="component.name"
        class="icon-item"
        @click="copySvgIcon(component.name, $refs)"
      >
        <span class="demo-svg-icon">
          <RIcon :size="20">
            <component :is="component" />
          </RIcon>
          <span class="icon-name">{{ component.name }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw } from 'vue'
import type { DefineComponent } from 'vue'
import clipboardCopy from 'clipboard-copy'
import { showMessage } from '@ryxon/components'
import * as Icons from '@ryxon/icons'
import IconCategories from './icons-categories.json'

type CategoriesItem = {
  name: string
  icons: DefineComponent[]
}

const copyIcon = ref(true)

const copyContent = async (content) => {
  try {
    await clipboardCopy(content)

    showMessage({
      message: '复制成功',
      type: 'success'
    })
  } catch {
    showMessage({
      message: '复制失败',
      type: 'danger'
    })
  }
}

const copySvgIcon = async (name, refs) => {
  if (copyIcon.value) {
    await copyContent(`<r-icon><${name} /></r-icon>`)
  } else {
    const content = refs[name]?.[0].querySelector('svg')?.outerHTML ?? ''
    await copyContent(content)
  }
}

const categories = markRaw<CategoriesItem[]>([])
const iconMap = new Map(Object.entries(Icons))

IconCategories.categories.forEach((o) => {
  const result: CategoriesItem = {
    name: o.name,
    icons: []
  }
  o.items.forEach((i) => {
    const icon = iconMap.get(i)
    if (icon) {
      result.icons.push(icon)
      iconMap.delete(i)
    }
  })
  categories.push(result)
})

categories.push({ name: 'Other', icons: Array.from(iconMap.values()) })
</script>

<style scoped lang="scss">
.demo-icon {
  &-switch {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &-item {
    margin-top: 24px;
    &:first-child {
      margin-top: 0;
    }
  }
  &-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }
  &-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border-top: 1px solid var(--r-border-color);
    border-left: 1px solid var(--r-border-color);
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .icon-item {
      text-align: center;
      color: var(--r-gray-7);
      height: 90px;
      font-size: 13px;
      border-right: 1px solid var(--r-border-color);
      border-bottom: 1px solid var(--r-border-color);
      transition: background-color var(--r-duration-base);
      &:hover {
        background-color: var(--r-gray-3);
        .r-icon {
          color: var(--r-gray-8);
        }
        color: var(--r-gray-8);
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
          max-width: 95px;
          line-height: 1;
        }
      }
    }
  }
}
</style>
