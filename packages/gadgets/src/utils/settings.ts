import { Store } from 'events-and-things'

export type ISession = {
  id: string
  token: string
  user: {
    id: string
    email: string
    username?: string
    avatar?: string
    name?: string
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

export type ISettings = {
  open: boolean
  devmode: boolean
  session: undefined | ISession
  appname?: string
  domain?: string
  bearer?: string
  url?: string
  subscribed: boolean
}

export const defaultSettings: ISettings = {
  open: false,
  devmode: true,
  session: undefined,
  subscribed: false,
}

const storekey = `wga.${document.location.host}.settings`
export const SettingsStore = new Store<ISettings>(defaultSettings, storekey)
