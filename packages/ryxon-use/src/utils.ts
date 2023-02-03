export const inBrowser = typeof window !== 'undefined'

// h5定时器
export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : -1
}

// 清除h5定时器
export function cancelRaf(id: number) {
  if (inBrowser) {
    cancelAnimationFrame(id)
  }
}

// 动画的双重 raf
export function doubleRaf(fn: FrameRequestCallback): void {
  raf(() => raf(fn))
}
