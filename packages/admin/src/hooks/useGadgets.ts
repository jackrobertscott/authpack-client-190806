import { useEffect, useState } from 'react'
import { IPluginGadgets } from 'wga-plugin'
import { gadgets } from '../utils/wga'

export const useGadgets = () => {
  const [state, stateChange] = useState<IPluginGadgets>()
  const [loading, loadingChange] = useState<boolean>(false)
  useEffect(() => {
    return gadgets.listen(data => {
      if (!loading) loadingChange(true)
      stateChange(data)
    })
    // eslint-disable-next-line
  }, [])
  return {
    state,
    loading,
  }
}
