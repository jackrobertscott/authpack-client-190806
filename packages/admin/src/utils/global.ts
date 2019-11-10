import { KeyStore } from 'events-and-things'

export interface IGlobalStore {
  bearer_domain_key?: string
  subscribed: boolean
  appname: string
  theme: string
}

const defaults: IGlobalStore = {
  subscribed: false,
  appname: 'Window Gadgets',
  theme: 'blue_harvester',
}

export const GlobalStore = new KeyStore<IGlobalStore>(defaults, 'wga.global')
