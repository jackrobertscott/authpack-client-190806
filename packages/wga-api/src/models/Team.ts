import { IMeta } from '../utils/types'

export interface ITeam {
  id: string
  created: string
  updated: string
  meta: IMeta
  name: string
  tag: string
  description?: string
}

export const TeamFields = `
  id
  created
  updated
  meta
  name
  tag
  description
`.trim()
