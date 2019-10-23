import { IMeta } from '../utils/types'

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

export const MembershipFields = `
  id
  created
  updated
  meta
  user
  team
  permissions
  admin
`.trim()
