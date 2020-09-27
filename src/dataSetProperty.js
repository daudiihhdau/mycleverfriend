import Logger from './helper/logger'

class DataSetProperty {
  constructor (options) {
    Logger.trace('init dataSet with options:', options)
    if (!('name' in options)) throw new Error('options.name is required')
    if (!('description' in options)) throw new Error('options.description is required')
    if (!('type' in options)) throw new Error('options.type is required')

    this.name = options.name
    this.description = options.description
    this.type = options.type

    // TODO: optional parameters
    // this.defaultValue = options.defaultValue ? options.defaultValue : null
    // this.validationRegex = options.validationRegex ? options.validationRegex : null
  }

  get Name () {
    return this.name
  }

  get Description () {
    return this.description
  }

  get Type () {
    return this.type
  }
}

export default DataSetProperty
