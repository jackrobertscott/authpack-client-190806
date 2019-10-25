import { IMeta } from './Meta'

export interface IPermission {
  id: string
  created: string
  updated: string
  meta: IMeta
  name: string
  tag: string
  description?: string
}
