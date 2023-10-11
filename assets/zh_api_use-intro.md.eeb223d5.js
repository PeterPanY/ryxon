import{_ as s,o as a,a as n,Q as l}from"./chunks/framework.4482d91d.js";const u=JSON.parse('{"title":"组合式 API","description":"","frontmatter":{"title":"组合式 API","lang":"zh"},"headers":[],"relativePath":"zh/api/use-intro.md","filePath":"zh/api/use-intro.md"}'),p={name:"zh/api/use-intro.md"},o=l(`<h1 id="组合式-api-介绍" tabindex="-1">组合式 API 介绍 <a class="header-anchor" href="#组合式-api-介绍" aria-label="Permalink to &quot;组合式 API 介绍&quot;">​</a></h1><p>Ryxon 底层依赖了 <code>@ryxon/use</code> 包，其中内置了一系列的组合式 API。对于使用了 Ryxon 的项目，可以复用这些 API 进行开发。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>虽然 Ryxon 的依赖中已经包含了 <code>@ryxon/use</code>，但我们仍然推荐显式地安装它：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># with npm</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@ryxon/use</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># with yarn</span></span>
<span class="line"><span style="color:#B392F0;">yarn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@ryxon/use</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># with pnpm</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@ryxon/use</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># with npm</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@ryxon/use</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># with yarn</span></span>
<span class="line"><span style="color:#6F42C1;">yarn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@ryxon/use</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># with pnpm</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@ryxon/use</span></span></code></pre></div><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><p>下面是一个 Ryxon 组合式 API 的用法示例，我们从 <code>@ryxon/use</code> 这个包中引入 <code>useWindowSize</code> 方法，然后进行调用，即可获取到当前 Window 的宽度和高度。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useWindowSize } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@ryxon/use&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useWindowSize</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(width.value) </span><span style="color:#6A737D;">// -&gt; 窗口宽度</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(height.value) </span><span style="color:#6A737D;">// -&gt; 窗口高度</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useWindowSize } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@ryxon/use&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">height</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useWindowSize</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(width.value) </span><span style="color:#6A737D;">// -&gt; 窗口宽度</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(height.value) </span><span style="color:#6A737D;">// -&gt; 窗口高度</span></span></code></pre></div><h2 id="api-列表" tabindex="-1">API 列表 <a class="header-anchor" href="#api-列表" aria-label="Permalink to &quot;API 列表&quot;">​</a></h2><p>下面是 Ryxon 对外提供的所有组合式 API，点击名称可以查看详细介绍：</p><div class="vp-table"><table><thead><tr><th>名称</th><th>描述</th></tr></thead><tbody><tr><td><a href="/ryxon/zh/api/use-count-down.html">useCountDown</a></td><td>提供倒计时管理能力</td></tr><tr><td><a href="/ryxon/zh/api/use-custom-input-value.html">useCustomInputValue</a></td><td>自定义表单组件中的表单项</td></tr></tbody></table></div>`,11),e=[o];function t(c,r,i,y,d,E){return a(),n("div",null,e)}const F=s(p,[["render",t]]);export{u as __pageData,F as default};