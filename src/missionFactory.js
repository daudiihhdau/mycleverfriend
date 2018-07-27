import fs from 'fs'
import Logger from './helper/logger'
import Mission from './mission'
import DatabaseFactory from './databaseFactory'

class MissionFactory {
  constructor (options) {
    Logger.trace('init missionFactory with options:', options)
    if (!('filePath' in options)) throw new Error('options.filePath is required')

    this.filePath = options.filePath
    this.fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
  }

  // todo: validate json schema here!
  async createMission () {
    let databaseFactory = new DatabaseFactory({ databases: this.fileContent.databases })

    return new Mission({
      info: this.fileContent.info,
      databases: databaseFactory.createDatabases()
    })
  }
}

export default MissionFactory
