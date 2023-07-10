<template>
  <span class="inline-flex items-center">
    <code class="api-typing mr-1">
      {{ type }}
    </code>
    <ClientOnly>
      <RTooltip v-if="details" theme="light" trigger="click">
        <RButton text :icon="Warning" class="typing-button p-2 text-4" />
        <template #content>
          <slot>
            <div class="m-1">
              <code
                style="
                  color: var(--code-tooltip-color);
                  background-color: var(--code-tooltip-bg-color);
                "
              >
                {{ details }}
              </code>
            </div>
          </slot>
        </template>
      </RTooltip>
    </ClientOnly>
  </span>
</template>

<script setup lang="ts">
import { Warning } from '@ryxon/icons'

defineProps({
  type: String,
  details: String
})
</script>

<style lang="scss" scoped>
.typing-button {
  padding: 0px;
  height: 24px;
  margin-left: 2px;

  :deep(.r-button__icon.r-icon) {
    top: 0;
  }
}
</style>
