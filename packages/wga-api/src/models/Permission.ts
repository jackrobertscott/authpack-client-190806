import { IMeta } from '../utils/types'

export interface IPermission {
  id: string
  created: string
  updated: string
  meta: IMeta
  name: string
  tag: string
  description?: string
}

export const PermissionFields = `
  id
  created
  updated
  meta
  name
  tag
  description
`.trim()
