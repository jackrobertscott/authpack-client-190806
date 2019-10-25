import { IMeta } from './Meta'

export interface ISession {
  id: string
  created: string
  updated: string
  meta: IMeta
  user: string
  team?: string
  deactivated: boolean
}
