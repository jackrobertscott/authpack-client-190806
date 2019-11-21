import { KeyStore } from 'events-and-things'

export type IGadgets = {
  open: boolean
  ready: boolean
  domain?: string
  bearer?: string
  subscribed?: boolean
  power?: boolean
  app?: {
    id: string
    name: string
    team_required: boolean
  }
  user?: {
    id: string
    email: string
    username?: string
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
}

export const createGadgetsStore = (data: Partial<IGadgets> = {}) =>
  new KeyStore<IGadgets>({ ...defaults, ...data }, 'wga.plugin.v1')
