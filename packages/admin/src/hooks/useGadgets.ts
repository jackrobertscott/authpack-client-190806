import { useEffect, useState } from 'react'
import { wga } from '../utils/wga'

export const useGadgets = () => {
  const [state, stateChange] = useState()
  const [loading, loadingChange] = useState<boolean>(true)
  useEffect(() => {
    return wga.listen(data => {
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
