import {
  computed,
  getCurrentInstance,
  inject,
  isRef,
  isVNode,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  readonly,
  ref,
  unref,
  watch
} from './chunk-LRI6K42L.js'
import './chunk-Y2F7D3TJ.js'

// ../../node_modules/.pnpm/@ryxon+use@1.1.2_vue@3.4.27_typescript@5.4.5_/node_modules/@ryxon/use/dist/index.esm.mjs
var inBrowser = typeof window !== 'undefined'
function raf(fn) {
  return inBrowser ? requestAnimationFrame(fn) : -1
}
function cancelRaf(id) {
  if (inBrowser) {
    cancelAnimationFrame(id)
  }
}
function doubleRaf(fn) {
  raf(() => raf(fn))
}
function onMountedOrActivated(hook) {
  let mounted
  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })
  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
function useEventListener(type, listener, options = {}) {
  if (!inBrowser) {
    return
  }
  const { target = window, passive = false, capture = false } = options
  let cleaned = false
  let attached
  const add = (target2) => {
    if (cleaned) {
      return
    }
    const element = unref(target2)
    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive
      })
      attached = true
    }
  }
  const remove = (target2) => {
    if (cleaned) {
      return
    }
    const element = unref(target2)
    if (element && attached) {
      element.removeEventListener(type, listener, capture)
      attached = false
    }
  }
  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target))
  onMountedOrActivated(() => add(target))
  let stopWatch
  if (isRef(target)) {
    stopWatch = watch(target, (val, oldVal) => {
      remove(oldVal)
      add(val)
    })
  }
  return () => {
    stopWatch == null ? void 0 : stopWatch()
    remove(target)
    cleaned = true
  }
}
function useClickAway(target, listener, options = {}) {
  if (!inBrowser) {
    return
  }
  const { eventName = 'click' } = options
  const onClick = (event) => {
    const targets = Array.isArray(target) ? target : [target]
    const isClickAway = targets.every((item) => {
      const element = unref(item)
      return element && !element.contains(event.target)
    })
    if (isClickAway) {
      listener(event)
    }
  }
  useEventListener(eventName, onClick, { target: document })
}
var SECOND = 1e3
var MINUTE = 60 * SECOND
var HOUR = 60 * MINUTE
var DAY = 24 * HOUR
function parseTime(time) {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)
  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3)
}
function useCountDown(options) {
  let rafId
  let endTime
  let counting
  let deactivated
  const remain = ref(options.time)
  const current = computed(() => parseTime(remain.value))
  const pause = () => {
    counting = false
    cancelRaf(rafId)
  }
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)
  const setRemain = (value) => {
    var _a, _b
    remain.value = value
    ;(_a = options.onChange) == null ? void 0 : _a.call(options, current.value)
    if (value === 0) {
      pause()
      ;(_b = options.onFinish) == null ? void 0 : _b.call(options)
    }
  }
  const microTick = () => {
    rafId = raf(() => {
      if (counting) {
        setRemain(getCurrentRemain())
        if (remain.value > 0) {
          microTick()
        }
      }
    })
  }
  const macroTick = () => {
    rafId = raf(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain)
        }
        if (remain.value > 0) {
          macroTick()
        }
      }
    })
  }
  const tick = () => {
    if (!inBrowser) {
      return
    }
    if (options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }
  const start = () => {
    if (!counting) {
      endTime = Date.now() + remain.value
      counting = true
      tick()
    }
  }
  const reset = (totalTime = options.time) => {
    pause()
    remain.value = totalTime
  }
  onBeforeUnmount(pause)
  onActivated(() => {
    if (deactivated) {
      counting = true
      deactivated = false
      tick()
    }
  })
  onDeactivated(() => {
    if (counting) {
      pause()
      deactivated = true
    }
  })
  return {
    start,
    pause,
    reset,
    current
  }
}
var CUSTOM_INPUT_INJECTION_KEY = Symbol('r-input')
function useCustomInputValue(customValue) {
  const customInput = inject(CUSTOM_INPUT_INJECTION_KEY, null)
  if (customInput && !customInput.customValue.value) {
    customInput.customValue.value = customValue
    watch(customValue, () => {
      customInput.resetValidation()
      customInput.validateWithTrigger('onChange')
    })
  }
}
function useIsMounted() {
  const isMounted = ref(false)
  onMounted(() => {
    isMounted.value = true
  })
  return readonly(isMounted)
}
var visibility
function usePageVisibility() {
  if (!visibility) {
    visibility = ref('visible')
    if (inBrowser) {
      const update = () => {
        visibility.value = document.hidden ? 'hidden' : 'visible'
      }
      update()
      window.addEventListener('visibilitychange', update)
    }
  }
  return visibility
}
function useRaf(fn, options) {
  if (inBrowser) {
    const { interval = 0, isLoop = false } = options || {}
    let start
    let isStopped = false
    let rafId
    const stop = () => {
      isStopped = true
      cancelAnimationFrame(rafId)
    }
    const frameWrapper = (timestamp) => {
      if (isStopped) return
      if (start === void 0) {
        start = timestamp
      } else if (timestamp - start > interval) {
        fn(timestamp)
        start = timestamp
        if (!isLoop) {
          stop()
          return
        }
      }
      rafId = requestAnimationFrame(frameWrapper)
    }
    rafId = requestAnimationFrame(frameWrapper)
    return stop
  }
  return () => {}
}
var isWindow = (val) => val === window
var makeDOMRect = (width2, height2) => ({
  top: 0,
  left: 0,
  right: width2,
  bottom: height2,
  width: width2,
  height: height2
})
var useRect = (elementOrRef) => {
  const element = unref(elementOrRef)
  if (isWindow(element)) {
    const width2 = element.innerWidth
    const height2 = element.innerHeight
    return makeDOMRect(width2, height2)
  }
  if (element == null ? void 0 : element.getBoundingClientRect) {
    return element.getBoundingClientRect()
  }
  return makeDOMRect(0, 0)
}
function useParent(key) {
  const parent = inject(key, null)
  if (parent) {
    const instance = getCurrentInstance()
    const { link, unlink, internalChildren } = parent
    link(instance)
    onUnmounted(() => unlink(instance))
    const index = computed(() => internalChildren.indexOf(instance))
    return {
      parent,
      index
    }
  }
  return {
    parent: null,
    index: ref(-1)
  }
}
function flattenVNodes(children) {
  const result = []
  const traverse = (children2) => {
    if (Array.isArray(children2)) {
      children2.forEach((child) => {
        var _a
        if (isVNode(child)) {
          result.push(child)
          if ((_a = child.component) == null ? void 0 : _a.subTree) {
            result.push(child.component.subTree)
            traverse(child.component.subTree.children)
          }
          if (child.children) {
            traverse(child.children)
          }
        }
      })
    }
  }
  traverse(children)
  return result
}
var findVNodeIndex = (vnodes, vnode) => {
  const index = vnodes.indexOf(vnode)
  if (index === -1) {
    return vnodes.findIndex(
      (item) =>
        vnode.key !== void 0 &&
        vnode.key !== null &&
        item.type === vnode.type &&
        item.key === vnode.key
    )
  }
  return index
}
function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree.children)
  internalChildren.sort(
    (a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode)
  )
  const orderedPublicChildren = internalChildren.map((item) => item.proxy)
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a)
    const indexB = orderedPublicChildren.indexOf(b)
    return indexA - indexB
  })
}
function useChildren(key) {
  const publicChildren = reactive([])
  const internalChildren = reactive([])
  const parent = getCurrentInstance()
  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child)
        publicChildren.push(child.proxy)
        sortChildren(parent, publicChildren, internalChildren)
      }
    }
    const unlink = (child) => {
      const index = internalChildren.indexOf(child)
      publicChildren.splice(index, 1)
      internalChildren.splice(index, 1)
    }
    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    )
  }
  return {
    children: publicChildren,
    linkChildren
  }
}
var overflowScrollReg = /scroll|auto|overlay/i
var defaultRoot = inBrowser ? window : void 0
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1
  return (
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === ELEMENT_NODE_TYPE
  )
}
function getScrollParent(el, root = defaultRoot) {
  let node = el
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    node = node.parentNode
  }
  return root
}
function useScrollParent(el, root = defaultRoot) {
  const scrollParent = ref()
  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root)
    }
  })
  return scrollParent
}
function useToggle(defaultValue = false) {
  const state = ref(defaultValue)
  const toggle = (value = !state.value) => {
    state.value = value
  }
  return [state, toggle]
}
var width
var height
function useWindowSize() {
  if (!width) {
    width = ref(0)
    height = ref(0)
    if (inBrowser) {
      const update = () => {
        width.value = window.innerWidth
        height.value = window.innerHeight
      }
      update()
      window.addEventListener('resize', update, { passive: true })
      window.addEventListener('orientationchange', update, { passive: true })
    }
  }
  return { width, height }
}
export {
  CUSTOM_INPUT_INJECTION_KEY,
  cancelRaf,
  doubleRaf,
  flattenVNodes,
  getScrollParent,
  inBrowser,
  onMountedOrActivated,
  raf,
  sortChildren,
  useChildren,
  useClickAway,
  useCountDown,
  useCustomInputValue,
  useEventListener,
  useIsMounted,
  usePageVisibility,
  useParent,
  useRaf,
  useRect,
  useScrollParent,
  useToggle,
  useWindowSize
}
//# sourceMappingURL=@ryxon_use.js.map
