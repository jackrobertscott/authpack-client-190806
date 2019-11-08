import { useContext } from 'react'
import { Settings } from '../contexts/Settings'

export const useSettings = () => {
  return useContext(Settings)
}
