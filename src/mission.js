import Logger from './helper/logger'

const pickKeys = Symbol('pickKeys')

class Mission {
  constructor (options) {
    Logger.trace('init mission with options:', options)
    if (!('info' in options)) throw new Error('options.filePath is required')
    if (!('database' in options)) throw new Error('options.database is required')
    if (!('plugins' in options)) throw new Error('options.plugins is required')
    if (!('actions' in options)) throw new Error('options.actions is required')

    this.info = options.info
    this.database = options.database
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

    this.actions.map((actionOn) => {
      Logger.trace('start node: ', actionOn)

      let pluginNode = this.plugins[actionOn.plugin_id]
      Logger.trace('prepare pluginNode: ', pluginNode)

      // load input data
      let packages = {}
      for (const [dbDestinationOn, sourcesOn] of Object.entries(actionOn.packages)) {
        for (const [collectionNameOn, collectionValueOn] of Object.entries(sourcesOn)) {
          Logger.trace(`copy data from "${collectionNameOn}" to "${dbDestinationOn}" using query:`, collectionValueOn)
          // prepare lokijs chaining (via lokijs Resultsets) - allows for sorting, limiting, offsets ...
          let chain = this.database.getCollection(collectionNameOn).chain()

          // query subselection of items
          // https://rawgit.com/techfort/LokiJS/master/docs/tutorial-Query%20Examples.html
          if ('where' in collectionValueOn) {
            chain = chain.find(collectionValueOn.where)
          }

          // pick required keys in every item
          packages[dbDestinationOn] = chain.data().map(rowOn => this[pickKeys](rowOn, collectionValueOn.keys))
        }
      }
      console.log(packages)

      // TODO: start plugin nodes
    })
  }

  [pickKeys] (obj, keys) {
    if (!obj || !keys) return
    let picked = {}
    for (const keyOn of keys) {
      picked[keyOn] = obj[keyOn]
    }
    return picked
  }
}

export default Mission
