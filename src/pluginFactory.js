import Logger from './helper/logger'
import ChildProcess from 'child_process'
import TreeModel from 'tree-model'

const installPlugin = Symbol('installPlugin')

let execSync = ChildProcess.execSync

// https://github.com/siddharthkp/auto-install/blob/master/lib/helpers.js
class PluginFactory {
  constructor (options) {
    Logger.trace('init pluginFactory with options:', options)
    if (!('plugins' in options)) throw new Error('options.plugins is required')
    if (!('tasks' in options)) throw new Error('options.tasks is required')

    this.plugins = options.plugins
    this.tasks = options.tasks
    this.tree = new TreeModel()
  }

  // TODO: add loops and other logic collections here
  create () {
    return this.tasks.reduce((acc, taskOn) => {
      Logger.trace('add pluginNode ', taskOn)
      acc.addChild(this.tree.parse(taskOn))
      return acc
    }, this.tree.parse({ type: 'list' }))
  }

  // TODO: do this asynchronous!
  install () {
    return Object.values(this.plugins).map((pluginOn) => {
      Logger.trace(`install plugin "${pluginOn.name}" with version:`, pluginOn.version)
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
