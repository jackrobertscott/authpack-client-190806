import { KeyStore } from 'events-and-things'

export interface IUniversalStore {
  ready: boolean
  app_id?: string
  app_domain_key?: string
  app_name?: string
  subscribed: boolean
  power: boolean
  theme: string
}

const defaults: IUniversalStore = {
  ready: false,
  subscribed: false,
  power: false,
  theme: 'blue_harvester',
}

export const UniversalStore = new KeyStore<IUniversalStore>(defaults)
