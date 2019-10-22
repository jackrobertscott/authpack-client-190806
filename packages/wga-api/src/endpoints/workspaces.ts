import { createGraph, IGraph } from '../utils/graph'

export type IWorkspace = {
  id: string
  created: Date
  updated: Date
}

export type IWorkspaceCreate = {
  meta?: string
}

export type IWorkspaceUpdate = {
  meta?: string
}

export const fieldsOfWorkspace = `
  id
  created
  updated
`

export type IGraphWorkspaces = IGraph<
  IWorkspace,
  IWorkspaceCreate,
  IWorkspaceUpdate
>

export const createWorkspaces = (authorization: string) => {
  return createGraph<IWorkspace, IWorkspaceCreate, IWorkspaceUpdate>({
    name: 'Workspace',
    fields: fieldsOfWorkspace,
    authorization,
  })
}
