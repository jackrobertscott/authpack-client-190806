import { Store } from 'events-and-things'

export interface ISetupStore {
  isdev: boolean
}

const defaults: ISetupStore = {
  isdev: true,
}

export const setupStore = new Store<ISetupStore>(defaults, 'wga.setupStore')
