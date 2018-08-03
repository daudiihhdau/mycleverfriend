import Logger from './helper/logger'
import ChildProcess from 'child_process'

const installPlugin = Symbol('installPlugin')

let execSync = ChildProcess.execSync

// https://github.com/siddharthkp/auto-install/blob/master/lib/helpers.js
class PluginFactory {
  constructor (options) {
    Logger.trace('init pluginFactory with options:', options)
    if (!('plugins' in options)) throw new Error('options.plugins is required')

    this.plugins = options.plugins
  }

  create () {
    return Object.values(this.plugins).map((pluginOn) => {
      Logger.trace(`prepare plugin "${pluginOn.name}" with version:`, pluginOn.version)
      this[installPlugin](pluginOn)
      return pluginOn
    })
  }

  // TODO: do this asynchronous!
  [installPlugin] (plugin) {
    try {
      execSync(`npm list ${plugin.name} || npm install ${plugin.name}@${plugin.version}`, { encoding: 'utf8', stdio: [0, 1, 2] })
    } catch (error) {
      Logger.error('npm install failed:', error)
    }
  }
}

export default PluginFactory
