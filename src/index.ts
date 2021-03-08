#!/usr/bin/env node

import * as yargs from 'yargs';
import log from './log';
import watch from './watch';

/**
 * Default time is 10 minutes (1000ms * 60s * 10min)
 */

const DEFAULT_INTERVAL_MS = 600000;

/**
 * Default date format example: 2021-02-28 18:06:02
 */

const DEFAULT_DATE_FORMAT = 'y-MM-dd HH:mm:ss';

const { argv } = yargs
  .scriptName('node-git-watch')
  .option('t', {
    alias: 'timer',
    describe: 'Interval in milliseconds between commits',
    default: DEFAULT_INTERVAL_MS,
    type: 'number',
  })
  .option('f', {
    alias: 'format',
    describe: 'Date format',
    default: DEFAULT_DATE_FORMAT,
    type: 'string',
  })
  .help('h')
  .alias('h', 'help');

log.info('Starting up node-git-watch');
log.info(`Attempting commit every ${argv.t}ms`);

watch(argv.t, argv.f);
