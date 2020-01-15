import { graphql } from '../utils/graphql'
import { config } from '../config'

export class API {
  private key: string
  private gql: string
  constructor({ key, gql }: IAPIConstructor) {
    if (!key || !key.includes('wga-client-key')) {
      const message = 'Please provide your client key i.e. "wga-client-key-..."'
      throw new Error(message)
    }
    this.gql = gql || `${config.api}/graphql`
    this.key = key
  }
  public async graphql<T>({
    query,
    variables,
    operationName,
    bearer,
    key,
    url,
  }: IAPIGraphql) {
    return graphql<T>({
      url: url || this.gql,
      authorization: [key || this.key, bearer].filter(Boolean).join(','),
      query,
      variables,
      operationName,
    })
  }
}

export interface IAPIConstructor {
  key: string
  gql?: string
}

export interface IAPIMeta {
  [key: string]: string | number | boolean | IAPIMeta
}

export interface IAPIGraphql {
  query: string
  variables?: { [key: string]: any }
  operationName?: string
  bearer?: string
  key?: string
  url?: string
}
