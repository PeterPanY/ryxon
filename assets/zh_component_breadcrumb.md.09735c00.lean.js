import{_ as p,o,c,b as n,w as e,d as a,e as t,a as E,r}from"./app.b405a025.js";const y=JSON.parse('{"title":"Breadcrumb","description":"","frontmatter":{"title":"Breadcrumb","lang":"zh"},"headers":[{"level":2,"title":"基础用法","slug":"基础用法","link":"#基础用法","children":[]},{"level":2,"title":"图标分隔符","slug":"图标分隔符","link":"#图标分隔符","children":[]},{"level":2,"title":"API","slug":"api","link":"#api","children":[{"level":3,"title":"Breadcrumb Props","slug":"breadcrumb-props","link":"#breadcrumb-props","children":[]},{"level":3,"title":"Breadcrumb Slots","slug":"breadcrumb-slots","link":"#breadcrumb-slots","children":[]},{"level":3,"title":"BreadcrumbItem Props","slug":"breadcrumbitem-props","link":"#breadcrumbitem-props","children":[]},{"level":3,"title":"BreadcrumbItem Slots","slug":"breadcrumbitem-slots","link":"#breadcrumbitem-slots","children":[]},{"level":3,"title":"类型定义","slug":"类型定义","link":"#类型定义","children":[]}]}],"relativePath":"zh/component/breadcrumb.md"}'),C={name:"zh/component/breadcrumb.md"},l=a("h1",{id:"breadcrumb-面包屑",tabindex:"-1"},[t("Breadcrumb 面包屑 "),a("a",{class:"header-anchor",href:"#breadcrumb-面包屑","aria-hidden":"true"},"#")],-1),u=a("p",null,"显示当前页面的路径，快速返回之前的任意页面。",-1),d=a("h2",{id:"基础用法",tabindex:"-1"},[t("基础用法 "),a("a",{class:"header-anchor",href:"#基础用法","aria-hidden":"true"},"#")],-1),i=a("p",null,"breadcrumb/basic",-1),F=a("h2",{id:"图标分隔符",tabindex:"-1"},[t("图标分隔符 "),a("a",{class:"header-anchor",href:"#图标分隔符","aria-hidden":"true"},"#")],-1),D=a("p",null,"breadcrumb/icon",-1),m=E("",12);function b(k,h,A,B,g,_){const s=r("Demo");return o(),c("div",null,[l,u,d,n(s,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Eseparator%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%2F%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Ato%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%20path%3A%20'%2F'%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Ehomepage%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Ea%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Ehref%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%2F%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Epromotion%20management%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Ea%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Epromotion%20list%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Epromotion%20detail%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"breadcrumb/basic","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-breadcrumb%20separator%3D%22%2F%22%3E%0A%20%20%20%20%3Cr-breadcrumb-item%20%3Ato%3D%22%7B%20path%3A%20'%2F'%20%7D%22%3Ehomepage%3C%2Fr-breadcrumb-item%3E%0A%20%20%20%20%3Cr-breadcrumb-item%3E%3Ca%20href%3D%22%2F%22%3Epromotion%20management%3C%2Fa%3E%3C%2Fr-breadcrumb-item%3E%0A%20%20%20%20%3Cr-breadcrumb-item%3Epromotion%20list%3C%2Fr-breadcrumb-item%3E%0A%20%20%20%20%3Cr-breadcrumb-item%3Epromotion%20detail%3C%2Fr-breadcrumb-item%3E%0A%20%20%3C%2Fr-breadcrumb%3E%0A%3C%2Ftemplate%3E%0A",description:"%3Cp%3E%E5%9C%A8%20%3Ccode%3Er-breadcrumb%3C%2Fcode%3E%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20%3Ccode%3Er-breadcrumb-item%3C%2Fcode%3E%20%E6%A0%87%E7%AD%BE%E8%A1%A8%E7%A4%BA%E4%BB%8E%E9%A6%96%E9%A1%B5%E5%BC%80%E5%A7%8B%E7%9A%84%E6%AF%8F%E4%B8%80%E7%BA%A7%E3%80%82%20%E8%AF%A5%E7%BB%84%E4%BB%B6%E6%8E%A5%E5%8F%97%E4%B8%80%E4%B8%AA%20%3Ccode%3EString%3C%2Fcode%3E%20%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%8F%82%E6%95%B0%20%3Ccode%3Eseparator%3C%2Fcode%3E%20%E6%9D%A5%E4%BD%9C%E4%B8%BA%E5%88%86%E9%9A%94%E7%AC%A6%E3%80%82%20%E9%BB%98%E8%AE%A4%E5%80%BC%E4%B8%BA%20'%2F'%E3%80%82%3C%2Fp%3E%0A"},{default:e(()=>[i]),_:1}),F,n(s,{source:"%3Cpre%20v-pre%3E%3Ccode%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Aseparator-icon%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3EArrowRight%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3E%3Ato%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%7B%20path%3A%20'%2F'%20%7D%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Ehomepage%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Epromotion%20management%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Epromotion%20list%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3Epromotion%20detail%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb-item%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%20%20%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Er-breadcrumb%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Etemplate%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%0A%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%3C%2Fspan%3Escript%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Elang%3C%2Fspan%3E%3Cspan%20class%3D%22token%20attr-value%22%3E%3Cspan%20class%3D%22token%20punctuation%20attr-equals%22%3E%3D%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3Ets%3Cspan%20class%3D%22token%20punctuation%22%3E%22%3C%2Fspan%3E%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20attr-name%22%3Esetup%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20script%22%3E%3Cspan%20class%3D%22token%20language-javascript%22%3E%0A%3Cspan%20class%3D%22token%20keyword%22%3Eimport%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7B%3C%2Fspan%3E%20ArrowRight%20%3Cspan%20class%3D%22token%20punctuation%22%3E%7D%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20keyword%22%3Efrom%3C%2Fspan%3E%20%3Cspan%20class%3D%22token%20string%22%3E'%40ryxon%2Ficons'%3C%2Fspan%3E%0A%3C%2Fspan%3E%3C%2Fspan%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20tag%22%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%26lt%3B%2F%3C%2Fspan%3Escript%3C%2Fspan%3E%3Cspan%20class%3D%22token%20punctuation%22%3E%3E%3C%2Fspan%3E%3C%2Fspan%3E%0A%3C%2Fcode%3E%3C%2Fpre%3E",path:"breadcrumb/icon","raw-source":"%3Ctemplate%3E%0A%20%20%3Cr-breadcrumb%20%3Aseparator-icon%3D%22ArrowRight%22%3E%0A%20%20%20%20%3Cr-breadcrumb-item%20%3Ato%3D%22%7B%20path%3A%20'%2F'%20%7D%22%3Ehomepage%3C%2Fr-breadcrumb-item%3E%0A%20%20%20%20%3Cr-breadcrumb-item%3Epromotion%20management%3C%2Fr-breadcrumb-item%3E%0A%20%20%20%20%3Cr-breadcrumb-item%3Epromotion%20list%3C%2Fr-breadcrumb-item%3E%0A%20%20%20%20%3Cr-breadcrumb-item%3Epromotion%20detail%3C%2Fr-breadcrumb-item%3E%0A%20%20%3C%2Fr-breadcrumb%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20lang%3D%22ts%22%20setup%3E%0Aimport%20%7B%20ArrowRight%20%7D%20from%20'%40ryxon%2Ficons'%0A%3C%2Fscript%3E%0A",description:"%3Cp%3E%E9%80%9A%E8%BF%87%E8%AE%BE%E7%BD%AE%20%3Ccode%3Eseparator-icon%3C%2Fcode%3E%20%E5%8F%AF%E4%BD%BF%E7%94%A8%E7%9B%B8%E5%BA%94%E7%9A%84%20%3Ccode%3Eiconfont%3C%2Fcode%3E%20%E4%BD%9C%E4%B8%BA%E5%88%86%E9%9A%94%E7%AC%A6%EF%BC%8C%E6%B3%A8%E6%84%8F%E8%BF%99%E5%B0%86%E4%BD%BF%20%3Ccode%3Eseparator%3C%2Fcode%3E%20%E5%A4%B1%E6%95%88%E3%80%82%3C%2Fp%3E%0A"},{default:e(()=>[D]),_:1}),m])}const f=p(C,[["render",b]]);export{y as __pageData,f as default};
