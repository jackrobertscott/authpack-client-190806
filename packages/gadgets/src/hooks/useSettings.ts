import { useContext } from 'react'
import { SettingsContext } from '../contexts/Settings'

export const useSettings = () => {
  return useContext(SettingsContext)
}
