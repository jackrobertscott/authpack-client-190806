import { KeyStore } from 'events-and-things'

export interface IUniversalStore {
  current_app_id?: string
  current_domain_key?: string
  appname: string
  subscribed: boolean
  power: boolean
  theme: string
}

const defaults: IUniversalStore = {
  appname: 'Window Gadgets',
  subscribed: false,
  power: false,
  theme: 'blue_harvester',
}

export const UniversalStore = new KeyStore<IUniversalStore>(defaults, 'wga.universal')
