import { IMeta } from './Meta'

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
