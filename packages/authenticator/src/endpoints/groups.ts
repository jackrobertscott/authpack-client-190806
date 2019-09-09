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

export type IGraphGroups = IGraph<IGroup, IGroupUpdate, IGroupCreate>

export const createGroups = (authorization: string) => {
  return createGraph<IGroup, IGroupUpdate, IGroupCreate>({
    name: 'Group',
    fields: fieldsOfGroup,
    authorization,
  })
}
