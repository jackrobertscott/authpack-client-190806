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
}
