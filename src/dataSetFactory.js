import Logger from './helper/logger'

class DataSetFactory {
  constructor (options) {
    Logger.trace('init dataSetFactory with options:', options)
    if (!('dataSet' in options)) throw new Error('options.dataSet is required')

    this.dataSet = options.dataSet
  }

  setup () {
    // TODO: create dataSetProperties here
    // add them to new DataSet
  }
}

export default DataSetFactory
