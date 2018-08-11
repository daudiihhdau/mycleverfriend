import Logger from './helper/logger'
import TreeModel from 'tree-model'

class TaskTreeFactory {
  constructor (options) {
    Logger.trace('init taskTreeFactory with options:', options)
    if (!('list' in options)) throw new Error('options.list is required')

    this.list = options.list
    this.tree = new TreeModel()
  }

  // TODO: add loops and other logic collections here
  setup () {
    return this.list.reduce((acc, pluginOn) => {
      acc.addChild(this.tree.parse(pluginOn))
      return acc
    }, this.tree.parse({ type: 'list' }))
  }
}

export default TaskTreeFactory
