import { IMeta } from './Meta'

export interface ITeam {
  id: string
  created: string
  updated: string
  meta: IMeta
  name: string
  tag: string
  description?: string
}
