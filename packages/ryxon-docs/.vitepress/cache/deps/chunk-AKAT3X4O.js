// ../../node_modules/.pnpm/vitepress@1.5.0_@algolia+client-search@5.15.0_@types+node@22.10.1_less@4.2.1_postcss@8.4.49_s_eagryqmvlflrg7cyjaia22jrzi/node_modules/vitepress/lib/vue-demi.mjs
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
//# sourceMappingURL=chunk-AKAT3X4O.js.map
