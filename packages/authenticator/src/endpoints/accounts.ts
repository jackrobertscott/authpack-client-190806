import { createGraph, IGraph } from '../utils/graph'

export type IAccount = {
  id: string
  created: Date
  updated: Date
}

export type IAccountCreate = {
  meta?: string
}

export type IAccountUpdate = {
  meta?: string
}

export const fieldsOfAccount = `
  id
  created
  updated
`

export type IGraphAccounts = IGraph<IAccount, IAccountCreate, IAccountUpdate>

export const createAccounts = (authorization: string) => {
  return createGraph<IAccount, IAccountCreate, IAccountUpdate>({
    name: 'Account',
    fields: fieldsOfAccount,
    authorization,
  })
}
