import * as yargs from 'yargs';
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
}).help();

log.info('Starting up node-git-watch');
log.info(`Attempting commit every ${argv.t}ms`);

let count = 1;
let timer;

function watch() {
  return setTimeout(() => {
    log.info(`Counter: ${count++}`);
    timer = watch();
  }, argv.t);
}

timer = watch();

