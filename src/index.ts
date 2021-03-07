#!/usr/bin/env node

import { format } from 'date-fns';
import * as yargs from 'yargs';
import { addAll, commit, hasNewOrChangedFiles, push } from './git';
import log from './log';

/**
 * Default time is 10 minutes (1000ms * 60s * 10min)
 */

 const DEFAULT_INTERVAL_MS = 600000;

const { argv } = yargs.scriptName('node-git-watch').option('t', {
  alias: 'timer',
  default: DEFAULT_INTERVAL_MS,
  describe: 'Interval in milliseconds between commits',
  type: 'number',
}).help('h').alias('h', 'help');

log.info('Starting up node-git-watch');
log.info(`Attempting commit every ${argv.t}ms`);

let timer;

function watch() {
  return setTimeout(async () => {
    try {
      const hasChanges = await hasNewOrChangedFiles();

      if (hasChanges) {
        await addAll().catch(e => {
          throw e;
        });

        const timestamp = format(new Date, 'y-MM-dd HH:mm:ss');
        await commit(`Commit (${timestamp})`).catch(e => {
          throw e;
        });

        await push().catch(e => {
          throw e;
        });

        log.info(`Commited and pushed ${timestamp}`);
      }

      timer = watch();
    } catch (e) {
      log.error(e);
      process.exit(1);
    }
  }, argv.t);
}

timer = watch();

