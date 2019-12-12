import { KeyStore } from 'events-and-things'

export type ISettings = {
  open: boolean
  ready: boolean
  client?: string
  bearer?: string
  domain?: string
  options: IOptions
  cluster?: {
    id: string
    name: string
    theme_preference: string
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

export interface IOptions {
  enable_teams?: boolean
  prompt_teams?: boolean
}

export const defaults: ISettings = {
  open: false,
  ready: false,
  options: {
    enable_teams: false,
    prompt_teams: false,
  },
}

export const SettingsStore = new KeyStore<ISettings>(defaults)
