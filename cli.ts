#!/usr/bin/env node

import { Command } from 'commander'
import path from 'path'
import fs from 'fs'
import Container from './src/index'
import CodeReview from './src/commands/code-review'

const { version, name } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
)

const program = new Command(name)

program
  .command('cr')
  .description('Code Review By AI')
  .option(
    '-s, --serve <type>',
    'Skip the interaction and directly set the service type to start'
  )
  .action(({ serve }) => {
    const container = new Container({
      serve
    })
    container.run([CodeReview])
  })

program.version(version)
program.parse()
