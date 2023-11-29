import { logger } from 'rslog'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { version: viteVersion } = require('vite/package.json')
const { version: cliVersion } = require('../package.json')

export { cliVersion }

logger.greet(`  Ryxon CLI v${cliVersion} / Vite v${viteVersion}\n`)

process.env.RYXON_CLI_VERSION = cliVersion
