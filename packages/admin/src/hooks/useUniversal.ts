import { useContext } from 'react'
import { Universal } from '../contexts/Universal'

export const useUniversal = () => {
  return useContext(Universal)
}
