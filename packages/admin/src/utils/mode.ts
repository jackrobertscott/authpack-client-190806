import { Store } from 'events-and-things'

export interface IStore {
  isdev: boolean
}

const defaults: IStore = {
  isdev: true,
}

export const modeStore = new Store<IStore>(defaults, 'wga.modeStore')
