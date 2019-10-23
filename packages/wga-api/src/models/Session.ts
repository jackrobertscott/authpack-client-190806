import { IMeta } from '../utils/types'

export interface ISession {
  id: string
  created: string
  updated: string
  meta: IMeta
  user: string
  team?: string
  deactivated: boolean
}

export const SessionFields = `
  id
  created
  updated
  meta
  user
  team
  deactivated
`.trim()
