import { KeyStore } from 'events-and-things'

export type ISettings = {
  open: boolean
  ready: boolean
  client?: string
  bearer?: string
  enable_teams: boolean
  prompt_teams: boolean
  cluster?: {
    id: string
    name: string
    theme: string
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
  enable_teams: false,
  prompt_teams: false,
}

export const SettingsStore = new KeyStore<ISettings>(defaults)
