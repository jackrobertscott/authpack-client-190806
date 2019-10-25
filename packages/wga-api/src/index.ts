import { generator } from './utils/generator'

export type IAuthenticatorAPI = {
  secret?: string
  domain?: string
  bearer?: string
}

export class AuthenticatorAPI {
  private keys: {
    secret?: string
    domain?: string
    bearer?: string
  }
  constructor({ secret, domain, bearer }: IAuthenticatorAPI) {
    this.keys = {
      secret,
      domain,
      bearer,
    }
  }
  public generate<Variables, Result>({
    name,
    graphql,
  }: {
    name: string
    graphql: string
  }) {
    return generator<Variables, Result>({
      url: 'http://localhost:4000',
      authorization: this.genkeys(),
      name,
      query: graphql,
    })
  }
  private genkeys() {
    return [this.keys.secret, this.keys.domain, this.keys.bearer]
      .filter(String)
      .join(',')
  }
}
