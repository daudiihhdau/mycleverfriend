import Logger from './helper/logger'

class DataSet {
  constructor (options) {
    Logger.trace('init dataSet with options:', options)
    if (!('name' in options)) throw new Error('options.name is required')
    if (!('description' in options)) throw new Error('options.description is required')
    if (!('properties' in options)) throw new Error('options.properties is required')

    this.name = options.name
    this.description = options.description
    this.properties = options.properties
  }

  get Name () {
    return this.name
  }

  get Description () {
    return this.description
  }
}

export default DataSet
