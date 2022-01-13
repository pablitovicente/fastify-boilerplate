// @ts-ignore
const fastify = require('fastify')({
  // Documentation for full options: https://www.fastify.io/docs/latest/Reference/Server/
  // Logger uses Pino behind the scenes
  logger: true,
  // Ignore trailing slash making /foo and /foo/ match
  ignoreTrailingSlash: true,
  // Error on some poisoning attacks
  onProtoPoisoning: 'error',
  onConstructorPoisoning: 'error',
  // Set to true to disable start/end of logs for requests
  disableRequestLogging: 'false',
})
const helmet = require('fastify-helmet')
// Import controllers
const exampleController = require('./controllers/example')
const loginController = require('./controllers/login')

// Helmet for basic sec headers
fastify.register(
  helmet,
)
// Register the plugin that allows attaching authentication
// through JWT to routes. See preValidation property in
// controllers/example.js to check how this is applied
// Upgrade this to https://github.com/fastify/fastify-auth
fastify.register(require('./plugins/authenticate'))

fastify.register(exampleController)
fastify.register(loginController, { prefix: '/v1' })

fastify.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
