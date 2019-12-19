import { useEffect, useState, useMemo } from 'react'
import { useToaster } from './useToaster'
import { useMounted } from './useMounted'

export const useOauthCode = () => {
  const toaster = useToaster()
  const mounted = useMounted()
  const [tab, tabChange] = useState<Window | null | undefined>()
  const [code, codeChange] = useState<string | undefined>()
  const [current, currentChange] = useState<string | undefined>()
  useEffect(() => {
    if (tab) {
      let count = 0
      const interval = setInterval(() => {
        if (!mounted.current) {
          if (interval) clearTimeout(interval)
          return
        }
        count = count + 1
        if (count > 10 * 60) {
          if (interval) clearTimeout(interval)
          toaster.add({
            icon: 'flag',
            label: 'Error',
            helper: 'OAuth time limit expired, please try again',
          })
        }
        const data = localStorage.getItem('authpack.code')
        if (!data) return // continue polling
        if (tab) tab.close()
        if (interval) clearTimeout(interval)
        tabChange(undefined)
        localStorage.removeItem('authpack.code')
        const parsed = JSON.parse(data)
        const minuteAgo = Date.now() - 1000 * 60
        if (parsed.created < minuteAgo) {
          toaster.add({
            icon: 'flag',
            label: 'Error',
            helper: 'OAuth code expired, please try again',
          })
          return
        }
        codeChange(parsed.code)
      }, 1000)
      return () => interval && clearTimeout(interval)
    }
    // eslint-disable-next-line
  }, [tab])
  const open = (id: string, url: string) => {
    localStorage.removeItem('authpack.code')
    if (!mounted.current) return
    currentChange(id)
    setTimeout(() => mounted.current && tabChange(window.open(url)))
  }
  const clear = () => {
    if (!mounted.current) return
    codeChange(undefined)
    currentChange(undefined)
  }
  return useMemo(() => {
    return {
      code,
      current,
      open,
      clear,
    }
    // eslint-disable-next-line
  }, [code, current])
}
