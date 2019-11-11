import { KeyStore } from 'events-and-things'

export type ISettings = {
  domain?: string
  bearer?: string
  ready: boolean
  open: boolean
  appname?: string
  subscribed: boolean
  power: boolean
  team_required: boolean
  theme?: string
  session?: {
    id: string
    token: string
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
  permissions?: Array<{
    id: string
    name: string
    tag: string
    description?: string
  }>
}

export const defaults: ISettings = {
  ready: false,
  open: false,
  subscribed: false,
  power: false,
  team_required: false,
  theme: 'blue_harvester',
}

export const SettingsStore = new KeyStore<ISettings>(defaults)
