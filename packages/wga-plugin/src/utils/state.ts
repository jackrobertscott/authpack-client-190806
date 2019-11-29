import { KeyStore } from 'events-and-things'

export type IGadgets = {
  open: boolean
  ready: boolean
  client?: string
  bearer?: string
  teams: boolean
  cluster?: {
    id: string
    name: string
    theme: string
    teams_required: boolean
    power: boolean
    subscribed: boolean
  }
  user?: {
    id: string
    email: string
    verified: boolean
    username: string
    name?: string
    name_given?: string
    name_family?: string
  }
  team?: {
    id: string
    name: string
    tag: string
    description?: string
  }
  session?: {
    id: string
    token: string
  }
  permissions?: Array<{
    id: string
    name: string
    tag: string
    description?: string
  }>
}

export const defaults: IGadgets = {
  open: false,
  ready: false,
  teams: false,
}

export const createGadgetsStore = (data: Partial<IGadgets> = {}) =>
  new KeyStore<IGadgets>({ ...defaults, ...data })
