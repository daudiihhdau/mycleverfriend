import fs from 'fs'
import Logger from './helper/logger'
import Mission from './mission'
import DatabaseFactory from './databaseFactory'
import PluginFactory from './pluginFactory'
import ActionTreeFactory from './actionTreeFactory'

class MissionFactory {
  constructor (options) {
    Logger.trace('init missionFactory with options:', options)
    if (!('filePath' in options)) throw new Error('options.filePath is required')

    this.filePath = options.filePath
    this.fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  // TODO: check is fileContent = json?
  // todo: validate json schema here! (key existing: info?, collections?, plugin?, actions?)
  async setup () {
    let databaseFactory = new DatabaseFactory({ collections: this.fileContent.collections })
    let pluginFactory = new PluginFactory({ plugins: this.fileContent.plugins })
    let actionTreeFactory = new ActionTreeFactory({ actions: this.fileContent.actions })

    return new Mission({
      info: this.fileContent.info,
      database: databaseFactory.setup(),
      plugins: pluginFactory.setup(),
      actions: actionTreeFactory.setup()
    })
  }
}

export default MissionFactory
