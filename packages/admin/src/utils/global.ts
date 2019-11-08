import { KeyStore } from 'events-and-things'

export interface IGlobalStore {
  devmode: boolean
  appname: string
  theme: string
}

const defaults: IGlobalStore = {
  devmode: true,
  appname: 'Window Gadgets',
  theme: 'blue_harvester',
}

export const GlobalStore = new KeyStore<IGlobalStore>(defaults, 'wga.global')
