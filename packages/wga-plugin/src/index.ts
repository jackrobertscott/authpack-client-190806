import { Schema } from '../old/Schema'

export class AuthenticatorAPI extends Schema {
  constructor({
    secret,
    domain,
    bearer,
  }: {
    secret?: string
    domain?: string
    bearer?: string
  } = {}) {
    const keys = () => [secret, domain, bearer].filter(String).join(',')
    super({ keys })
  }
}
