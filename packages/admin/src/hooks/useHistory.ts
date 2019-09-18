import { useEffect, useState, useMemo } from 'react'

export const useHistory = (): [
  Location,
  { change: (path: string) => void }
] => {
  const [location, changeLocation] = useState<Location>(document.location)
  useEffect(() => {
    const listener = () => changeLocation(document.location)
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  }, [])
  const change = (path: string) => (window.location.href = path)
  // eslint-disable-next-line
  return useMemo(() => [location, { change }], [location])
}
