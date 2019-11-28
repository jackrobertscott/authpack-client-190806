import { generator, IGraphql } from './utils/generator'
import { sender } from './utils/sender'

export type IAuthenticatorAPI = {
  handler?: (variables: IGraphql['variables']) => Promise<IGraphql['data']>
  secret?: string
  client?: string
  bearer?: string
}

export class AuthenticatorAPI {
  private handler?: (
    variables: IGraphql['variables']
  ) => Promise<IGraphql['data']>
  private keys: {
    secret?: string
    client?: string
    bearer?: string
  }
  constructor({ secret, client, bearer, handler }: IAuthenticatorAPI) {
    this.handler = handler
    this.keys = {
      secret,
      client,
      bearer,
    }
  }
  public create<T extends IGraphql>({
    name,
    graphql,
  }: {
    name: string
    graphql: string
  }) {
    const runner = (variables: T['variables']) =>
      sender<T['variables']>({
        url: 'http://localhost:4000',
        authorization: this.genkeys(),
        query: graphql,
        operationName: name,
        variables,
      })
    return generator<T>({
      handler: this.handler || runner,
    })
  }
  private genkeys() {
    return [this.keys.secret, this.keys.client, this.keys.bearer]
      .filter(String)
      .join(',')
  }
}
