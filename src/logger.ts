import chalk from 'chalk'

class Logger {
  private static instance: Logger

  log = console.log

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  /**
   * @description: error
   * @param {string} msg
   */
  e(msg: string) {
    this.log(chalk.red(msg))
  }

  /**
   * @description: success
   * @param {string} msg
   */
  s(msg: string) {
    this.log(chalk.green(msg))
  }
}

export default Logger.getInstance()
