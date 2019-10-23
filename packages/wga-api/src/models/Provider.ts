import { IMeta } from '../utils/types'

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

export const ProviderFields = `
  id
  created
  updated
  meta
  preset
  client
  secret
  scopes
`.trim()
