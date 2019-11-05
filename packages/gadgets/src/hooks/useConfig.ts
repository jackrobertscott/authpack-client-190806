import { useStore } from 'wga-theme'
import { ConfigStore } from '../utils/config'

export const useConfig = () => {
  return useStore({
    store: ConfigStore,
  })
}
