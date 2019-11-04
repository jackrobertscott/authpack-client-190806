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
  api: string
  domain?: string
  bearer?: string
  theme?: { [key: string]: any }
}

export const defaultSettings: ISettings = {
  open: false,
  devmode: false,
  session: undefined,
  appname: 'Window Gadgets',
  api: 'http://localhost:4000',
}

export const settings = new Store<ISettings>(defaultSettings)
