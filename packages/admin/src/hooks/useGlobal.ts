import { useContext } from 'react'
import { Global } from '../contexts/Global'

export const useGlobal = () => {
  return useContext(Global)
}
