import{_ as s,o as n,a,Q as p}from"./chunks/framework.26632e4b.js";const b=JSON.parse('{"title":"deepmerge","description":"","frontmatter":{"title":"deepmerge","lang":"zh"},"headers":[],"relativePath":"zh/api/deepmerge.md","filePath":"zh/api/deepmerge.md"}'),l={name:"zh/api/deepmerge.md"},o=p(`<h1 id="深度合并" tabindex="-1">深度合并 <a class="header-anchor" href="#深度合并" aria-label="Permalink to &quot;深度合并&quot;">​</a></h1><p>一种深度合并功能，可根据您的输入自动推断返回类型，而不会改变源对象。</p><p>对象和数组将被合并，但数字和字符串等值将被覆盖。</p><p>所有合并/覆盖都按照您为函数提供的参数的顺序进行。</p><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> merge </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ryxon/lib/utils/deepmerge&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  a: { a: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  b: { a: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, b: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  a: { b: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  b: { b: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, c: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">  c: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">merge</span><span style="color:#E1E4E8;">(obj1, obj2, obj3)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 结果数据</span></span>
<span class="line"><span style="color:#6A737D;">// {</span></span>
<span class="line"><span style="color:#6A737D;">//   a: { a: 1, b: 3 },</span></span>
<span class="line"><span style="color:#6A737D;">//   b: { a: 2, b: 3, c: 3 },</span></span>
<span class="line"><span style="color:#6A737D;">//   c: 3</span></span>
<span class="line"><span style="color:#6A737D;">// }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> merge </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ryxon/lib/utils/deepmerge&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  a: { a: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  b: { a: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, b: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  a: { b: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  b: { b: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, c: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">  c: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">merge</span><span style="color:#24292E;">(obj1, obj2, obj3)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 结果数据</span></span>
<span class="line"><span style="color:#6A737D;">// {</span></span>
<span class="line"><span style="color:#6A737D;">//   a: { a: 1, b: 3 },</span></span>
<span class="line"><span style="color:#6A737D;">//   b: { a: 2, b: 3, c: 3 },</span></span>
<span class="line"><span style="color:#6A737D;">//   c: 3</span></span>
<span class="line"><span style="color:#6A737D;">// }</span></span></code></pre></div><h2 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-label="Permalink to &quot;选项&quot;">​</a></h2><p>如果您想提供更改合并行为的选项，您可以使用以下.withOptions 方法：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> merge </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ryxon/lib/utils/deepmerge&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { array: [</span><span style="color:#9ECBFF;">&#39;A&#39;</span><span style="color:#E1E4E8;">] }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { array: [</span><span style="color:#9ECBFF;">&#39;B&#39;</span><span style="color:#E1E4E8;">] }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">result</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> merge.</span><span style="color:#B392F0;">withOptions</span><span style="color:#E1E4E8;">({ mergeArrays: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> }, obj1, obj2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 结果数据</span></span>
<span class="line"><span style="color:#6A737D;">// { &quot;array&quot;: [&quot;B&quot;] }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> merge </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ryxon/lib/utils/deepmerge&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { array: [</span><span style="color:#032F62;">&#39;A&#39;</span><span style="color:#24292E;">] }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { array: [</span><span style="color:#032F62;">&#39;B&#39;</span><span style="color:#24292E;">] }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">result</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> merge.</span><span style="color:#6F42C1;">withOptions</span><span style="color:#24292E;">({ mergeArrays: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> }, obj1, obj2)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 结果数据</span></span>
<span class="line"><span style="color:#6A737D;">// { &quot;array&quot;: [&quot;B&quot;] }</span></span></code></pre></div>`,9),e=[o];function c(t,r,y,E,i,F){return n(),a("div",null,e)}const h=s(l,[["render",c]]);export{b as __pageData,h as default};
