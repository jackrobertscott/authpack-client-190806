import { useEffect, useState } from 'react'
import { wga } from '../utils/gadgets'

export const useGadgets = () => {
  const [state, stateChange] = useState()
  useEffect(() => {
    return wga.listen(data => stateChange(data))
    // eslint-disable-next-line
  }, [])
  return state
}
