import Logger from './helper/logger'

class PluginNode {
  constructor (options) {
    Logger.trace('init pluginNode with options:', options)
    if (!('pluginPackage' in options)) throw new Error('options.pluginPackage is required')
    if (!('pluginProxy' in options)) throw new Error('options.pluginProxy is required')
    if (!('dataSet' in options.pluginProxy)) throw new Error('options.pluginProxy.dataSet is required')
    if (!('work' in options.pluginProxy)) throw new Error('options.pluginProxy.work is required')

    this.proxy = options.pluginProxy
    this.info = options.pluginPackage

    // TODO: use dataSetFactory
  }

  get Name () {
    return this.info.name
  }

  get Description () {
    return this.info.description
  }

  get Author () {
    return this.info.author
  }

  get Licence () {
    return this.info.license
  }

  get Version () {
    return this.info.version
  }

  get Homepage () {
    return this.info.homepage
  }

  async work (packages) {
    Logger.trace('start plugin')
    this.proxy.work(packages)
  }
}

export default PluginNode
