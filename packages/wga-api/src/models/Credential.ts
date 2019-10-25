import { IMeta } from './Meta'

export interface ICredential {
  id: string
  created: string
  updated: string
  meta: IMeta
  user: string
  provider: string
  token: string
  email?: string
}
