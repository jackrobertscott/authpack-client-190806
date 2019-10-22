import { createGraph, IGraph } from '../utils/graph'

export type IPermission = {
  id: string
  created: Date
  updated: Date
}

export type IPermissionCreate = {
  meta?: string
}

export type IPermissionUpdate = {
  meta?: string
}

export const fieldsOfPermission = `
  id
  created
  updated
`

export type IGraphPermissions = IGraph<
  IPermission,
  IPermissionCreate,
  IPermissionUpdate
>

export const createPermissions = (authorization: string) => {
  return createGraph<IPermission, IPermissionCreate, IPermissionUpdate>({
    name: 'Permission',
    fields: fieldsOfPermission,
    authorization,
  })
}
