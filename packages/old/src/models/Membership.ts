import { IMeta } from './Meta'

export interface IMembership {
  id: string
  created: string
  updated: string
  meta: IMeta
  user: string
  team: string
  permissions: string[]
  admin: boolean
}
