import { IMeta } from '../utils/types'

export interface IUser {
  id: string
  created: string
  updated: string
  meta: IMeta
  email: string
  password: string
  username?: string
  name?: string
}

export const UserFields = `
  id
  created
  updated
  meta
  email
  password
  username
  name
`.trim()
