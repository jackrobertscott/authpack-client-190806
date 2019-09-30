import { Store } from 'events-and-things'

export type ISettings = {
  open: boolean
  current:
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
}

export const defaultSettings: ISettings = {
  open: false,
  current: undefined,
}

export const settingsStore = new Store<ISettings>(defaultSettings)
