import Logger from './helper/logger'
import LokiJS from 'lokijs'

class DatabaseFactory {
  constructor (options) {
    Logger.trace('init databaseFactory with options:', options)
    if (!('collections' in options)) throw new Error('options.collections is required')

    this.collections = options.collections

    // TODO: can we inject this code? or this db? (dependency injection)
    this.lokijsDb = new LokiJS()
  }

  setup () {
    for (const [dbNameOn, dbSetupOn] of Object.entries(this.collections)) {
      Logger.trace(`create collection "${dbNameOn}" with data:`, dbSetupOn)

      let newCollection = this.lokijsDb.addCollection(dbNameOn)
      newCollection.insert(dbSetupOn)
    }
    return this.lokijsDb
  }
}

export default DatabaseFactory
