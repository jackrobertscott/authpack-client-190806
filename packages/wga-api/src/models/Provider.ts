import { IMeta } from './Meta'

export interface IProvider {
  id: string
  created: string
  updated: string
  meta: IMeta
  preset: string
  client: string
  secret: string
  scopes: string[]
}
