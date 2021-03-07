import { exec } from 'child_process'
import log from './log';

/**
 * Default time is 10 minutes (1000ms * 60s * 10min)
 */

const DEFAULT_INTERVAL_MS = 600000;

function execGit(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        log.error(error || stderr);
        return reject(error || stderr);
      }
      
      log.success(stdout);
      resolve(stdout);
    });
  });
}

function addAll() {
  return execGit('git add .');
}

function commit(message: string) {
  return execGit(`git commit -m "${message}"`);
}

export default function createWatcher() {
  let  timer

  return {
    watch(intervalMs = DEFAULT_INTERVAL_MS) {
      timer = setInterval(() => {

      }, intervalMs);
    }
  }
}
