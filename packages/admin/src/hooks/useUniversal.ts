import { useContext } from 'react'
import { UniversalContext } from '../utils/universal'

export const useUniversal = () => {
  return useContext(UniversalContext)
}
