const fp = require('fastify-plugin')
const fasityJWT = require('fastify-jwt')

module.exports = fp(async (fastify) => {
  fastify.register(fasityJWT, {
    secret: 'supersecret',
  })

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
