import { drip } from '../utils/throttle'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useMounted } from './useMounted'

export const useMedia = () => {
  const getter = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  const mounted = useMounted()
  const [state, stateChange] = useState<{
    width: number
    height: number
  }>(getter())
  const change = useRef(
    drip(300, () => mounted.current && stateChange(getter()))
  )
  useEffect(() => {
    change.current()
    window.addEventListener('resize', change.current)
    return () => window.removeEventListener('resize', change.current)
  }, [])
  return useMemo(() => {
    return state
  }, [state])
}
