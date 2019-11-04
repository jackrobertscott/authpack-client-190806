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
  domain?: { key: string; url: string }
  theme: ITheme
}

export const defaultSettings: ISettings = {
  open: false,
  devmode: false,
  session: undefined,
  appname: 'Window Gadgets',
  theme: BlueHarvester,
}

export const settings = new Store<ISettings>(defaultSettings, 'wga.settings')
