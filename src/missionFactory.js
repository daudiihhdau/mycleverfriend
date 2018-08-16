import fs from 'fs'
import Logger from './helper/logger'
import Mission from './mission'
import DatabaseFactory from './databaseFactory'
import ActionTreeFactory from './actionTreeFactory'
import PluginFactory from './pluginFactory'

class MissionFactory {
  constructor (options) {
    Logger.trace('init missionFactory with options:', options)
    if (!('filePath' in options)) throw new Error('options.filePath is required')

    this.filePath = options.filePath
    this.fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  // todo: validate json schema here!
  async setup () {
    let databaseFactory = new DatabaseFactory({ databases: this.fileContent.databases })
    let pluginFactory = new PluginFactory({ plugins: this.fileContent.plugins })
    let actionTreeFactory = new ActionTreeFactory({ actions: this.fileContent.actions })

    return new Mission({
      info: this.fileContent.info,
      databases: databaseFactory.setup(),
      plugins: pluginFactory.setup(),
      actions: actionTreeFactory.setup()
    })
  }
}

export default MissionFactory
