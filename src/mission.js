import Logger from './helper/logger'

class Mission {
  constructor (options) {
    Logger.trace('init mission with options:', options)
    if (!('info' in options)) throw new Error('options.filePath is required')
    if (!('databases' in options)) throw new Error('options.databases is required')
    // if (!('filePath' in options)) throw new Error('options.filePath is required')

    this.info = options.info
    this.databases = options.databases
  }
}

export default Mission