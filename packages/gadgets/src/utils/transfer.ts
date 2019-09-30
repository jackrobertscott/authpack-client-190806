import { Store } from 'events-and-things'
import { radio } from './radio'

export type IInternalState =
  | undefined
  | {
      user: {
        id: string
        email: string
        username?: string
        avatar?: string
        name?: string
      }
      session: {
        id: string
        token: string
      }
      group?: {
        id: string
        name: string
        tag: string
      }
      permissions?: Array<{
        id: string
        name: string
        tag: string
        description?: string
      }>
    }

export const internalStateStore = new Store<IInternalState>(undefined)

export const internalStateConnect = () =>
  internalStateStore.listen(data => {
    radio.message({
      name: 'wga:state',
      payload: data,
    })
  })
