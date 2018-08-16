import Logger from './helper/logger'

class Mission {
  constructor (options) {
    Logger.trace('init mission with options:', options)
    if (!('info' in options)) throw new Error('options.filePath is required')
    if (!('databases' in options)) throw new Error('options.databases is required')
    if (!('plugins' in options)) throw new Error('options.plugins is required')
    if (!('actions' in options)) throw new Error('options.actions is required')

    this.info = options.info
    this.databases = options.databases
    this.plugins = options.plugins
    this.actions = options.actions
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

    this.actions.walk((actionOn) => {
      if (actionOn.model.type !== 'list') {
        Logger.trace('start node: ', actionOn.model)

        let pluginNode = this.plugins[actionOn.model.plugin_id]
        Logger.trace('prepare pluginNode: ', pluginNode)

        // load input data
        // TODO: this should be part of dbProxy
        Object.entries(actionOn.model).map(([keyOn, valueOn]) => {
          if (Array.isArray(valueOn)) {
          }
        })

        // start plugin nodes
      }
    })
  }
}

export default Mission
