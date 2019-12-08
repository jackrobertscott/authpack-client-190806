import { useEffect, useState } from 'react'
import { IGadgets } from '@authpack/sdk'
import { authpack } from '../utils/authpack'

export const useGadgets = () => {
  const [state, stateChange] = useState<IGadgets>(authpack.current())
  useEffect(() => {
    return authpack.listen(data => stateChange(data))
    // eslint-disable-next-line
  }, [])
  return state
}
