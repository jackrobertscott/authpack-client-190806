import { useEffect, useState, useMemo } from 'react'
import { useToaster, useMounted } from 'wga-theme'

export const useOauthCode = () => {
  const toaster = useToaster()
  const mounted = useMounted()
  const [code, codeChange] = useState<string | undefined>()
  const [tab, tabChange] = useState<Window | null | undefined>()
  useEffect(() => {
    if (tab) {
      let count = 0
      const interval = setInterval(() => {
        count = count + 1
        if (count > 10 * 60) {
          clearTimeout(interval)
          if (mounted.current)
            toaster.add({
              icon: 'flag',
              label: 'Error',
              helper: 'OAuth time limit expired, please try again',
            })
          return
        }
        const data = localStorage.getItem('wga.code')
        if (!data) return // continue polling
        if (tab) tab.close()
        if (interval) clearTimeout(interval)
        tabChange(undefined)
        localStorage.removeItem('wga.code')
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
  const openUrl = (url: string) => {
    tabChange(window.open(url))
  }
  const clearCode = () => {
    codeChange(undefined)
  }
  return useMemo(() => {
    return {
      code,
      openUrl,
      clearCode,
    }
  }, [code])
}
