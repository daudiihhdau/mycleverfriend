import Logger from './helper/logger'
import TreeModel from 'tree-model'

class ActionTreeFactory {
  constructor (options) {
    Logger.trace('init actionTreeFactory with options:', options)
    if (!('actions' in options)) throw new Error('options.actions is required')

    this.actions = options.actions
    this.tree = new TreeModel()
  }

  // TODO: add loops and other logic collections here
  setup () {
    return this.tree.parse({ type: 'list', children: this.actions })
  }
}

export default ActionTreeFactory
