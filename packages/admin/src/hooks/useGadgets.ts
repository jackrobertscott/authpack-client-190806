import { useEffect, useState } from 'react'
import { IGadgets } from 'wga-plugin'
import { wga } from '../utils/wga'

export const useGadgets = () => {
  const [state, stateChange] = useState<IGadgets>(wga.current)
  useEffect(() => {
    return wga.listen(data => stateChange(data))
    // eslint-disable-next-line
  }, [])
  return state
}
