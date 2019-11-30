import {
  createElement as create,
  createContext,
  ReactNode,
  useState,
  useEffect,
  FC,
} from 'react'
import { KeyStore } from 'events-and-things'

export interface IUniversalStore {
  ready: boolean
  cluster_id?: string
  cluster_key_client?: string
  cluster_name?: string
  subscribed: boolean
}

const defaults: IUniversalStore = {
  ready: false,
  subscribed: false,
}

export const UniversalStore = new KeyStore<IUniversalStore>(defaults)

export const UniversalContext = createContext(UniversalStore.current)

export const Universal: FC<{ children: ReactNode }> = ({ children }) => {
  const [universal, universalChange] = useState(UniversalStore.current)
  useEffect(() => UniversalStore.listen(universalChange), [])
  return create(UniversalContext.Provider, {
    value: universal,
    children,
  })
}
