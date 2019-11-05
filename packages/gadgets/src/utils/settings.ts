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
  subscribed: boolean
}

export const defaultSettings: ISettings = {
  open: true,
  devmode: true,
  session: undefined,
  domain: 'wga-domain-key-79aeda5fd1178c9486d6925cc',
  subscribed: false,
}

const storekey = `wga.${document.location.host}.settings`
export const SettingsStore = new Store<ISettings>(defaultSettings, storekey)
