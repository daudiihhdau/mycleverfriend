import bunyan from 'bunyan'

export default bunyan.createLogger({ name: 'mycleverfriend', stream: process.stdout, level: 'trace' })
