import{_ as s,b as i,o as a,aA as t}from"./chunks/framework.D40ndeR9.js";const c=JSON.parse('{"title":"常见问题","description":"","frontmatter":{"title":"常见问题","lang":"zh"},"headers":[],"relativePath":"zh/guide/faq.md","filePath":"zh/guide/faq.md"}'),l={name:"zh/guide/faq.md"},h=t(`<h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h1><h2 id="在-html-中无法正确渲染组件" tabindex="-1">在 HTML 中无法正确渲染组件？ <a class="header-anchor" href="#在-html-中无法正确渲染组件" aria-label="Permalink to &quot;在 HTML 中无法正确渲染组件？&quot;">​</a></h2><p>在 HTML 中使用 Ryxon 组件时，你可能会碰到部分示例代码无法正确渲染的情况，比如下面的用法：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell-group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;单元格&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;内容&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;单元格&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;内容&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell-group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>这是因为 HTML 并不支持自闭合的自定义元素，也就是说 <code>&lt;r-cell /&gt;</code> 这样的语法是不被识别的，使用完整的闭合标签可以避免这个问题：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell-group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;单元格&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;内容&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;单元格&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;内容&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">r-cell-group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>在单文件组件、字符串模板和 JSX 中可以使用自闭合的自定义元素，因此不会出现这个问题。</p><h2 id="在-ios-上点击组件时-无法触发点击反馈效果" tabindex="-1">在 iOS 上点击组件时，无法触发点击反馈效果？ <a class="header-anchor" href="#在-ios-上点击组件时-无法触发点击反馈效果" aria-label="Permalink to &quot;在 iOS 上点击组件时，无法触发点击反馈效果？&quot;">​</a></h2><p>这是因为 iOS Safari 默认不会触发 <code>:active</code> 伪类，解决方法是在 <code>body</code> 标签上添加一个空的 <code>ontouchstart</code> 属性：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ontouchstart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>参考链接：<a href="https://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari/33681490#33681490" target="_blank" rel="noreferrer">stackoverflow - :active pseudo-class doesn&#39;t work in mobile safari</a></p><h2 id="是否支持在-uni-app-中使用" tabindex="-1">是否支持在 uni-app 中使用？ <a class="header-anchor" href="#是否支持在-uni-app-中使用" aria-label="Permalink to &quot;是否支持在 uni-app 中使用？&quot;">​</a></h2><p>Ryxon 所有组件都是基于 Vue 框架实现的，没有针对 uni-app 进行适配，因此不保证各个组件在 uni-app 下的可用性。</p><p>如果你在 uni-app 中使用 Ryxon 遇到问题，建议向 uni-app 进行反馈。</p><h2 id="如何进行移动端响应式适配" tabindex="-1">如何进行移动端响应式适配？ <a class="header-anchor" href="#如何进行移动端响应式适配" aria-label="Permalink to &quot;如何进行移动端响应式适配？&quot;">​</a></h2><p>参见<a href="/ryxon/zh/guide/advanced-usage.html#viewport-布局">浏览器适配</a>。</p>`,16),n=[h];function e(p,k,E,r,d,o){return a(),i("div",null,n)}const u=s(l,[["render",e]]);export{c as __pageData,u as default};