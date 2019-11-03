import { Store } from 'events-and-things'

export interface IAppStore {
  isdev: boolean
  appname: string
}

const defaults: IAppStore = {
  isdev: true,
  appname: 'Window Gadgets',
}

export const appStore = new Store<IAppStore>(defaults, 'wga.app')
