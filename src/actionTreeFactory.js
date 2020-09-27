import Logger from './helper/logger'

class ActionTreeFactory {
  constructor (options) {
    Logger.trace('init actionTreeFactory with options:', options)
    if (!('actions' in options)) throw new Error('options.actions is required')

    this.actions = options.actions
  }

  // TODO: add loops and other logic collections here
  setup () {
    return this.actions
  }
}

export default ActionTreeFactory
