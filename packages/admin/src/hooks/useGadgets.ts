import { useEffect, useState } from 'react'
import { IPluginGadgets } from 'wga-plugin'
import { gadgets } from '../utils/wga'

export const useGadgets = () => {
  const [state, stateChange] = useState<IPluginGadgets>()
  useEffect(() => {
    return gadgets.listen(data => stateChange(data))
  }, [])
  return state
}
