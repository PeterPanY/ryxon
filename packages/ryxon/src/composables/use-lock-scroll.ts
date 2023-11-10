import { Ref, watch, onBeforeUnmount, onDeactivated } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { onMountedOrActivated } from '@ryxon/use'

let totalLockCount = 0

export function useLockScroll(
  rootRef: HTMLElement | Ref<HTMLElement | undefined>,
  shouldLock: () => boolean
) {
  const isLocked = useScrollLock(rootRef)

  const lock = () => {
    if (!totalLockCount) {
      isLocked.value = true
    }

    totalLockCount++
  }

  const unlock = () => {
    if (totalLockCount) {
      totalLockCount--
      if (!totalLockCount) {
        isLocked.value = false
      }
    }
  }

  const init = () => shouldLock() && lock()

  const destroy = () => shouldLock() && unlock()

  onMountedOrActivated(init)
  onDeactivated(destroy)
  onBeforeUnmount(destroy)

  watch(shouldLock, (value) => {
    value ? lock() : unlock()
  })
}
