import { KeyStore } from 'events-and-things'

export interface IUniversalStore {
  ready: boolean
  cluster_id?: string
  cluster_domain_key?: string
  cluster_name?: string
  teams_enabled: boolean
  subscribed: boolean
  power: boolean
  theme: string
}

const defaults: IUniversalStore = {
  ready: false,
  teams_enabled: false,
  subscribed: false,
  power: false,
  theme: 'night_sky',
}

export const UniversalStore = new KeyStore<IUniversalStore>(defaults)
