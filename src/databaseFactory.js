import Logger from './helper/logger'
import LokiJS from 'lokijs'

class DatabaseFactory {
  constructor (options) {
    Logger.trace('init databaseFactory with options:', options)
    if (!('databases' in options)) throw new Error('options.databases is required')

    this.databaseSetups = options.databases

    // TODO: can we inject this code? or this db?
    this.lokijsDb = new LokiJS()
  }

  createDatabases () {
    return Object.entries(this.databaseSetups).map(([dbNameOn, dbSetupOn]) => {
      Logger.trace(`create database "${dbNameOn}" with options:`, dbSetupOn)
      // TODO: work with dbSetup.engine
      let newCollection = this.lokijsDb.addCollection(dbNameOn)
      for (const docOn of dbSetupOn.data) {
        newCollection.insert(docOn)
      }
      return newCollection
    })
  }
}

export default DatabaseFactory
