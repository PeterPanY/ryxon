import mdContainer from 'markdown-it-container'
import type { MarkdownRenderer } from 'vitepress'
import tableWrapper from '../plugins/table-wrapper'
import tooltip from '../plugins/tooltip'
import tag from '../plugins/tag'
import createDemoContainer from '../plugins/demo'

export const mdPlugin = (md: MarkdownRenderer) => {
  md.use(tableWrapper)
  md.use(tooltip)
  md.use(tag)
  md.use(mdContainer, 'demo', createDemoContainer(md))
}
