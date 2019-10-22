import { createGraph, IGraph } from '../utils/graph'

export type IProvider = {
  id: string
  created: Date
  updated: Date
}

export type IProviderCreate = {
  meta?: string
}

export type IProviderUpdate = {
  meta?: string
}

export const fieldsOfProvider = `
  id
  created
  updated
`

export type IGraphProviders = IGraph<
  IProvider,
  IProviderCreate,
  IProviderUpdate
>

export const createProviders = (authorization: string) => {
  return createGraph<IProvider, IProviderCreate, IProviderUpdate>({
    name: 'Provider',
    fields: fieldsOfProvider,
    authorization,
  })
}
