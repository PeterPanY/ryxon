import{_ as s,o as n,a,Q as e}from"./chunks/framework.ab08c2a9.js";const g=JSON.parse('{"title":"开发指南","description":"","frontmatter":{"title":"开发指南","lang":"zh"},"headers":[],"relativePath":"zh/guide/contribution.md","filePath":"zh/guide/contribution.md"}'),l={name:"zh/guide/contribution.md"},p=e(`<h1 id="开发指南" tabindex="-1">开发指南 <a class="header-anchor" href="#开发指南" aria-label="Permalink to &quot;开发指南&quot;">​</a></h1><h2 id="本地开发" tabindex="-1">本地开发 <a class="header-anchor" href="#本地开发" aria-label="Permalink to &quot;本地开发&quot;">​</a></h2><p>在进行本地开发前，请先确保你的开发环境中安装了 <a href="https://nodejs.org" target="_blank" rel="noreferrer">Node.js &gt;= 14.19.0</a>。</p><p>按照下面的步骤操作，即可在本地开发 Ryxon 组件。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 克隆仓库</span></span>
<span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">git@github.com:PeterPanY/ryxon.git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启用 pnpm 包管理器</span></span>
<span class="line"><span style="color:#B392F0;">corepack</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">i</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 进入开发模式，浏览器访问 localhost</span></span>
<span class="line"><span style="color:#B392F0;">pnpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 克隆仓库</span></span>
<span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">git@github.com:PeterPanY/ryxon.git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启用 pnpm 包管理器</span></span>
<span class="line"><span style="color:#6F42C1;">corepack</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">i</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 进入开发模式，浏览器访问 localhost</span></span>
<span class="line"><span style="color:#6F42C1;">pnpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dev</span></span></code></pre></div><p>仓库的不同分支对应不同的 Ryxon 版本，请切换到对应分支进行开发：</p><ul><li>master 分支对应 Ryxon 版本，适用于 Vue 3</li></ul><h2 id="镜像仓库" tabindex="-1">镜像仓库 <a class="header-anchor" href="#镜像仓库" aria-label="Permalink to &quot;镜像仓库&quot;">​</a></h2><p>如果 GitHub 克隆速度较慢，你也可以直接克隆 Ryxon 在 gitee 上的<a href="https://gitee.com/peterpy0921/ryxon" target="_blank" rel="noreferrer">镜像仓库</a>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">git@gitee.com:peterpy0921/ryxon.git</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">git@gitee.com:peterpy0921/ryxon.git</span></span></code></pre></div><p>镜像仓库仅用于加快国内的访问速度，请勿在镜像仓库中提 issue 和 Pull Request。</p><h2 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h2><p>Ryxon 采用 monorepo 进行代码管理，所有子包在 <code>packages</code> 目录下:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root</span></span>
<span class="line"><span style="color:#e1e4e8;">└─ packages</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ ryxon        # 组件库</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ ryxon-cli    # 脚手架</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ ryxon-icons  # 图标库</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ ryxon-use    # Composition API</span></span>
<span class="line"><span style="color:#e1e4e8;">   └─ ....        # 其他周边 npm 包</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root</span></span>
<span class="line"><span style="color:#24292e;">└─ packages</span></span>
<span class="line"><span style="color:#24292e;">   ├─ ryxon        # 组件库</span></span>
<span class="line"><span style="color:#24292e;">   ├─ ryxon-cli    # 脚手架</span></span>
<span class="line"><span style="color:#24292e;">   ├─ ryxon-icons  # 图标库</span></span>
<span class="line"><span style="color:#24292e;">   ├─ ryxon-use    # Composition API</span></span>
<span class="line"><span style="color:#24292e;">   └─ ....        # 其他周边 npm 包</span></span></code></pre></div><p>其中，<code>ryxon</code> 目录为组件库的核心代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ryxon</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ src              # 组件源代码</span></span>
<span class="line"><span style="color:#e1e4e8;">├─ test             # 单测工具类</span></span>
<span class="line"><span style="color:#e1e4e8;">└─ ryxon.config.mjs  # 文档网站配置</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ryxon</span></span>
<span class="line"><span style="color:#24292e;">├─ src              # 组件源代码</span></span>
<span class="line"><span style="color:#24292e;">├─ test             # 单测工具类</span></span>
<span class="line"><span style="color:#24292e;">└─ ryxon.config.mjs  # 文档网站配置</span></span></code></pre></div><p><code>src</code> 目录包含各个组件的源码，每个文件夹对应一个组件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">src</span></span>
<span class="line"><span style="color:#e1e4e8;">└─ button</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ test             # 单元测试</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ Component.tsx    # 组件</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ index.ts         # 组件入口</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ index.less       # 样式</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ var.less         # 样式变量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">src</span></span>
<span class="line"><span style="color:#24292e;">└─ button</span></span>
<span class="line"><span style="color:#24292e;">   ├─ test             # 单元测试</span></span>
<span class="line"><span style="color:#24292e;">   ├─ Component.tsx    # 组件</span></span>
<span class="line"><span style="color:#24292e;">   ├─ index.ts         # 组件入口</span></span>
<span class="line"><span style="color:#24292e;">   ├─ index.less       # 样式</span></span>
<span class="line"><span style="color:#24292e;">   ├─ var.less         # 样式变量</span></span></code></pre></div><h2 id="代码规范" tabindex="-1">代码规范 <a class="header-anchor" href="#代码规范" aria-label="Permalink to &quot;代码规范&quot;">​</a></h2><p>在编写代码时，请注意：</p><ul><li>确保代码可以通过仓库的 ESLint 校验。</li><li>确保代码格式是规范的，使用 prettier 进行代码格式化。</li><li>确保没有使用超出兼容性范围的 API，比如 <code>async/await</code>。</li></ul><h2 id="issue-规范" tabindex="-1">Issue 规范 <a class="header-anchor" href="#issue-规范" aria-label="Permalink to &quot;Issue 规范&quot;">​</a></h2><ul><li>遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。</li><li>提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。</li></ul>`,23),o=[p];function c(t,i,r,y,d,h){return n(),a("div",null,o)}const b=s(l,[["render",c]]);export{g as __pageData,b as default};
