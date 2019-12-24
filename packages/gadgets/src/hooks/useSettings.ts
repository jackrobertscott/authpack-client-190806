import { useContext } from 'react'
import { SettingsContext } from '../utils/settings'

export const useSettings = () => {
  return useContext(SettingsContext)
}
