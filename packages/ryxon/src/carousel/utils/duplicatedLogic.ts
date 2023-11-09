// 由于轮播图loop循环模式，我们需要在carousel的左侧和右侧添加重复项
// slot    [ 0 1 2 ]
// display 2 0 1 2 0
// real    0 1 2 3 4

import { cloneVNode } from 'vue'
import type { VNode } from 'vue'

export function addDuplicateSlides(slides: VNode[]): VNode[] {
  const { length } = slides
  if (length > 1) {
    slides.push(duplicateSlide(slides[0], 0, 'append'))
    slides.unshift(duplicateSlide(slides[length - 1], length - 1, 'prepend'))
    return slides
  }
  return slides
}

function duplicateSlide(
  child: VNode,
  index: number,
  position: 'prepend' | 'append'
): VNode {
  return cloneVNode(child, {
    // for patch
    key: `carousel-item-duplicate-${index}-${position}`
  })
}

export function getDisplayIndex(
  current: number,
  length: number,
  duplicatedable?: boolean
): number {
  return !duplicatedable
    ? current
    : current === 0
    ? length - 3
    : current === length - 1
    ? 0
    : current - 1
}

// 获取真实索引
export function getRealIndex(
  current: number,
  duplicatedable?: boolean
): number {
  return !duplicatedable ? current : current + 1
}

// 获取上一个索引
export function getPrevIndex(
  current: number,
  length: number,
  blocks: number,
  duplicatedable?: boolean
): number | null {
  if (current < 0) return null
  const caIndex = current - blocks
  return current === 0
    ? duplicatedable
      ? length - 1
      : null
    : caIndex < 0
    ? 0
    : caIndex
}

// 获取下一个索引
export function getNextIndex(
  current: number,
  length: number,
  blocks: number,
  duplicatedable?: boolean
): number | null {
  if (current > length - 1) return null
  const caIndex = current + blocks
  return current === length - 1
    ? duplicatedable
      ? 0
      : null
    : caIndex >= length - 1
    ? length - 1
    : caIndex
}

export function getDisplayTotalView(
  total: number,
  duplicatedable?: boolean
): number {
  return duplicatedable && total > 3 ? total - 2 : total
}
