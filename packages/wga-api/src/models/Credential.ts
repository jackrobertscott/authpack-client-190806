import { IMeta } from '../utils/types'

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

export const CredentialFields = `
  id
  created
  updated
  meta
  user
  provider
  token
  email
`.trim()
