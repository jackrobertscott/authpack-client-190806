import { useContext } from 'react'
import { SpinnerContext } from '../contexts/Spinner'

export const useSpinner = () => {
  return useContext(SpinnerContext)
}
