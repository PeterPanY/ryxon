import path from 'path'
import fs from 'fs'
import type { MarkdownRenderer } from 'vitepress'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?: MarkdownRenderer['renderer']['rules']['container']
}

function createDemoContainer(md: MarkdownRenderer): ContainerOpts {
  return {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      /**
        :::demo Use `type`, `plain`, `round` and `circle` to define Button's style.
        button/basic
        :::
      */
      // console.log(tokens[idx].info, 'tokens, idx')

      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        // 拿到描述 Use `type`, `plain`, `round` and `circle` to define Button's style.
        const description = m && m.length > 1 ? m[1] : ''

        // 获取文件路径的 token
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        // 文件路径 button/basic
        const sourceFile = sourceFileToken.children?.[0].content ?? ''

        if (sourceFileToken.type === 'inline') {
          // 根据路径读取 examples/button/basic.vue
          source = fs.readFileSync(
            path.resolve(__dirname, '../../examples', `${sourceFile}.vue`),
            'utf-8'
          )
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)

        // 将代码传给 Demo 组件，Demo 组件的封装下面讲
        return `<Demo source="${encodeURIComponent(
          md.render(`\`\`\` vue\n${source}\`\`\``)
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(
          source
        )}" description="${encodeURIComponent(md.render(description))}">`
      } else {
        return '</Demo>\n'
      }
    }
  }
}

export default createDemoContainer
