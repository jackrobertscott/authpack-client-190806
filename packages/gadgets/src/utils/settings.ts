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
    stripe_publishable_key: string
    stripe_user_product_id: string
    stripe_team_product_id: string
    name: string
    login_redirect_uri?: string
    logout_redirect_uri?: string
    theme_preference?: string
    enable_team: boolean
    prompt_team: boolean
    prompt_verify: boolean
    hide_signup: boolean
    hide_sidebar_payments: boolean
    prompt_name_given: boolean
    prompt_name_family: boolean
  }
  session?: {
    id: string
    created: string
    updated: string
    token: string
  }
  membership?: {
    id: string
    created: string
    updated: string
    admin: boolean
    superadmin: boolean
  }
  user?: {
    id: string
    created: string
    updated: string
    email: string
    verified: boolean
    username: string
    name?: string
    name_given?: string
    name_family?: string
    teams_count: number
    sessions_count: number
    stripe_plan?: {
      id: string
      name?: string
      description?: string
      amount: number
      currency: string
      interval: string
      interval_count: number
    }
  }
  team?: {
    id: string
    created: string
    updated: string
    name: string
    tag: string
    description?: string
    users_count: number
    stripe_plan?: {
      id: string
      name?: string
      description?: string
      amount: number
      currency: string
      interval: string
      interval_count: number
    }
  }
}

export interface IOptions {
  theme_preset?: string
  prompt_plan?: string
}

export const defaults: ISettings = {
  open: false,
  ready: false,
  options: {},
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
