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
      /**
       * Handler of the data payload.
       */
      const handle = (message: string) => {
        let data
        try {
          data = JSON.parse(message)
        } catch {
          data = {}
        }
        if (data.message !== 'authpack.code') return
        const parsed = data.payload || {}
        const minuteAgo = Date.now() - 1000 * 60
        if (parsed.created < minuteAgo) {
          toaster.add({
            icon: 'flag',
            label: 'Error',
            helper: 'OAuth code expired, please try again',
          })
          return
        }
        if (tab) tab.close()
        if (!mounted.current) return
        tabChange(undefined)
        if (parsed.code) codeChange(parsed.code)
      }
      /**
       * Local storage event listener.
       */
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
        if (interval) clearTimeout(interval)
        localStorage.removeItem('authpack.code')
        handle(data)
      }, 1000)
      /**
       * Post message event listener.
       */
      const listener = (event: MessageEvent) => {
        if (!event.origin.startsWith(window.origin)) return
        if (!event.data) return
        handle(event.data)
      }
      tab.addEventListener('message', listener)
      return () => {
        if (interval) clearInterval(interval)
        if (typeof tab !== 'undefined' && tab.removeEventListener)
          tab.removeEventListener('message', listener)
      }
    }
    // eslint-disable-next-line
  }, [tab])
  const open = (id: string, url: string) => {
    if (!mounted.current) return
    localStorage.removeItem('authpack.code')
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
