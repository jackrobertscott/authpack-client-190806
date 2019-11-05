import { Store } from 'events-and-things'
import { ITheme, BlueHarvester } from 'wga-theme'

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
  workspace?: {
    id: string
    name: string
    tag: string
    description?: string
    active: boolean
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
  appname: string
  domain?: string
  bearer?: string
  theme: ITheme
}

export const defaultSettings: ISettings = {
  open: true,
  devmode: true,
  session: undefined,
  appname: 'Window Gadgets',
  domain: 'wga-domain-key-79aeda5fd1178c9486d6925cc',
  theme: BlueHarvester,
}

export const SettingsStore = new Store<ISettings>(
  defaultSettings,
  'wga.settings'
)
