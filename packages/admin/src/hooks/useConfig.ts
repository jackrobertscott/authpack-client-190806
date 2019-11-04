import { useStore } from 'wga-theme'
import { config } from '../utils/config'

export const useConfig = () => {
  return useStore({
    store: config,
  })
}
