import Logger from './helper/logger'
import MissionFactory from './missionFactory'

// load mission file
// download & load & prepare all plugins
// load & prepare all databases
// walk through task

async function start () {
  Logger.trace('start')
  let missionFactory = new MissionFactory({ filePath: './start/test_1.json' })
  await missionFactory.createMission()
}

start()
