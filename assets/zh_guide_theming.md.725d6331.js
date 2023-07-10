import{_ as s,o as a,h as n,U as l}from"./chunks/framework.fe8d6cd1.js";const h=JSON.parse('{"title":"自定义主题","description":"","frontmatter":{"title":"自定义主题","lang":"zh"},"headers":[],"relativePath":"zh/guide/theming.md","filePath":"zh/guide/theming.md"}'),o={name:"zh/guide/theming.md"},p=l(`<h1 id="自定义主题" tabindex="-1">自定义主题 <a class="header-anchor" href="#自定义主题" aria-label="Permalink to &quot;自定义主题&quot;">​</a></h1><h2 id="_1-主题定制" tabindex="-1">1. 主题定制 <a class="header-anchor" href="#_1-主题定制" aria-label="Permalink to &quot;1. 主题定制&quot;">​</a></h2><p>Ryxon 基于 CSS 变量提供了主题定制的能力，可以对组件样式进行统一修改，详见 <a href="/ryxon/zh/component/config-provider.html">ConfigProvider 全局配置</a> 组件。</p><h2 id="_2-覆盖默认样式" tabindex="-1">2. 覆盖默认样式 <a class="header-anchor" href="#_2-覆盖默认样式" aria-label="Permalink to &quot;2. 覆盖默认样式&quot;">​</a></h2><p>如果主题定制不能满足你的需求，也可以通过<strong>自定义样式类</strong>来覆盖默认样式，参考下面的示例：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">r-button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">my-button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">按钮</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">r-button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/** 覆盖 Button 最外层元素的样式 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">my-button</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">/** 覆盖 Button 内部子元素的样式 */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">my-button</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">r-button__text</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div>`,6),t=[p];function e(c,r,D,y,F,i){return a(),n("div",null,t)}const d=s(o,[["render",e]]);export{h as __pageData,d as default};