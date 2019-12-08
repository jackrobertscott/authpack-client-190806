import { createContext } from 'react'
import { SettingsStore } from '../utils/settings'

export const SettingsContext = createContext(SettingsStore.current)
