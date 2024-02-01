import { logger } from 'rslog'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { version: rsbuildVersion } = require('@rsbuild/core/package.json')
const { version: cliVersion } = require('../package.json')

export { cliVersion }

logger.greet(`  Ryxon CLI v${cliVersion} / Rsbuild v${rsbuildVersion}\n`)

process.env.RYXON_CLI_VERSION = cliVersion
