import { createGraph, IGraph } from '../utils/graph'

export type IGroup = {
  id: string
  created: Date
  updated: Date
}

export type IGroupCreate = {
  meta?: string
}

export type IGroupUpdate = {
  meta?: string
}

export const fieldsOfGroup = `
  id
  created
  updated
`

export type IGraphGroups = IGraph<IGroup, IGroupCreate, IGroupUpdate>

export const createGroups = (authorization: string) => {
  return createGraph<IGroup, IGroupCreate, IGroupUpdate>({
    name: 'Group',
    fields: fieldsOfGroup,
    authorization,
  })
}
