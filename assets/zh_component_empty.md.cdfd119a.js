import{_ as p,z as E,p as o,q as C,B as n,x as e,s as a,D as t,R as c}from"./chunks/framework.0664bfc8.js";const z=JSON.parse('{"title":"Empty","description":"","frontmatter":{"title":"Empty","lang":"zh"},"headers":[],"relativePath":"zh/component/empty.md","filePath":"zh/component/empty.md"}'),l={name:"zh/component/empty.md"},r=a("h1",{id:"empty-空状态",tabindex:"-1"},[t("Empty 空状态 "),a("a",{class:"header-anchor",href:"#empty-空状态","aria-label":'Permalink to "Empty 空状态"'},"​")],-1),F=a("p",null,"空状态时的占位提示。",-1),i=a("h2",{id:"基础用法",tabindex:"-1"},[t("基础用法 "),a("a",{class:"header-anchor",href:"#基础用法","aria-label":'Permalink to "基础用法"'},"​")],-1),d=a("p",null,"empty/basic",-1),D=a("h2",{id:"自定义图片",tabindex:"-1"},[t("自定义图片 "),a("a",{class:"header-anchor",href:"#自定义图片","aria-label":'Permalink to "自定义图片"'},"​")],-1),u=a("p",null,"empty/image",-1),A=a("h2",{id:"图片尺寸",tabindex:"-1"},[t("图片尺寸 "),a("a",{class:"header-anchor",href:"#图片尺寸","aria-label":'Permalink to "图片尺寸"'},"​")],-1),k=a("p",null,"empty/size",-1),B=a("h2",{id:"底部内容",tabindex:"-1"},[t("底部内容 "),a("a",{class:"header-anchor",href:"#底部内容","aria-label":'Permalink to "底部内容"'},"​")],-1),m=a("p",null,"empty/slots",-1),h=c('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><div class="vp-table"><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>image</td><td>图片类型，可选值为 <code>error</code> <code>network</code> <code>search</code>，支持传入图片 URL</td><td><code>string</code></td><td><code>default</code></td></tr><tr><td>image-size</td><td>图片大小，默认单位为 <code>px</code></td><td><code>number | string | Array</code></td><td>-</td></tr><tr><td>description</td><td>图片下方的描述文字</td><td><code>string</code></td><td>-</td></tr></tbody></table></div><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h3><div class="vp-table"><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>default</td><td>自定义底部内容</td></tr><tr><td>image</td><td>自定义图标</td></tr><tr><td>description</td><td>自定义描述文字</td></tr></tbody></table></div><h3 id="类型定义" tabindex="-1">类型定义 <a class="header-anchor" href="#类型定义" aria-label="Permalink to &quot;类型定义&quot;">​</a></h3><p>组件导出以下类型定义：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">EmptyProps</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ryxon</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><h2 id="主题定制" tabindex="-1">主题定制 <a class="header-anchor" href="#主题定制" aria-label="Permalink to &quot;主题定制&quot;">​</a></h2><h3 id="样式变量" tabindex="-1">样式变量 <a class="header-anchor" href="#样式变量" aria-label="Permalink to &quot;样式变量&quot;">​</a></h3><p>组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 <a href="/ryxon/zh/component/config-provider.html">ConfigProvider 组件</a>。</p><div class="vp-table"><table><thead><tr><th>名称</th><th>默认值</th><th>描述</th></tr></thead><tbody><tr><td>--r-empty-padding</td><td><code>var(--r-padding-xl) 0</code></td><td>-</td></tr><tr><td>--r-empty-image-size</td><td><code>160px</code></td><td>-</td></tr><tr><td>--r-empty-description-margin-top</td><td><code>var(--r-padding-md)</code></td><td>-</td></tr><tr><td>--r-empty-description-padding</td><td><code>0 60px</code></td><td>-</td></tr><tr><td>--r-empty-description-color</td><td><code>var(--r-text-color-2)</code></td><td>-</td></tr><tr><td>--r-empty-description-font-size</td><td><code>var(--r-font-size-md)</code></td><td>-</td></tr><tr><td>--r-empty-description-line-height</td><td><code>var(--r-line-height-md)</code></td><td>-</td></tr><tr><td>--r-empty-bottom-margin-top</td><td><code>24px</code></td><td>-</td></tr></tbody></table></div>',12);function g(y,b,_,v,f,x){const s=E("Demo");return o(),C("div",null,[r,F,i,n(s,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-empty%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Edescription%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"empty/basic","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-empty%20description%3D%22%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%22%20%2F%3E%0A%3C%2Ftemplate%3E%0A",description:""},{default:e(()=>[d]),_:1}),D,n(s,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-empty%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3Eimage%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ehttps%3A%2F%2Fshadow.elemecdn.com%2Fapp%2Felement%2Fhamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3Eimage-size%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E80%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20attr-name%22%3Edescription%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"empty/image","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-empty%0A%20%20%20%20image%3D%22https%3A%2F%2Fshadow.elemecdn.com%2Fapp%2Felement%2Fhamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png%22%0A%20%20%20%20image-size%3D%2280%22%0A%20%20%20%20description%3D%22%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%22%0A%20%20%2F%3E%0A%3C%2Ftemplate%3E%0A",description:"%3Cp%3E%E9%9C%80%E8%A6%81%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E7%89%87%E6%97%B6%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%9C%A8%20%3Ccode%3Eimage%3C%2Fcode%3E%20%E5%B1%9E%E6%80%A7%E4%B8%AD%E4%BC%A0%E5%85%A5%E4%BB%BB%E6%84%8F%E5%9B%BE%E7%89%87%20URL%E3%80%82%3C%2Fp%3E%0A"},{default:e(()=>[u]),_:1}),A,n(s,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20comment%22%3E%26lt%3B!--%20%E4%B8%8D%E6%8C%87%E5%AE%9A%E5%8D%95%E4%BD%8D%EF%BC%8C%E9%BB%98%E8%AE%A4%E4%B8%BA%20px%20--%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-empty%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eimage-size%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E100%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Edescription%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20comment%22%3E%26lt%3B!--%20%E6%8C%87%E5%AE%9A%E5%8D%95%E4%BD%8D%EF%BC%8C%E6%94%AF%E6%8C%81%20rem%2C%20vh%2C%20vw%20--%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-empty%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eimage-size%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E10rem%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Edescription%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20comment%22%3E%26lt%3B!--%20%E8%AE%BE%E7%BD%AE%E4%B8%BA%E6%95%B0%E7%BB%84%E6%A0%BC%E5%BC%8F%20--%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-empty%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aimage-size%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%5B60%2C%2040%5D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Edescription%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%2F%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"empty/size","raw-source":"%3Ctemplate%3E%0A%20%20%3C!--%20%E4%B8%8D%E6%8C%87%E5%AE%9A%E5%8D%95%E4%BD%8D%EF%BC%8C%E9%BB%98%E8%AE%A4%E4%B8%BA%20px%20--%3E%0A%20%20%3Cr-empty%20image-size%3D%22100%22%20description%3D%22%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%22%20%2F%3E%0A%20%20%3C!--%20%E6%8C%87%E5%AE%9A%E5%8D%95%E4%BD%8D%EF%BC%8C%E6%94%AF%E6%8C%81%20rem%2C%20vh%2C%20vw%20--%3E%0A%20%20%3Cr-empty%20image-size%3D%2210rem%22%20description%3D%22%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%22%20%2F%3E%0A%20%20%3C!--%20%E8%AE%BE%E7%BD%AE%E4%B8%BA%E6%95%B0%E7%BB%84%E6%A0%BC%E5%BC%8F%20--%3E%0A%20%20%3Cr-empty%20%3Aimage-size%3D%22%5B60%2C%2040%5D%22%20description%3D%22%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%22%20%2F%3E%0A%3C%2Ftemplate%3E%0A",description:"%3Cp%3E%E9%80%9A%E8%BF%87%20%3Ccode%3Eimage-size%3C%2Fcode%3E%20%E5%B1%9E%E6%80%A7%E5%9B%BE%E7%89%87%E7%9A%84%E5%A4%A7%E5%B0%8F%E3%80%82%E5%B0%86%20%3Ccode%3Eimage-size%3C%2Fcode%3E%20%E8%AE%BE%E7%BD%AE%E4%B8%BA%E6%95%B0%E7%BB%84%E6%A0%BC%E5%BC%8F%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%88%86%E5%88%AB%E8%AE%BE%E7%BD%AE%E5%AE%BD%E9%AB%98%E3%80%82%E6%95%B0%E7%BB%84%E7%AC%AC%E4%B8%80%E9%A1%B9%E5%AF%B9%E5%BA%94%E5%AE%BD%E5%BA%A6%EF%BC%8C%E6%95%B0%E7%BB%84%E7%AC%AC%E4%BA%8C%E9%A1%B9%E5%AF%B9%E5%BA%94%E9%AB%98%E5%BA%A6%E3%80%82%3C%2Fp%3E%0A"},{default:e(()=>[k]),_:1}),B,n(s,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-empty%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Edescription%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-button%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eround%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Etype%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Eprimary%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eclass%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ebottom-button%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%E6%8C%89%E9%92%AE%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-button%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-empty%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Estyle%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Escoped%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20style%22%3E%3Cspan%20class%3D%22token%20language-css%22%3E%0A%3Cspan%20class%3D%22token%20selector%22%3E.bottom-button%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Ewidth%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%20160px%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20property%22%3Eheight%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3A%3C%2Fspan%3E%2040px%3Cspan%20class%3D%22token%20punctuation%22%3E%3B%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Estyle%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"empty/slots","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-empty%20description%3D%22%E6%8F%8F%E8%BF%B0%E6%96%87%E5%AD%97%22%3E%0A%20%20%20%20%3Cr-button%20round%20type%3D%22primary%22%20class%3D%22bottom-button%22%3E%E6%8C%89%E9%92%AE%3C%2Fr-button%3E%0A%20%20%3C%2Fr-empty%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cstyle%20scoped%3E%0A.bottom-button%20%7B%0A%20%20width%3A%20160px%3B%0A%20%20height%3A%2040px%3B%0A%7D%0A%3C%2Fstyle%3E%0A",description:"%3Cp%3E%E9%80%9A%E8%BF%87%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E5%8F%AF%E4%BB%A5%E5%9C%A8%20Empty%20%E7%BB%84%E4%BB%B6%E7%9A%84%E4%B8%8B%E6%96%B9%E6%8F%92%E5%85%A5%E5%86%85%E5%AE%B9%E3%80%82%3C%2Fp%3E%0A"},{default:e(()=>[m]),_:1}),h])}const P=p(l,[["render",g]]);export{z as __pageData,P as default};
