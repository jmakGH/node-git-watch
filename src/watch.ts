import { format } from 'date-fns';
import { addAll, commit, hasNewOrChangedFiles, push } from './git';
import log from './log';

let timer: NodeJS.Timeout;

export default function watch(interval: number, dateFormat: string) {
  return setTimeout(async () => {
    try {
      const hasChanges = await hasNewOrChangedFiles();

      if (hasChanges) {
        await addAll().catch((e) => {
          throw e;
        });

        const timestamp = format(new Date(), dateFormat);
        await commit(`Commit (${timestamp})`).catch((e) => {
          throw e;
        });

        await push().catch((e) => {
          throw e;
        });

        log.info(`Commited and pushed ${timestamp}`);
      } else {
        log.info('No changes found');
      }

      timer = watch(interval, dateFormat);
    } catch (e) {
      clearTimeout(timer);
      log.error(e);
      process.exit(1);
    }
  }, interval);
}
