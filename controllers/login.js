async function routes (fastify) {
  // Documentation for routes: https://www.fastify.io/docs/latest/Reference/Routes/
  fastify.route({
    method: 'POST',
    url: '/login',
    // Schemas can also be centralized
    // see: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
    schema: {
      body: {
        $id: 'login',
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['username', 'password'],
      },
    },
    handler: async (request) => {
      // Login the user
      const tokenClaims = {
        userId: 1234,
        username: request.body.username,
      }
      // Generate the token
      const token = fastify.jwt.sign({ tokenClaims })

      return { token }
    },
    logLevel: 'info',
  })
}

module.exports = routes
