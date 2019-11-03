import { useStore } from 'wga-theme'
import { appStore } from '../utils/app'

export const useApp = () => {
  return useStore({ store: appStore })
}
