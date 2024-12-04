// ../../node_modules/.pnpm/vitepress@1.5.0_@algolia+client-search@5.15.0_@types+node@20.12.12_less@4.2.0_postcss@8.4.49__de3ckiykp4bhymfymx6uuajete/node_modules/vitepress/lib/vue-demi.mjs
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
//# sourceMappingURL=chunk-XJSBBHR5.js.map
