import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Knex } from "knex";
import * as crypto from 'crypto'

import { RegisterModel } from '../models/register'

export default async (fastify: FastifyInstance) => {

  const registerModel = new RegisterModel();
  const db: Knex = fastify.db;

  fastify.post('/', {
    config: {
      rateLimit: {
        max: 10,
        timeWindow: '1 minute',
        keyGenerator: (request: any) => {
          return request.headers['x-real-ip'];
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const body: any = request.body
    const username = body.username
    const password = body.password
    const firstName = body.firstName
    const lastName = body.lastName

    try {
      const encPassword = crypto.createHash('md5').update(password).digest('hex')

      const user: any = {};
      user.first_name = firstName;
      user.last_name = lastName;
      user.username = username;
      user.password = encPassword;

      await registerModel.create(db, user)

      reply.send({ ok: true })
    } catch (error: any) {
      console.error(error);
      reply.status(500).send({ message: error.message })
    }
  })

} 
