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
  IProviderUpdate,
  IProviderCreate
>

export const createProviders = (authorization: string) => {
  return createGraph<IProvider, IProviderUpdate, IProviderCreate>({
    name: 'Provider',
    fields: fieldsOfProvider,
    authorization,
  })
}
