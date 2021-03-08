import { exec } from 'child_process';
import log from './log';

function execGit(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        log.error(error || stderr);
        return reject(error || stderr);
      }

      return resolve(stdout);
    });
  });
}

export function addAll() {
  return execGit('git add .');
}

export function commit(message: string) {
  return execGit(`git commit -m "${message}"`);
}

export function push() {
  return execGit('git push');
}

export async function hasNewOrChangedFiles() {
  try {
    const newFiles = await execGit('git ls-files --others --exclude-standard');
    const changedFiles = await execGit(
      'git diff-index --name-only --diff-filter=d HEAD',
    );

    return !!newFiles || !!changedFiles;
  } catch (e) {
    throw e;
  }
}
