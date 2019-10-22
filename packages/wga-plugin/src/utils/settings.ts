import { Store } from 'events-and-things'

export type ISettings = {
  domain?: {
    key: string
    url: string
  }
  open: boolean
  session:
    | undefined
    | {
        id: string
        token: string
        user: {
          id: string
          email: string
          username?: string
          avatar?: string
          name?: string
        }
        workspace?: {
          id: string
          name: string
          tag: string
          description?: string
          active: boolean
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
  session: undefined,
}

export const settingsStore = new Store<ISettings>(defaultSettings)
