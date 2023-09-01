import{_ as s,o as a,a as n,Q as l}from"./chunks/framework.34ad6b9f.js";const u=JSON.parse('{"title":"国际化","description":"","frontmatter":{"title":"国际化","lang":"zh"},"headers":[],"relativePath":"zh/guide/locale.md","filePath":"zh/guide/locale.md"}'),o={name:"zh/guide/locale.md"},p=l(`<h1 id="国际化" tabindex="-1">国际化 <a class="header-anchor" href="#国际化" aria-label="Permalink to &quot;国际化&quot;">​</a></h1><p>Ryxon 组件 默认 使用中文，如果你希望使用其他语言，你可以参考下面的方案</p><h2 id="多语言切换" tabindex="-1">多语言切换 <a class="header-anchor" href="#多语言切换" aria-label="Permalink to &quot;多语言切换&quot;">​</a></h2><p>Ryxon 通过 Locale 组件实现多语言支持，使用 <code>Locale.use</code> 方法可以切换当前使用的语言。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Locale } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ryxon&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 引入英文语言包</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> enUS </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ryxon/es/locale/lang/en-US&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Locale.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;en&#39;</span><span style="color:#E1E4E8;">, enUS)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Locale } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ryxon&#39;</span></span>
<span class="line"><span style="color:#6A737D;">// 引入英文语言包</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> enUS </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ryxon/es/locale/lang/en-US&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Locale.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;en&#39;</span><span style="color:#24292E;">, enUS)</span></span></code></pre></div><h2 id="覆盖语言包" tabindex="-1">覆盖语言包 <a class="header-anchor" href="#覆盖语言包" aria-label="Permalink to &quot;覆盖语言包&quot;">​</a></h2><p>通过 <code>Locale.add</code> 方法可以实现文案的修改和扩展，示例如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Locale } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ryxon&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">messages</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;zh-cn&#39;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rPicker: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      confirm: </span><span style="color:#9ECBFF;">&#39;关闭&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 将&#39;确认&#39;修改为&#39;关闭&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Locale.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(messages)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Locale } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ryxon&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">messages</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;zh-cn&#39;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    rPicker: {</span></span>
<span class="line"><span style="color:#24292E;">      confirm: </span><span style="color:#032F62;">&#39;关闭&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 将&#39;确认&#39;修改为&#39;关闭&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Locale.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(messages)</span></span></code></pre></div><h2 id="日期和时间本地化" tabindex="-1">日期和时间本地化 <a class="header-anchor" href="#日期和时间本地化" aria-label="Permalink to &quot;日期和时间本地化&quot;">​</a></h2><p>我们使用 <a href="https://day.js.org/docs/en/i18n/i18n" target="_blank" rel="noreferrer">Day.js</a> 库来管理组件的日期和时间，例如 <code>DatePicker</code>。 必须在 Day.js 中设置一个适当的区域，以便使国际化充分发挥作用。 您必须分开导入 Day.js 的区域设置。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;dayjs/locale/zh-cn&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;dayjs/locale/zh-cn&#39;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>语言 key 值需要对应 dayjs，否者时间国际化不起作用</p></div><h2 id="语言包" tabindex="-1">语言包 <a class="header-anchor" href="#语言包" aria-label="Permalink to &quot;语言包&quot;">​</a></h2><p>目前支持的语言:</p><div class="vp-table"><table><thead><tr><th>语言</th><th>文件名</th><th>dayjs</th></tr></thead><tbody><tr><td>英语</td><td>en-US</td><td>en</td></tr><tr><td>简体中文</td><td>zh-CN</td><td>zh-cn</td></tr></tbody></table></div><h2 id="获取当前语言" tabindex="-1">获取当前语言 <a class="header-anchor" href="#获取当前语言" aria-label="Permalink to &quot;获取当前语言&quot;">​</a></h2><p>你可以通过 <code>useCurrentLang</code> 方法来获取当前使用的语言。</p><ul><li><strong>类型：</strong></li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useCurrentLang</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Ref</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useCurrentLang</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Ref</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li><strong>示例：</strong></li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useCurrentLang } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ryxon&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">currentLang</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useCurrentLang</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(currentLang.value) </span><span style="color:#6A737D;">// --&gt; &#39;zh-cn&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useCurrentLang } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ryxon&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">currentLang</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useCurrentLang</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(currentLang.value) </span><span style="color:#6A737D;">// --&gt; &#39;zh-cn&#39;</span></span></code></pre></div><h2 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h2><h3 id="找不到所需的语言包" tabindex="-1">找不到所需的语言包？ <a class="header-anchor" href="#找不到所需的语言包" aria-label="Permalink to &quot;找不到所需的语言包？&quot;">​</a></h3><p>如果上方列表中没有你需要的语言，欢迎给我们提 Pull Request 来增加新的语言包。</p><h3 id="业务代码如何实现国际化" tabindex="-1">业务代码如何实现国际化？ <a class="header-anchor" href="#业务代码如何实现国际化" aria-label="Permalink to &quot;业务代码如何实现国际化？&quot;">​</a></h3><p>可以使用 <a href="https://github.com/kazupon/vue-i18n" target="_blank" rel="noreferrer">vue-i18n</a> 来实现。</p><h3 id="以-cdn-形式引入时-如何使用语言包" tabindex="-1">以 CDN 形式引入时，如何使用语言包？ <a class="header-anchor" href="#以-cdn-形式引入时-如何使用语言包" aria-label="Permalink to &quot;以 CDN 形式引入时，如何使用语言包？&quot;">​</a></h3><p>目前没有提供 CDN 形式的语言包，可以手动拷贝语言包的内容来使用。</p><h3 id="语言包中不包含-sku-组件" tabindex="-1">语言包中不包含 Sku 组件？ <a class="header-anchor" href="#语言包中不包含-sku-组件" aria-label="Permalink to &quot;语言包中不包含 Sku 组件？&quot;">​</a></h3><p>语言包中默认不包含 Sku 业务组件的语言配置，因此如果有 Sku 组件的国际化需求，请自行配置国际化文案。</p>`,30),e=[p];function t(c,r,i,y,E,d){return a(),n("div",null,e)}const g=s(o,[["render",t]]);export{u as __pageData,g as default};
