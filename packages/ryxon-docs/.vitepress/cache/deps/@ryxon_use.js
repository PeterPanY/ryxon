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
import './chunk-BUSYA2B4.js'

// ../../node_modules/.pnpm/@ryxon+use@1.2.0_vue@3.4.27_typescript@5.4.5_/node_modules/@ryxon/use/dist/index.js
var inBrowser = 'undefined' != typeof window
function raf(fn) {
  return inBrowser ? requestAnimationFrame(fn) : -1
}
function cancelRaf(id) {
  if (inBrowser) cancelAnimationFrame(id)
}
function doubleRaf(fn) {
  raf(() => raf(fn))
}
function onMountedOrActivated(hook) {
  let mounted
  ;(0, onMounted)(() => {
    hook()
    ;(0, nextTick)(() => {
      mounted = true
    })
  })
  ;(0, onActivated)(() => {
    if (mounted) hook()
  })
}
function useEventListener(type, listener, options = {}) {
  if (!inBrowser) return
  const { target = window, passive = false, capture = false } = options
  let cleaned = false
  let attached
  const add = (target2) => {
    if (cleaned) return
    const element = (0, unref)(target2)
    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive
      })
      attached = true
    }
  }
  const remove = (target2) => {
    if (cleaned) return
    const element = (0, unref)(target2)
    if (element && attached) {
      element.removeEventListener(type, listener, capture)
      attached = false
    }
  }
  ;(0, onUnmounted)(() => remove(target))
  ;(0, onDeactivated)(() => remove(target))
  onMountedOrActivated(() => add(target))
  let stopWatch
  if ((0, isRef)(target))
    stopWatch = (0, watch)(target, (val, oldVal) => {
      remove(oldVal)
      add(val)
    })
  return () => {
    null == stopWatch || stopWatch()
    remove(target)
    cleaned = true
  }
}
function useClickAway(target, listener, options = {}) {
  if (!inBrowser) return
  const { eventName = 'click' } = options
  const onClick = (event) => {
    const targets = Array.isArray(target) ? target : [target]
    const isClickAway = targets.every((item) => {
      const element = (0, unref)(item)
      return element && !element.contains(event.target)
    })
    if (isClickAway) listener(event)
  }
  useEventListener(eventName, onClick, {
    target: document
  })
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
  const remain = (0, ref)(options.time)
  const current = (0, computed)(() => parseTime(remain.value))
  const pause = () => {
    counting = false
    cancelRaf(rafId)
  }
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)
  const setRemain = (value) => {
    var _options_onChange
    remain.value = value
    null == (_options_onChange = options.onChange) ||
      _options_onChange.call(options, current.value)
    if (0 === value) {
      var _options_onFinish
      pause()
      null == (_options_onFinish = options.onFinish) ||
        _options_onFinish.call(options)
    }
  }
  const microTick = () => {
    rafId = raf(() => {
      if (counting) {
        setRemain(getCurrentRemain())
        if (remain.value > 0) microTick()
      }
    })
  }
  const macroTick = () => {
    rafId = raf(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        if (!isSameSecond(remainRemain, remain.value) || 0 === remainRemain)
          setRemain(remainRemain)
        if (remain.value > 0) macroTick()
      }
    })
  }
  const tick = () => {
    if (!inBrowser) return
    if (options.millisecond) microTick()
    else macroTick()
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
  ;(0, onBeforeUnmount)(pause)
  ;(0, onActivated)(() => {
    if (deactivated) {
      counting = true
      deactivated = false
      tick()
    }
  })
  ;(0, onDeactivated)(() => {
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
  const customInput = (0, inject)(CUSTOM_INPUT_INJECTION_KEY, null)
  if (customInput && !customInput.customValue.value) {
    customInput.customValue.value = customValue
    ;(0, watch)(customValue, () => {
      customInput.resetValidation()
      customInput.validateWithTrigger('onChange')
    })
  }
}
function useIsMounted() {
  const isMounted = (0, ref)(false)
  ;(0, onMounted)(() => {
    isMounted.value = true
  })
  return (0, readonly)(isMounted)
}
var visibility
function usePageVisibility() {
  if (!visibility) {
    visibility = (0, ref)('visible')
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
      if (void 0 === start) start = timestamp
      else if (timestamp - start > interval) {
        fn(timestamp)
        start = timestamp
        if (!isLoop) return void stop()
      }
      rafId = requestAnimationFrame(frameWrapper)
    }
    rafId = requestAnimationFrame(frameWrapper)
    return stop
  }
  return () => {}
}
var isWindow = (val) => val === window
var makeDOMRect = (width, height) => ({
  top: 0,
  left: 0,
  right: width,
  bottom: height,
  width,
  height
})
var useRect = (elementOrRef) => {
  const element = (0, unref)(elementOrRef)
  if (isWindow(element)) {
    const width = element.innerWidth
    const height = element.innerHeight
    return makeDOMRect(width, height)
  }
  if (null == element ? void 0 : element.getBoundingClientRect)
    return element.getBoundingClientRect()
  return makeDOMRect(0, 0)
}
function useParent(key) {
  const parent = (0, inject)(key, null)
  if (parent) {
    const instance = (0, getCurrentInstance)()
    const { link, unlink, internalChildren } = parent
    link(instance)
    ;(0, onUnmounted)(() => unlink(instance))
    const index = (0, computed)(() => internalChildren.indexOf(instance))
    return {
      parent,
      index
    }
  }
  return {
    parent: null,
    index: (0, ref)(-1)
  }
}
function flattenVNodes(children) {
  const result = []
  const traverse = (children2) => {
    if (Array.isArray(children2))
      children2.forEach((child) => {
        if ((0, isVNode)(child)) {
          var _child_component
          result.push(child)
          if (
            null == (_child_component = child.component)
              ? void 0
              : _child_component.subTree
          ) {
            result.push(child.component.subTree)
            traverse(child.component.subTree.children)
          }
          if (child.children) traverse(child.children)
        }
      })
  }
  traverse(children)
  return result
}
var findVNodeIndex = (vnodes, vnode) => {
  const index = vnodes.indexOf(vnode)
  if (-1 === index)
    return vnodes.findIndex(
      (item) =>
        void 0 !== vnode.key &&
        null !== vnode.key &&
        item.type === vnode.type &&
        item.key === vnode.key
    )
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
  const publicChildren = (0, reactive)([])
  const internalChildren = (0, reactive)([])
  const parent = (0, getCurrentInstance)()
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
    ;(0, provide)(
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
    'HTML' !== node.tagName &&
    'BODY' !== node.tagName &&
    node.nodeType === ELEMENT_NODE_TYPE
  )
}
function getScrollParent(el, root = defaultRoot) {
  let node = el
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) return node
    node = node.parentNode
  }
  return root
}
function useScrollParent(el, root = defaultRoot) {
  const scrollParent = (0, ref)()
  ;(0, onMounted)(() => {
    if (el.value) scrollParent.value = getScrollParent(el.value, root)
  })
  return scrollParent
}
function useToggle(defaultValue = false) {
  const state = (0, ref)(defaultValue)
  const toggle = (value = !state.value) => {
    state.value = value
  }
  return [state, toggle]
}
var useWindowSize_width
var useWindowSize_height
function useWindowSize() {
  if (!useWindowSize_width) {
    useWindowSize_width = (0, ref)(0)
    useWindowSize_height = (0, ref)(0)
    if (inBrowser) {
      const update = () => {
        useWindowSize_width.value = window.innerWidth
        useWindowSize_height.value = window.innerHeight
      }
      update()
      window.addEventListener('resize', update, {
        passive: true
      })
      window.addEventListener('orientationchange', update, {
        passive: true
      })
    }
  }
  return {
    width: useWindowSize_width,
    height: useWindowSize_height
  }
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
