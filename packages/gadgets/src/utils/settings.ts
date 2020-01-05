import { KeyStore } from 'events-and-things'
import {
  createElement as element,
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from 'react'

export type ISettings = {
  open: boolean
  ready: boolean
  client?: string
  bearer?: string
  domain?: string
  options: IOptions
  cluster?: {
    id: string
    name: string
    theme_preference: string
    stripe_publishable_key: string
  }
  session?: {
    id: string
    token: string
  }
  user?: {
    id: string
    email: string
    verified: boolean
    username: string
    name?: string
    name_given?: string
    name_family?: string
  }
  plan?: {
    id: string
    name: string
    tag: string
    description?: string
    statement?: string
    amount: number
    currency: string
    interval: string
    interval_seperator: number
  }
  team?: {
    id: string
    name: string
    tag: string
    description?: string
  }
  membership?: {
    id: string
    admin: boolean
  }
}

export interface IOptions {
  enable_teams?: boolean
  prompt_teams?: boolean
  theme_preset?: string
}

export const defaults: ISettings = {
  open: false,
  ready: false,
  options: {
    enable_teams: false,
    prompt_teams: false,
  },
}

export const SettingsStore = new KeyStore<ISettings>(defaults)

export const SettingsContext = createContext(SettingsStore.current)

export const Settings: FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, settingsChange] = useState(SettingsStore.current)
  useEffect(() => SettingsStore.listen(settingsChange), [])
  return element(SettingsContext.Provider, {
    value: settings,
    children,
  })
}
