import { Knex } from 'knex'

export class RegisterModel {

  constructor () { }

  create(db: Knex, data: any) {
    return db('users').insert(data)
  }

}
