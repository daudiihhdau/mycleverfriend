import Logger from './helper/logger'

class Mission {
  constructor (options) {
    Logger.trace('init mission with options:', options)
    if (!('info' in options)) throw new Error('options.filePath is required')
    if (!('databases' in options)) throw new Error('options.databases is required')
    if (!('tasks' in options)) throw new Error('options.tasks is required')

    this.info = options.info
    this.databases = options.databases
    this.tasks = options.tasks
  }

  get Name () {
    return this.info.name
  }

  get Version () {
    return this.info.version
  }

  get Author () {
    return this.info.author
  }

  get Description () {
    return this.info.description
  }

  get Tags () {
    return this.info.tags
  }

  async start () {
    Logger.trace('start mission')

    this.tasks.walk(function (taskOn) {
      Logger.trace('start node: ', taskOn.model)
      // load input data
      // start plugin nodes
    })
  }
}

export default Mission
