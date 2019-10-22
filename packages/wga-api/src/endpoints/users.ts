import { createGraph, IGraph } from '../utils/graph'

export type IUser = {
  id: string
  created: Date
  updated: Date
}

export type IUserCreate = {
  meta?: string
}

export type IUserUpdate = {
  meta?: string
}

export const fieldsOfUser = `
  id
  created
  updated
`

export type IGraphUsers = IGraph<IUser, IUserCreate, IUserUpdate>

export const createUsers = (authorization: string) => {
  return createGraph<IUser, IUserCreate, IUserUpdate>({
    name: 'User',
    fields: fieldsOfUser,
    authorization,
  })
}
