#!/usr/bin/env node

import { logger } from 'rslog'
import { prompt } from 'enquirer'
import { ensureDir } from 'fs-extra'
import { RGenerator } from './generator'

async function run() {
  const { name } = await prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: 'Your package name'
  })

  try {
    await ensureDir(name)
    const generator = new RGenerator(name)
    await generator.run()
  } catch (e) {
    logger.error(e)
  }
}

run()
