// ../../node_modules/.pnpm/vitepress@1.5.0_@algolia+cl_7902018049d55aa122bee9e48fa7cb50/node_modules/vitepress/lib/vue-demi.mjs
var isVue2 = false
var isVue3 = true
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}

export { isVue2, isVue3, set, del }
/*! Bundled license information:

vitepress/lib/vue-demi.mjs:
  (**
   * vue-demi v0.14.7
   * Copyright (c) 2020-present, Anthony Fu
   * @license MIT
   *)
*/
//# sourceMappingURL=chunk-IXWUNVU6.js.map
