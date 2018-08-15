import Logger from './helper/logger'
import TreeModel from 'tree-model'

class TaskTreeFactory {
  constructor (options) {
    Logger.trace('init taskTreeFactory with options:', options)
    if (!('tasks' in options)) throw new Error('options.tasks is required')

    this.tasks = options.tasks
    this.tree = new TreeModel()
  }

  // TODO: add loops and other logic collections here
  setup () {
    return this.tree.parse({ type: 'list', children: this.tasks })
  }
}

export default TaskTreeFactory
