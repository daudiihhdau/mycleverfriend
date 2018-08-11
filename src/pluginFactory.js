import Logger from './helper/logger'
import ChildProcess from 'child_process'
import AppRoot from 'app-root-path'

const isPluginAvailable = Symbol('isPluginAvailable')
const loadPlugin = Symbol('loadPlugin')
const installPlugin = Symbol('installPlugin')

let execSync = ChildProcess.execSync

// https://github.com/siddharthkp/auto-install/blob/master/lib/helpers.js
class PluginFactory {
  constructor (options) {
    Logger.trace('init pluginFactory with options:', options)
    if (!('plugins' in options)) throw new Error('options.plugins is required')

    this.plugins = options.plugins
    this.pluginPath = AppRoot.path + '/node_modules/'
  }

  setup () {
    return Object.values(this.plugins).map((pluginOn) => {
      // TODO: create pluginNode here
      this[loadPlugin](pluginOn)
      return pluginOn
    })
  }

  [isPluginAvailable] (plugin) {
    try {
      return require.resolve(plugin.name, { paths: [this.pluginPath] })
    } catch (e) {
      return false
    }
  }

  [loadPlugin] (plugin) {
    Logger.trace('load plugin from: ', plugin, this.pluginPath)

    if (!this[isPluginAvailable](plugin)) {
      Logger.error('plugin is not available')
      this[installPlugin](plugin)
    }

    // let pluginw = require(plugin.name)
    let pluginPackagew = require(plugin.name + '/package.json')

    // Logger.trace(pluginw)
    Logger.trace('Keywords:' + pluginPackagew.keywords)
    Logger.trace('Author:' + pluginPackagew.author)
  }

  // TODO: do this asynchronous!
  // TODO: add npm scope!
  [installPlugin] (plugin) {
    Logger.trace(`install plugin "${plugin.name}@${plugin.version}"`)
    try {
      execSync(`npm list "${plugin.name}" || npm install "${plugin.name}@${plugin.version}"`, { encoding: 'utf8', stdio: [0, 1, 2] })
    } catch (error) {
      Logger.error('npm install failed:', error)
    }
  }
}

export default PluginFactory
