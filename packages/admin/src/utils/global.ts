import { KeyStore } from 'events-and-things'

export interface IGlobalStore {
  current_app_id?: string
  current_domain_key?: string
  appname: string
  subscribed: boolean
  power: boolean
  theme: string
}

const defaults: IGlobalStore = {
  appname: 'Window Gadgets',
  subscribed: false,
  power: false,
  theme: 'blue_harvester',
}

export const GlobalStore = new KeyStore<IGlobalStore>(defaults, 'wga.global')
