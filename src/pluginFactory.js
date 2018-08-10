import Logger from './helper/logger'
import ChildProcess from 'child_process'
import TreeModel from 'tree-model'
import AppRoot from 'app-root-path'

const installPlugin = Symbol('installPlugin')
const loadPlugin = Symbol('loadPlugin')
const isPluginAvailable = Symbol('isPluginAvailable')

let execSync = ChildProcess.execSync

// https://github.com/siddharthkp/auto-install/blob/master/lib/helpers.js
class PluginFactory {
  constructor (options) {
    Logger.trace('init pluginFactory with options:', options)
    if (!('plugins' in options)) throw new Error('options.plugins is required')
    if (!('list' in options)) throw new Error('options.list is required')

    this.plugins = options.plugins
    this.list = options.list
    this.tree = new TreeModel()
  }

  // TODO: add loops and other logic collections here
  create () {
    return this.list.reduce((acc, pluginOn) => {
      Logger.trace('add pluginNode ', pluginOn)
      // TODO: create pluginNode here
      this[loadPlugin](this.plugins[pluginOn.plugin_id])

      acc.addChild(this.tree.parse(pluginOn))
      return acc
    }, this.tree.parse({ type: 'list' }))
  }

  install () {
    return Object.values(this.plugins).map((pluginOn) => {
      this[installPlugin](pluginOn)
      return pluginOn
    })
  }

  // TODO: do this asynchronous!
  // TODO: add npm scope!
  [installPlugin] (plugin) {
    Logger.trace(`install plugin "${plugin.name}@${plugin.version}"`)
    try {
      // TODO: use isPluginAvailable here
      execSync(`npm list ${plugin.name} || npm install ${plugin.name}@${plugin.version}`, { encoding: 'utf8', stdio: [0, 1, 2] })
    } catch (error) {
      Logger.error('npm install failed:', error)
    }
  }

  [loadPlugin] (plugin) {
    const pluginPath = AppRoot.path + '/plugins/'
    Logger.trace('load plugin from: ', pluginPath)

    /* if (!this[isPluginAvailable](plugin)) {
      Logger.error('plugin is not available')
    } */

    // https://stackoverflow.com/questions/39158552/ignore-eslint-error-import-and-export-may-only-appear-at-the-top-level
    require('bunyan').then((data) => {
      Logger.trace(data)
    })

    // let pluginPackagew = require.ensure(plugin.name + '/package.json')

    // Logger.trace(pluginw)
    // Logger.trace(pluginPackagew)
  }

  [isPluginAvailable] (plugin) {
    const pluginPath = AppRoot.path + '/node_modules/'
    try {
      return require.resolve(plugin.name, { paths: [pluginPath] })
    } catch (e) {
      return false
    }
  }
}

export default PluginFactory
