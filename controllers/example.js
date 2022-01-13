async function routes (fastify) {
  // Documentation for routes: https://www.fastify.io/docs/latest/Reference/Routes/
  fastify.route({
    method: 'GET',
    url: '/info',
    preValidation: [fastify.authenticate],
    // Schemas can also be centralized
    // see: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
    schema: {},
    handler: async () => ({ cpuUsage: process.cpuUsage(), memStats: process.memoryUsage() }),
    logLevel: 'info',
  })
}

module.exports = routes
