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
      let input = {}
      for (const [destinationOn, sourcesOn] of Object.entries(actionOn.packages)) {
        let resultsArrays = sourcesOn.map((sourceQueryOn) => {
          Logger.trace(`load data for package[${destinationOn}] using query:`, sourceQueryOn)
          // prepare lokijs chaining (via lokijs Resultsets) - allows for sorting, limiting, offsets ...
          let chain = this.database.getCollection(sourceQueryOn.from).chain()

          // query subselection of items
          // https://rawgit.com/techfort/LokiJS/master/docs/tutorial-Query%20Examples.html
          if ('where' in sourceQueryOn) {
            chain = chain.find(sourceQueryOn.where)
          }

          // union is the default mergeSetup
          if (!('merge' in sourceQueryOn)) {
            sourceQueryOn['merge'] = { 'type': 'union' }
          }

          // pick required keys in every single item (and rename it, if necessary)
          let data = chain.data().map(rowOn => this[pickKeys](rowOn, sourceQueryOn.select))

          return { mergeSetup: sourceQueryOn.merge, data }
        })
        console.log('%j', resultsArrays)

        // TODO: mergeSetup = (union || assign [strict, recycling] || join by id])
        input[destinationOn] = resultsArrays.reduce((acc, resultOn) => {
          // append the new rows to the given rows
          if (resultOn.mergeSetup.type === 'union') {
            // TODO: column names must have the same name
            acc = acc.concat(resultOn.data)
          }
          // add properties to every row
          // recycling: http://www.r-tutor.com/r-introduction/vector/vector-arithmetics
          if (resultOn.mergeSetup.type === 'assign') {
            let bigDataset = acc
            let smallDataset = resultOn.data
            // swap variables
            if (resultOn.data.length > acc.length) [bigDataset, smallDataset] = [smallDataset, bigDataset]

            for (let i = 0; i < bigDataset.length; i++) {
              bigDataset[i] = Object.assign({}, bigDataset[i], smallDataset[i % smallDataset.length])
            }
            acc = bigDataset
          }

          // TODO: add join with foreign key
          return acc
        }, [])
      }

      console.log('%j', input)

      // TODO: start plugin nodes
      pluginNode.work(input)
    })
  }

  [pickKeys] (obj, keys) {
    if (!obj || !keys) return
    // every key must be written in lower cases
    keys = keys.map(keyOn => keyOn.toLowerCase().trim())

    let picked = {}
    for (const keyOn of keys) {
      // should we use an alias name for this key?
      if (keyOn.includes(' as ')) {
        let tokens = keyOn.split(' ').filter(tokenOn => tokenOn.length > 0)
        picked[tokens[2]] = obj[tokens[0]]
      } else {
        picked[keyOn] = obj[keyOn]
      }
    }
    return picked
  }
}

export default Mission
