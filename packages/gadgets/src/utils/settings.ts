import { KeyStore } from 'events-and-things'

export type ISettings = {
  open: boolean
  ready: boolean
  domain?: string
  bearer?: string
  cluster?: {
    id: string
    name: string
    theme: string
    teams_enabled: boolean
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

export const defaults: ISettings = {
  open: false,
  ready: false,
}

export const SettingsStore = new KeyStore<ISettings>(defaults)
