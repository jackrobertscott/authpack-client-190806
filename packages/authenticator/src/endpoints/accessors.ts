import { createGraph, IGraph } from '../utils/graph'

export type IAccessor = {
  id: string
  created: Date
  updated: Date
  account: string
  provider: string
  meta: { [key: string]: any }
  expiry: Date
  token: string
}

export type IAccessorCreate = {
  account: string
  provider: string
  meta?: string
}

export type IAccessorUpdate = {
  meta?: string
}

export const fieldsOfAccessor = `
  id
  created
  updated
  account
  provider
  meta
  expiry
  token
`

export type IGraphAccessors = IGraph<
  IAccessor,
  IAccessorCreate,
  IAccessorUpdate
>

export const createAccessors = (authorization: string) => {
  return createGraph<IAccessor, IAccessorCreate, IAccessorUpdate>({
    name: 'Accessor',
    fields: fieldsOfAccessor,
    authorization,
  })
}
