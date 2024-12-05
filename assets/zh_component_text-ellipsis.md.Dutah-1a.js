import{_ as a,b as A,y as i,J as t,e as E,c as s,aA as e,S as l,o as n}from"./chunks/framework.D40ndeR9.js";const w=JSON.parse('{"title":"TextEllipsis","description":"","frontmatter":{"title":"TextEllipsis","lang":"zh"},"headers":[],"relativePath":"zh/component/text-ellipsis.md","filePath":"zh/component/text-ellipsis.md"}'),p={name:"zh/component/text-ellipsis.md"},h=E("h1",{id:"textellipsis-文本省略",tabindex:"-1"},[s("TextEllipsis 文本省略 "),E("a",{class:"header-anchor",href:"#textellipsis-文本省略","aria-label":'Permalink to "TextEllipsis 文本省略"'},"​")],-1),k=E("p",null,"对长文本进行省略，支持展开/收起。",-1),d=E("h2",{id:"基础用法",tabindex:"-1"},[s("基础用法 "),E("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1),F=E("p",null,"text-ellipsis/basic",-1),r=E("h2",{id:"展开-收起",tabindex:"-1"},[s("展开/收起 "),E("a",{class:"header-anchor",href:"#展开-收起","aria-label":'Permalink to "展开/收起"'},"​")],-1),D=E("p",null,"text-ellipsis/text",-1),c=E("h2",{id:"自定义展示行数",tabindex:"-1"},[s("自定义展示行数 "),E("a",{class:"header-anchor",href:"#自定义展示行数","aria-label":'Permalink to "自定义展示行数"'},"​")],-1),o=E("p",null,"text-ellipsis/rows",-1),B=E("h2",{id:"使用-html-片段作为文本",tabindex:"-1"},[s("使用 html 片段作为文本 "),E("a",{class:"header-anchor",href:"#使用-html-片段作为文本","aria-label":'Permalink to "使用 html 片段作为文本"'},"​")],-1),g=E("p",null,"text-ellipsis/html",-1),y=E("h2",{id:"使用-icon-图标",tabindex:"-1"},[s("使用 icon 图标 "),E("a",{class:"header-anchor",href:"#使用-icon-图标","aria-label":'Permalink to "使用 icon 图标"'},"​")],-1),x=E("p",null,"text-ellipsis/icon",-1),u=e(`<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><div class="vp-table"><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>rows</td><td>展示的行数</td><td><code>number | string</code></td><td><code>1</code></td></tr><tr><td>content</td><td>需要展示的文本</td><td><code>string</code></td><td>-</td></tr><tr><td>expand-text</td><td>展开操作的文案，当<code>textType=icon</code>时，等同 icon</td><td><code>string | Component</code></td><td>-</td></tr><tr><td>collapse-text</td><td>收起操作的文案，当<code>textType=icon</code>时，等同 icon</td><td><code>string | Component</code></td><td>-</td></tr><tr><td>is-text-right</td><td>操作的文档是否右对齐</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>is-html</td><td>展示的文本是否是 html</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>text-type</td><td>操作文案的暂时类型，可选<code>icon</code></td><td><code>string</code></td><td><code>text</code></td></tr><tr><td>default-expanded</td><td>默认是否展开文本</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>dots</td><td>省略号的文本内容</td><td><em>string</em></td><td><code>&#39;...&#39;</code></td></tr></tbody></table></div><h3 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h3><div class="vp-table"><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>click-action</td><td>点击展开/收起时触发</td><td><code>event: MouseEvent</code></td></tr></tbody></table></div><h3 id="textellipsis-方法" tabindex="-1">TextEllipsis 方法 <a class="header-anchor" href="#textellipsis-方法" aria-label="Permalink to &quot;TextEllipsis 方法&quot;">​</a></h3><p>通过 ref 可以获取到 TextEllipsis 实例并调用实例方法，详见<a href="/ryxon/zh/guide/advanced-usage.html#组件实例方法">组件实例方法</a>。</p><div class="vp-table"><table><thead><tr><th>方法名</th><th>说明</th><th>参数</th><th>返回值</th></tr></thead><tbody><tr><td>toggle</td><td>切换文本的展开状态，传 <code>true</code> 为展开，<code>false</code> 为收起，不传参为切换</td><td><code>expanded?: boolean</code></td><td>-</td></tr></tbody></table></div><h3 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-label="Permalink to &quot;类型定义&quot;">​</a></h3><p>组件导出以下类型定义：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  TextEllipsisProps,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  TextEllipsisInstance,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  TextEllipsisThemeVars</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;ryxon&#39;</span></span></code></pre></div><p><code>TextEllipsisInstance</code> 是组件实例的类型，用法如下：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { TextEllipsisInstance } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;ryxon&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> textEllipsisRef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TextEllipsisInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">textEllipsisRef.value?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toggle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><h2 id="主题定制" tabindex="-1">主题定制 <a class="header-anchor" href="#主题定制" aria-label="Permalink to &quot;主题定制&quot;">​</a></h2><h3 id="样式变量" tabindex="-1">样式变量 <a class="header-anchor" href="#样式变量" aria-label="Permalink to &quot;样式变量&quot;">​</a></h3><p>组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 <a href="#/zh-CN/config-provider">ConfigProvider 组件</a>。</p><div class="vp-table"><table><thead><tr><th>名称</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td>--r-text-ellipsis-font-size</td><td><code>14px</code></td><td>文本的字体大小</td></tr><tr><td>--r-text-ellipsis-line-height</td><td><code>1.6</code></td><td>文本的行高</td></tr><tr><td>--r-text-ellipsis-action-color</td><td><code>var(--r-primary-color)</code></td><td>操作按钮的颜色</td></tr></tbody></table></div>`,17);function b(m,v,_,f,P,T){const C=l("Demo");return n(),A("div",null,[h,k,d,i(C,{source:"%3Cdiv%20class%3D%22language-vue%20vp-adaptive-theme%22%3E%3Cbutton%20title%3D%22Copy%20Code%22%20class%3D%22copy%22%3E%3C%2Fbutton%3E%3Cspan%20class%3D%22lang%22%3Evue%3C%2Fspan%3E%3Cpre%20class%3D%22shiki%20shiki-themes%20github-light%20github-dark%20vp-code%22%20tabindex%3D%220%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Er-text-ellipsis%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%3Acontent%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22text%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%20%3D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E%0A%3C%2Fdiv%3E",path:"text-ellipsis/basic","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-text-ellipsis%20%3Acontent%3D%22text%22%20%2F%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20text%20%3D%0A%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%0A%3C%2Fscript%3E%0A",description:"%3Cp%3E%E9%BB%98%E8%AE%A4%E5%B1%95%E7%A4%BA%20%3Ccode%3E1%3C%2Fcode%3E%20%E8%A1%8C%EF%BC%8C%E8%B6%85%E8%BF%87%20%3Ccode%3E1%3C%2Fcode%3E%20%E8%A1%8C%E6%98%BE%E7%A4%BA%E7%9C%81%E7%95%A5%E5%8F%B7%E3%80%82%3C%2Fp%3E%0A"},{default:t(()=>[F]),_:1}),r,i(C,{source:"%3Cdiv%20class%3D%22language-vue%20vp-adaptive-theme%22%3E%3Cbutton%20title%3D%22Copy%20Code%22%20class%3D%22copy%22%3E%3C%2Fbutton%3E%3Cspan%20class%3D%22lang%22%3Evue%3C%2Fspan%3E%3Cpre%20class%3D%22shiki%20shiki-themes%20github-light%20github-dark%20vp-code%22%20tabindex%3D%220%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Er-text-ellipsis%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%3Acontent%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22text%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20expand-text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%E5%B1%95%E5%BC%80%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20collapse-text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%E6%94%B6%E8%B5%B7%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%20%3D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E%0A%3C%2Fdiv%3E",path:"text-ellipsis/text","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-text-ellipsis%20%3Acontent%3D%22text%22%20expand-text%3D%22%E5%B1%95%E5%BC%80%22%20collapse-text%3D%22%E6%94%B6%E8%B5%B7%22%20%2F%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20text%20%3D%0A%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%0A%3C%2Fscript%3E%0A",description:"%3Cp%3E%E8%B6%85%E8%BF%87%E8%A1%8C%E6%95%B0%E6%94%AF%E6%8C%81%E5%B1%95%E5%BC%80%2F%E6%94%B6%E8%B5%B7%E3%80%82%3C%2Fp%3E%0A"},{default:t(()=>[D]),_:1}),c,i(C,{source:"%3Cdiv%20class%3D%22language-vue%20vp-adaptive-theme%22%3E%3Cbutton%20title%3D%22Copy%20Code%22%20class%3D%22copy%22%3E%3C%2Fbutton%3E%3Cspan%20class%3D%22lang%22%3Evue%3C%2Fspan%3E%3Cpre%20class%3D%22shiki%20shiki-themes%20github-light%20github-dark%20vp-code%22%20tabindex%3D%220%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Er-text-ellipsis%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20rows%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%223%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20%3Acontent%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22text%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20expand-text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%E5%B1%95%E5%BC%80%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20collapse-text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%E6%94%B6%E8%B5%B7%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%20%3D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E%0A%3C%2Fdiv%3E",path:"text-ellipsis/rows","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-text-ellipsis%0A%20%20%20%20rows%3D%223%22%0A%20%20%20%20%3Acontent%3D%22text%22%0A%20%20%20%20expand-text%3D%22%E5%B1%95%E5%BC%80%22%0A%20%20%20%20collapse-text%3D%22%E6%94%B6%E8%B5%B7%22%0A%20%20%2F%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20text%20%3D%0A%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%0A%3C%2Fscript%3E%0A",description:"%3Cp%3E%E9%80%9A%E8%BF%87%E8%AE%BE%E7%BD%AE%20%3Ccode%3Erows%3C%2Fcode%3E%20%E9%99%90%E5%88%B6%E5%B1%95%E7%A4%BA%E8%A1%8C%E6%95%B0%E3%80%82%3C%2Fp%3E%0A"},{default:t(()=>[o]),_:1}),B,i(C,{source:"%3Cdiv%20class%3D%22language-vue%20vp-adaptive-theme%22%3E%3Cbutton%20title%3D%22Copy%20Code%22%20class%3D%22copy%22%3E%3C%2Fbutton%3E%3Cspan%20class%3D%22lang%22%3Evue%3C%2Fspan%3E%3Cpre%20class%3D%22shiki%20shiki-themes%20github-light%20github-dark%20vp-code%22%20tabindex%3D%220%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Er-text-ellipsis%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20%3Acontent%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22text%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20is-html%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20expand-text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%E5%B1%95%E5%BC%80%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%20%20%20collapse-text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22%E6%94%B6%E8%B5%B7%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%20%3D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20'%26%23x3C%3Bdiv%3E%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%26%23x3C%3Bdiv%3E%E6%88%91%E6%98%AFhtml%E6%96%87%E6%9C%AC%26%23x3C%3B%2Fdiv%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%26%23x3C%3B%2Fdiv%3E'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E%0A%3C%2Fdiv%3E",path:"text-ellipsis/html","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-text-ellipsis%0A%20%20%20%20%3Acontent%3D%22text%22%0A%20%20%20%20is-html%0A%20%20%20%20expand-text%3D%22%E5%B1%95%E5%BC%80%22%0A%20%20%20%20collapse-text%3D%22%E6%94%B6%E8%B5%B7%22%0A%20%20%2F%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20text%20%3D%0A%20%20'%3Cdiv%3E%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%3Cdiv%3E%E6%88%91%E6%98%AFhtml%E6%96%87%E6%9C%AC%3C%2Fdiv%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%3C%2Fdiv%3E'%0A%3C%2Fscript%3E%0A",description:""},{default:t(()=>[g]),_:1}),y,i(C,{source:"%3Cdiv%20class%3D%22language-vue%20vp-adaptive-theme%22%3E%3Cbutton%20title%3D%22Copy%20Code%22%20class%3D%22copy%22%3E%3C%2Fbutton%3E%3Cspan%20class%3D%22lang%22%3Evue%3C%2Fspan%3E%3Cpre%20class%3D%22shiki%20shiki-themes%20github-light%20github-dark%20vp-code%22%20tabindex%3D%220%22%20v-pre%3D%22%22%3E%3Ccode%3E%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%20%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Er-text-ellipsis%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20%3Acontent%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22text%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20text-type%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22icon%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%20%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Etemplate%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20setup%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%236F42C1%3B--shiki-dark%3A%23B392F0%22%3E%20lang%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3D%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%22ts%22%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3Econst%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23005CC5%3B--shiki-dark%3A%2379B8FF%22%3E%20text%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%23D73A49%3B--shiki-dark%3A%23F97583%22%3E%20%3D%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%23032F62%3B--shiki-dark%3A%239ECBFF%22%3E%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22line%22%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%26%23x3C%3B%2F%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2322863A%3B--shiki-dark%3A%2385E89D%22%3Escript%3C%2Fspan%3E%3Cspan%20style%3D%22--shiki-light%3A%2324292E%3B--shiki-dark%3A%23E1E4E8%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3C%2Fcode%3E%3C%2Fpre%3E%0A%3C%2Fdiv%3E",path:"text-ellipsis/icon","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-text-ellipsis%20%3Acontent%3D%22text%22%20text-type%3D%22icon%22%20%2F%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aconst%20text%20%3D%0A%20%20'%E8%BF%99%E6%98%AF%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82%E6%96%87%E6%9C%AC%E3%80%82'%0A%3C%2Fscript%3E%0A",description:""},{default:t(()=>[x]),_:1}),u])}const I=a(p,[["render",b]]);export{w as __pageData,I as default};
