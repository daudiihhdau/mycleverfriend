import Logger from './helper/logger'

class PluginNode {
  constructor (options) {
    Logger.trace('init pluginNode with options:', options)
    if (!('start' in options)) throw new Error('options.start is required')
  }
}

export default PluginNode
