import Logger from './helper/logger'

class PluginNode {
  constructor (options) {
    Logger.trace('init pluginNode with options:', options)
    if (!('work' in options)) throw new Error('options.work is required')
  }
}

export default PluginNode
