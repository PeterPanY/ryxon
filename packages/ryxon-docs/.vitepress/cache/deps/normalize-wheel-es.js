import './chunk-BUSYA2B4.js'

// ../../node_modules/.pnpm/normalize-wheel-es@1.2.0/node_modules/normalize-wheel-es/dist/index.mjs
var v = false
var o
var f
var s
var u
var d
var N
var l
var p
var m
var w
var D
var x
var E
var M
var F
function a() {
  if (!v) {
    v = true
    var e = navigator.userAgent,
      n =
        /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
          e
        ),
      i = /(Mac OS X)|(Windows)|(Linux)/.exec(e)
    if (
      ((x = /\b(iPhone|iP[ao]d)/.exec(e)),
      (E = /\b(iP[ao]d)/.exec(e)),
      (w = /Android/i.exec(e)),
      (M = /FBAN\/\w+;/i.exec(e)),
      (F = /Mobile/i.exec(e)),
      (D = !!/Win64/.exec(e)),
      n)
    ) {
      ;(o = n[1] ? parseFloat(n[1]) : n[5] ? parseFloat(n[5]) : NaN),
        o && document && document.documentMode && (o = document.documentMode)
      var r = /(?:Trident\/(\d+.\d+))/.exec(e)
      ;(N = r ? parseFloat(r[1]) + 4 : o),
        (f = n[2] ? parseFloat(n[2]) : NaN),
        (s = n[3] ? parseFloat(n[3]) : NaN),
        (u = n[4] ? parseFloat(n[4]) : NaN),
        u
          ? ((n = /(?:Chrome\/(\d+\.\d+))/.exec(e)),
            (d = n && n[1] ? parseFloat(n[1]) : NaN))
          : (d = NaN)
    } else o = f = s = d = u = NaN
    if (i) {
      if (i[1]) {
        var t = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e)
        l = t ? parseFloat(t[1].replace('_', '.')) : true
      } else l = false
      ;(p = !!i[2]), (m = !!i[3])
    } else l = p = m = false
  }
}
var _ = {
  ie: function () {
    return a() || o
  },
  ieCompatibilityMode: function () {
    return a() || N > o
  },
  ie64: function () {
    return _.ie() && D
  },
  firefox: function () {
    return a() || f
  },
  opera: function () {
    return a() || s
  },
  webkit: function () {
    return a() || u
  },
  safari: function () {
    return _.webkit()
  },
  chrome: function () {
    return a() || d
  },
  windows: function () {
    return a() || p
  },
  osx: function () {
    return a() || l
  },
  linux: function () {
    return a() || m
  },
  iphone: function () {
    return a() || x
  },
  mobile: function () {
    return a() || x || E || w || F
  },
  nativeApp: function () {
    return a() || M
  },
  android: function () {
    return a() || w
  },
  ipad: function () {
    return a() || E
  }
}
var A = _
var c = !!(
  typeof window < 'u' &&
  window.document &&
  window.document.createElement
)
var U = {
  canUseDOM: c,
  canUseWorkers: typeof Worker < 'u',
  canUseEventListeners: c && !!(window.addEventListener || window.attachEvent),
  canUseViewport: c && !!window.screen,
  isInWorker: !c
}
var h = U
var X
h.canUseDOM &&
  (X =
    document.implementation &&
    document.implementation.hasFeature &&
    document.implementation.hasFeature('', '') !== true)
function S(e, n) {
  if (!h.canUseDOM || (n && !('addEventListener' in document))) return false
  var i = 'on' + e,
    r = i in document
  if (!r) {
    var t = document.createElement('div')
    t.setAttribute(i, 'return;'), (r = typeof t[i] == 'function')
  }
  return (
    !r &&
      X &&
      e === 'wheel' &&
      (r = document.implementation.hasFeature('Events.wheel', '3.0')),
    r
  )
}
var b = S
var O = 10
var I = 40
var P = 800
function T(e) {
  var n = 0,
    i = 0,
    r = 0,
    t = 0
  return (
    'detail' in e && (i = e.detail),
    'wheelDelta' in e && (i = -e.wheelDelta / 120),
    'wheelDeltaY' in e && (i = -e.wheelDeltaY / 120),
    'wheelDeltaX' in e && (n = -e.wheelDeltaX / 120),
    'axis' in e && e.axis === e.HORIZONTAL_AXIS && ((n = i), (i = 0)),
    (r = n * O),
    (t = i * O),
    'deltaY' in e && (t = e.deltaY),
    'deltaX' in e && (r = e.deltaX),
    (r || t) &&
      e.deltaMode &&
      (e.deltaMode == 1 ? ((r *= I), (t *= I)) : ((r *= P), (t *= P))),
    r && !n && (n = r < 1 ? -1 : 1),
    t && !i && (i = t < 1 ? -1 : 1),
    { spinX: n, spinY: i, pixelX: r, pixelY: t }
  )
}
T.getEventType = function () {
  return A.firefox() ? 'DOMMouseScroll' : b('wheel') ? 'wheel' : 'mousewheel'
}
var Y = T
export { Y as default }
/*! Bundled license information:

normalize-wheel-es/dist/index.mjs:
  (**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   *)
*/
//# sourceMappingURL=normalize-wheel-es.js.map
