import { KeyStore } from 'events-and-things'

export interface IGlobalStore {
  bearer_domain_key?: string
  devmode: boolean
  subscribed: boolean
  appname: string
  theme: string
}

const defaults: IGlobalStore = {
  devmode: true,
  subscribed: false,
  appname: 'Window Gadgets',
  theme: 'blue_harvester',
}

export const GlobalStore = new KeyStore<IGlobalStore>(defaults, 'wga.global')
