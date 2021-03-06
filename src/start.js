//  TODO to console-program: import ora from 'ora'
// TODOto console-program: import chalk from 'chalk'
import Logger from './helper/logger'
import MissionFactory from './missionFactory'

// load mission file
// download & load & prepare all plugins
// load & prepare all collections
// walk through actions

async function start () {
  let filePath = (process.argv.length >= 3) ? process.argv[2] : './test/missions/package_query_assign_big_to_small_group.json'

  Logger.trace('start')
  let missionFactory = new MissionFactory({ filePath })
  let mission = await missionFactory.setup()
  await mission.start()
}

start()

// process.stdout.write
// process.exit(1)
