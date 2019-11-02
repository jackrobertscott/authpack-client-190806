import { useEffect, useState } from 'react'
import { IPluginGadgets } from 'wga-plugin'
import { gadgets } from '../utils/wga'

export const useGadgetsState = () => {
  const [state, stateChange] = useState<IPluginGadgets>()
  const [loading, loadingChange] = useState<boolean>(true)
  useEffect(() => {
    return gadgets.listen((data: IPluginGadgets) => {
      stateChange(data)
      if (loading) loadingChange(false)
    })
    // eslint-disable-next-line
  }, [])
  return {
    state,
    loading,
  }
}
