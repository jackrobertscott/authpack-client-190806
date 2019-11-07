import { useStore } from './useStore'
import { ToasterStore } from '../utils/toaster'

export const useToaster = () => {
  return useStore({
    store: ToasterStore,
  })
}
