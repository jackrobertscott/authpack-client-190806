import { Store } from 'events-and-things'

export interface IAppStore {
  isdev: boolean
}

const defaults: IAppStore = {
  isdev: true,
}

export const appStore = new Store<IAppStore>(defaults, 'wga.app')
