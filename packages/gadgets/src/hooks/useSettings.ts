import { SettingsStore } from '../utils/settings'
import { useStore } from 'wga-theme'

export const useSettings = () => {
  return useStore({
    store: SettingsStore,
  })
}
