import {
  useEffect,
  useState,
  FC,
  createContext,
  createElement,
  useContext,
  useRef,
  ReactNode,
  useMemo,
} from 'react'
import { Gadgets, IGadgets, IConstructor } from '@authpack/sdk'

const AuthpackContext = createContext<{
  gadgets?: Gadgets
  current?: IGadgets
}>({})

let instance: Gadgets
export const Provider: FC<{
  children: ReactNode
  value: IConstructor
}> = ({ children, value }) => {
  if (!value)
    throw new Error('Property "value" is missing on <Authpack /> component.')
  if (!instance) instance = new Gadgets(value)
  const gadgets = useRef(instance)
  const [current, currentChange] = useState<IGadgets>(gadgets.current.current())
  useEffect(() => gadgets.current.listen(update => currentChange(update)), [])
  const data = useMemo(() => {
    return {
      gadgets: gadgets.current,
      current,
    }
    // eslint-disable-next-line
  }, [gadgets.current, current])
  return createElement(AuthpackContext.Provider, {
    value: data,
    children,
  })
}

export const useAuthpack = () => {
  const authpack = useContext(AuthpackContext)
  if (!authpack.current)
    throw new Error('Please wrap Authpack hooks in the <Authpack /> component.')
  return authpack.current
}

export const useGadgets = () => {
  const authpack = useContext(AuthpackContext)
  if (!authpack.gadgets)
    throw new Error('Please wrap Authpack hooks in the <Authpack /> component.')
  return authpack.gadgets
}
