import { Schema } from './schema'

export type IAuthenticatorAPI = {
  secret?: string
  domain?: string
  bearer?: string
}

export class AuthenticatorAPI extends Schema {
  constructor({ secret, domain, bearer }: IAuthenticatorAPI = {}) {
    super({ keys: () => `${secret},${domain},${bearer}` })
  }
}
