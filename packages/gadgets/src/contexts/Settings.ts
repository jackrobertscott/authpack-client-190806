import { createContext } from 'react'
import { SettingsStore } from '../utils/settings'

export const Settings = createContext(SettingsStore.current)
