import { useContext } from 'react'
import { ToasterContext } from '../contexts/Toaster'

export const useToaster = () => {
  return useContext(ToasterContext)
}
