import chalk from 'chalk';

export default {
  default: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.log(chalk.red(...args)),
  info: (...args: any[]) => console.log(chalk.blue(...args)),
  success: (...args: any[]) => console.log(chalk.green(...args)),
  warn: (...args: any[]) => console.log(chalk.yellow(...args)),
};
