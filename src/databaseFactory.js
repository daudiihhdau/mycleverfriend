import Logger from './helper/logger'
import LokiJS from 'lokijs'

class DatabaseFactory {
  constructor (options) {
    Logger.trace('init databaseFactory with options:', options)
    if (!('databases' in options)) throw new Error('options.databases is required')

    this.databases = options.databases

    // TODO: can we inject this code? or this db? (dependency injection)
    this.lokijsDb = new LokiJS()
  }

  setup () {
    return Object.entries(this.databases).map(([dbNameOn, dbSetupOn]) => {
      Logger.trace(`create database "${dbNameOn}" with options:`, dbSetupOn)

      let newCollection = this.lokijsDb.addCollection(dbNameOn)
      for (const docOn of dbSetupOn.data) {
        newCollection.insert(docOn)
      }
      return this.lokijsDb
    })
  }
}

export default DatabaseFactory
