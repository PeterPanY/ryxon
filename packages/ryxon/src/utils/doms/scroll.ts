import { isClient } from '@vueuse/core'

/**
 * 在容器元素中滚动，将**选定的**元素定位在容器顶部
 */
export function scrollIntoView(
  container: HTMLElement,
  selected: HTMLElement
): void {
  if (!isClient) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents: HTMLElement[] = []
  let pointer = selected.offsetParent
  while (
    pointer !== null &&
    container !== pointer &&
    container.contains(pointer)
  ) {
    offsetParents.push(pointer as HTMLElement)
    pointer = (pointer as HTMLElement).offsetParent
  }
  const top =
    selected.offsetTop +
    offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}