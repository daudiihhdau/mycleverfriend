import bunyan from 'bunyan'

// TODO: use singletoon here // http://loredanacirstea.github.io/es6-design-patterns/#singleton
export default bunyan.createLogger({
  name: 'mycleverfriend',
  streams: [
    {
      level: 'trace',
      stream: process.stdout
    }
  ]
})
