import { KeyStore } from 'events-and-things'

export type ISettings = {
  open: boolean
  ready: boolean
  domain?: string
  bearer?: string
  subscribed?: boolean
  power?: boolean
  theme?: string
  app?: {
    id: string
    name: string
    force_teams: boolean
  }
  user?: {
    id: string
    email: string
    username?: string
    given_name?: string
    family_name?: string
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
  theme: 'night_sky',
}

export const SettingsStore = new KeyStore<ISettings>(defaults)
